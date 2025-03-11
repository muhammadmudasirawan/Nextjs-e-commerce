import FormSubmitButton from "@/components/FormSubmitButton";
import { prisma } from "@/lib/db/prisma"
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation"
import { authOptions } from "../api/auth/[...nextauth]/route";

export const metaData = {
  title: 'Add Product',
}




async function addProduct(formData: FormData) {
  'use server';

  const session = await getServerSession(authOptions)


  if (!session?.user) {
    return redirect('/api/auth/signin?callbackUrl=/add-product');
  }

  // Extract and validate form data
  const name = formData.get('name')?.toString();
  const description = formData.get('description')?.toString();
  const imageUrl = formData.get('imageUrl')?.toString();
  const price = Number(formData.get('price') || 0);



  // Check for missing required fields
  if (!name || !description || !imageUrl || !price) {
    throw new Error('Missing required fields');
  }


  // only add 50 items 
  // for (let i = 0; i < 50; i++){
  //   await prisma.product.create({
  //     data: {
  //       name, 
  //       description,
  //       imageUrl, 
  //       price, 
  //     },
  //   });
  // }

  // Create the product in the database
  await prisma.product.create({
    data: {
      name, 
      description,
      imageUrl, 
      price, 
    },
  });

  // Redirect to the homepage
  redirect('/');
}

export default async function AddProductPage() {
  const session = await getServerSession(authOptions)


  if (!session?.user) {
    return redirect('/api/auth/signin?callbackUrl=/add-product');
  }


  return (
    <div className=""> 
      <h1 className="mb-3 text-lg font-bold">Add Product</h1>
    <form action={addProduct} >
      <input
        required
        name="name"
        placeholder="Name"
        className="input-bordered input mb-3 w-full"
      />
      <textarea
        required
        name="description"
        placeholder="Description"
        className="textarea-bordered textarea mb-3 w-full"
      />
      <input
        required
        name="imageUrl"
        placeholder="Image URL"
        type="url"
        className="input-bordered input mb-3 w-full"
      />
      <input
        required
        name="price"
        placeholder="Price"
        type="number"
        className="input-bordered input mb-3 w-full"
      />
      <FormSubmitButton className="btn-block" >Add Product</FormSubmitButton>
    </form></div>
  )
}

