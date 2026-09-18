import { useEffect } from 'react'
import type { Job } from '@app-types/jobs'
import { JobItem } from '@components/jobs/jobList/JobItem'
import { Pagination } from '@components/utils/Pagination'
import usePagination from '@hooks/usePagination'
import { useJobsParams } from '@hooks/useJobsParams'
import { useAppDispatch } from '@store/store'
import { setAdvancedFilters, setSearchQuery, setSort, type JobsSort } from '@store/storeSlice'
import type { DepartmentType, EmploymentType, RemoteOption, SeniorityLevel } from '@app-types/jobs'

const PAGE_SIZE_OPTIONS = [5, 10, 25, 50]

const SORT_FIELDS: { value: JobsSort['field']; label: string }[] = [
    { value: 'postedAt', label: 'Date' },
    { value: 'title', label: 'Title' },
]

interface JobListProps {
    jobs: Job[]
}

export const JobList = ({ jobs }: JobListProps) => {
    const {
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
    } = useJobsParams()
    const { pageNumber, pageCount, setPage, getPageData, nextPage, prevPage } = usePagination({
        items: jobs,
        page,
        pageLimit,
        onPageChange: (pn) => updateParams({ page: pn }),
    })
    const dispatch = useAppDispatch()

    useEffect(() => {
        updateParams({ page: 0 })
    }, [jobs])

    useEffect(() => {
        dispatch(setSort({ field: sortField, order: sortOrder }))
    }, [sortField, sortOrder])

    useEffect(() => {
        dispatch(setSearchQuery(searchQuery))
    }, [searchQuery])

    useEffect(() => {
        dispatch(
            setAdvancedFilters({
                postalCode: postalCode || undefined,
                city: city || undefined,
                radius: radius ? Number(radius) : undefined,
                employmentType: (employmentType as EmploymentType) || undefined,
                seniorityLevel: (seniorityLevel as SeniorityLevel) || undefined,
                remoteOption: (remoteOption as RemoteOption) || undefined,
                department: (department as DepartmentType) || undefined,
                postedAfter: postedAfter || undefined,
                postedBefore: postedBefore || undefined,
            })
        )
    }, [
        postalCode,
        city,
        radius,
        employmentType,
        seniorityLevel,
        remoteOption,
        department,
        postedAfter,
        postedBefore,
    ])

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
                <div className="flex items-center gap-4">
                    <p className="text-sm text-gray-500">
                        {jobs.length} {jobs.length === 1 ? 'job' : 'jobs'} found
                    </p>

                    <label className="flex items-center gap-1.5 text-sm text-gray-500">
                        Per page:
                        <select
                            value={pageLimit}
                            onChange={(e) => updateParams({ pageLimit: Number(e.target.value) })}
                            className="text-sm text-gray-600 border border-gray-300 rounded px-2 py-1.5 bg-white"
                        >
                            {PAGE_SIZE_OPTIONS.map((n) => (
                                <option key={n} value={n}>
                                    {n}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label className="flex items-center gap-1.5 text-sm text-gray-500">
                        Sort by:
                        <select
                            value={sortField}
                            onChange={(e) => updateParams({ sortField: e.target.value as JobsSort['field'] })}
                            className="text-sm text-gray-600 border border-gray-300 rounded px-2 py-1.5 bg-white"
                        >
                            {SORT_FIELDS.map(({ value, label }) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                        </select>
                        <button
                            onClick={() => updateParams({ sortOrder: sortOrder === 'asc' ? 'desc' : 'asc' })}
                            className="flex items-center justify-center w-7 h-7 border border-none rounded cursor-pointer text-gray-500 hover:bg-gray-100"
                            aria-label={sortOrder === 'asc' ? 'Switch to descending' : 'Switch to ascending'}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`w-4 h-4 transition-transform duration-200 ${sortOrder === 'asc' ? 'rotate-180' : ''}`}
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </label>
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
