import { useState } from 'react'
import type { Job } from '@app-types/jobs'
import { JobItem } from '@components/jobs/jobList/JobItem'
import { Pagination } from '@components/utils/Pagination'
import usePagination from '@hooks/usePagination'

const PAGE_SIZE_OPTIONS = [5, 10, 25, 50]

interface JobListProps {
    jobs: Job[]
}

export const JobList = ({ jobs }: JobListProps) => {
    const [pageLimit, setPageLimit] = useState(10)
    const { pageNumber, pageCount, setPage, getPageData, nextPage, prevPage } = usePagination(jobs, pageLimit)

    const renderContent = () => {
        if (jobs.length === 0) {
            return <p className="text-sm text-center text-gray-500">No jobs found</p>
        }

        return getPageData().map((job) => <JobItem key={job.id} job={job} />)
    }

    return (
        <div className="space-y-5">
            <div className="flex items-baseline justify-between gap-4 px-1 ">
                <h2 className="text-lg font-semibold text-gray-900">Open positions</h2>
                <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-500">
                        {jobs.length} {jobs.length === 1 ? 'job' : 'jobs'} found
                    </p>
                    <select
                        value={pageLimit}
                        onChange={(e) => {
                            setPageLimit(Number(e.target.value))
                            setPage(0)
                        }}
                        className="text-sm text-gray-600 border border-gray-300 rounded px-2 py-1.5 bg-white"
                        aria-label="Jobs per page"
                    >
                        {PAGE_SIZE_OPTIONS.map((n) => (
                            <option key={n} value={n}>
                                {n} per page
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="flex flex-col gap-4">{renderContent()}</div>
            <Pagination
                pageNumber={pageNumber}
                pageCount={pageCount}
                setPage={setPage}
                nextPage={nextPage}
                prevPage={prevPage}
            />
        </div>
    )
}
