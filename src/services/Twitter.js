var Twit = require('twit')

var T = new Twit({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_SECRET_KEY,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})

module.exports.postTweet = (status) => {
  T.post(
    'statuses/update',
    { status },
    function (err, data, response) {
      console.log(data)
    }
  )
}