module.exports = {
  path: 'PersonalInformation',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./index').default)
    }, 'PersonalInformation')
  },
  breadcrumbName: '个人信息',
}