import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as productActions from '../../../actions/product';
import { GetProductType, GetChildProductType, getVendorList, GetTechnicalType, GetChildTechnicalType } from '../../../actions';
import { AddOrEdit as CompAddOrEdit } from '../../../components/ProductManagement';
class AddOrEdit extends PureComponent {
  constructor(context, props) {
    super(context, props);
    this.onShowSecond = this.onShowSecond.bind(this);
    this.state = {
      second: false,
      id: null,
      first: true,
    };
  }
  componentDidMount() {
    if (this.isUpdate()) {
      this.setState({
        second: true,
      });
    }
  }
  onShowSecond(id) {
    this.setState({
      first: false,
      second: true,
      id,
    });
  }
  isUpdate() {
    const productId = this.getProductId();
    if (typeof productId != 'undefined') {
      return true;
    }
    return false;
  }
  getProductId() {
    const router = this.context.router;
    return router.params.id;
  }
  render() {
    return (
      <CompAddOrEdit
        first = {this.state.first}
        second = {this.state.second}
        id = {this.state.id}
        onShowSecond = {this.onShowSecond}
        checkModelId = {productActions.checkModelId}
        product={this.props.product}
        addProduct={this.props.actions.addProduct}
        updateProduct={this.props.actions.updateProduct}
        getProduct={this.props.actions.getProduct}
        GetProductType = {GetProductType}
        GetChildProductType = {GetChildProductType}
        getVendorList = {getVendorList}
        GetTechnicalType = { GetTechnicalType }
        GetChildTechnicalType = { GetChildTechnicalType }
        updateTechniqueInfo = { productActions.updateTechniqueInfo }
        addTechniqueInfo = { productActions.addTechniqueInfo }
      />);
  }
}
AddOrEdit.contextTypes = {
  router: React.PropTypes.object,
};
function mapStateToProps(state) {
  return {
    product: state.product,
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
)(AddOrEdit);

