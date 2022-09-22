const SpotifyWebApi = require("spotify-web-api-node");
export default async function login(req, res) {
    
  if (req.method === "POST") {
    
    const code = req.body.code;
    
    const spotifyApi = new SpotifyWebApi({
      redirectUri: "http://localhost:3000",
      clientId: "481fa5ea109645d9b9e6dc0e596d50d6",
      clientSecret: "280b7c09342d47ef9cc4b0b1727d6903",
    });
    try {
      console.log("hit14 ")    
      const response = await spotifyApi.authorizationCodeGrant(code);
      console.log(response.body)
      // const data = await response.json();
console.log("hit17 ");    
      res.json({
        accessToken: response.body.access_token,
        refreshToken: response.body.access_token,
        expiresIn: response.body.expires_in,
      });
    } catch (error) {
      res.status(400).json({ name: "John Doe" });
    }
  }
}
