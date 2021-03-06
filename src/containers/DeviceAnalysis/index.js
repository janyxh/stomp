import React, { PureComponent, Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import moment from "moment";
import * as analysisActions from "../../actions/analysis";
import { getProductTypeList } from "../../actions/product";
import { getVendorList } from "../../actions/";
import domain from "../../actions/domain";
import { message, Spin } from "antd";
import {
  Chart,
  Filter,
  MapChart,
  WorldMap,
  MapFilter
} from "../../components/Analysis";
class DeviceAnalysis extends Component {
  constructor(context, props) {
    super(context, props);
    this.changeCompany = this.changeCompany.bind(this);
    this.changeProduct = this.changeProduct.bind(this);
    this.selectDate = this.selectDate.bind(this);
    this.changeDate = this.changeDate.bind(this);
    this.selectChangeMap = this.selectChangeMap.bind(this);
    this.saveData = this.saveData.bind(this);
    this.state = {
      vendorList: [],
      productList: [],
      show: false,
      area: 1,
      productValue: "all",
      rangeValue: [],
      loading: true
    };
    this.filterCondition = {
      area: 1,
      beginDate: moment()
        .subtract(1, "day")
        .set({
          hour: 0,
          minute: 0,
          second: 0
        })
        .valueOf(),
      endDate: moment()
        .subtract(1, "day")
        .set({
          hour: 23,
          minute: 59,
          second: 59
        })
        .valueOf()
    };
  }
  componentDidMount() {
    this.init();
  }
  init() {
    getVendorList().then(res => {
      this.setState({
        vendorList: res.data
      });
    });

    this.getDate();
  }
  saveData() {
    let url = "";
    for (const i in this.filterCondition) {
      url += `${i}=${this.filterCondition[i]}&`;
    }
    const link = document.createElement("a");
    link.href = `${domain}/statistics/devices/export/?${url}`;
    link.click();
  }
  changeCompany(value) {
    getProductTypeList(value).then(res => {
      const list = res.data.map((item, index) => {
        return {
          id: item.id,
          name: item.name
        };
      });
      this.setState({
        productList: list,
        productValue: "all"
      });
    });
    this.filterCondition.manufId = value;
    this.getDate();
  }
  changeProduct(value, product) {
    this.filterCondition.productId = value;
    this.setState({
      productValue: value
    });
    this.getDate();
  }
  changeDate(value) {
    const beginDate = value[0]
      .set({
        hour: 0,
        minute: 0,
        second: 0
      })
      .valueOf();
    const endDate = value[1]
      .set({
        hour: 23,
        minute: 59,
        second: 59
      })
      .valueOf();
    if (value[1].diff(value[0], "days") > 90) {
      message.error("查询时间跨度不能大于90天!");
      this.setState({
        rangeValue: []
      });
      return;
    } else {
      this.setState({
        rangeValue: value
      });
    }
    this.filterCondition.beginDate = beginDate;
    this.filterCondition.endDate = endDate;
    this.getDate();
  }
  selectDate(value) {
    if (value == "3") {
      this.setState({
        show: true
      });
    } else {
      let beginDate = null;
      let endDate = null;
      if (value == "1") {
        // 昨天
        beginDate = moment()
          .subtract(1, "day")
          .set({
            hour: 0,
            minute: 0,
            second: 0
          })
          .valueOf();
        endDate = moment()
          .subtract(1, "day")
          .set({
            hour: 23,
            minute: 59,
            second: 59
          })
          .valueOf();
      } else if (value == "2") {
        // 过去7天
        beginDate = moment()
          .subtract(7, "days")
          .set({
            hour: 0,
            minute: 0,
            second: 0
          })
          .valueOf();
        endDate = moment()
          .subtract(1, "day")
          .set({
            hour: 23,
            minute: 59,
            second: 59
          })
          .valueOf();
      } else {
        // 过去30天
        beginDate = moment()
          .subtract(30, "days")
          .set({
            hour: 0,
            minute: 0,
            second: 0
          })
          .valueOf();
        endDate = moment()
          .subtract(1, "day")
          .set({
            hour: 23,
            minute: 59,
            second: 59
          })
          .valueOf();
      }
      this.setState({
        show: false
      });
      this.filterCondition.beginDate = beginDate;
      this.filterCondition.endDate = endDate;
      this.getDate();
    }
  }
  selectChangeMap(value) {
    this.setState({
      area: value
    });
    this.filterCondition.area = value;
    this.getDate();
  }
  getDate() {
    for (let i in this.filterCondition) {
      if (this.filterCondition[i] == "all" || this.filterCondition[i] == null) {
        delete this.filterCondition[i];
      }
    }
    this.setState({
      loading: true
    });
    const promises = [];
    promises.push(this.props.actions.getDeviceTrend(this.filterCondition));
    promises.push(this.props.actions.getDeviceDistribute(this.filterCondition));
    Promise.all(promises).then(() => {
      this.setState({
        loading: false
      });
    });
  }

  render() {
    let mapComp = (
      <MapChart
        isProvince={this.state.area == "2"}
        title="设备分布情况"
        list={this.props.deviceDistribute.data || []}
      />
    );
    if (this.state.area == "1") {
      mapComp = (
        <WorldMap
          title="设备分布情况"
          list={this.props.deviceDistribute.data || []}
        />
      );
    }
    if (this.state.area == "3") {
      mapComp = (
        <MapChart
          isProvince={this.state.area == "2"}
          title="设备分布情况"
          list={this.props.deviceDistribute.data || []}
        />
      );
    }
    const rangDate = `${moment(this.filterCondition.beginDate).format(
      "YYYY年MM月DD日"
    )} 至 ${moment(this.filterCondition.endDate).format("YYYY年MM月DD日")}`;
    const company = this.state.vendorList.find((item, index) => {
      if (item.id == this.filterCondition.manufId) {
        return item;
      }
    }) || {
      name: "全部厂商"
    };
    const product = this.state.productList.find((item, index) => {
      return item.id == this.filterCondition.productId;
    }) || {
      name: "全部产品"
    };
    return (
      <Spin tip="加载中..." spinning={this.state.loading} size="large" delay="300">
        <div>
          <div className="home-filter">
            <Filter
              saveData={this.saveData}
              companyList={this.state.vendorList}
              productList={this.state.productList}
              changeCompany={this.changeCompany}
              productValue={this.state.productValue}
              changeProduct={this.changeProduct}
              show={this.state.show}
              selectDate={this.selectDate}
              changeDate={this.changeDate}
              rangeValue={this.state.rangeValue}
            />
          </div>
          <div className="chart">
            <Chart
              title="设备激活趋势"
              isProvince={this.state.area == "1"}
              beginDate={this.filterCondition.beginDate}
              endDate={this.filterCondition.endDate}
              list={this.props.deviceTrend.data || []}
            />

          </div>

          {
            //          <div className="chart">
            //   <Chart
            // title="用户活跃趋势"
            // beginDate = { this.filterCondition.beginDate }
            // endDate = { this.filterCondition.endDate }
            // list = {this.props.deviceActivation}
            // />
            //   </div>
          }

          <div className="chart">
            <MapFilter
              time={rangDate}
              selectedCondition={`${company.name}  ${product.name}`}
              area={this.state.area}
              selectChangeMap={this.selectChangeMap}
            />
            {mapComp}

          </div>
        </div>
      </Spin>
    );
  }
}
function mapStateToProps(state) {
  return {
    deviceActivation: state.analysis.deviceActivation,
    deviceTrend: state.analysis.deviceTrend,
    deviceDistribute: state.analysis.deviceDistribute
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(analysisActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(DeviceAnalysis);
