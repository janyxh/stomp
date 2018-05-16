module.exports = {
  path: 'AddOrEdit(/:id)',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./index').default);
    }, 'AddOrEdit');
  },
  breadcrumbName: '管理应用',
};
