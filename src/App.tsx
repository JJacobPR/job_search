import { useAppDispatch, useAppSelector } from '@store/store'
import { fetchJobs } from '@store/storeSlice'
import { useEffect } from 'react'

function App() {
    const { status, jobs } = useAppSelector((state) => state.jobsSlice)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchJobs())
        }

        console.log('Jobs:', jobs)
    }, [status])

    return (
        <>
            <p className="text-4xl font-bold underline text-tahiti">Hello World!</p>
        </>
    )
}

export default App
