import type { Job } from '@app-types/jobs'

interface JobDetailBodyProps {
    job: Job
}

export const JobDetailBody = ({ job }: JobDetailBodyProps) => (
    <>
        {job.tags.length > 0 && (
            <div className="mb-6">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Skills & Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1 bg-gray-50 text-gray-600 text-sm rounded-full border border-gray-200"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        )}

        <div className="mb-8">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Job Description</h3>
            <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">{job.description}</div>
        </div>
    </>
)
