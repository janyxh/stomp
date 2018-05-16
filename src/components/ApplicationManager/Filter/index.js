import React, { PureComponent, PropTypes } from "react";
import { Input, Select, Button } from "antd";

const Option = Select.Option;
const Search = Input.Search;
class Filter extends PureComponent {
  render() {
    const compOptions = this.props.list.map(item => {
      return <Option key={item.id}>{item.name}</Option>;
    });
    return (
      <div>

        <div className="fl mr30">
          <Select
            defaultValue="all"
            style={{
              width: 170,
              height: 40
            }}
            onChange={this.props.companyChange}
          >
            <Option key="all">全部厂商</Option>
            {compOptions}
          </Select>
        </div>

        <div className="fl mr30">
          <Search
            className="searchProduct"
            placeholder="请输入APP名称"
            style={{
              width: 218,
              height: 40
            }}
            onSearch={this.props.onSearch}
          />
        </div>
        <Button className="fr" type="primary" onClick={this.props.showModal}>
          新增应用
        </Button>
        <div className="clearfix" />

      </div>
    );
  }
}
const propTypes = {
  showModal: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  platformChange: PropTypes.func.isRequired,
  companyChange: PropTypes.func.isRequired
};
Filter.propTypes = propTypes;
export default Filter;
