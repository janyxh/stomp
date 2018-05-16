module.exports = {
  path: 'UserAnalysis',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./index').default);
    }, 'UserAnalysis');
  },
    breadcrumbName:"用户分析",
}