// Helper function to convert degrees to radians
function deg2rad(deg: number): number {
    return deg * (Math.PI / 180)
}

/**
 * Calculates the great-circle distance between two geographic coordinates on Earth
 * using the Haversine formula.
 *
 * @param lat1 - Latitude of the starting point in decimal degrees.
 * @param lon1 - Longitude of the starting point in decimal degrees.
 * @param lat2 - Latitude of the target point in decimal degrees.
 * @param lon2 - Longitude of the target point in decimal degrees.
 * @returns The straight-line distance over the Earth's surface in kilometers.
 *
 * @example
 * // Distance between Warsaw (52.2297, 21.0122) and London (51.5074, -0.1278)
 * const distance = getDistanceInKm(52.2297, 21.0122, 51.5074, -0.1278);
 */
export function getDistanceInKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const earthRadiusKm = 6371

    const dLat = deg2rad(lat2 - lat1)
    const dLon = deg2rad(lon2 - lon1)

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    return earthRadiusKm * c
}
