import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/logo.png";
import { redirect } from "next/navigation";
import { getCart } from "@/lib/db/cart";
import ShoppingCartButton from "./ShoppingCartButton";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import UserMenuButton from "./UserMenuButton";

async function searchProducts(formData: FormData) {
  "use server";

  const searchQuery = formData.get("searchQuery")?.toString();

  if (searchQuery) {
    redirect("/search?query=" + searchQuery);
  }
}

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  const cart = await getCart(); // Now allowed because the component is async

  return (
    <div className="bg-base-100">
      <div className="navbar max-w-7xl m-auto flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Link href={"/"} className="btn btn-ghost normal-case text-xl">
            <Image src={Logo} alt="logo" width={40} height={40} />
            Flowamon
          </Link>
        </div>
        <div className="flex-none gap-2">
          <form action={searchProducts}>
            <div className="form-control">
              <input
                name="searchQuery"
                placeholder="Search"
                className="input input-bordered w-full min-w-fit"
              />
            </div>
          </form>
        </div>
          <ShoppingCartButton cart={cart} />
          <UserMenuButton session={session} />
      </div>
    </div>
  );
}
