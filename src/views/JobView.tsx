import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@store/store'
import { fetchJobs, selectSortedJobs } from '@store/storeSlice'
import { SearchBar } from '@components/jobs/searchBar/SearchBar'
import { JobList } from '@components/jobs/jobList/JobList'
import { Spinner } from '@components/utils/Spinner'
export const JobView = () => {
    const { status } = useAppSelector((state) => state.jobsSlice)
    const jobs = useAppSelector(selectSortedJobs)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchJobs())
        }
    }, [status, dispatch])

    const renderContent = () => {
        if (status === 'failed') {
            return <div className="text-center py-20 text-dm-red">Failed to load jobs. Please try again.</div>
        }
        if (status === 'pending' || status === 'idle') {
            return (
                <div className="flex justify-center items-center py-20">
                    <Spinner size="big" text="Loading jobs..." />
                </div>
            )
        }
        return <JobList jobs={jobs} />
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-dm-blue text-white">
                <div className="max-w-6xl mx-auto px-6 py-5 flex items-center gap-4">
                    <div className="w-10 h-10 bg-dm-yellow rounded-lg flex items-center justify-center shrink-0">
                        <span className="font-black text-dm-blue text-sm leading-none">dm</span>
                    </div>
                    <div>
                        <h1 className="text-xl font-bold tracking-tight">dmTECH Jobs</h1>
                        <p className="text-blue-200 text-xs mt-0.5">Find your next role at dm drogerie markt</p>
                    </div>
                </div>
            </header>
            <SearchBar />
            <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">{renderContent()}</main>
        </div>
    )
}
