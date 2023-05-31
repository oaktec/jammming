import { makeRequest } from "../spotifyService";

describe("makeRequest", () => {
  it("should return data when response is ok", async () => {
    const mockData = { name: "test" };
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(mockData),
    };
    global.fetch = jest.fn().mockResolvedValue(mockResponse);

    const result = await makeRequest("https://example.com");

    expect(result).toEqual(mockData);
    expect(fetch).toHaveBeenCalledWith("https://example.com", {
      method: "GET",
      headers: {},
      body: null,
    });
  });

  it("should throw an error when response is not ok", async () => {
    const mockResponse = { ok: false, status: 404, statusText: "Not Found" };
    global.fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(makeRequest("https://example.com")).rejects.toThrow(
      "Request failed with status 404: Not Found"
    );
  });

  it("should throw an error when fetch fails", async () => {
    const mockError = new Error("Network error");
    global.fetch = jest.fn().mockRejectedValue(mockError);

    await expect(makeRequest("https://example.com")).rejects.toThrow(
      "Network error"
    );
  });
});
