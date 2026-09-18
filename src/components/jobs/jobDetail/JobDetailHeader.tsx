import type { Job } from '@app-types/jobs'
import locationIcon from '@assets/location-icon.svg'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'

interface JobDetailHeaderProps {
    job: Job
}

export const JobDetailHeader = ({ job }: JobDetailHeaderProps) => {
    const postedDate = format(new Date(job.postedAt), 'dd. MMMM yyyy', { locale: de })

    return (
        <>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-1">
                <h2 className="text-2xl font-bold text-dm-blue leading-snug">{job.title}</h2>
                <span className="text-sm text-gray-400 whitespace-nowrap pt-1">Posted {postedDate}</span>
            </div>

            <p className="text-base text-gray-500 mb-6">{job.department}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                <div>
                    <span className="text-xs text-gray-400 block mb-1">Location</span>
                    <div className="text-sm text-gray-700 font-medium flex items-center gap-1">
                        <div className="flex items-center gap-1.5">
                            <img className="w-3.5 h-3.5 shrink-0" src={locationIcon} alt="" aria-hidden="true" />
                            <span>
                                {job.location.city}
                                {job.location.postalCode && (
                                    <span className="text-gray-400 ml-1">{job.location.postalCode}</span>
                                )}
                            </span>
                        </div>
                    </div>
                </div>

                <div>
                    <span className="text-xs text-gray-400 block mb-1">Employment Type</span>
                    <div className="text-sm text-gray-700 font-medium flex items-center gap-1">
                        <span className="px-2.5 py-0.5 bg-dm-blue/10 text-dm-blue text-xs font-medium rounded-full">
                            {job.employmentType}
                        </span>
                    </div>
                </div>

                <div>
                    <span className="text-xs text-gray-400 block mb-1">Work Mode</span>
                    <div className="text-sm text-gray-700 font-medium flex items-center gap-1">
                        <span
                            className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${
                                job.remote === 'Vor Ort'
                                    ? 'bg-gray-100 text-gray-600'
                                    : 'bg-emerald-50 text-emerald-700'
                            }`}
                        >
                            {job.remote}
                        </span>
                    </div>
                </div>

                {job.seniorityLevel && (
                    <div>
                        <span className="text-xs text-gray-400 block mb-1">Seniority</span>
                        <div className="text-sm text-gray-700 font-medium flex items-center gap-1">
                            <span className="px-2.5 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                                {job.seniorityLevel}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
