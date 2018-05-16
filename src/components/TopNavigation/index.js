import React, { Component } from "react";
import { Link } from "react-router";
import { Breadcrumb } from "antd";
class TopNavigation extends Component {
  constructor(props, context) {
    super(props, context);
    this.itemRender = this.itemRender.bind(this);
  }
  componentDidMount() {}
  itemRender(route, params, routes, paths) {
    const currentParams = this.context.router.params;
    if (!route.breadcrumbName) {
      return;
    }
    if (
      currentParams.id &&
      currentParams.id.length > 0 &&
      /^新增/.test(route.breadcrumbName)
    ) {
      const str = "编辑";
      route.breadcrumbName =
        str + route.breadcrumbName.slice(2, route.breadcrumbName.length);
    }
    if (!currentParams.id && /^编辑/.test(route.breadcrumbName)) {
      const str = "新增";
      route.breadcrumbName =
        str + route.breadcrumbName.slice(2, route.breadcrumbName.length);
    }
    const newRoutes = routes.filter(item => {
      return item.breadcrumbName && item.path && item.path.length > 0;
    });

    let last = newRoutes.indexOf(route) === newRoutes.length - 1;

    return last
      ? <span>{route.breadcrumbName}</span>
      : <Link to={"/" + paths.join("/")}>{route.breadcrumbName}</Link>;
  }
  render() {
    let { routes } = this.context.router;

    return <Breadcrumb routes={routes} itemRender={this.itemRender} />;
  }
}
TopNavigation.contextTypes = {
  router: React.PropTypes.object
};
export default TopNavigation;
