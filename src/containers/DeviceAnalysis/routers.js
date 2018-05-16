module.exports = {
  path: 'DeviceAnalysis',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./index').default)
    }, 'DeviceAnalysis')
  },
  breadcrumbName: "设备分析",
}