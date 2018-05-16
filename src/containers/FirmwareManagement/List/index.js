import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router';
import { Select, Table, Input, message, Modal } from 'antd';
import * as firmwareActions from '../../../actions/firmware';
import { getProductTypeList } from '../../../actions/product';
import { getVendorList } from '../../../actions/';
import { Filter } from '../../../components/FirmwareManagement';


class List extends PureComponent {
  constructor(context, props) {
    super(context, props);
    this.togglePublish = this.togglePublish.bind(this);
    this.companyChange = this.companyChange.bind(this);
    this.productChange = this.productChange.bind(this);
    this.typeChange = this.typeChange.bind(this);
    this.confirm = this.confirm.bind(this);
    this.deleteFirmware = this.deleteFirmware.bind(this);

    this.filterCondition = {
      publishFlag: "0"
    };
    this.state = {
      productList: [],
      companyList: [],
      typeList: [
        {
          key: '0',
          value: '应用固件',
        },
        {
          key: '1',
          value: '协调器固件',
        },
        {
          key: '2',
          value: '系统固件',
        },
        {
          key: '3',
          value: '第三方MCU固件',
        },
      ],
      productValue: 'all',
      typeValue: 'all',
      isPublish: "0",
      pagination: {
        total: 0,
        current: 1,
        pageSize: 20,
        showQuickJumper: true,
        onChange: this.onPageChange.bind(this),
      }
    };
    this.columns = [
      {
        title: '固件类型',
        dataIndex: 'types',
        key: 'types',
        render: (text, record) => {
          if (text == '0') {
            return '应用固件';
          } else if (text == '1') {
            return '协调器固件 ';
          } else if (text == '2') {
            return '系统固件';
          } else {
            return '第三方MCU固件';
          }
        }
      },
      {
        title: '固件名称',
        dataIndex: 'originName',
        key: 'originName',
      },
      {
        title: '固件版本',
        dataIndex: 'version',
        key: 'version',
      },
      {
        title: '适用产品',
        dataIndex: 'productModel',
        key: 'productModel',
      },
      {
        title: '上传时间',
        dataIndex: 'createTime',
        key: 'createTime',
        render: (text, record) => (
        moment(text).format('YYYY-MM-DD HH:mm:ss')
        ),
      },

      {
        title: '操作',
        key: 'id',
        dataIndex: 'id',
        render: (text, record) => (
          <span className="action">
      <Link className="mr30" to={`/Content/FirmwareManagement/AddOrEdit/${text}`}>编辑</Link>
       <a className="cp" onClick={this.confirm.bind(null, text)} >删除</a>
       </span>
        ),
      }
      ];
  }
  componentDidMount() {
    const router = this.context.router;
    const flag = router.location.query.flag;
    if (flag == "1") {
      this.togglePublish(flag);
    } else {

      this.getData();
    }

    // 是否为 二级厂商
    const currUser = this.props.auth.currUser;
    if (currUser.manufactureLevel === '2') {
      const companyId = currUser.manufId;
      this.companyChange(companyId);
    } else {
      getVendorList().then((res) => {
        this.setState({
          companyList: res.data,
        });
      });
    }
  }

  componentWillReceiveProps(nextProps) {

    this.Update()
  }

  companyChange(value) {
    const manufId = value;
    this.filterCondition.manufId = manufId;
    if (value == 'all') {
      value = '';
    }
    delete this.filterCondition.productId;
    getProductTypeList(value).then((res) => {
      this.setState({
        productList: res.data || [],
        productValue: 'all',
      })
    });
    //this.getData();
    this.onPageChange(1);
  }
  onPageChange(e) {
    const newPagination = {
      ...this.state.pagination
    };
    newPagination.current = e;
    this.setState({
      pagination: newPagination,
    }, () => {
      this.getData();
    });

  }
  productChange(value) {
    const productId = value;
    this.filterCondition.productId = productId;
    this.setState({
      productValue: value,
    })
    this.onPageChange(1);
  }
  typeChange(value) {
    console.log(value)
    const type = value;
    this.setState({
      typeValue: value,
    });
    this.filterCondition.type = type;
    this.onPageChange(1);
  }
  confirm(text) {
    Modal.confirm({
      title: '确认',
      content: '确定删除吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: this.deleteFirmware.bind(this, text),
    });
  }
  deleteFirmware(id) {
    this.props.actions.deleteFirmware(id).then((res) => {
      if (res.code == "000000") {
        this.getData();
      } else {
        alert(res.message);
      }
    })
  }
  Update() {
    if (this.state.isPublish == "0") {
      this.columns.pop()
      const data = {
        title: '操作',
        key: 'id',
        dataIndex: 'id',
        render: (text, record, index) => (
          <span>
          <Link className="cp mr30" to={`/Content/FirmwareManagement/VerifyFirmware/${text}`}   >验证固件</Link>
     <Link className="mr30" to={`/Content/FirmwareManagement/AddOrEdit/${text}`}>编辑</Link>
      <a className="cp" onClick={this.confirm.bind(null, text)} >删除</a>
    </span>
        ),
      }
      this.columns.push(data)
      this.filterCondition.devId = this.getProductId();
    } else {
      this.columns.pop()
      const data = {
        title: '操作',
        key: 'id',
        dataIndex: 'id',
        render: (text, record) => (
          <span>
   <Link className="mr30" to={`/Content/FirmwareManagement/AddOrEdit/${text}`}>编辑</Link>
      <a className="cp" onClick={this.confirm.bind(null, text)} >删除</a>
    </span>
        ),
      }
      this.columns.push(data)
      this.filterCondition.devId = null;
    // this.getData();
    }
  }
  getData() {
    this.filterCondition.pageSize = this.state.pagination.pageSize;
    this.filterCondition.pageNo = this.state.pagination.current;
    for (let i in this.filterCondition) {
      if (this.filterCondition[i] == "all" || this.filterCondition[i] == null) {
        delete this.filterCondition[i];
      }
    }
    if (this.isUpdate()) {
      this.Update();
      const productId = this.getProductId();

      this.props.actions.getProductFirmware(productId, this.filterCondition).then((res) => {
        const newPagination = {
          ...this.state.pagination
        };
        newPagination.total = res.data.total;
        this.setState({
          pagination: newPagination,
        })
      })
    } else {
      for (let i in this.filterCondition) {
        if (this.filterCondition[i] == "all" || this.filterCondition[i] == null) {
          delete this.filterCondition[i];
        }
      }
      this.props.actions.getAllFirmware(this.filterCondition).then((res) => {
        const newPagination = {
          ...this.state.pagination
        };
        newPagination.total = res.data.total;
        this.setState({
          pagination: newPagination,
        })
      })
    }
  }
  isUpdate() {
    const productId = this.getProductId();
    return typeof (productId) != 'undefined'
  }
  upDateDev(id, record) {
    const firmwareId = id;
    const productId = this.getProductId();
    const router = this.context.router;
    const uid = router.location.query.uid;
    const item = this.props.productFirmware.data.rows.find((item, index) => {
      return item.id == firmwareId;
    })
    const data = {
      firmwareId: firmwareId,
      uid: uid,
      type: item.types,
    }
    firmwareActions.updateDevFirmware(data).then((res) => {
      if (res.code == "000000") {
        alert('升级命令已发送,刷新页面等待升级!');
      } else {
        alert(res.message);
      }
    });

  }
  getProductId() {
    const router = this.context.router;
    return router.location.query.id;
  }
  togglePublish(value) {
    this.setState({
      isPublish: value,
    });
    this.filterCondition.publishFlag = value;
    this.getData();
  }
  render() {
    let list = null;
    if (this.isUpdate()) {
      if (!this.props.productFirmware.loaded) {
        return <div></div>;
      }
      list = this.props.productFirmware.data;
    } else {
      if (!this.props.firmwareList.loaded) {
        return <div></div>;
      }
      list = this.props.firmwareList.data;
    }

    let data = list.rows || [];
    data = data.map((item, index) => {
      item['key'] = index;
      return item;
    })

    return (<div>
          <div  className="mt40 ml48">
      <Filter
      productList = {this.state.productList}
      companyList = {this.state.companyList}
      typeList = {this.state.typeList}
      companyChange = {this.companyChange}
      productChange = {this.productChange}
      productValue = {this.state.productValue}
      typeChange = {this.typeChange}
      isShowCompany = {this.props.auth.currUser.manufactureLevel === '2'}
      />

      </div>
      <div className="ml48">
      <div className="tab-title mt55 mb20">
      <div className={this.state.isPublish == "1" ? "tab-option mr30" : "tab-option mr30 notSelected"} onClick={this.togglePublish.bind(null, "1")}>
      已发布固件
      </div>
      <div className={this.state.isPublish == "0" ? "tab-option " : "tab-option notSelected"} onClick={this.togglePublish.bind(null, "0")} >
      待验证固件
      </div>
      <div className="clearfix"></div>
      </div>
      <div className="clearfix"></div>
     <Table columns={this.columns} dataSource={data}   pagination = {
      this.state.pagination
      }  />
      </div>
    </div>);
  }
}
List.contextTypes = {
  router: React.PropTypes.object
}
function mapStateToProps(state) {
  return {
    firmwareList: state.firmwareList,
    auth: state.auth,
    productFirmware: state.productFirmware,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(firmwareActions, dispatch),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(List);
