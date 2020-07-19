const Politicans = require('../models/Politicans')

Politicans
  .methods(['get', 'post', 'put', 'delete'])
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

module.exports = function (server) {
  Politicans
    .register(server, '/api/politicans')
}
