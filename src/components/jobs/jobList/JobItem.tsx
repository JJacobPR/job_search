import type { Job } from '@app-types/jobs'
import locationIcon from '@assets/location-icon.svg'

interface JobItemProps {
    job: Job
}

export const JobItem = ({ job }: JobItemProps) => {
    const postedDate = new Date(job.postedAt).toLocaleDateString('de-DE', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    })

    return (
        <div className="flex bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden border border-gray-100">
            <div className="w-1.5 bg-dm-yellow shrink-0" />
            <div className="flex-1 p-5 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                    <h3 className="text-base font-semibold text-dm-blue leading-snug sm:pr-4">{job.title}</h3>
                    <span className="text-xs text-gray-400 whitespace-nowrap">{postedDate}</span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{job.department}</p>
                <div className="flex items-center gap-1.5 text-sm text-gray-600 mb-3">
                    <img className="w-3.5 h-3.5 shrink-0" src={locationIcon} alt="" aria-hidden="true" />
                    <span className="text-sm text-gray-600">{job.location.city}</span>
                    {job.remote !== 'Vor Ort' && (
                        <>
                            <span className="text-gray-300">·</span>
                            <span className="text-emerald-600 font-medium text-xs">{job.remote}</span>
                        </>
                    )}
                </div>
                <div className="flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-0.5 bg-dm-blue/10 text-dm-blue text-xs font-medium rounded-full">
                        {job.employmentType}
                    </span>
                    {job.seniorityLevel && (
                        <span className="px-2.5 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                            {job.seniorityLevel}
                        </span>
                    )}
                    {job.tags.slice(0, 4).map((tag) => (
                        <span
                            key={tag}
                            className="px-2.5 py-0.5 bg-gray-50 text-gray-500 text-xs rounded-full border border-gray-200"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}
