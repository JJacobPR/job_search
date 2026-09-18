export const AdvancedFilters = () => {
    return (
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center pt-3 border-t border-gray-100">
            <input
                type="text"
                placeholder="City or postal code"
                className="w-full sm:w-52 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-dm-blue/20 focus:border-dm-blue text-gray-800 placeholder-gray-400 text-sm"
            />
            <select className="w-full sm:w-36 px-3 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-dm-blue/20 focus:border-dm-blue text-gray-600 bg-white text-sm">
                <option value="">Radius (km)</option>
                <option value="10">10 km</option>
                <option value="25">25 km</option>
                <option value="50">50 km</option>
                <option value="100">100 km</option>
            </select>
            <button
                type="button"
                className="px-6 py-3 bg-dm-blue text-white rounded-lg text-sm font-medium hover:bg-blue-900 transition-colors focus:outline-none focus:ring-2 focus:ring-dm-blue/30 focus:ring-offset-2"
            >
                Apply
            </button>
        </div>
    )
}
