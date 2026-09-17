import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { Job } from '@app-types/jobs'

export const fetchJobs = createAsyncThunk<Job[]>('jobs/fetchAllJobs', async () => {
    const response = await fetch('/jobs.json')

    if (!response.ok) {
        throw new Error(`Failed to fetch jobs: ${response.statusText}`)
    }

    const data: Job[] = await response.json()

    return data
})

export type JobsStatus = 'idle' | 'pending' | 'succeeded' | 'failed'

export interface JobsState {
    jobs: Job[]
    status: JobsStatus
    error?: string
}

const initialState: JobsState = {
    jobs: [],
    status: 'idle',
}

export const jobSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {},
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

export default jobSlice.reducer
