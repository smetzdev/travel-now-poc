import { fetchLocation } from '../fetchLocation'
import { mockFetchWithResponse } from './testHelper'

const mockApiResponse = {
  features: [
    {
      properties: {
        coordinates: {
          longitude: 6.996115,
          latitude: 49.227313
        },
        context: {
          place: {
            name: 'Saarbrücken'
          },
          country: {
            country_code: 'DE'
          }
        }
      }
    }
  ]
}

beforeEach(() => {
  mockFetchWithResponse(mockApiResponse)
})

it('should fetch a city based on a search string', async () => {
  const expectedUrl = `https://api.mapbox.com/search/geocode/v6/forward?access_token=${import.meta.env.VITE_MAPBOX_API_KEY}&q=Saarbr%C3%BCcken`
  const expectedResult = {
    lat: 49.227313,
    lon: 6.996115,
    label: 'Saarbrücken, DE'
  }

  const result = await fetchLocation('Saarbrücken')
  console.log(result)

  expect(result).toEqual(expectedResult)
  expect(globalThis.fetch).toBeCalledWith(expectedUrl)
})
