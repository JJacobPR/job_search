import { useState } from 'react'
import filterIcon from '@assets/filter.svg'
import { TitleSearch } from '@components/jobs/searchBar/TitleSearch'
import { AdvancedFilters } from '@components/jobs/searchBar/AdvancedFilters'

export const SearchBar = () => {
    const [showAdvanced, setShowAdvanced] = useState(false)

    return (
        <div className="bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 sm:py-6">
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                        <TitleSearch />
                        <button
                            type="button"
                            onClick={() => setShowAdvanced((prev) => !prev)}
                            className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-dm-blue/20 whitespace-nowrap cursor-pointer"
                        >
                            <img src={filterIcon} width="16" height="16" alt="" aria-hidden="true" />
                            Advanced filters
                        </button>
                    </div>
                    {showAdvanced && <AdvancedFilters />}
                </div>
            </div>
        </div>
    )
}
