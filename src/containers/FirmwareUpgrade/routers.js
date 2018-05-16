module.exports = {
  path: 'FirmwareUpgrade',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./index').default)
    }, 'FirmwareUpgrade')
  },
  breadcrumbName: "固件升级",
}