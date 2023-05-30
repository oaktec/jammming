const BASE_URL = "https://api.spotify.com";

const Spotify = {
  _accessToken: null,
  _tokenExpirationTime: null,
  _userId: null,

  handleParams() {
    const accessToken = window.location.href.match(/access_token=([^&]*)/);
    const expiresIn = window.location.href.match(/expires_in=([^&]*)/);

    if (accessToken && expiresIn) {
      this._accessToken = accessToken[1];
      this._tokenExpirationTime = Date.now() + expiresIn[1] * 1000;

      // clear url
      window.history.pushState("Access Token", null, "/");
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

    const response = await fetch(`${BASE_URL}/v1/me`, {
      headers: {
        Authorization: `Bearer ${this._accessToken}`,
      },
    });

    if (response.ok) {
      const { id } = await response.json();
      this._userId = id;
    } else {
      throw new Error(
        `Get user id request failed with status ${response.status}!`
      );
    }
  },
  async login() {
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    const redirectUri = "http://localhost:3000/";

    const scopes = "playlist-modify-private";

    // login to spotify and get access token and id
    window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=${scopes}&redirect_uri=${redirectUri}`;
  },
  async search(term) {
    // Make sure there is a valid access token.
    await this.getAccessToken();

    const response = await fetch(`${BASE_URL}/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${this._accessToken}`,
      },
    });

    if (response.ok) {
      const { tracks } = await response.json();
      return tracks.items.map((track) => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
      }));
    } else {
      throw new Error(`Search request failed with status ${response.status}!`);
    }
  },
  async createPlaylist(playlistName, tracks) {
    await this.getUserId();

    const response = await fetch(
      `${BASE_URL}/v1/users/${this._userId}/playlists`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this._accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: playlistName,
          description: "Playlist created with Jammming",
          public: false,
        }),
      }
    );

    if (response.ok) {
      const { id } = await response.json();
      console.log("Playlist created with id:", id);
    } else {
      throw new Error(
        `Create playlist request failed with status ${response.status}!`
      );
    }
  },
};

Spotify.handleParams();

export default Spotify;
