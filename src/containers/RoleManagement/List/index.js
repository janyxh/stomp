import React, { Component } from 'react';
import { Select, Table, Input,message, Modal } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as roleActions from '../../../actions/role';
import { Link } from 'react-router';

class List extends Component {

  constructor(context, props) {
    super(context, props);
    this.deleteRole = this.deleteRole.bind(this)
    this.filterCondition = {};
    this.state = {
       pagination: {
        total: 0,
        current: 1,
        pageSize: 20,
        showQuickJumper:true,
        onChange: this.onPageChange.bind(this),
      },
      loading: false,
    }
    this.columns = [{
      title: '角色名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '角色描述',
      dataIndex: 'description',
      key: 'description',
    },
   

      ];

  }
  componentDidMount() {
    if (this.editAuthority() || this.deleteAuthority()) {
      this.columns.push(

           {
        title: '操作',
        key: 'id',
        dataIndex: 'id',
        render: (text, record) => (
        <span className="action">
        {

          this.editAuthority() &&  <Link className="mr30" to={`/Content/RoleManagement/AddOrEdit/${text}`}>编辑</Link>
        }
      {
         this.deleteAuthority &&  <a className="cp" onClick = {this.confirm.bind(this,text)} >删除</a>
      }
    </span>
        ),
      }
        )
    }
    this.getData()

  }
      editAuthority(){
   return this.props.auth.currUser.authorityVOList.find((item)=>{
      return item.number == "06020001020300"
    })
  }
      deleteAuthority(){
   return this.props.auth.currUser.authorityVOList.find((item)=>{
      return item.number == "06020001020400"
    })
  }
        addAuthority(){
   return this.props.auth.currUser.authorityVOList.find((item)=>{
      return item.number == "06020001020200"
    })
  }
  confirm(text) {
  Modal.confirm({
    title: '确认',
    content: '确定删除吗？',
    okText: '确定',
    cancelText: '取消',
    onOk:this.deleteRole.bind(this,text),
  });
}
  deleteRole(text) {
    this.props.actions.deleteRole(text).then((res) => {
      if (res.code == "000000") {
          this.getData()
      }else{
          message.error(res.message);
      }
    
    })
  }
    onPageChange(e) {
    const newPagination = {...this.state.pagination};
    newPagination.current = e;
    this.setState({
      pagination:newPagination,
    },()=>{
     this.getData()
    });
   
  }
   getData() {
     this.filterCondition.pageSize = this.state.pagination.pageSize;
    this.filterCondition.pageNo = this.state.pagination.current;
    this.props.actions.getAllRole(this.filterCondition).then((res) => {
      if (res.code == "000000") {
        const newPagination = {...this.state.pagination};
        newPagination.total = res.data.total;
        this.setState({
         pagination:newPagination,
        })
      }
    })
  }

  render() {
    if (!this.props.roleList.loaded) {
      return <div></div>;
    }
    let data = this.props.roleList.data.rows || [];
    data = data.map((item, index) => {
      // item['action'] = item.userId;
      item['key'] = index;
      return item;
    })
    return (
      <div>
      <div className="mt40">
      <div className="mt40 mb50">
      {
        this.addAuthority() &&   <Link to="/Content/RoleManagement/AddOrEdit">
       <div className="fr addProduct btn">
   新增角色
      </div></Link>

      }
     
    <div className="clearfix"></div>
      </div>
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
    roleList: state.roleList,
    auth: state.auth,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(roleActions, dispatch),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
