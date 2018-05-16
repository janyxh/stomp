module.exports = {
  path: 'View(/:id)',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./index').default);
    }, 'View');
  },
   breadcrumbName:"查看详情",
};
