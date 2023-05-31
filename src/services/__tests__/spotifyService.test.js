import originalSpotify, { makeRequest } from "../spotifyService";

console.error = jest.fn();

describe("Spotify", () => {
  let Spotify;

  beforeEach(() => {
    Spotify = { ...originalSpotify };
  });

  describe("makeRequest", () => {
    it("should return data when response is ok", async () => {
      const mockData = { name: "test" };
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue(mockData),
      };
      global.fetch = jest.fn().mockResolvedValue(mockResponse);

      const result = await Spotify.makeRequest("https://example.com");

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

      await expect(Spotify.makeRequest("https://example.com")).rejects.toThrow(
        "Request failed with status 404: Not Found"
      );
    });

    it("should throw an error when fetch fails", async () => {
      const mockError = new Error("Network error");
      global.fetch = jest.fn().mockRejectedValue(mockError);

      await expect(Spotify.makeRequest("https://example.com")).rejects.toThrow(
        "Network error"
      );
    });
  });

  describe("handleURLParams", () => {
    let originalLocation = window.location;

    beforeAll(() => {
      delete window.location;
    });

    beforeEach(() => {
      Spotify.onLoginCallback = jest.fn();
      window.location = {
        href: "https://example.com?access_token=test-token&expires_in=60",
      };
    });

    afterAll(() => {
      window.location = originalLocation;
    });

    it("should parse access token and expiration time from url", () => {
      Spotify.handleURLParams();

      expect(Spotify._accessToken).toEqual("test-token");
      expect(Spotify._tokenExpirationTime).toBeGreaterThan(Date.now());
      expect(Spotify.onLoginCallback).toHaveBeenCalledTimes(1);
    });

    it("should not modify tokens if token is missing", () => {
      window.location.href = "https://example.com?expires_in=60";
      Spotify.handleURLParams();

      expect(Spotify._accessToken).toBeNull();
      expect(Spotify._tokenExpirationTime).toBeNull();
      expect(Spotify.onLoginCallback).not.toHaveBeenCalled();
    });

    it("should not modify tokens if expiration time is missing", () => {
      window.location.href = "https://example.com?access_token=test-token";
      Spotify.handleURLParams();

      expect(Spotify._accessToken).toBeNull();
      expect(Spotify._tokenExpirationTime).toBeNull();
      expect(Spotify.onLoginCallback).not.toHaveBeenCalled();
    });
  });

  describe("login", () => {
    it("redirects to spotify login page", () => {
      const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
      const redirectUri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;
      const scopes = "playlist-modify-private";
      const expectedUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=${encodeURIComponent(
        scopes
      )}&redirect_uri=${encodeURIComponent(redirectUri)}`;

      Spotify.login();

      expect(window.location).toEqual(expectedUrl);
    });
  });

  describe("isLoggedIn", () => {
    it("should return true if access token is set", async () => {
      Spotify._accessToken = "test-token";

      const result = await Spotify.isLoggedIn();

      expect(result).toEqual(true);
    });

    it("should return false if access token is not set", async () => {
      Spotify._accessToken = null;

      const result = await Spotify.isLoggedIn();

      expect(result).toEqual(false);
    });
  });

  describe("ensureLoginToken", () => {
    it("should return early if it is set and has not expired", () => {
      Spotify._accessToken = "test-token";
      Spotify._tokenExpirationTime = Date.now() + 1000;
      Spotify.login = jest.fn();

      Spotify.ensureLoginToken();

      expect(Spotify.login).not.toHaveBeenCalled();
    });

    it("should call login if token is not set", () => {
      Spotify._accessToken = null;
      Spotify._tokenExpirationTime = Date.now() + 1000;
      Spotify.login = jest.fn();

      Spotify.ensureLoginToken();

      expect(Spotify.login).toHaveBeenCalledTimes(1);
    });

    it("should call login if token has expired", () => {
      Spotify._accessToken = "test-token";
      Spotify._tokenExpirationTime = Date.now() - 1000;
      Spotify.login = jest.fn();

      Spotify.ensureLoginToken();

      expect(Spotify.login).toHaveBeenCalledTimes(1);
    });
  });

  describe("ensureUserId", () => {
    beforeEach(() => {
      Spotify.ensureLoginToken = jest.fn();
    });

    it("should return early if userId is set", async () => {
      Spotify._userId = "test-user-id";
      Spotify.makeRequest = jest.fn().mockResolvedValue({ id: "test-user-id" });

      await Spotify.ensureUserId();

      expect(Spotify.makeRequest).not.toHaveBeenCalled();
    });

    it("should call makeRequest and set userId", async () => {
      Spotify.makeRequest = jest.fn().mockResolvedValue({ id: "test-user-id" });

      await Spotify.ensureUserId();

      expect(Spotify.makeRequest).toHaveBeenCalledTimes(1);
      expect(Spotify._userId).toEqual("test-user-id");
    });

    it("should throw an error if makeRequest fails", async () => {
      Spotify.makeRequest = jest.fn().mockRejectedValue(new Error("Test"));

      await expect(Spotify.ensureUserId()).rejects.toThrow("Test");
    });

    it("should throw an error if makeRequest returns an empty object", async () => {
      Spotify.makeRequest = jest.fn().mockResolvedValue({});

      await expect(Spotify.ensureUserId()).rejects.toThrow(
        "Response did not contain a user ID!"
      );
    });
  });

  describe("init", () => {
    beforeEach(() => {
      Spotify.handleURLParams = jest.fn();
    });

    it("should call handleURLParams", () => {
      Spotify.init();

      expect(Spotify.handleURLParams).toHaveBeenCalledTimes(1);
    });

    it("should set onLoginCallback", () => {
      const callback = () => {};
      Spotify.init(callback);

      expect(Spotify.onLoginCallback).toEqual(callback);
    });
  });

  describe("search", () => {
    beforeEach(() => {
      Spotify.ensureLoginToken = jest.fn();
      Spotify._accessToken = "test-token";
    });

    it("should call makeRequest with correct parameters", async () => {
      Spotify.makeRequest = jest
        .fn()
        .mockResolvedValue({ tracks: { items: [] } });

      await Spotify.search("test");

      expect(Spotify.makeRequest).toHaveBeenCalledWith(
        "https://api.spotify.com/v1/search?type=track&q=test",
        "GET",
        { Authorization: "Bearer test-token" }
      );
    });

    it("should return parsed tracks", async () => {
      const mockResponse = {
        tracks: {
          items: [
            {
              id: "1",
              name: "Track 1",
              artists: [{ name: "Artist 1" }],
              album: { name: "Album 1" },
              uri: "spotify:track:1",
            },
            {
              id: "2",
              name: "Track 2",
              artists: [{ name: "Artist 2" }],
              album: { name: "Album 2" },
              uri: "spotify:track:2",
            },
          ],
        },
      };
      Spotify.makeRequest = jest.fn().mockResolvedValue(mockResponse);

      const tracks = await Spotify.search("test");

      expect(tracks).toEqual([
        {
          id: "1",
          name: "Track 1",
          artist: "Artist 1",
          album: "Album 1",
          uri: "spotify:track:1",
        },
        {
          id: "2",
          name: "Track 2",
          artist: "Artist 2",
          album: "Album 2",
          uri: "spotify:track:2",
        },
      ]);
    });

    it("should return an empty array if no tracks are found", async () => {
      const mockResponse = {
        tracks: {
          items: [],
        },
      };
      Spotify.makeRequest = jest.fn().mockResolvedValue(mockResponse);

      const tracks = await Spotify.search("test");

      expect(tracks).toEqual([]);
    });

    it("should throw an error if makeRequest fails", async () => {
      Spotify.makeRequest = jest.fn().mockRejectedValue(new Error("Test"));

      await expect(Spotify.search("test")).rejects.toThrow("Test");
    });

    it("should throw an error if makeRequest returns an empty object", async () => {
      Spotify.makeRequest = jest.fn().mockResolvedValue({});

      await expect(Spotify.search("test")).rejects.toThrow(
        "Response did not contain any tracks!"
      );
    });

    it("should throw an error if makeRequest returns an object without tracks", async () => {
      Spotify.makeRequest = jest.fn().mockResolvedValue({ albums: [] });

      await expect(Spotify.search("test")).rejects.toThrow(
        "Response did not contain any tracks!"
      );
    });
  });

  describe("createPlaylist", () => {
    beforeEach(() => {
      Spotify.ensureUserId = jest.fn();
      Spotify._userId = "test-user-id";
      Spotify._accessToken = "test-token";
      Spotify.addTracksToPlaylist = jest.fn();
    });

    it("should create a playlist and add tracks to it", async () => {
      const mockResponse = { id: "test-playlist-id" };
      Spotify.makeRequest = jest.fn().mockResolvedValue(mockResponse);

      const playlistName = "test-playlist-name";
      const tracks = [{ uri: "spotify:track:1" }, { uri: "spotify:track:2" }];

      await Spotify.createPlaylist(playlistName, tracks);

      expect(Spotify.ensureUserId).toHaveBeenCalledTimes(1);
      expect(Spotify.makeRequest).toHaveBeenCalledWith(
        `https://api.spotify.com/v1/users/test-user-id/playlists`,
        "POST",
        {
          Authorization: "Bearer test-token",
          "Content-Type": "application/json",
        },
        JSON.stringify({
          name: playlistName,
          description: "Playlist created with Jammming",
          public: false,
        })
      );

      expect(Spotify.addTracksToPlaylist).toHaveBeenCalledWith(
        "test-playlist-id",
        tracks
      );
    });

    it("should throw an error if makeRequest fails", async () => {
      Spotify.makeRequest = jest.fn().mockRejectedValue(new Error("Test"));

      await expect(
        Spotify.createPlaylist("test-playlist-name", [])
      ).rejects.toThrow("Test");
    });

    it("should throw an error if ensureUserId fails", async () => {
      Spotify.ensureUserId = jest.fn().mockRejectedValue(new Error("Test"));

      await expect(
        Spotify.createPlaylist("test-playlist-name", [])
      ).rejects.toThrow("Test");
    });

    it("should throw an error if addTracksToPlaylist fails", async () => {
      Spotify.makeRequest = jest.fn().mockResolvedValue({ id: "test-id" });
      Spotify.addTracksToPlaylist = jest
        .fn()
        .mockRejectedValue(new Error("Test"));

      await expect(
        Spotify.createPlaylist("test-playlist-name", [])
      ).rejects.toThrow("Test");
    });

    it("should throw an error if makeRequest returns an object without id", async () => {
      Spotify.makeRequest = jest.fn().mockResolvedValue({ name: "test" });

      await expect(
        Spotify.createPlaylist("test-playlist-name", [])
      ).rejects.toThrow("Response did not contain a playlist ID!");
    });
  });

  describe("addTracksToPlaylist", () => {
    beforeEach(() => {
      Spotify._accessToken = "test-token";
    });

    it("should call makeRequest with correct parameters", async () => {
      Spotify.makeRequest = jest.fn();

      const playlistId = "test-playlist-id";
      const tracks = [{ uri: "spotify:track:1" }, { uri: "spotify:track:2" }];

      await Spotify.addTracksToPlaylist(playlistId, tracks);

      expect(Spotify.makeRequest).toHaveBeenCalledWith(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        "POST",
        {
          Authorization: "Bearer test-token",
          "Content-Type": "application/json",
        },
        JSON.stringify({ uris: tracks })
      );
    });

    it("should throw an error if makeRequest fails", async () => {
      Spotify.makeRequest = jest.fn().mockRejectedValue(new Error("Test"));

      await expect(
        Spotify.addTracksToPlaylist("test-playlist-id", [])
      ).rejects.toThrow("Test");
    });
  });
});
