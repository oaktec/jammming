const Spotify = {
  _accessToken: null,

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
      console.log("Access Token: ", this._accessToken);
    } else {
      throw new Error("Request failed!");
    }
  },
};

export default Spotify;
