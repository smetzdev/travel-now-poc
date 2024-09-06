import { fetchLocation } from '../fetchLocation'
import { mockFetchWithResponse } from './testHelper'

const mockApiResponse = {
  features: [
    {
      geometry: {
        coordinates: [
          6.996115, // lon
          49.227313 // lat
        ]
      }
    }
  ]
}

beforeEach(() => {
  mockFetchWithResponse(mockApiResponse)
})

it('should fetch a city based on a search string', async () => {
  const [expectedLon, expectedLat] = mockApiResponse.features[0].geometry.coordinates
  const expectedUrl = `https://api.mapbox.com/search/geocode/v6/forward?access_token=${import.meta.env.VITE_GEOCODE_API_KEY}&q=Saarbr%C3%BCcken`
  const expectedResult = {
    lat: expectedLat,
    lon: expectedLon
  }

  const result = await fetchLocation('Saarbrücken')
  console.log(result)

  expect(result).toEqual(expectedResult)
  expect(globalThis.fetch).toBeCalledWith(expectedUrl)
})
