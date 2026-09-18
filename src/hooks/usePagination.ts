interface UsePaginationProps<T> {
    items: T[]
    page: number
    pageLimit: number
    onPageChange: (page: number) => void
}

interface UsePaginationReturn<T> {
    pageNumber: number
    pageCount: number
    setPage: (pn: number) => void
    getPageData: () => T[]
    nextPage: (pagesToMove?: number) => void
    prevPage: (pagesToMove?: number) => void
}

const usePagination = <T>({ items, page, pageLimit, onPageChange }: UsePaginationProps<T>): UsePaginationReturn<T> => {
    const pageCount = Math.ceil(items.length / pageLimit)

    const setPage = (pn: number) => onPageChange(pn)
    const nextPage = (pagesToMove: number = 1) => onPageChange(Math.min(page + pagesToMove, pageCount - 1))
    const prevPage = (pagesToMove: number = 1) => onPageChange(Math.max(page - pagesToMove, 0))

    const getPageData = () => {
        const start = page * pageLimit
        return items.slice(start, start + pageLimit)
    }

    return { pageNumber: page, pageCount, setPage, getPageData, nextPage, prevPage }
}

export default usePagination
