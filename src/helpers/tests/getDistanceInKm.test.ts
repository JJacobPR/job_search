// @vitest-environment node
import { describe, it, expect } from 'vitest'
import { getDistanceInKm } from '../getDistanceFromCoords'

describe('getDistanceInKm', () => {
    it('returns 0 when all coordinates are 0', () => {
        expect(getDistanceInKm(0, 0, 0, 0)).toBe(0)
    })

    it('returns 0 when both points are identical', () => {
        expect(getDistanceInKm(52.2297, 21.0122, 52.2297, 21.0122)).toBe(0)
    })

    it('calculates distance between Warsaw and London (~1450 km)', () => {
        const distance = getDistanceInKm(52.2297, 21.0122, 51.5074, -0.1278)
        expect(distance).toBeGreaterThan(1425)
        expect(distance).toBeLessThan(1475)
    })

    it('calculates distance between two points on the equator', () => {
        const distance = getDistanceInKm(0, 0, 0, 1)
        expect(distance).toBeCloseTo(111.19, 0)
    })

    it('is symmetric — distance A→B equals distance B→A', () => {
        const ab = getDistanceInKm(52.2297, 21.0122, 51.5074, -0.1278)
        const ba = getDistanceInKm(51.5074, -0.1278, 52.2297, 21.0122)
        expect(ab).toBeCloseTo(ba, 5)
    })
})
