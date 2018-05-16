import React, { PureComponent } from "react";
import { Select, Table, Input, Modal } from "antd";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as userActions from "../../../actions/user";
import { Link } from "react-router";
import { Filter } from "../../../components/AccountManagement";
const Option = Select.Option;
const Search = Input.Search;
class List extends PureComponent {
  constructor(context, props) {
    super(context, props);
    this.handleChange = this.handleChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.filterCondition = {};

    this.state = {
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
        title: "用户名",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "姓名",
        dataIndex: "nickname",
        key: "nickname"
      },
      {
        title: "手机号",
        dataIndex: "mobile",
        key: "mobile"
      },
      {
        title: "邮件名称",
        dataIndex: "email",
        key: "email"
      },
      {
        title: "角色",
        dataIndex: "roleName",
        key: "roleName"
      }
    ];
  }
  deleteUser(id) {
    this.props.actions.deleteUser(id).then(() => {
      this.getUserList();
    });
  }
  onSearch(value) {
    const name = value.trim();
    this.filterCondition = {
      name
    };
    this.onPageChange(1);
  }
  handleChange() {}
  componentDidMount() {
    if (this.deleteAuthority() || this.editAuthority()) {
      this.columns.push({
        title: "操作",
        key: "id",
        dataIndex: "id",
        render: (text, record) => {
          return (
            <span className="action">
              {this.editAuthority() &&
                <Link
                  className=""
                  to={`/Content/AccountManagement/AddOrEdit/${text}`}
                >
                  编辑
                </Link>}
              {text != this.props.auth.currUser.id &&
                this.deleteAuthority() &&
                <a className="ml30 cp" onClick={this.confirm.bind(this, text)}>
                  删除
                </a>}

            </span>
          );
        }
      });
    }
    this.getUserList();
  }
  onPageChange(e) {
    const newPagination = { ...this.state.pagination };
    newPagination.current = e;
    this.setState(
      {
        pagination: newPagination
      },
      () => {
        this.getUserList();
      }
    );
  }
  getUserList() {
    this.filterCondition.pageSize = this.state.pagination.pageSize;
    this.filterCondition.pageNo = this.state.pagination.current;
    this.props.actions.getAllUser(this.filterCondition).then(res => {
      if (res.code == "000000") {
        const newPagination = { ...this.state.pagination };
        newPagination.total = res.data.total;
        this.setState({
          pagination: newPagination
        });
      }
    });
  }
  confirm(text) {
    Modal.confirm({
      title: "确认",
      content: "确定删除吗？",
      okText: "确定",
      cancelText: "取消",
      onOk: this.deleteUser.bind(this, text)
    });
  }
  editAuthority() {
    return this.props.auth.currUser.authorityVOList.find(item => {
      return item.number == "06010001010300";
    });
  }
  deleteAuthority() {
    return this.props.auth.currUser.authorityVOList.find(item => {
      return item.number == "06010001010400";
    });
  }
  addAuthority() {
    return this.props.auth.currUser.authorityVOList.find(item => {
      return item.number == "06010001010200";
    });
  }
  render() {
    if (!this.props.userList.loaded || !this.props.userList.data) {
      return <div />;
    }
    let data = this.props.userList.data.rows;
    data = data.map((item, index) => {
      // item['action'] = item.userId;
      item["key"] = index;
      return item;
    });

    return (
      <div>
        <div className="mt40">
          <Filter onSearch={this.onSearch} addAuthority={this.addAuthority()} />
        </div>
        <div className="ml48">
          <Table
            columns={this.columns}
            dataSource={data}
            pagination={this.state.pagination}
          />

        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    userList: state.userList,
    auth: state.auth
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(List);
