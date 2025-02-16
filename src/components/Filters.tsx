import React from "react";

interface FiltersProps {
    selectedCategory: string;
    selectedPriceRange: string;
    searchTerm: string;
    sortOrder: string;
    onCategoryChange: (value: string) => void;
    onPriceRangeChange: (value: string) => void;
    onSearchChange: (value: string) => void;
    onSortChange: (value: string) => void;
}

const Filters: React.FC<FiltersProps> = ({
    selectedCategory,
    selectedPriceRange,
    searchTerm,
    sortOrder,
    onCategoryChange,
    onPriceRangeChange,
    onSearchChange,
    onSortChange
}) => {
    return (
        <div className="flex flex-wrap justify-between mb-4 gap-2">
            <div>
                <label htmlFor="category" className="mr-2 font-medium">
                    Category:
                </label>
                <select
                    id="category"
                    value={selectedCategory}
                    onChange={(e) => onCategoryChange(e.target.value)}
                    className="border rounded p-1"
                >
                    <option value="all">All</option>
                    <option value="men's clothing">Men's Clothing</option>
                    <option value="women's clothing">Women's Clothing</option>
                    <option value="jewelery">Jewellery</option>
                    <option value="electronics">Electronics</option>
                </select>
            </div>

            <div>
                <label htmlFor="price" className="mr-2 font-medium">
                    Price Range:
                </label>
                <select
                    id="price"
                    value={selectedPriceRange}
                    onChange={(e) => onPriceRangeChange(e.target.value)}
                    className="border rounded p-1"
                >
                    <option value="all">All</option>
                    <option value="0-500">$0 - $500</option>
                    <option value="500-1000">$500 - $1000</option>
                    <option value="1000+">$1000+</option>
                </select>
            </div>

            <div>
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="border rounded p-1"
                />
            </div>

            <div>
                <label htmlFor="sort" className="mr-2 font-medium">
                    Sort by Price:
                </label>
                <select
                    id="sort"
                    value={sortOrder}
                    onChange={(e) => onSortChange(e.target.value)}
                    className="border rounded p-1"
                >
                    <option value="default">Default</option>
                    <option value="lowToHigh">Low to High</option>
                    <option value="highToLow">High to Low</option>
                </select>
            </div>
        </div>
    );
};

export default Filters;