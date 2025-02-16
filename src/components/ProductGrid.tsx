import React from "react";
import ProductCard, { Product } from "./ProductCard";

interface ProductGridProps {
    products: Product[];
    loading: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, loading }) => {

    if (loading) {
        return <p className="text-center text-4xl my-24">Products are on the way...</p>;
    }

    if (products.length === 0) {
        return <p className="col-span-full text-4xl text-center my-24">No products found.</p>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {
                products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))
            }
        </div>
    );
};

export default ProductGrid;