import React, { PureComponent } from "react";
import { Select, Table, Input, Spin } from "antd";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router";
import * as deviceActions from "../../actions/device";
import { getProductTypeList } from "../../actions/product";
import { getVendorList } from "../../actions/";
import { Filter } from "../../components/DevList";

class DevList extends PureComponent {
  constructor(context, props) {
    super(context, props);
    this.sortChange = this.sortChange.bind(this);
    this.productChange = this.productChange.bind(this);
    this.companyChange = this.companyChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.filterCondition = {};
    this.state = {
      loading: true,
      productList: [],
      companyList: [],
      productValue: "all",
      pagination: {
        total: 0,
        current: 1,
        pageSize: 20,
        showQuickJumper: true,
        onChange: this.onPageChange.bind(this)
      }
    };
    this.columns = [
      {
        title: "帐号",
        dataIndex: "zhijiaAccount",
        key: "zhijiaAccount"
      },
      {
        title: "产品名称",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "产品型号",
        dataIndex: "internalModel",
        key: "internalModel"
      },
      {
        title: "设备UID",
        dataIndex: "deviceUid",
        key: "deviceUid"
      },
      {
        title: "硬件版本",
        dataIndex: "hardwareVersion",
        key: "hardwareVersion"
      },
      {
        title: "应用固件版本",
        dataIndex: "appFirmwareVersion",
        key: "appFirmwareVersion"
      },
      {
        title: "协调器固件版本",
        dataIndex: "coordinatorFirmwareVersion",
        key: "coordinatorFirmwareVersion"
      },
      {
        title: "系统固件版本",
        dataIndex: "systemFirmwareVersion",
        key: "systemFirmwareVersion"
      },

      {
        title: "操作",
        key: "productId",
        dataIndex: "productId",
        render: (text, record) =>
          <span>
            <Link
              to={`/Content/FirmwareManagement?id=${text}&uid=${record.deviceUid}`}
            >
              升级
            </Link>
          </span>
      }
    ];
  }

  componentDidMount() {
    this.getData();
    getVendorList().then(res => {
      this.setState({
        companyList: res.data
      });
    });
  }
  sortChange(value) {
    const sort = value;
    this.filterCondition.sort = sort;
    this.getData();
  }
  productChange(value) {
    const productId = value;
    this.filterCondition.productId = productId;
    this.setState({
      productValue: value
    });
    this.onPageChange(1);
  }
  onPageChange(e) {
    const newPagination = {
      ...this.state.pagination
    };
    newPagination.current = e;
    this.setState(
      {
        pagination: newPagination
      },
      () => {
        this.getData();
      }
    );
  }
  companyChange(value) {
    const manufId = value;
    this.filterCondition.manufId = manufId;
    delete this.filterCondition.productId;
    getProductTypeList(value).then(res => {
      this.setState({
        productList: res.data,
        productValue: "all"
      });
    });
    this.onPageChange(1);
  }
  onSearch(value) {
    const keyword = value;
    this.filterCondition.searchText = keyword;
    this.onPageChange(1);
  }
  getData() {
    this.filterCondition.pageSize = this.state.pagination.pageSize;
    this.filterCondition.pageNo = this.state.pagination.current;
    for (let i in this.filterCondition) {
      if (this.filterCondition[i] == "all" || this.filterCondition[i] == null) {
        delete this.filterCondition[i];
      }
    }
    this.setState({
      loading: true
    });
    this.props.actions.getAllDevice(this.filterCondition).then(res => {
      if (res.code == "000000") {
        const newPagination = {
          ...this.state.pagination
        };
        newPagination.total = res.data.total;
        this.setState({
          pagination: newPagination,
          loading: false
        });
      }
    });
  }
  render() {
    let data =
      (this.props.deviceList.data && this.props.deviceList.data.rows) || [];
    data = data.map((item, index) => {
      const _item = item;
      _item.key = index;
      return _item;
    });

    return (
      <Spin tip="加载中..." spinning={this.state.loading} size="large">
        <div>
          <div className="mt40">
            <Filter
              productList={this.state.productList}
              companyList={this.state.companyList}
              productValue={this.state.productValue}
              onSearch={this.onSearch}
              productChange={this.productChange}
              // sortChange={this.sortChange}
              companyChange={this.companyChange}
            />
          </div>
          <div className="ml48">
            <Table
              columns={this.columns}
              dataSource={data}
              pagination={this.state.pagination}
            />
          </div>
        </div>
      </Spin>
    );
  }
}

function mapStateToProps(state) {
  return {
    deviceList: state.deviceList
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(deviceActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(DevList);
