import { JobView } from '@views/JobView'
import { JobDetailView } from '@views/JobDetailView'
import { createBrowserRouter } from 'react-router'

const router = createBrowserRouter([
    {
        path: '/',
        element: <JobView />,
    },
    {
        path: '/jobs/:id',
        element: <JobDetailView />,
    },
])

export default router
