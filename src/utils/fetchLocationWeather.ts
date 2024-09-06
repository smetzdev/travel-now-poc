export const fetchLocationWeather = async (lat: number, lon: number) => {
  const apiUri = new URL('http://api.weatherapi.com/v1/current.json')
  apiUri.searchParams.append('key', import.meta.env.VITE_WEATHER_API_KEY)
  apiUri.searchParams.append('q', `${lat},${lon}`)

  const apiResponse = await fetch(apiUri.toString())
  const apiData: weatherApiResponseData = await apiResponse.json()

  return apiData.current.temp_c
}

type weatherApiResponseData = {
  current: {
    temp_c: number
  }
}
