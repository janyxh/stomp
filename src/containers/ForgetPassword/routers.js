module.exports = {
  path: 'ForgetPassword',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./index').default)
    },'ForgetPassword')
  }
}