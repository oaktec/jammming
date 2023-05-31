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

// import { makeRequest } from "../spotifyService";
// jest.mock("node-fetch", () => jest.fn());
// const fetch = require("node-fetch");

// describe("makeRequest", () => {
//   it("should return data when response is ok", async () => {
//     const mockResponse = {
//       ok: true,
//       json: jest.fn().mockResolvedValue("mockData"),
//     };
//     fetch.mockResolvedValue(mockResponse);

//     const data = await makeRequest("http://example.com");

//     expect(data).toBe("mockData");
//     expect(fetch).toHaveBeenCalledWith("http://example.com", {
//       method: "GET",
//       headers: {},
//       body: null,
//     });
//   });

//   it("should throw error when response is not ok", async () => {
//     const mockResponse = {
//       ok: false,
//       status: 404,
//       statusText: "Not Found",
//     };
//     fetch.mockResolvedValue(mockResponse);

//     await expect(makeRequest("http://example.com")).rejects.toThrow(
//       "Request failed with status 404: Not Found"
//     );
//     expect(fetch).toHaveBeenCalledWith("http://example.com", {
//       method: "GET",
//       headers: {},
//       body: null,
//     });
//   });

//   it("should throw error when request fails", async () => {
//     global.fetch.mockRejectedValue(new Error("Network error"));

//     await expect(makeRequest("http://example.com")).rejects.toThrow(
//       "Network error"
//     );
//     expect(fetch).toHaveBeenCalledWith("http://example.com", {
//       method: "GET",
//       headers: {},
//       body: null,
//     });
//   });

//   it("should handle different method, headers, and body", async () => {
//     const mockResponse = {
//       ok: true,
//       json: jest.fn().mockResolvedValue("mockData"),
//     };
//     fetch.mockResolvedValue(mockResponse);

//     const data = await makeRequest(
//       "http://example.com",
//       "POST",
//       { "Content-Type": "application/json" },
//       JSON.stringify({ key: "value" })
//     );

//     expect(data).toBe("mockData");
//     expect(fetch).toHaveBeenCalledWith("http://example.com", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ key: "value" }),
//     });
//   });
// });
