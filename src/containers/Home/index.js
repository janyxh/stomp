import React, { PureComponent, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Select } from 'antd';
import { Chart } from '../../components/Analysis';
import moment from 'moment';

import { getProductTypeList } from '../../actions/product';
import { getDeviceActivationCount, getUserRegisterCount, getVendorList, todayDevTrend, todayUserTrend } from '../../actions';
const Option = Select.Option;

class Home extends Component {
  constructor(context, props) {
    super(context, props);
    this.changeCompany = this.changeCompany.bind(this);
    this.changeProduct = this.changeProduct.bind(this);
    this.filterCondition = {};
    this.state = {
      vendorList: [],
      productList: [],
      prodcutValue: 'all',
      todayDevCount: 0,
      yesterdayDevCount: 0,
      todayUserCount: 0,
      yesterDayRegisterCount: 0,
      devTotal: 0,
      userTotal: 0,
      todayDevTrend: [],
      todayRegisterTrend: [],
    }
  }
  componentDidMount() {
    getVendorList().then((res) => {
      this.setState({
        vendorList: res.data,
      });
    });
    // 临时解决办法 

    this.getDate();
  }
  changeCompany(value) {
    getProductTypeList(value).then((res) => {
      const list = res.data.map((item, index) => {
        return {
          id: item.id,
          name: item.name,
        };
      });
      this.setState({
        productList: list,
        prodcutValue: 'all',
      });
    });
    this.filterCondition.manufId = value;
    this.getDate();
  }
  changeProduct(value, product) {
    this.filterCondition.productId = value;
    this.setState({
      prodcutValue: value,
    });
    this.getDate();
  }
  async getDate() {
    for (let i in this.filterCondition) {
      if (this.filterCondition[i] == "all" || this.filterCondition[i] == null) {
        delete this.filterCondition[i];
      }
    }
    // 今天
    const today = this.getToday();
    const todayData = Object.assign({}, today, this.filterCondition);
    const todayDevCountData = await getDeviceActivationCount(todayData);
    this.setState({
        todayDevCount: todayDevCountData.data && todayDevCountData.data.count,
    });
    getUserRegisterCount(todayData).then((res) => {
      this.setState({
        todayUserCount: res.data && res.data.count,
      });
    });
    todayDevTrend(todayData).then((res) => {
      this.setState({
        todayDevTrend: res.data,
      });
    });
    const todayUserTrendData = await todayUserTrend(todayData);
    this.setState({
      todayRegisterTrend: todayUserTrendData.data,
    })
    // 昨天
    const yesterDay = this.getYesterday();
    const yesterDayData = Object.assign({}, yesterDay, this.filterCondition);
    getDeviceActivationCount(yesterDayData).then((res) => {
      this.setState({
        yesterdayDevCount: res.data && res.data.count,
      });
    });
    getUserRegisterCount(yesterDayData).then((res) => {
      this.setState({
        yesterDayRegisterCount:  res.data && res.data.count,
      });
    });

    // 总数
    const data = {
      manufId: this.filterCondition.manufId,
      productId: this.filterCondition.productId,
    };
    getDeviceActivationCount(data).then((res) => {
      this.setState({
        devTotal: res.data && res.data.count,
      });
    });
    getUserRegisterCount(data).then((res) => {
      this.setState({
        userTotal: res.data &&  res.data.count,
      });
    });
  }
  getYesterday() {
    const beginDate = moment().subtract(1, 'day').set({
      hour: 0,
      minute: 0,
      second: 0,
    }).valueOf();
    const endDate = moment().subtract(1, 'day').set({
      hour: 23,
      minute: 59,
      second: 59,
    }).valueOf();

    return {
      beginDate,
      endDate,
    };
  }
  getToday() {
    const beginDate = moment().set({
      hour: 0,
      minute: 0,
      second: 0,
    }).valueOf();
    const endDate = moment().valueOf();
    return {
      beginDate,
      endDate,
    };
  }
  render() {

        const companyListOptions = this.state.vendorList.map((item, index) => {
      return <Option key={item.id} >{item.name}</Option>
      });
      const productListOptions = this.state.productList.map((item, index) => {
        return <Option key={item.id} >{item.name}</Option>
        });
    return (
      <div>
        <div className="home-filter">
         <Select defaultValue="all" style={{
        width: 170,
        height: 40,
        marginRight: 30,
      }} onChange={this.changeCompany}>
      <Option value="all">所有厂商</Option>
      {companyListOptions}
    </Select>
        <Select value={this.state.prodcutValue} style={{
        width: 170,
        height: 40
      }} onChange={this.changeProduct}>
      <Option value="all">所有产品</Option>
      {productListOptions}
    </Select>
        </div>
        <div className="data-panle">
      <ul>
        <li>
        <div className="mt20" >
        今日激活设备
        </div>
        <div className="data-num">
        { this.state.todayDevCount}
        </div>
        <div className="data-description">
        昨日激活设备：{this.state.yesterdayDevCount}
        </div>
        </li>
      <li>
        <div className="mt20" >
        今日注册用户
        </div>
        <div className="data-num">
        {this.state.todayUserCount}
        </div>
        <div className="data-description">
        昨日注册用户: {this.state.yesterDayRegisterCount}人
        </div>
        </li>
          <li>
        <div className="mt20" >
        累计激活设备
        </div>
        <div className="data-num">
      {this.state.devTotal}
        </div>
       
        </li>
         
          <li>
        <div className="mt20" >
        累计注册用户
        </div>
        <div className="data-num">
        {this.state.userTotal}
        </div>
       
        </li>
      </ul>

        <div className="clearfix"></div>
        </div>
      <div className="chart">
         <Chart
      list = {this.state.todayDevTrend}
      title="今日设备激活趋势"

      />
      </div>
           <div className="chart">
      <Chart
      list = {this.state.todayRegisterTrend}
      title="今日用户注册趋势"

      />
      </div>
      </div>);
  }
}
function mapStateToProps(state) {
  return {
    loginUser: state.loginUser,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({getProductTypeList}, dispatch),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

