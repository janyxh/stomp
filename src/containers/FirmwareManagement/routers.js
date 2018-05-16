
module.exports = {
  path: 'FirmwareManagement',
  indexRoute: {
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('./List').default);
      }, 'List');
    },
  },
  breadcrumbName: "固件管理",
  childRoutes: [
    require('./List/routers'),
    require('./AddOrEdit/routers'),
    require('./VerifyFirmware/routers'),
  ],
};
