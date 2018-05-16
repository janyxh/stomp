module.exports = {
  path: 'VerifyFirmware(/:id)',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./index').default);
    }, 'VerifyFirmware');
  },
  breadcrumbName: "验证固件",
}