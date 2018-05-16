import React, { PureComponent, PropTypes } from "react";
import { Table, Modal, Icon, message } from "antd";
import moment from "moment";
import { Link } from "react-router";
import domain from "../../../actions/domain";
import { getVendorList } from "../../../actions/";
import {
  getAllApplication,
  addApplication,
  publishApplication,
  deleteApplication,
  getLanguageList,
  getAppVendorList
} from "../../../actions/application";
import { Filter, AddApplication } from "../../../components/ApplicationManager";
import publishImg from "./publish.svg";

class List extends PureComponent {
  constructor(context, props) {
    super(context, props);
    this.companyChange = this.companyChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.confirm = this.confirm.bind(this);
    this.deleteApplication = this.deleteApplication.bind(this);
    this.confirmPublish = this.confirmPublish.bind(this);
    this.showModal = this.showModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.exportData = this.exportData.bind(this);
    this.filterCondition = {};

    this.state = {
      companyList: [],
      appCompanyList:[],
      applicationList: [],
      checkedLanguage: [],
      visible: false,
      newKey: +new Date(),
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
        title: "应用ID",
        dataIndex: "number",
        key: "number"
      },
      {
        title: "应用名称",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "所属厂商",
        dataIndex: "manufactureName",
        key: "manufactureName"
      },
      {
        title: "Source ID",
        dataIndex: "appCode",
        key: "appCode"
      },
      {
        title: "创建时间",
        dataIndex: "createDateTime",
        key: "createDateTime",
        render: text => moment(text).format("YYYY-MM-DD HH:mm:ss")
      },
      {
        title: "操作",
        key: "key",
        dataIndex: "key",
        width: 200,
        render: (text, record) =>
          <span className="action">

            <Link
              className="mr10 icon-img"
              title="管理应用"
              to={`/Content/ApplicationManager/AddOrEdit/${text}`}
            >
              <Icon type="edit" />
            </Link>

            <a
              className="cp mr10 icon-img"
              title="导出数据"
              onClick={this.exportData.bind(null, text)}
            >
              <Icon type="export" />
            </a>
            <a
              title="发布应用"
              className="cp mr10 icon-img"
              onClick={this.confirmPublish.bind(null, text)}
            >
              <Icon type="rocket" />
            </a>

            <a
              title="删除应用"
              className="cp icon-img"
              onClick={this.confirm.bind(null, text)}
            >
              <Icon type="delete" />
            </a>
          </span>
      }
    ];
  }
  exportData(id) {
    const link = document.createElement("a");
    link.href = `${domain}/applications/v1/${id}/excel`;
    link.click();
  }
  confirm(text) {
    Modal.confirm({
      title: "确认",
      content: "确定删除吗？",
      okText: "确定",
      cancelText: "取消",
      onOk: this.deleteApplication.bind(this, text)
    });
  }
  confirmPublish(text) {
    Modal.confirm({
      title: "确认",
      content: "确定发布吗？",
      okText: "确定",
      cancelText: "取消",
      onOk: this.publishApplication.bind(this, text)
    });
  }
  publishApplication(id) {
    publishApplication(id).then(res => {
      if (res.code == "000000") {
        message.success("发布成功");
      } else {
        alert(res.message);
      }
    });
  }
  deleteApplication(id) {
    deleteApplication(id).then(res => {
      if (res.code == "000000") {
        this.getData();
      } else {
        alert(res.message);
      }
    });
  }
  showModal() {
    this.setState({
      visible: true,
      newKey: +new Date()
    });
  }
  handleCancel() {
    this.setState({
      visible: false,
      checkedLanguage: []
    });
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
    this.filterCondition.manufactureId = value;
    this.resetPagination();
    this.getData();
  }

  onSearch(value) {
    this.filterCondition.name = value.trim();
    this.resetPagination();
    this.getData();
  }
  resetPagination() {
    this.setState({
      pagination: { ...this.state.pagination, current: 1 }
    });
  }
  componentDidMount() {
    getVendorList().then(res => {
      this.setState({
        companyList: res.data
      });
    });
    getAppVendorList().then(res=>{
      this.setState({
        appCompanyList:res.data,
      });
    })
    // 获取语言列表
    getLanguageList().then(res => {
      this.setState((state, props) => ({
        languageList: res.data
      }));
    });
    this.getData();
  }
  confirm(text) {
    Modal.confirm({
      title: "确认",
      content: "确定删除吗？",
      okText: "确定",
      cancelText: "取消",
      onOk: this.deleteApplication.bind(this, text)
    });
  }
  getData() {
    this.filterCondition.pageSize = this.state.pagination.pageSize;
    this.filterCondition.pageNo = this.state.pagination.current;
    for (let i in this.filterCondition) {
      if (this.filterCondition[i] == "all" || this.filterCondition[i] == null) {
        delete this.filterCondition[i];
      }
    }
    getAllApplication(this.filterCondition).then(res => {
      if (res.code == "000000") {
        const newPagination = { ...this.state.pagination };
        newPagination.total = res.data.total;
        this.setState({
          pagination: newPagination,
          applicationList: res.data.rows
        });
      } else {
        alert(res.message);
      }
    });
  }
  handleSubmit(e) {
    e.preventDefault();

    this.refs.addApplication.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.languageCodeList = [...new Set(values.languageCodeList)];
        addApplication(values).then(res => {
          if (res.code == "000000") {
            this.getData();
            this.handleCancel();
          } else {
            alert(res.message);
          }
        });
      }
    });
  }
  render() {
    const data = this.state.applicationList.map(item => {
      item.key = item.id;
      return item;
    });

    return (
      <div className="ml50 mr50">
        <Modal
          title="新增应用"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer=""
          width="400"
          maskClosable={false}
          key={this.state.newKey}
        >
          <AddApplication
            ref="addApplication"
            languageList={this.state.languageList || []}
            list={this.state.companyList || []}
            handleSubmit={this.handleSubmit}
            handleCancel={this.handleCancel}
          />
        </Modal>
        <div className="mt40">
          <Filter
            companyChange={this.companyChange}
            onSearch={this.onSearch}
            showModal={this.showModal}
            list={this.state.appCompanyList || []}
          />
        </div>
        <Table
          columns={this.columns}
          dataSource={data}
          pagination={this.state.pagination}
        />
      </div>
    );
  }
}
export default List;
