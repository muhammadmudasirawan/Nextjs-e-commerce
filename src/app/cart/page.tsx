import { getCart } from "@/lib/db/cart";
import CartEntry from "./CartEntry";
import { setProductQuantity } from "./action";
import { formatPrice } from "@/lib/format";

export const metadata = {
    title: 'Your Cart - Flowmazon',
}

export default  async function CartPage() {
    const cart = await getCart();

    return (
        <div>
            <h1 className="mb-6 text-3xl font-bold">Shopping Cart</h1>
            {cart?.Item.map(cartItem => ( <CartEntry key={cartItem.id} cartItem={cartItem} setProductQuantity={setProductQuantity} />
        ))}
        {!cart?.Item.length  && <p className="mb-6 text-3xl font-bold">Your cart is empty</p>}
        <div className="flex flex-col items-end sm:items-center">
        <p className="mb-3 font-bold"> Total: {formatPrice (cart?.subtotal || 0)} </p>
        <button className="btn btn-warning sm:w-[200px]">Checkout</button>
        </div>
        </div>
    )
}