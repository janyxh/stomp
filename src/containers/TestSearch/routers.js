
module.exports = {
  path: 'TestSearch',
  indexRoute: {
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('./List').default);
      }, 'List');
    },
  },
  breadcrumbName: '产测查询',
  childRoutes: [
    require('./List/routers'),
    require('./View/routers'),
  ],
};
