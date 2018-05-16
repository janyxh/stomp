import { isLoaded as isAuthLoaded, load as loadAuth } from "../../actions/auth";
import { store } from "../../main";

function requireLogin(nextState, replace, cb) {
  function checkAuth() {
    const { auth: { currUser } } = store.getState();
    if (!currUser) {
      replace("/");
    }
    cb();
  }
  if (!isAuthLoaded(store.getState())) {
    store.dispatch(loadAuth()).then(checkAuth);
  } else {
    checkAuth();
  }
}
module.exports = {
  path: "Content",
  onEnter: requireLogin,
  indexRoute: {
    getComponent(nextState, cb) {
      require.ensure(
        [],
        require => {
          cb(null, require("../Home/").default);
        },
        "Home"
      );
    }
  },
  getComponent(nextState, cb) {
    require.ensure(
      [],
      require => {
        cb(null, require("./index").default);
      },
      "Content"
    );
  },
  childRoutes: [
    require("../Home/routers"),
    require("../VendorManagement/routers"),
    require("../ProductManagement/routers"),
    require("../DevList/routers"),
    require("../FirmwareManagement/routers"),
    require("../AccountManagement/routers"),
    require("../RoleManagement/routers"),
    require("../PersonalInformation/routers"),
    require("../CorporateInformation/routers"),
    require("../DeviceAnalysis/routers"),
    require("../UserAnalysis/routers"),
    require("../UpgradeLogs/routers"),
    require("../FirmwareUpgrade/routers"),
    require("../TestSearch/routers"),
    require("../ApplicationManager/routers")
  ]
};
