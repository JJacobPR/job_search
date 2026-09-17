import chevronLeft from '@assets/chevron-left.svg'
import chevronRight from '@assets/chevron-right.svg'

interface PaginationProps {
    pageNumber: number
    pageCount: number
    setPage: (page: number) => void
    nextPage: (pagesToMove?: number) => void
    prevPage: (pagesToMove?: number) => void
}

export const Pagination = ({ pageNumber, pageCount, nextPage, prevPage }: PaginationProps) => {
    if (pageCount <= 1) return null

    return (
        <div className="flex items-center justify-center gap-2">
            <button
                type="button"
                onClick={() => prevPage()}
                disabled={pageNumber === 0}
                className="p-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous page"
            >
                <img src={chevronLeft} alt="" className="w-4 h-4" />
            </button>
            <span className="text-sm text-gray-600">
                Page {pageNumber + 1} of {pageCount}
            </span>
            <button
                type="button"
                onClick={() => nextPage()}
                disabled={pageNumber === pageCount - 1}
                className="p-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next page"
            >
                <img src={chevronRight} alt="" className="w-4 h-4" />
            </button>
        </div>
    )
}
