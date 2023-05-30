const Spotify = {
  _accessToken: null,
  _expirationTime: null,

  async getAccessToken() {
    if (this._accessToken) {
      return;
    }

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&client_secret=${process.env.REACT_APP_SPOTIFY_CLIENT_SECRET}`,
    });

    if (response.ok) {
      const { access_token } = await response.json();
      this._accessToken = access_token;
      this._expirationTime = Date.now() + 3600 * 1000;
    } else {
      throw new Error("Request failed!");
    }
  },
  checkAccessToken() {
    if (!this._accessToken) return false;

    if (Date.now() > this._expirationTime) {
      this._accessToken = null;
      return false;
    }
  },
  async search(term) {
    if (!this.checkAccessToken()) {
      await this.getAccessToken();
    }

    const response = await fetch(
      `https://api.spotify.com/v1/search?type=track&q=${term}`,
      {
        headers: {
          Authorization: `Bearer ${this._accessToken}`,
        },
      }
    );

    if (response.ok) {
      const { tracks } = await response.json();
      return tracks.items.map((track) => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
      }));
    } else {
      throw new Error("Request failed!");
    }
  },
};

export default Spotify;
