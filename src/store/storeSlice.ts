import { createAsyncThunk, createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { DepartmentType, EmploymentType, Job, RemoteOption, SeniorityLevel } from '@app-types/jobs'
import type { RootState } from './store'
import { getDistanceInKm } from '@helpers/getDistanceFromCoords'
import { getCityCoords } from '@helpers/cityCoordsMap'
import { parseISO, isAfter, isBefore, startOfDay, endOfDay, compareAsc, compareDesc } from 'date-fns'

export const fetchJobs = createAsyncThunk<Job[]>('jobs/fetchAllJobs', async () => {
    const response = await fetch('/jobs.json')

    if (!response.ok) {
        throw new Error(`Failed to fetch jobs: ${response.statusText}`)
    }

    const data: { jobs: Job[] } = await response.json()

    return data.jobs
})

export type JobsStatus = 'idle' | 'pending' | 'succeeded' | 'failed'

export interface JobsFilters {
    searchQuery: string
    radius?: number
    city?: string
    postalCode?: string
    employmentType?: EmploymentType
    seniorityLevel?: SeniorityLevel
    remoteOption?: RemoteOption
    department?: DepartmentType
    postedBefore?: string
    postedAfter?: string
}

export interface JobsSort {
    field: 'postedAt' | 'title'
    order: 'asc' | 'desc'
}

export interface JobsState {
    jobs: Job[]
    status: JobsStatus
    error?: string
    sort: JobsSort
    filters: JobsFilters
}

const initialState: JobsState = {
    jobs: [],
    status: 'idle',
    sort: { field: 'postedAt', order: 'desc' },
    filters: {
        searchQuery: '',
    },
}

export const jobSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.filters.searchQuery = action.payload
        },
        setAdvancedFilters: (state, action: PayloadAction<Partial<JobsFilters>>) => {
            state.filters = { ...state.filters, ...action.payload }
        },
        setSort: (state, action: PayloadAction<JobsSort>) => {
            state.sort = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchJobs.pending, (state, _action) => {
                state.status = 'pending'
                state.error = undefined
            })
            .addCase(fetchJobs.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.jobs = action.payload
            })
            .addCase(fetchJobs.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message ?? 'Unknown Error'
            })
    },
})

export const { setSearchQuery, setAdvancedFilters, setSort } = jobSlice.actions
export default jobSlice.reducer

// --- Selectors ---
const selectAllJobs = (state: RootState) => state.jobsSlice.jobs
const selectFilters = (state: RootState) => state.jobsSlice.filters
const selectSort = (state: RootState) => state.jobsSlice.sort

export const selectFilteredJobs = createSelector([selectAllJobs, selectFilters], (jobs, filters) => {
    const searchQuery = filters.searchQuery?.trim().toLowerCase() ?? ''

    const postalCode = filters.postalCode?.trim() ?? ''
    const cityFilter = filters.city?.trim().toLowerCase() ?? ''
    const hasRadius = typeof filters.radius === 'number' && filters.radius > 0
    const hasLocationInput = !!cityFilter || !!postalCode
    const searchCoords = cityFilter && hasRadius ? getCityCoords(cityFilter) : undefined

    const hasDateFilter = !!(filters.postedAfter || filters.postedBefore)
    const filterAfterDate = filters.postedAfter ? startOfDay(parseISO(filters.postedAfter)) : null
    const filterBeforeDate = filters.postedBefore ? endOfDay(parseISO(filters.postedBefore)) : null

    return jobs.filter((job) => {
        // 1. EXACT MATCHES
        if (filters.employmentType && job.employmentType !== filters.employmentType) return false
        if (filters.seniorityLevel && job.seniorityLevel !== filters.seniorityLevel) return false
        if (filters.remoteOption && job.remote !== filters.remoteOption) return false
        if (filters.department && job.department !== filters.department) return false

        // 2. SEARCH QUERY MATCH
        if (searchQuery && !job.title.toLowerCase().includes(searchQuery)) return false

        // 3. LOCATION FILTER
        if (hasLocationInput) {
            if (cityFilter && hasRadius) {
                // Geocoded radius: city coords as search origin, job coords with city fallback
                if (!searchCoords) return false

                const jobCoords =
                    typeof job.location.lat === 'number' && typeof job.location.lon === 'number'
                        ? { lat: job.location.lat, lon: job.location.lon }
                        : getCityCoords(job.location.city)

                if (!jobCoords) return false

                const distance = getDistanceInKm(jobCoords.lat, jobCoords.lon, searchCoords.lat, searchCoords.lon)
                if (distance > filters.radius!) return false
            } else {
                // Plain match: exact postal code or city name substring
                const matchesPostal = !!postalCode && job.location.postalCode === postalCode
                const matchesCity = !!cityFilter && job.location.city.toLowerCase().includes(cityFilter)
                if (!matchesPostal && !matchesCity) return false
            }
        }

        // 4. DATE RANGE MATCH
        if (hasDateFilter) {
            const jobDate = parseISO(job.postedAt)
            if (filterAfterDate && isBefore(jobDate, filterAfterDate)) return false
            if (filterBeforeDate && isAfter(jobDate, filterBeforeDate)) return false
        }

        return true
    })
})

export const selectSortedJobs = createSelector([selectFilteredJobs, selectSort], (filteredJobs, sort) => {
    const jobsToSort = [...filteredJobs]

    return jobsToSort.sort((a, b) => {
        switch (sort.field) {
            case 'postedAt':
                return sort.order === 'asc'
                    ? compareAsc(parseISO(a.postedAt), parseISO(b.postedAt))
                    : compareDesc(parseISO(a.postedAt), parseISO(b.postedAt))
            case 'title':
                return sort.order === 'asc'
                    ? a.title.localeCompare(b.title)
                    : b.title.localeCompare(a.title)
            default:
                return 0
        }
    })
})
