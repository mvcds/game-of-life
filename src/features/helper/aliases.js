const moduleAlias = require('module-alias')
const { resolve: { alias } } = require('../../../webpack.config.js')

moduleAlias.addAliases(alias)
