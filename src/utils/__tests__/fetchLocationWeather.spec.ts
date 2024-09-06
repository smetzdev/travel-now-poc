import { fetchLocationWeather } from '../fetchLocationWeather'
import { mockFetchWithResponse } from './testHelper'

const mockApiResponse = {
  current: {
    temp_c: 42
  }
}

beforeEach(() => {
  mockFetchWithResponse(mockApiResponse)
})

it('should fetch a city based on a search string', async () => {
  const [lat, lon] = [49.227313, 6.996115]
  const expectedUrl = `https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${lat}%2C${lon}`
  const expectedResult = mockApiResponse.current.temp_c

  const result = await fetchLocationWeather(lat, lon)

  expect(result).toEqual(expectedResult)
  expect(globalThis.fetch).toBeCalledWith(expectedUrl)
})
