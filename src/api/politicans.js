const Politicans = require('../models/Politicans')
const basicAuth = require('../middleware/basiAuth')
const { postTweet } = require('../services/Twitter')

const afterPost = async (req, res, next) => {
  const { bundle } = res.locals
  postTweet(`
    ${bundle.name} (${bundle.twitter}) está na lista de políticos que apoiam medidas anti-ciência. ${process.env.API_DOMAIN}/detalhes/${bundle.slug} #ListaSujaDoCorona
  `)

  next()
}

Politicans
  .methods(['get', 'post', 'put', 'delete'])
  .before('post', basicAuth())
  .before('put')
  .after('post', afterPost)
  .before('delete')
  .after('get', function (req, res, next) {
    const id = req.params.id
    if (req.params.id) {
      Politicans.findOneAndUpdate({ _id: id }, { $inc: { pageView: 1 } })
    }
    next()
  })

Politicans.route('trending.get', function (req, res) {
  Politicans
    .find()
    .sort({ pageView: -1 })
    .limit(6)
    .then(result => res.json(result))
})

Politicans.route(':slug', ['get'], function (req, res) {
  Politicans
    .findOneAndUpdate({ slug: req.params.slug }, { $inc: { pageView: 1 } })
    .then(result => {
      if (!result) {
        res.status(404).json({})
      } else {
        res.json(result)
      }
    })
})

module.exports = function (server) {
  Politicans
    .register(server, '/api/politicans')
}
