const BASE_URL = "https://api.spotify.com";

const Spotify = {
  _accessToken: null,
  _tokenExpirationTime: null,

  async getAccessToken() {
    // If the access token is already set and has not expired, return early.
    if (this._accessToken && Date.now() < this._tokenExpirationTime) {
      return;
    }

    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
    });

    if (response.ok) {
      const { access_token } = await response.json();
      this._accessToken = access_token;
      this._tokenExpirationTime = Date.now() + 3600 * 1000;
    } else {
      throw new Error("Request failed!");
    }
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
};

export default Spotify;
