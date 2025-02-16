import React from "react";

export interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    image: string;
}

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="border rounded-4xl p-4 flex flex-col">
            <img
                src={product.image}
                alt={product.title}
                loading="lazy"
                className="h-48 w-full object-contain mb-4"
            />
            <h2 className="text-lg font-semibold text-center mb-2">
                {product.title}
            </h2>
            <p className="text-center mb-2">
                Price : ${product.price}
            </p>
            <p className="text-center capitalize">
                Category : {product.category === "jewelery" ? "jewellery" : product.category}
            </p>
        </div>
    );
};

export default ProductCard;