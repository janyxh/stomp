module.exports = {
  path: 'List',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./index').default)
    }, 'List')
  },
  breadcrumbName: '角色管理',
}