const Twit = require('promised-twit')
const getBase64 = require('./getBase64Url')
const T = new Twit({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_SECRET_KEY,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})

module.exports.postTweet = async (politician) => {
  // first we must post the media to Twitter
  const b64content = await getBase64(politician.profilePicture)
  const data = await T.postMediaUpload({ media_data: b64content })
  const status = `
    ${politician.name} ${politician.twitter ? `(${politician.twitter})` : ' '}está na lista de políticos que apoiam medidas anti-ciência. ${process.env.API_DOMAIN}/detalhes/${politician.slug} #ListaSujaDoCorona
  `
  var mediaIdStr = data.media_id_string
  var params = { status, media_ids: [mediaIdStr] }
  return T.postStatusesUpdate(params)
}