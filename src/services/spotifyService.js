const BASE_URL = "https://api.spotify.com";

const Spotify = {
  _accessToken: null,
  _tokenExpirationTime: null,
  _userId: null,

  onLoginCallback: null,

  async makeRequest(url, method = "GET", headers = {}, body = null) {
    try {
      const response = await fetch(url, {
        method,
        headers,
        body,
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error(
          `Request failed with status ${response.status}: ${response.statusText}`
        );
      }
    } catch (err) {
      console.error("Request failed:", err);
      throw err;
    }
  },

  handleURLParams() {
    const accessToken = window.location.href.match(/access_token=([^&]*)/);
    const expiresIn = window.location.href.match(/expires_in=([^&]*)/);

    if (accessToken && expiresIn) {
      this._accessToken = accessToken[1];
      this._tokenExpirationTime = Date.now() + expiresIn[1] * 1000;

      // clear url
      const url = window.location.href.split("#")[0];
      window.history.pushState("Access Token", null, url);
      if (this.onLoginCallback) {
        this.onLoginCallback();
      }
    }
  },

  login() {
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    const redirectUri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;
    const scopes = "playlist-modify-private";

    // login to spotify and get access token and id
    window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=${encodeURIComponent(
      scopes
    )}&redirect_uri=${encodeURIComponent(redirectUri)}`;
  },

  ensureLoginToken() {
    // If the access token is already set and has not expired, return early.
    if (this._accessToken && Date.now() < this._tokenExpirationTime) {
      return;
    }

    this.login();
  },

  async ensureUserId() {
    if (this._userId) {
      return;
    }
    // Make sure there is a valid access token.
    this.ensureLoginToken();

    const response = await this.makeRequest(`${BASE_URL}/v1/me`, "GET", {
      Authorization: `Bearer ${this._accessToken}`,
    });

    if (!response.id) {
      throw new Error("Response did not contain a user ID!");
    }

    this._userId = response.id;
  },

  async isLoggedIn() {
    return !!this._accessToken;
  },

  async search(term) {
    // Make sure there is a valid access token.
    this.ensureLoginToken();

    const response = await this.makeRequest(
      `${BASE_URL}/v1/search?type=track&q=${encodeURIComponent(term)}`,
      "GET",
      {
        Authorization: `Bearer ${this._accessToken}`,
      }
    );

    if (!response.tracks) {
      throw new Error("Response did not contain any tracks!");
    }

    return response.tracks.items.map((track) => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      uri: track.uri,
      previewUrl: track.preview_url,
      albumArt: track.album.images[0].url,
    }));
  },

  async createPlaylist(playlistName, tracks) {
    await this.ensureUserId();

    const response = await this.makeRequest(
      `${BASE_URL}/v1/users/${this._userId}/playlists`,
      "POST",
      {
        Authorization: `Bearer ${this._accessToken}`,
        "Content-Type": "application/json",
      },
      JSON.stringify({
        name: playlistName,
        description: "Playlist created with Jammming",
        public: false,
      })
    );

    if (!response.id) {
      throw new Error("Response did not contain a playlist ID!");
    }

    await this.addTracksToPlaylist(response.id, tracks);
  },

  async addTracksToPlaylist(playlistId, tracks) {
    await this.makeRequest(
      `${BASE_URL}/v1/playlists/${playlistId}/tracks`,
      "POST",
      {
        Authorization: `Bearer ${this._accessToken}`,
        "Content-Type": "application/json",
      },
      JSON.stringify({
        uris: tracks,
      })
    );
  },

  init(onLoginCallback) {
    this.onLoginCallback = onLoginCallback;
    this.handleURLParams();
  },
};

export default Spotify;
