import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as vendorActions from '../../../actions/vendor';
import { VendorList } from '../../../components/VendorManagement';
class List extends PureComponent {
  constructor(context, props) {
    super(context, props);
    this.onSearch = this.onSearch.bind(this);
    this.deleteVendor = this.deleteVendor.bind(this);
    this.selectChange = this.selectChange.bind(this);
    this.state = {
      pagination: {
        total: 0,
        current: 1,
        pageSize: 20,
        showQuickJumper:true,
        onChange: this.onPageChange.bind(this),
      }
    }
    this.filterCondition = {};
  }
  componentDidMount() {
    this.getData();
  }
  onSearch(value) {
    const keyword = value.trim();
    this.filterCondition.name = keyword;
    this.onPageChange(1);
  }
  selectChange(value) {
    const status = value;
    this.filterCondition.offlineFlag = status;
    this.onPageChange(1);

  }
  onPageChange(e) {
    const newPagination = {...this.state.pagination};
    newPagination.current = e;
    this.setState({
      pagination:newPagination,
    },()=>{
       this.getData();
    });
   
  }
  getData() {
    this.filterCondition.pageSize = this.state.pagination.pageSize;
    this.filterCondition.pageNo = this.state.pagination.current;
    this.props.actions.getAllVendor(this.filterCondition).then((res) => {
      if (res.code == "000000") {
        const newPagination = {...this.state.pagination};
        newPagination.total = res.data.total;
        this.setState({
         pagination:newPagination,
        })
      }
    })
  }
  deleteVendor(id) {
    this.props.actions.deleteVendor(id).then((res) => {
      this.getData();
    });
  }
  // 获取厂商所有权限
  addAuthority(){
   return this.props.auth.currUser.authorityVOList.find((item)=>{
      return item.number == "03000001020000"
    })
  }
  editAuthority(){
   return this.props.auth.currUser.authorityVOList.find((item)=>{
      return item.number == "03000001030000"
    })
  }

  render() {
    if (!this.props.vendorList.loaded) {
      return <div></div>;
    }
    // 厂商的权限
    const authorityList = this.props.auth.currUser.authorityVOList.filter((item)=>{
      return item.parentNumber == "03000001000000";
    }) 
    return (<div>
    <VendorList
      addAuthority = {this.addAuthority()}
      editAuthority = {this.editAuthority()}
 
      vendorList={this.props.vendorList.data.rows}
      onSearch={this.onSearch}
      selectChange={this.selectChange}
      deleteVendor = {this.deleteVendor}
      pagination = {
      this.state.pagination
      }
      />
    </div>);
  }
}
function mapStateToProps(state) {
  return {
    vendorList: state.vendorList,
    auth: state.auth,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(vendorActions, dispatch),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);

