import React, { useEffect, useState } from "react";
import Filters from "../components/Filters";
import ProductGrid from "../components/ProductGrid";
import Pagination from "../components/Pagination";
import { Product } from "../components/ProductCard";

const ProductListingPage: React.FC = () => {

    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<string>('default');

    const [currentPage, setCurrentPage] = useState<number>(1);
    const productsPerPage = 6;

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: Product[] = await response.json();
                setProducts(data);
                setFilteredProducts(data);
            } catch (err) {
                console.error(err);
                setError('Error fetching products.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        let updatedProducts = [...products];

        // Category Filter
        if (selectedCategory !== 'all') {
            updatedProducts = updatedProducts.filter((product) =>
                product.category.toLowerCase() === selectedCategory.toLowerCase()
            );
        }

        // Price Filter
        if (selectedPriceRange !== 'all') {
            if (selectedPriceRange === '0-500') {
                updatedProducts = updatedProducts.filter((product) => product.price < 500);
            } else if (selectedPriceRange === '500-1000') {
                updatedProducts = updatedProducts.filter(
                    (product) => product.price >= 500 && product.price < 1000
                );
            } else if (selectedPriceRange === '1000+') {
                updatedProducts = updatedProducts.filter((product) => product.price >= 1000);
            }
        }

        // Search Filter
        if (searchTerm.trim() !== '') {
            updatedProducts = updatedProducts.filter((product) =>
                product.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Sorting
        if (sortOrder !== 'default') {
            updatedProducts.sort((a, b) =>
                sortOrder === 'lowToHigh' ? a.price - b.price : b.price - a.price
            );
        }

        setFilteredProducts(updatedProducts);
        setCurrentPage(1);
    }, [products, selectedCategory, selectedPriceRange, searchTerm, sortOrder]);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const handlePreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

    return (
        <div className="container mx-auto p-5">
            <h1 className="text-4xl font-bold mb-8 text-center">
                Product Listing Page
            </h1>

            <Filters
                selectedCategory={selectedCategory}
                selectedPriceRange={selectedPriceRange}
                searchTerm={searchTerm}
                sortOrder={sortOrder}
                onCategoryChange={setSelectedCategory}
                onPriceRangeChange={setSelectedPriceRange}
                onSearchChange={setSearchTerm}
                onSortChange={setSortOrder}
            />

            {
                error && <p className="text-center text-red-500">
                    {error}
                </p>
            }

            <ProductGrid
                products={currentProducts}
                loading={loading}
            />

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPrevious={handlePreviousPage}
                onNext={handleNextPage}
            />
        </div>
    );
};

export default ProductListingPage;