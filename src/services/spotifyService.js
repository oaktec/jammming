const BASE_URL = "https://api.spotify.com";

const makeRequest = async (url, method = "GET", headers = {}, body = null) => {
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
};

const Spotify = {
  _accessToken: null,
  _tokenExpirationTime: null,
  _userId: null,

  onLoginCallback: null,

  handleParams() {
    const accessToken = window.location.href.match(/access_token=([^&]*)/);
    const expiresIn = window.location.href.match(/expires_in=([^&]*)/);

    if (accessToken && expiresIn) {
      this._accessToken = accessToken[1];
      this._tokenExpirationTime = Date.now() + expiresIn[1] * 1000;

      // clear url
      window.history.pushState("Access Token", null, "/");
      if (this.onLoginCallback) {
        this.onLoginCallback();
      }
    }
  },

  async getAccessToken() {
    // If the access token is already set and has not expired, return early.
    if (this._accessToken && Date.now() < this._tokenExpirationTime) {
      return;
    }

    this.login();
  },

  async getUserId() {
    if (this._userId) {
      return;
    }
    // Make sure there is a valid access token.
    await this.getAccessToken();

    const response = await makeRequest(`${BASE_URL}/v1/me`, "GET", {
      Authorization: `Bearer ${this._accessToken}`,
    });
    this._userId = response.id;
  },

  async isLoggedIn() {
    return !!this._accessToken;
  },

  async login() {
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    const redirectUri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;
    const scopes = "playlist-modify-private";

    // login to spotify and get access token and id
    window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=${encodeURIComponent(
      scopes
    )}&redirect_uri=${encodeURIComponent(redirectUri)}`;
  },

  async search(term) {
    // Make sure there is a valid access token.
    await this.getAccessToken();

    const response = await makeRequest(
      `${BASE_URL}/v1/search?type=track&q=${encodeURIComponent(term)}`,
      "GET",
      {
        Authorization: `Bearer ${this._accessToken}`,
      }
    );

    return response.tracks.items.map((track) => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      uri: track.uri,
    }));
  },

  async createPlaylist(playlistName, tracks) {
    await this.getUserId();

    const response = await makeRequest(
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

    await this.addTracksToPlaylist(response.id, tracks);
  },

  async addTracksToPlaylist(playlistId, tracks) {
    await makeRequest(
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
    this.handleParams();
  },
};

export default Spotify;
export { makeRequest };
