
module.exports = {
  path: 'ProductManagement',
  indexRoute: {
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('./List').default);
      }, 'List');
    },
  },
  breadcrumbName:"产品管理",
  childRoutes: [
    require('./List/routers'),
    require('./AddOrEdit/routers'),
    require('./Template/routers'),
    require('./Info/routers'),
  ],
};
