interface CityCoords {
    lat: number
    lon: number
}

export const CITY_COORDS_MAP = new Map<string, CityCoords>([
    ['karlsruhe', { lat: 49.0069, lon: 8.4037 }],
    ['mannheim', { lat: 49.4875, lon: 8.466 }],
    ['köln', { lat: 50.9375, lon: 6.9603 }],
    ['stuttgart', { lat: 48.7758, lon: 9.1829 }],
    ['frankfurt am main', { lat: 50.1109, lon: 8.6821 }],
    ['hamburg', { lat: 53.5511, lon: 9.9937 }],
    ['berlin', { lat: 52.52, lon: 13.405 }],
    ['münchen', { lat: 48.1351, lon: 11.582 }],
    ['nürnberg', { lat: 49.4521, lon: 11.0767 }],
    ['dresden', { lat: 51.0504, lon: 13.7373 }],
    ['ettlingen', { lat: 48.9378, lon: 8.4067 }],
    ['pforzheim', { lat: 48.8922, lon: 8.6946 }],
    ['heidelberg', { lat: 49.3988, lon: 8.6724 }],
    ['freiburg im breisgau', { lat: 47.999, lon: 7.8421 }],
    ['bonn', { lat: 50.7374, lon: 7.0982 }],
])

export const getCityCoords = (city: string): CityCoords | undefined => CITY_COORDS_MAP.get(city.trim().toLowerCase())
