const axios = require("axios");

const client_id = process.env.TWITCH_CLIENT_ID
const client_secret = process.env.TWITCH_CLIENT_SECRET
const server_url = process.env.API_URL


const integration = {
    twitch: async (options) => {
        try {
            console.log(server_url)
            const { data } = await axios.post("https://id.twitch.tv/oauth2/token", {
                client_id: client_id,
                client_secret: client_secret,
                code: options.authCode,
                grant_type: "authorization_code",
                redirect_uri: `${server_url}/api/integration/twitch`,
            });


            const { data: responseUserData } = await axios.get("https://api.twitch.tv/helix/users", {
                headers: {
                    "Client-ID": client_id,
                    Authorization: `Bearer ${data.access_token}`,
                },
            });

            console.log(responseUserData, '=======')

            const appTokenResponse = await axios.post("https://id.twitch.tv/oauth2/token", {
                client_id: client_id,
                client_secret: client_secret,
                grant_type: "client_credentials",
            });

            const appToken = appTokenResponse.data.access_token
            const userData = responseUserData.data[0]

            const response2 = await axios.post(
                `https://api.twitch.tv/helix/eventsub/subscriptions`,
                {
                    type: "channel.follow",
                    version: "2",
                    condition: {
                        broadcaster_user_id: userData.id,
                        moderator_user_id: userData.id,
                    },
                    transport: {
                        method: "webhook",
                        callback: `${server_url}/api/integration/twitch-callback`,
                        secret: client_secret,
                    },
                },
                {
                    headers: {
                        "Client-ID": client_id,
                        Authorization: `Bearer ${appToken}`,
                    },
                }
            );
            return {
                success: true,
                result: {
                    message: 'ok'
                }
            };
        } catch (e) {
            console.log(e.response.data, '======')
            return {
                success: false,
                result: {
                    message: e.message
                }
            };
        }
    }
}

module.exports = {
    integration,
};
