import React, { PureComponent } from 'react';
import { Select, Table, Input, Spin } from 'antd';
import moment from 'moment'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getFirmwarUpgradeLog, getAllOperator } from '../../actions/firmware';
import { LogsFilter } from '../../components/FirmwareManagement';
import failIcon from './fail.svg';
import successIcon from './success.svg';
import ingIcon from './ing.svg';
class UpgradeLogs extends PureComponent {
  constructor(context, props) {
    super(context, props);
    this.onSearch = this.onSearch.bind(this);
    this.peopleChange = this.peopleChange.bind(this);

    this.state = {
      type: '0',
      pagination: {
        total: 0,
        current: 1,
        pageSize: 20,
        showQuickJumper: true,
        onChange: this.onPageChange.bind(this),
      }

    }
    this.filterCondition = {
      type: '0',
    }
    this.columns = [
      {
        title: '编号',
        dataIndex: 'number',
        key: 'number',
      },
      {
        title: 'Mac地址',
        dataIndex: 'uid',
        key: 'uid',
      },
      {
        title: '用户帐号',
        dataIndex: 'account365',
        key: 'account365',
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
        title: '操作人',
        dataIndex: 'createAccountName',
        key: 'createAccountName',
      },
      {
        title: '操作时间',
        dataIndex: 'createTime',
        key: 'createTime',
        render: text => moment(text).format('YYYY/MM/DD  HH:mm:ss'),
      },
      {
        title: '升级结果',
        dataIndex: 'result',
        key: 'result',
        render: (text) => {
          if (text == '2') {
            return <div className="upgradeDes"><img src={ingIcon} className="mr5" width="20" height="20" />
          升级中
</div>
          }
          if (text == '1') {
            return <div className="upgradeDes" ><img src={failIcon} className="mr5" width="20" height="20" />
          升级失败
</div>
          }
          if (text == '0') {
            return <div className="upgradeDes" ><img src={successIcon} className="mr5"  width="20" height="20" />
          升级成功
</div>
          }
        }
      }


    ]
  }
  componentDidMount() {
    const router = this.context.router;
    const flag = router.location.query.flag;
    if (flag) {
      this.setState({
        type: flag,
      });
      this.filterCondition.type = flag;
    }
    ;
    getAllOperator().then(res => {
      this.setState({
        operator: res.data,
      });
      // 默认选中 当前用户
      this.filterCondition.createAccount = this.props.auth.currUser.name;
      this.getData();
    });

  }
  onSearch(value) {
    this.filterCondition.searchText = value.trim();
    this.getData();
  }
  toggleLogs(value) {
    this.setState({
      type: value,
    });
    this.filterCondition.type = value;
    this.getData();
  }
  peopleChange(value) {
    this.filterCondition.createAccount = value;
    this.getData();
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
  getData() {
    this.filterCondition.pageSize = this.state.pagination.pageSize;
    this.filterCondition.pageNo = this.state.pagination.current;
    // this.filterCondition.type = this.state.type;
    for (let i in this.filterCondition) {
      if (this.filterCondition[i] == "all" || this.filterCondition[i] == null) {
        delete this.filterCondition[i];
      }
    }
    this.props.actions.getFirmwarUpgradeLog(this.filterCondition).then((res) => {
      if (res.code == "000000") {
        const newPagination = {
          ...this.state.pagination
        };
        newPagination.total = res.data.total;
        this.setState({
          pagination: newPagination,

        })
      }
    })
  }
  render() {
    if (!this.props.firmwarUpgradeLog.loaded) {
      return <div></div>;
    }
    const data = this.props.firmwarUpgradeLog.data.rows;

    return (<div>
     <div className="mt40">
     <LogsFilter
      onSearch = {this.onSearch}
      peopleChange = {this.peopleChange}
      peopleList={ this.state.operator || []}
      defaultValue = { this.props.auth.currUser.name}
      />
        </div>
     <div className="ml48" >

      <div className="tab-title mt55 mb20">
      <div className={this.state.type == '0' ? "tab-option mr30" : "tab-option mr30 notSelected"} onClick={this.toggleLogs.bind(this, '0')}>
      升级记录
      </div>
      <div className={this.state.type == '1' ? "tab-option " : "tab-option notSelected"} onClick={this.toggleLogs.bind(this, '1')} >
      验证记录
      </div>
      <div className="clearfix"></div>
      </div>
     <Table
      columns={this.columns}
      dataSource={data}
      pagination = {
      this.state.pagination
      } /></div>
      </div>
      );
  }
}

function mapStateToProps(state) {
  return {
    firmwarUpgradeLog: state.firmwarUpgradeLog,
    auth: state.auth,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getFirmwarUpgradeLog,
    }, dispatch),
  };
}
UpgradeLogs.contextTypes = {
  router: React.PropTypes.object
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpgradeLogs);
