import { updateLocationWeathers } from '../updateLocationWeathers'
import { fetchLocationWeather } from '../fetchLocationWeather'
import { type LocationWithWeather } from '@/types/LocationWithWeather'

vi.mock('../fetchLocationWeather', () => ({
  fetchLocationWeather: vi.fn().mockResolvedValue(42)
}))

describe('updateLocationWeathers', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should update the temperatures for each location', async () => {
    const oldLocations: LocationWithWeather[] = [
      { lat: 49.235, lon: 7.01, label: 'Saarbrücken, DE', temperature: 20 },
      { lat: 40.7128, lon: -74.006, label: 'New York, US', temperature: 25 }
    ]

    const updatedLocations = await updateLocationWeathers(oldLocations)

    expect(updatedLocations).toEqual([
      { lat: 49.235, lon: 7.01, label: 'Saarbrücken, DE', temperature: 42 },
      { lat: 40.7128, lon: -74.006, label: 'New York, US', temperature: 42 }
    ])
    expect(fetchLocationWeather).toHaveBeenCalledTimes(2)
    expect(fetchLocationWeather).toHaveBeenCalledWith(49.235, 7.01)
    expect(fetchLocationWeather).toHaveBeenCalledWith(40.7128, -74.006)
  })

  it('should handle an empty locations array', async () => {
    const oldLocations: LocationWithWeather[] = []

    const updatedLocations = await updateLocationWeathers(oldLocations)

    expect(updatedLocations).toEqual([])
    expect(fetchLocationWeather).not.toHaveBeenCalled()
  })
})
