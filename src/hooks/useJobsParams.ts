import { useSearchParams } from 'react-router'
import type { JobsSort } from '@store/storeSlice'

// Always present in URL — seeded by the route loader on first visit
export interface CoreJobsParams {
    page: number
    pageLimit: number
    sortField: JobsSort['field']
    sortOrder: JobsSort['order']
}

// Only present in URL when non-empty — set on filter apply, deleted on clear
export interface FilterJobsParams {
    searchQuery?: string
    postalCode?: string
    city?: string
    radius?: string
    employmentType?: string
    seniorityLevel?: string
    remoteOption?: string
    department?: string
    postedAfter?: string
    postedBefore?: string
}

export type JobsParams = CoreJobsParams & FilterJobsParams

export const JOBS_PARAMS_DEFAULTS: CoreJobsParams = {
    page: 0,
    pageLimit: 10,
    sortField: 'postedAt',
    sortOrder: 'desc',
}

/**
 * Centralized URL search-params store for the jobs list.
 * Components read values from here and call updateParams() — never setSearchParams directly.
 * updateParams() merges changes, resets page on any non-page change, and does a single push.
 * Empty string / undefined values are deleted from the URL to keep it clean.
 * Core params are seeded into the URL by the route loader before this hook ever runs.
 */
export const useJobsParams = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const page = Number(searchParams.get('page') ?? JOBS_PARAMS_DEFAULTS.page)
    const pageLimit = Number(searchParams.get('pageLimit') ?? JOBS_PARAMS_DEFAULTS.pageLimit)
    const sortField = (searchParams.get('sortField') ?? JOBS_PARAMS_DEFAULTS.sortField) as JobsSort['field']
    const sortOrder = (searchParams.get('sortOrder') ?? JOBS_PARAMS_DEFAULTS.sortOrder) as JobsSort['order']

    const searchQuery = searchParams.get('searchQuery') ?? ''
    const postalCode = searchParams.get('postalCode') ?? ''
    const city = searchParams.get('city') ?? ''
    const radius = searchParams.get('radius') ?? ''
    const employmentType = searchParams.get('employmentType') ?? ''
    const seniorityLevel = searchParams.get('seniorityLevel') ?? ''
    const remoteOption = searchParams.get('remoteOption') ?? ''
    const department = searchParams.get('department') ?? ''
    const postedAfter = searchParams.get('postedAfter') ?? ''
    const postedBefore = searchParams.get('postedBefore') ?? ''

    const updateParams = (changes: Partial<JobsParams>) => {
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev)

            for (const [key, value] of Object.entries(changes)) {
                if (value === '' || value === undefined || value === null) {
                    next.delete(key)
                } else {
                    next.set(key, String(value))
                }
            }

            // Reset page whenever the caller didn't explicitly set it
            if (!('page' in changes)) {
                next.set('page', '0')
            }

            return next
        })
    }

    return {
        page,
        pageLimit,
        sortField,
        sortOrder,
        searchQuery,
        postalCode,
        city,
        radius,
        employmentType,
        seniorityLevel,
        remoteOption,
        department,
        postedAfter,
        postedBefore,
        updateParams,
    }
}
