import React, { PureComponent, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Table, Spin, message } from 'antd';
import moment from 'moment';
import * as testActions from '../../../actions/test';
import { Filter } from '../../../components/TestSearch';
import domain from '../../../actions/domain';

class List extends PureComponent {
  constructor(context, props) {
    super(context, props);
    this.onChange = this.onChange.bind(this);
    this.productChange = this.productChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.saveData = this.saveData.bind(this);
    this.typeChange = this.typeChange.bind(this);
    this.getData = this.getData.bind(this);
    this.state = {
      type: '0',
      loading: false,
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
    };
    this.columns = [
      {
        title: '时间',
        dataIndex: 'testDatetime',
        key: 'testDatetime',
        render: text => moment(text).format('YYYY/MM/DD  HH:mm:ss'),
      },
      {
        title: '测试产品',
        dataIndex: 'productName',
        key: 'productName',
      },
      {
        title: '条码',
        dataIndex: 'code',
        key: 'code',
      }, {
        title: 'Mac地址',
        dataIndex: 'macAddress',
        key: 'macAddress',
      },
      {
        title: '测试结果',
        dataIndex: 'resultFlag',
        key: 'resultFlag',
        render: (text) =>{
          return text === '1' ? '测试通过' : '测试不通过';
        }
      },

      {
        title: '操作',
        key: 'id',
        dataIndex: 'id',
        render: (text) => (

          <Link to={`/Content/TestSearch/View/${text}`}>查看详情</Link>

        ),
      }];
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
  resetPage(cb){
    const newPagination = {
      ...this.state.pagination,
    };
    newPagination.current = 1;
    this.setState({
      pagination: newPagination,
    },()=>{
      cb && cb();
    });
  }
  typeChange(value) {
    this.filterCondition.resultFlag = value;
    this.resetPage(this.getData);
  }
  onChange(value) {
    const beginDateTime = value[0].set({
      hour: 0,
      minute: 0,
      second: 0,
    }).valueOf();
    const endDateTime = value[1].set({
      hour: 23,
      minute: 59,
      second: 59,
    }).valueOf();
    if (value[1].diff(value[0], 'days') > 90) {
      message.error('查询时间跨度不能大于90天!');
      return;
    }
    this.filterCondition.beginDateTime = beginDateTime;
    this.filterCondition.endDateTime = endDateTime;
    this.resetPage(this.getData);
  }
  productChange(value) {
    this.filterCondition.productName = value.trim();
    this.resetPage(this.getData);
  }
  onSearch(value) {
    this.filterCondition.searchText = value.trim();
    this.resetPage(this.getData);
  }
  saveData() {
    let url = '';
    for (let i in this.filterCondition) {
      if (this.filterCondition[i] == "all" || this.filterCondition[i] == null) {
        delete this.filterCondition[i];
      }
    }
    for (const i in this.filterCondition) {
      url += `${i}=${this.filterCondition[i]}&`;
    }
    const link = document.createElement('a');
    link.href = `${domain}/protests/v1/details/excel?${url}`;
    link.click();
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
    this.setState({
      loading: true,
    });
    return this.props.actions.load(this.filterCondition).then((res) => {
    if (res.code == '000000') {
      const newPagination = { ...this.state.pagination };
        newPagination.total = res.data.total;
        this.setState({
          pagination: newPagination
        });
    }else{
      alert(res.message);
    }

      this.setState({
        loading: false,
      });
    })
  }
  componentDidMount() {
    // 默认数据

    // 昨天
    this.filterCondition.beginDateTime = moment().subtract(1, 'day').set({
      hour: 0,
      minute: 0,
      second: 0,
    }).valueOf();
    this.filterCondition.endDateTime = moment().subtract(1, 'day').set({
      hour: 23,
      minute: 59,
      second: 59,
    }).valueOf();

    // 测试通过
    this.filterCondition.resultFlag = '1';

    const promises = [];
  promises.push(this.getData());
  promises.push(this.props.actions.loadProductName());
  this.setState({
    loading: true,
  });
  Promise.all(promises).then((res) => {
    this.setState({
      loading: false,
    });
  });
  }
  render() {
    const productNameList = this.props.productNameList.data || [];
    const test = this.props.list.data || {
      rows: [],
      total: 0
    };
    return (
      <Spin  tip="加载中..." spinning={this.state.loading} size="large">
      <div className="ml50 mr50">
      <div className="mt40 mb20">

      <Filter
      onChange = {this.onChange}
      typeChange = {this.typeChange}
      productChange = {this.productChange}
      onSearch = {this.onSearch}
      saveData = {this.saveData}
      list = {productNameList}
      />
      </div>
      <h3>

      <div>共找到<span style={{
        color: '#268ad4'
      }}>{test.total}</span>条测试记录</div>
      </h3>
      <div className="mt20 mb20" style={{
        height: "1",
        borderBottom: "1px solid #e8e8e8"
      }} ></div>
        <Table columns={this.columns} dataSource={test.rows} pagination = {
      this.state.pagination
      } />
      </div>
      </Spin>
      );
  }
}
const propTypes = {
  actions: PropTypes.object.isRequired,
  productNameList: PropTypes.array.isRequired,
  list: PropTypes.object.isRequired,
};
List.propTypes = propTypes;
function mapStateToProps(state) {
  return {
    list: state.test.list,
    productNameList: state.test.productNameList,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(testActions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(List);
