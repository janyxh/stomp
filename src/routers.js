const rootRoute = {
  path: "/",
  indexRoute: {
    getComponent(nextState, cb) {
      require.ensure(
        [],
        require => {
          cb(null, require("./containers/Login").default);
        },
        "Login"
      );
    }
  },
  getComponent(nextState, cb) {
    require.ensure(
      [],
      require => {
        cb(null, require("./containers/App").default);
      },
      "App"
    );
  },
  childRoutes: [
    require("./containers/Login/routers"),
    require("./containers/Content/routers"),
    require("./containers/ForgetPassword/routers")
  ]
};
export default rootRoute;
