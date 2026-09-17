import { useState } from 'react'

const usePagination = <T>(items: T[], pageLimit: number) => {
    const [pageNumber, setPageNumber] = useState(0)

    const pageCount = Math.ceil(items.length / pageLimit)

    const setPage = (pn: number) => {
        setPageNumber(pn)
    }

    const nextPage = (pagesToMove: number = 1) => {
        setPageNumber(Math.min(pageNumber + pagesToMove, pageCount - 1))
    }

    const prevPage = (pagesToMove: number = 1) => {
        setPageNumber(Math.max(pageNumber - pagesToMove, 0))
    }

    const getPageData = () => {
        const start = pageNumber * pageLimit
        const end = start + pageLimit
        return items.slice(start, end)
    }

    return { pageNumber, pageCount, setPage, getPageData, nextPage, prevPage }
}

export default usePagination
