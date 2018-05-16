module.exports = {
  path: 'RoleManagement',
  indexRoute: {
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('./List').default);
      }, 'List');
    },
  },
  breadcrumbName: '角色管理',
  childRoutes: [
    require('./List/routers'),
    require('./AddOrEdit/routers'),
  ],
}