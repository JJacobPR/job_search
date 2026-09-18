import { createAsyncThunk, createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Job } from '@app-types/jobs'
import type { RootState } from './store'

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

export const { setSearchQuery } = jobSlice.actions
export default jobSlice.reducer

// --- Selectors ---
const selectAllJobs = (state: RootState) => state.jobsSlice.jobs
const selectFilters = (state: RootState) => state.jobsSlice.filters

export const selectFilteredJobs = createSelector([selectAllJobs, selectFilters], (jobs, filters) => {
    return jobs.filter((job) => {
        const matchesSearch = job.title.toLowerCase().includes(filters.searchQuery.toLowerCase())

        return matchesSearch
    })
})
