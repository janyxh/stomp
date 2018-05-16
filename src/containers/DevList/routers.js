module.exports = {
  path: 'DevList',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./index').default)
    }, 'DevList')
  },
  breadcrumbName: "设备列表",
}