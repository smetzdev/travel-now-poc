export const mockFetchWithResponse = (response: object) => {
  globalThis.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(response)
    } as Response)
  )
}
