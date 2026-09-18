import { useState, useEffect } from 'react'
import { useJobsParams } from '@hooks/useJobsParams'

const DEBOUNCE_DELAY = 300

export const TitleSearch = () => {
    const { searchQuery: searchQueryParam, updateParams } = useJobsParams()
    const [searchValue, setSearchValue] = useState(searchQueryParam)

    // Debounce writing to URL to avoid param churn while typing
    useEffect(() => {
        const timer = setTimeout(() => {
            updateParams({ searchQuery: searchValue })
        }, DEBOUNCE_DELAY)

        return () => clearTimeout(timer)
    }, [searchValue])

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
