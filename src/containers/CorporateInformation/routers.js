module.exports = {
  path: 'CorporateInformation',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./index').default)
    }, 'CorporateInformation')
  },
    breadcrumbName: '企业信息',
}