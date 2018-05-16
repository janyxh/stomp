module.exports = {
  path: 'UpgradeLogs',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./index').default)
    }, 'UpgradeLogs')
  },
  breadcrumbName: "升级记录",
}