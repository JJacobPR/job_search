import { useState } from 'react'
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
                            className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-dm-blue/20 whitespace-nowrap"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                            >
                                <line x1="4" y1="6" x2="20" y2="6" />
                                <line x1="8" y1="12" x2="16" y2="12" />
                                <line x1="11" y1="18" x2="13" y2="18" />
                            </svg>
                            Advanced filters
                        </button>
                    </div>
                    {showAdvanced && <AdvancedFilters />}
                </div>
            </div>
        </div>
    )
}
