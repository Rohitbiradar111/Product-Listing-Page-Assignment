import React from "react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPrevious: () => void;
    onNext: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPrevious,
    onNext
}) => {
    return (
        <div className="flex justify-center items-center mt-4 space-x-4">
            <button
                onClick={onPrevious}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer active:bg-green-400 disabled:opacity-50"
            >
                Previous
            </button>
            <span>
                Page {currentPage} of {totalPages}
            </span>
            <button
                onClick={onNext}
                disabled={currentPage === totalPages || totalPages === 0}
                className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer active:bg-green-400 disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;