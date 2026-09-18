import { useState, useEffect } from 'react'
import { useAppDispatch } from '@store/store'
import { setSearchQuery } from '@store/storeSlice'

const DEBOUNCE_DELAY = 300

export const TitleSearch = () => {
    const dispatch = useAppDispatch()
    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(setSearchQuery(searchValue))
        }, DEBOUNCE_DELAY)

        return () => clearTimeout(timer)
    }, [searchValue, dispatch])

    return (
        <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search by job title..."
            className="flex-1 min-w-0 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-dm-blue/20 focus:border-dm-blue text-gray-800 placeholder-gray-400 text-sm"
        />
    )
}
