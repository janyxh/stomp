module.exports = {
  path: "AccountManagement",
  indexRoute: {
    getComponent(nextState, cb) {
      require.ensure(
        [],
        require => {
          cb(null, require("./List").default);
        },
        "List"
      );
    }
  },
  breadcrumbName: "帐号管理",
  childRoutes: [require("./List/routers"), require("./AddOrEdit/routers")]
};
