import { cookies } from 'next/headers';
import { prisma } from './prisma';
import { Cart, CartItem, Prisma } from '@prisma/client';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

export type CartWithProducts = Prisma.CartGetPayload<{
    include: { Item: { include: { product: true } } };
}>;

export type CartItemWithProducts = Prisma.CartItemGetPayload<{
    include: { product: true };
}>;

export type ShoppingCart = Cart & {
    Item: CartWithProducts['Item'];
    size: number;
    subtotal: number;
};

export async function getCart(): Promise<ShoppingCart | null> {
    const session = await getServerSession(authOptions); // Fixed session naming

    let cart: CartWithProducts | null = null;

    if (session) {
        cart = await prisma.cart.findFirst({
            where: { userid: session.user.id }, // Use findFirst() since userid may not be unique
            include: {
                Item: {
                    include: {
                        product: true,
                    },
                },
            },
        });
    } else {
        const cookieStore = cookies(); // No need for await
        const localCartId = (await cookieStore).get('localCartId')?.value;

        if (!localCartId) return null;

        cart = await prisma.cart.findUnique({
            where: { id: localCartId },
            include: {
                Item: {
                    include: {
                        product: true,
                    },
                },
            },
        });
    }

    if (!cart) return null;

    return {
        ...cart,
        size: cart.Item.reduce((acc, item) => acc + item.quantity, 0),
        subtotal: cart.Item.reduce(
            (acc, item) => acc + item.quantity * item.product.price, //It adds up the total cost of all items in the cart.
            0
        ),
    };
}

export async function createCart(): Promise<ShoppingCart> {
    const session = await getServerSession(authOptions);

    let newCart: Cart;

    if (session) {
        newCart = await prisma.cart.create({
            data: {
                userid: session.user.id, // Ensure this matches your Prisma schema
            },
        });
    } else {
        newCart = await prisma.cart.create({
            data: {},
        });

        // Note: Needs encryption + secure settings in a real production app
        (await cookies()).set("localCartId", newCart.id);
    }

    // Set the cart ID in cookies
    (await cookies()).set('localCartId', newCart.id);

    return {
        ...newCart,
        Item: [],
        size: 0,
        subtotal: 0,
    };
}

export async function mergeAnonymousCartIntoUserCart(userid: string) {
    const localCartId = (await cookies()).get("localCartId")?.value;
  
    const localCart = localCartId
      ? await prisma.cart.findUnique({
          where: { id: localCartId },
          include: { Item: true },
        })
      : null;
  
    if (!localCart) return;
  
    const userCart = await prisma.cart.findFirst({
      where: { userid },
      include: { Item: true },
    });
  
    await prisma.$transaction(async (tx) => {
      if (userCart) {
        const mergedCartItems = mergeCartItems(localCart.Item, userCart.Item);
  
        await tx.cartItem.deleteMany({
          where: { cartId: userCart.id },
        });
  
        await tx.cartItem.createMany({
          data: mergedCartItems.map((item) => ({
            cartId: userCart.id,
            productId: item.productId,
            quantity: item.quantity,
          })),
        });
      } else {
        await tx.cart.create({
          data: {
            userid,
            Item: {
              createMany: {
                data: localCart.Item.map((Item) => ({
                  productId: Item.productId,
                  quantity: Item.quantity,
                })),
              },
            },
          },
        });
      }
  
      await tx.cart.delete({
        where: { id: localCart.id },
      });
      // throw Error("Transaction failed");
      (await cookies()).set("localCartId", "");
    });
  }
  
  function mergeCartItems(...cartItems: CartItem[][]): CartItem[] {
    return cartItems.reduce((acc, items) => {
      items.forEach((item) => {
        const existingItem = acc.find((i) => i.productId === item.productId);
        if (existingItem) {
          existingItem.quantity += item.quantity;
        } else {
          acc.push(item);
        }
      });
      return acc;
    }, [] as CartItem[]);
  }