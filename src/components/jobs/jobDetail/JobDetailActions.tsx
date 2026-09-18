import { useState } from 'react'

export const JobDetailActions = () => {
    const [bookmarked, setBookmarked] = useState(false)

    return (
        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-100">
            <button
                onClick={() => alert('Application submitted! (dummy action)')}
                className="flex-1 sm:flex-none px-8 py-3 bg-dm-blue text-white font-semibold rounded-lg hover:bg-dm-blue/90 transition-colors cursor-pointer"
            >
                Apply Now
            </button>
            <button
                onClick={() => setBookmarked((prev) => !prev)}
                className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg border font-medium text-sm transition-colors cursor-pointer ${
                    bookmarked
                        ? 'border-dm-yellow bg-dm-yellow/10 text-dm-blue'
                        : 'border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-800'
                }`}
            >
                <BookmarkIcon filled={bookmarked} />
                {bookmarked ? 'Saved' : 'Save Job'}
            </button>
        </div>
    )
}

interface BookmarkIconProps {
    filled: boolean
}

const BookmarkIcon = ({ filled }: BookmarkIconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={2}
        className="w-4 h-4"
        aria-hidden="true"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
        />
    </svg>
)
