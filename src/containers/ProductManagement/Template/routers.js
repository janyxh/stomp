module.exports = {
  path: 'Template',
  indexRoute: {
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('./List').default);
      }, 'List');
    },
  },
  breadcrumbName: "参数模板",
  childRoutes: [

    require('./List/routers'),
    require('./AddOrEdit/routers'),
  ],
};
