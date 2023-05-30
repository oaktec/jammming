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
  async login() {
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    const redirectUri = "http://localhost:3000/";

    // login to spotify and get access token and id
    window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
  },
};

Spotify.handleParams();

export default Spotify;
