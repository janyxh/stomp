module.exports = {
  path: 'AddOrEdit(/:id)',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./index').default);
    }, 'AddOrEdit');
  },
   breadcrumbName: "新建参数模板",
}