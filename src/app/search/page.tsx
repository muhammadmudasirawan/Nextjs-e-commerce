import ProductCards from "@/components/ProductCards";
import { prisma } from "@/lib/db/prisma";
import { Metadata } from "next";

interface SearchPageProps {
    searchParams: { query: string };
}

export function generateMetadata({
    searchParams: { query },
}: SearchPageProps): Metadata {
    return {
        title: `Search: ${query} - Flowmazon`,
}
}


export default async function SearchPage({ searchParams: { query } }: SearchPageProps) {
    const products = await prisma.product.findMany({
        where:{
            OR: [
                {name: {contains: query, mode: "insensitive"}},
                {description: {contains: query, mode: "insensitive"}}
            ]
        },
        orderBy: { id: "desc" },
    })
    if( products.length === 0){
        return 
        <div className="text-center">No Product Found</div>
        
    }
    return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(product => ( <ProductCards key={product.id} product={product} /> ))}
    </div>
    )
}