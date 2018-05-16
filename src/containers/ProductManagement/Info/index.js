import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal} from 'antd';
import * as productActions from '../../../actions/product';
import { Info as CompInfo } from '../../../components/ProductManagement';
class Info extends PureComponent {
  componentDidMount() {
  
    this.props.actions.getProduct(this.getProductId());
  }
  getProductId() {
    const router = this.context.router;
    return router.params.id;
  }
  confirm() {
  Modal.confirm({
    title: '确认',
    content: '确定删除吗？',
    okText: '确定',
    cancelText: '取消',
    onOk:this.deleteProduct.bind(this),
  });
}
  deleteProduct() {

    this.props.actions.deleteProduct(this.getProductId()).then((res)=>{
      if (res.code == "000000") {

            const router = this.context.router;
            router.push('/Content/ProductManagement/List');
      }else{
        alert(res.message);
      }
    });
  }
  deleteAuthority(){
   return this.props.auth.currUser.authorityVOList.find((item)=>{
      return item.number == "04000001050000"
    })
  }
    editAuthority(){
   return this.props.auth.currUser.authorityVOList.find((item)=>{
      return item.number == "04000001030000"
    })
  }
  getPageNumber(){
   const router = this.context.router;
    return router.location.query.currentPage;
  }

  render() {
    if (!this.props.product.loaded) {
      return <div></div>;
    }
    return <CompInfo data={this.props.product.data} currentPage = {this.getPageNumber()} deleteProduct={this.confirm.bind(this)} editAuthority={this.editAuthority()} deleteAuthority={this.deleteAuthority()}  />;
  }
}
Info.contextTypes = {
  router: React.PropTypes.object,
};
function mapStateToProps(state) {
  return {
    product: state.product,
    auth: state.auth,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(productActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Info);

