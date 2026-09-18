// @vitest-environment node
// renderHook is intentionally omitted — useJobsParams is supposed stateless (all state lives in URL search params),
// in the future renderHook may be needed if we want to test the hook's behavior with React Router's <MemoryRouter> and <Routes> in a more integrated way.
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useSearchParams } from 'react-router'
import { useJobsParams, JOBS_PARAMS_DEFAULTS } from '../useJobsParams'

vi.mock('react-router', () => ({ useSearchParams: vi.fn() }))

const mockUseSearchParams = vi.mocked(useSearchParams)

const makeSearchParams = (init: Record<string, string> = {}) => new URLSearchParams(init)

const setupHook = (initialParams: Record<string, string> = {}) => {
    const setSearchParams = vi.fn()
    const searchParams = makeSearchParams(initialParams)

    mockUseSearchParams.mockReturnValue([searchParams, setSearchParams] as unknown as ReturnType<
        typeof useSearchParams
    >)

    const hookResult = useJobsParams()

    const runUpdate = (changes: Parameters<typeof hookResult.updateParams>[0]) => {
        hookResult.updateParams(changes)
        const callback = setSearchParams.mock.calls[0][0] as (prev: URLSearchParams) => URLSearchParams
        return callback(searchParams)
    }

    return { ...hookResult, runUpdate }
}

describe('useJobsParams', () => {
    beforeEach(() => vi.clearAllMocks())

    describe('Getters & Defaults', () => {
        it('returns default values when search params are empty', () => {
            const hook = setupHook({})

            expect(hook.page).toBe(JOBS_PARAMS_DEFAULTS.page)
            expect(hook.pageLimit).toBe(JOBS_PARAMS_DEFAULTS.pageLimit)
            expect(hook.sortField).toBe(JOBS_PARAMS_DEFAULTS.sortField)
            expect(hook.sortOrder).toBe(JOBS_PARAMS_DEFAULTS.sortOrder)
            expect(hook.searchQuery).toBe('')
            expect(hook.city).toBe('')
        })

        it('parses existing search params correctly', () => {
            const hook = setupHook({
                page: '3',
                pageLimit: '25',
                sortField: 'title',
                sortOrder: 'asc',
                city: 'Warsaw',
                searchQuery: 'Developer',
            })

            expect(hook.page).toBe(3)
            expect(hook.pageLimit).toBe(25)
            expect(hook.sortField).toBe('title')
            expect(hook.sortOrder).toBe('asc')
            expect(hook.city).toBe('Warsaw')
            expect(hook.searchQuery).toBe('Developer')
        })
    })

    describe('updateParams', () => {
        it('sets new values in URL search params', () => {
            const { runUpdate } = setupHook()
            const result = runUpdate({ searchQuery: 'engineer', city: 'Kraków' })

            expect(result.get('searchQuery')).toBe('engineer')
            expect(result.get('city')).toBe('Kraków')
        })

        it('deletes keys when value is empty string, undefined, or null', () => {
            const { runUpdate } = setupHook({ city: 'Warsaw', postalCode: '00-001', radius: '10' })
            const result = runUpdate({ city: '', postalCode: undefined, radius: null as unknown as string })

            expect(result.has('city')).toBe(false)
            expect(result.has('postalCode')).toBe(false)
            expect(result.has('radius')).toBe(false)
        })

        it('resets page to 0 when non-page parameters are updated', () => {
            const { runUpdate } = setupHook({ page: '4' })
            const result = runUpdate({ searchQuery: 'React' })

            expect(result.get('page')).toBe('0')
        })

        it('preserves explicitly provided page value during updates', () => {
            const { runUpdate } = setupHook({ page: '1' })
            const result = runUpdate({ searchQuery: 'React', page: 2 })

            expect(result.get('page')).toBe('2')
        })

        it('preserves unrelated search params when applying partial changes', () => {
            const { runUpdate } = setupHook({ sortField: 'postedAt', sortOrder: 'desc', department: 'IT' })
            const result = runUpdate({ searchQuery: 'Manager' })

            expect(result.get('sortField')).toBe('postedAt')
            expect(result.get('sortOrder')).toBe('desc')
            expect(result.get('department')).toBe('IT')
        })
    })
})
