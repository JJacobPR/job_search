import { JobView } from '@views/JobView'
import { JobDetailView } from '@views/JobDetailView'
import { createBrowserRouter, redirect } from 'react-router'
import { JOBS_PARAMS_DEFAULTS } from '@hooks/useJobsParams'

const jobsLoader = ({ request }: { request: Request }) => {
    const url = new URL(request.url)
    const params = url.searchParams

    const missingDefaults = (Object.entries(JOBS_PARAMS_DEFAULTS) as [string, string | number][]).filter(
        ([key]) => !params.has(key),
    )

    if (missingDefaults.length > 0) {
        for (const [key, value] of missingDefaults) {
            params.set(key, String(value))
        }
        return redirect(`/?${params.toString()}`)
    }

    return null
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <JobView />,
        loader: jobsLoader,
    },
    {
        path: '/jobs/:id',
        element: <JobDetailView />,
    },
])

export default router
