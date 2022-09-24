
// const SpotifyWebApi = require("spotify-web-api-node");
// export default async function refresh (req,res) {
//  if (req.method === "POST" && req.body.refreshToken !==undefined) {
   
//    const refreshToken = req.body.refreshToken;
   
// //    const spotifyApi = new SpotifyWebApi({
// //      redirectUri: "http://localhost:3000",
// //      clientId: "481fa5ea109645d9b9e6dc0e596d50d6",
// //      clientSecret: "280b7c09342d47ef9cc4b0b1727d6903",
// //      refreshToken,
// //    });
// //    try {
//     var authOptions = {
//       url: "https://accounts.spotify.com/api/token",
//       headers: {
//         Authorization:
//           "Basic " +
//           new Buffer(
//             "481fa5ea109645d9b9e6dc0e596d50d6" +
//               ":" +
//               "280b7c09342d47ef9cc4b0b1727d6903"
//           ).toString("base64"),
//       },
//       form: {
//         grant_type: "refresh_token",
//         refresh_token: refreshToken,
//       },
//       json: true,
//     };

//     request.post(authOptions, function (error, response, body) {
//       if (!error && response.statusCode === 200) {
//         var access_token = body.access_token;
//         res.send({
//           access_token: access_token,
//         });
//       }
//     });
// //      console.log("hit14 ");
// //      console.log(await spotifyApi.refreshAccessToken())
// //      //   spotifyApi.setAccessToken(response.body["access_token"])

// //      console.log("hit19 ");
// //      console.log(response);
// //      res.status(200).json({
// //        accessToken: response.body.access_token,

// //        expiresIn: response.body.expires_in,
// //      });
// //    } catch (error) {
// //      res.status(400).json({ message: "Fail to refreshToken" });
// //    }
// //  }
//     }
// }
