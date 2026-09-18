import { createAsyncThunk, createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { DepartmentType, EmploymentType, Job, RemoteOption, SeniorityLevel } from '@app-types/jobs'
import type { RootState } from './store'
import { getDistanceInKm } from '@helpers/getDistanceFromCoords'
import { parseISO, isAfter, isBefore, startOfDay, endOfDay } from 'date-fns'

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
    lat?: number
    lon?: number
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

export interface JobsState {
    jobs: Job[]
    status: JobsStatus
    error?: string
    filters: JobsFilters
}

const initialState: JobsState = {
    jobs: [],
    status: 'idle',
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
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchJobs.pending, (state, action) => {
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

export const { setSearchQuery, setAdvancedFilters } = jobSlice.actions
export default jobSlice.reducer

// --- Selectors ---
const selectAllJobs = (state: RootState) => state.jobsSlice.jobs
const selectFilters = (state: RootState) => state.jobsSlice.filters

export const selectFilteredJobs = createSelector([selectAllJobs, selectFilters], (jobs, filters) => {
    const searchQuery = filters.searchQuery?.trim().toLowerCase() ?? ''

    const postalCode = filters.postalCode?.trim() ?? ''
    const cityFilter = filters.city?.trim().toLowerCase() ?? ''

    const hasRadiusFilter =
        typeof filters.lat === 'number' &&
        typeof filters.lon === 'number' &&
        typeof filters.radius === 'number' &&
        filters.radius > 0

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

        // 3. POSTAL CODE & CITY MATCH
        // When a valid postal code is entered the form auto-fills city, so both are set together.
        // Matching either field covers jobs that share the city but have no postal code.
        if (postalCode || cityFilter) {
            const matchesPostal = postalCode && job.location.postalCode === postalCode
            const matchesCity = cityFilter && job.location.city.toLowerCase().includes(cityFilter)
            if (!matchesPostal && !matchesCity) return false
        }

        // 4. DATE RANGE MATCH
        if (hasDateFilter) {
            const jobDate = parseISO(job.postedAt)
            if (filterAfterDate && isBefore(jobDate, filterAfterDate)) return false
            if (filterBeforeDate && isAfter(jobDate, filterBeforeDate)) return false
        }

        // 5. GEOGRAPHIC DISTANCE MATCH
        if (hasRadiusFilter) {
            const jobLat = job.location?.lat
            const jobLon = job.location?.lon

            // Exclude jobs that don't have coordinates when location filter is active
            if (typeof jobLat !== 'number' || typeof jobLon !== 'number') return false

            const distance = getDistanceInKm(jobLat, jobLon, filters.lat!, filters.lon!)
            if (distance > filters.radius!) return false
        }

        return true
    })
})
