import React, { PureComponent, PropTypes, Component } from "react";
import { Checkbox } from "antd";

class CategorySelect extends Component {
  constructor(props, context) {
    super(props, context);
    this.onClick = this.onClick.bind(this);
    this.onCheckAllChange = this.onCheckAllChange.bind(this);
    // this.onChange = this.onChange.bind(this);
    this.state = {
      // childernList: [],
      childernList: [],
      dataList: [
        {
          name: "智能主机",
          value: 1,
          childern: [
            {
              name: "智能插线板",
              value: 12
            },
            {
              name: "智能插线板",
              value: 13
            },
            {
              name: "智能插线板",
              value: 14
            },
            {
              name: "智能插线板",
              value: 15
            }
          ]
        },
        {
          name: "智能插座",
          value: 2,
          childern: [
            {
              name: "小主机",
              value: 33453
            }
          ]
        },
        {
          name: "智能主机",
          value: 3453,
          childern: [
            {
              name: "智能插线板",
              value: 12345345
            }
          ]
        },
        {
          name: "智能插座",
          value: 345342,
          childern: [
            {
              name: "小主机",
              value: 44454
            }
          ]
        },
        {
          name: "智能主机",
          value: 1454,
          childern: [
            {
              name: "智能插线板",
              value: 12565
            }
          ]
        },
        {
          name: "智能插座",
          value: 234534,
          childern: [
            {
              name: "小主机",
              value: 334534534
            }
          ]
        }
      ]
    };
  }
  onClick(value) {
    const childernList = value.childern;
    this.setState({
      childernList
    });
  }
  onChange = e => {
    const value = e.target.value;

    const newDataList = this.props.list;
    const loop = dataList => {
      for (const val in dataList) {
        if (Array.isArray(dataList[val].childern)) {
          loop(dataList[val].childern);
        }
        if (dataList[val].value == value) {
          dataList[val].checked = e.target.checked;
        }
      }
    };
    loop(newDataList);
    for (let i = 0; i < newDataList.length; i++) {
      const checkedChildern = newDataList[i].childern.filter(item => {
        return item.checked == true;
      });
      if (newDataList[i].childern.length > 0) {
      newDataList[i].checked =
        checkedChildern.length == newDataList[i].childern.length;
      }
    }
    this.setState({
      dataList: newDataList
      // checkedList
      // indeterminate:
      //  !!checkedList.length && checkedList.length < plainOptions.length,
      // checkAll: checkedList.length === plainOptions.length
    });
  };
  onCheckAllChange(e) {
    console.log(e.target.value)
    const value = e.target.value;
    const newDataList = this.props.list;
    const loop = dataList => {
      for (const val in dataList) {
        if (dataList[val].value == value) {
          dataList[val].checked = e.target.checked;
          for (let i = 0; i < dataList[val].childern.length; i++) {
            dataList[val].childern[i].checked = e.target.checked;
          }
        }
      }
    };
    loop(newDataList);
    this.setState({
      dataList: newDataList
      // checkedList: e.target.checked ? plainOptions : []
      // indeterminate: false,
      //checkAll: e.target.checked
    });
  }
  render() {

    const topLevelComp = this.props.list.map(item => {
      const checkedChildern = item.childern.filter(item => {
        return item.checked == true;
      });
      const indeterminate =
        !!checkedChildern.length &&
        checkedChildern.length < item.childern.length;
      return (
        <div
          className="topLevelItem"
          key={item.value}
          onClick={this.onClick.bind(null, item)}
        >
          <Checkbox
            indeterminate={indeterminate}
            onChange={this.onCheckAllChange}
            value={item.value}
            checked={item.checked}
          >
            {item.name}
          </Checkbox>
        </div>
      );
    });
    const secondLevelComp = this.state.childernList.map(item => {
      return (
        <div key={item.value} className="topLevelItem">

          <Checkbox
            onChange={this.onChange}
            value={item.value}
            checked={item.checked}
            //checked={this.state.checkAll}
          >
            {item.name}
          </Checkbox>
        </div>
      );
    });

    return (
      <div className="categorySelect">
        <div className="fl">
          <div className="categorySelectTitle">
            一级分类
          </div>
          <div className="topLevel">

            {topLevelComp}
          </div>
          <div />
        </div>
        <div className="fl">

          <div className="categorySelectTitle">
            二级分类
          </div>
          <div className="topLevel">

            {secondLevelComp}
          </div>
        </div>
        <div className="clearfix" />
      </div>
    );
  }
}
const propTypes = {};
CategorySelect.propTypes = propTypes;
export default CategorySelect;
