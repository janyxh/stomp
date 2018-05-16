import React, { PureComponent } from 'react';
import { BasicInfo, HostInfo } from '../';


class AddOrEdit extends PureComponent {
  render() {
    return (
      <div>
      {
        this.props.first &&
      <BasicInfo
        second = {this.props.second}
        onShowSecond = {this.props.onShowSecond}
        product= {this.props.product}
        updateProduct = {this.props.updateProduct}
        addProduct = {this.props.addProduct}
        getProduct={this.props.getProduct}
        GetProductType = {this.props.GetProductType}
        GetChildProductType = {this.props.GetChildProductType}
        getVendorList = {this.props.getVendorList}
      />
      }
      {
        this.props.second &&
      <HostInfo
        id= {this.props.id} 
        product= {this.props.product}
        checkModelId = {this.props.checkModelId}
        updateProduct = {this.props.updateProduct}
        addProduct = {this.props.addProduct}
        getProduct={this.props.getProduct}
        GetTechnicalType = { this.props.GetTechnicalType }
        GetChildTechnicalType = { this.props.GetChildTechnicalType }
        updateTechniqueInfo = {this.props.updateTechniqueInfo}
        addTechniqueInfo = {this.props.addTechniqueInfo}
      />
      }
      </div>
    );
  }
}
export default AddOrEdit;
