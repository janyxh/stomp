module.exports = {
  path: 'home',
  breadcrumbName:"数据概览",
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./index').default)
    },'home')
  }
}