// @vitest-environment node
import { describe, it, expect, vi } from 'vitest'
import usePagination from '../usePagination'

const items = Array.from({ length: 25 }, (_, i) => i)

describe('usePagination', () => {
    describe('pageCount', () => {
        it('calculates pageCount correctly for evenly divisible items', () => {
            const { pageCount } = usePagination({
                items: Array.from({ length: 20 }),
                page: 0,
                pageLimit: 5,
                onPageChange: vi.fn(),
            })
            expect(pageCount).toBe(4)
        })

        it('rounds up pageCount when items do not divide evenly', () => {
            const { pageCount } = usePagination({ items, page: 0, pageLimit: 10, onPageChange: vi.fn() })
            expect(pageCount).toBe(3)
        })

        it('returns pageCount of 1 for items under pageLimit', () => {
            const { pageCount } = usePagination({ items: [1, 2, 3], page: 0, pageLimit: 10, onPageChange: vi.fn() })
            expect(pageCount).toBe(1)
        })
    })

    describe('nextPage', () => {
        it('advances page by 1 by default', () => {
            const onPageChange = vi.fn()
            const { nextPage } = usePagination({ items, page: 0, pageLimit: 10, onPageChange })
            nextPage()
            expect(onPageChange).toHaveBeenCalledWith(1)
        })

        it('advances page by a custom step', () => {
            const onPageChange = vi.fn()
            const { nextPage } = usePagination({ items, page: 0, pageLimit: 10, onPageChange })
            nextPage(2)
            expect(onPageChange).toHaveBeenCalledWith(2)
        })

        it('clamps to last page when stepping past upper boundary', () => {
            const onPageChange = vi.fn()
            const { nextPage, pageCount } = usePagination({ items, page: 1, pageLimit: 10, onPageChange })
            nextPage(99)
            expect(onPageChange).toHaveBeenCalledWith(pageCount - 1)
        })

        it('cannot advance when only 1 page exists', () => {
            const onPageChange = vi.fn()
            const { nextPage } = usePagination({ items: [1], page: 0, pageLimit: 10, onPageChange })
            nextPage()
            expect(onPageChange).toHaveBeenCalledWith(0)
        })
    })

    describe('prevPage', () => {
        it('goes back by 1 by default', () => {
            const onPageChange = vi.fn()
            const { prevPage } = usePagination({ items, page: 2, pageLimit: 10, onPageChange })
            prevPage()
            expect(onPageChange).toHaveBeenCalledWith(1)
        })

        it('goes back by a custom step', () => {
            const onPageChange = vi.fn()
            const { prevPage } = usePagination({ items, page: 2, pageLimit: 10, onPageChange })
            prevPage(2)
            expect(onPageChange).toHaveBeenCalledWith(0)
        })

        it('clamps to 0 when stepping past lower boundary', () => {
            const onPageChange = vi.fn()
            const { prevPage } = usePagination({ items, page: 1, pageLimit: 10, onPageChange })
            prevPage(99)
            expect(onPageChange).toHaveBeenCalledWith(0)
        })
    })

    describe('getPageData', () => {
        it('returns correct slice for first page', () => {
            const { getPageData } = usePagination({ items, page: 0, pageLimit: 10, onPageChange: vi.fn() })
            expect(getPageData()).toEqual(items.slice(0, 10))
        })

        it('returns correct slice for middle page', () => {
            const { getPageData } = usePagination({ items, page: 1, pageLimit: 10, onPageChange: vi.fn() })
            expect(getPageData()).toEqual(items.slice(10, 20))
        })

        it('returns remaining items on last page', () => {
            const { getPageData } = usePagination({ items, page: 2, pageLimit: 10, onPageChange: vi.fn() })
            expect(getPageData()).toEqual(items.slice(20, 25))
        })
    })
})
