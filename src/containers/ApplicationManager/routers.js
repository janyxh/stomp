
module.exports = {
  path: 'ApplicationManager',
  indexRoute: {
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('./List').default);
      }, 'List');
    },
  },
  breadcrumbName: '应用管理',
  childRoutes: [
    require('./List/routers'),
    require('./AddOrEdit/routers'),
  ],
};
