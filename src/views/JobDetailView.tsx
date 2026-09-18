import { useNavigate, useParams } from 'react-router'
import { useAppDispatch, useAppSelector } from '@store/store'
import { fetchJobs } from '@store/storeSlice'
import { useEffect } from 'react'
import { Spinner } from '@components/utils/Spinner'
import { JobDetailHeader } from '@components/jobs/jobDetail/JobDetailHeader'
import { JobDetailBody } from '@components/jobs/jobDetail/JobDetailBody'
import { JobDetailActions } from '@components/jobs/jobDetail/JobDetailActions'
import chevronLeft from '@assets/chevron-left-white.svg'

export const JobDetailView = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { jobs, status } = useAppSelector((state) => state.jobsSlice)

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchJobs())
        }
    }, [status, dispatch])

    const job = jobs.find((j) => j.id === id)

    if (status === 'pending' || status === 'idle') {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <PageHeader onBack={() => navigate('/')} />
                <div className="flex justify-center items-center flex-1 py-20">
                    <Spinner size="big" text="Loading job..." />
                </div>
            </div>
        )
    }

    if (status === 'failed') {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <PageHeader onBack={() => navigate('/')} />
                <div className="text-center py-20 text-red-600">Failed to load jobs. Please try again.</div>
            </div>
        )
    }

    if (!job) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <PageHeader onBack={() => navigate('/')} />
                <div className="text-center py-20 text-gray-500">Job not found.</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <PageHeader onBack={() => navigate('/')} />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="w-full h-1.5 bg-dm-yellow" />

                    <div className="p-6 sm:p-8">
                        <JobDetailHeader job={job} />
                        <JobDetailBody job={job} />
                        <JobDetailActions />
                    </div>
                </div>
            </main>
        </div>
    )
}

interface PageHeaderProps {
    onBack: () => void
}

const PageHeader = ({ onBack }: PageHeaderProps) => (
    <header className="bg-dm-blue text-white">
        <div className="max-w-4xl mx-auto px-6 py-5 flex items-center gap-4">
            <button
                onClick={onBack}
                className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-white/10 transition-colors shrink-0"
                aria-label="Back to job list"
            >
                <img className="w-4 h-4" src={chevronLeft} alt="" aria-hidden="true" />
            </button>
            <div className="w-10 h-10 bg-dm-yellow rounded-lg flex items-center justify-center shrink-0">
                <span className="font-black text-dm-blue text-sm leading-none">dm</span>
            </div>
            <div>
                <h1 className="text-xl font-bold tracking-tight">dmTECH Jobs</h1>
                <p className="text-blue-200 text-xs mt-0.5">Find your next role at dm drogerie markt</p>
            </div>
        </div>
    </header>
)
