export const mockFetchWithResponse = (response: object) => {
  globalThis.fetch = vi.fn().mockResolvedValue({
    json: () => Promise.resolve(response)
  })
}
