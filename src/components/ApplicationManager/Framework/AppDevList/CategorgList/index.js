import React, { PureComponent, PropTypes, Component } from "react";
import { Icon, Input, Modal } from "antd";
import immutable from "immutable";
import * as applicationActions from "../../../../../actions/application";
const plainOptions = [12, 14, 13, 15];
class CategorgList extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      list: this.props.topCategory,
      checkedList: [],
      secondCategory: this.props.secondCategory
    };
  }
  componentWillReceiveProps(nextProps) {
    if (
      !immutable.is(
        immutable.fromJS(nextProps.topCategory),
        immutable.fromJS(this.props.topCategory)
      )
    ) {
      this.setState({
        list: nextProps.topCategory
      });
    }
    if (this.props.deleteId == this.state.checkedCategoryId) {
      this.clearSecondCategory();
    }
  }
  confirm = (text, name) => {
    Modal.confirm({
      title: "确认",
      content: name != "device" ? "删除分类会一并删除分类下的设备，是否要继续删除？" : "是否要删除此设备？",
      okText: "确定",
      cancelText: "取消",
      onOk: this.delete.bind(this, text)
    });
  };
  delete = value => {
    const id = this.props.applicationId;
    const categoryId = value;
    applicationActions
      .deleteApplicationCategory({ id, categoryId })
      .then(() => {
        const list = this.state.secondCategory.filter(item => {
          return item.id != value;
        });
        this.setState({
          secondCategory: list
        });
        // this.isSecondCategory(value);
      });
  };
  editDone = ({ value, id, status }) => {
    if (status == "done") {
      const appId = this.props.applicationId;
      const categoryId = id;
      const data = {
        id: appId,
        categoryId,
        name: value
      };

      applicationActions.updateApplicationCategory(data).then(res => {
        const list = this.state.secondCategory.map(item => {
          if (item.id == id) {
            item.editable = false;
            item.name = res.data.name;
          }
          return item;
        });
        this.setState({
          secondCategory: list
        });
      });

      // 更新代码
    } else {
      this.cancelEdit(id);
    }
  };
  clearSecondCategory() {
    this.setState({ secondCategory: [] });
  }
  getApplicationSecondCategory(categoryId) {
    const id = this.props.applicationId;

    applicationActions
      .getApplicationSecondCategory(id, categoryId)
      .then(res => {
        this.setState({
          secondCategory: res.data.categoryVOList || []
        });
      });
  }
  setUp = value => {
    const id = this.props.applicationId;
    const categoryId = value;

    applicationActions
      .updateApplicationCategoryOrder({ id, categoryId })
      .then(res => {
        this.getApplicationSecondCategory(this.state.checkedCategoryId);
      });
  };
  cancelEdit(value) {
    const list = this.state.list;
    const loop = arry => {
      for (const i in arry) {
        console.log(arry[i].value);
        if (arry[i].id == value) {
          arry[i].editable = false;
        }
        if (Array.isArray(arry[i].categoryVOList)) {
          loop(arry[i].categoryVOList);
        }
      }
    };
    const secondList = this.state.secondCategory;
    loop(secondList);

    this.setState({
      topCategory: list,
      secondCategory: secondList
    });
  }
  edit = value => {
    const list = this.state.list;
    const loop = arry => {
      for (const i in arry) {
        if (arry[i].id == value) {
          arry[i].editable = true;
        }
        if (Array.isArray(arry[i].childern)) {
          loop(arry[i].childern);
        }
      }
    };
    loop(list);
    const secondCategory = this.state.secondCategory;
    loop(secondCategory);
    this.setState({
      list,
      secondCategory
    });
  };

  onClick = (e, categoryId) => {
    const id = this.props.applicationId;

    this.props.getApplicationSecondCategory(id, categoryId).then(res => {
      this.setState({
        secondCategory: res.data.categoryVOList || [],
        checkedCategoryId: categoryId
      });
    });
  };

  render() {
    const topLevelComp = this.state.list.map(item => {
      return (
        <TopLevel
          editDone={this.props.editDone}
          edit={this.edit.bind(null, item.id)}
          delete={this.props.delete}
          setUp={this.props.setUp}
          onClick={this.onClick}
          key={item.value}
          data={item}
          checkedCategoryId={this.state.checkedCategoryId}
        />
      );
    });
    const secondLevelComp = this.state.secondCategory.map(item => {
      return (
        <TopLevel
          editDone={this.editDone}
          edit={this.edit.bind(null, item.id)}
          delete={() => {
            this.confirm(item.id, "device");
          }}
          setUp={this.setUp}
          key={item.id}
          data={item}
        />
      );
    });
    return (
      <div className="categorySelect">
        <div className="fl">
          <div className="categorySelectTitle">
            一级分类
            <a>
              <Icon
                style={{ fontSize: 14, marginLeft: 5 }}
                onClick={this.props.show}
                type="plus-square-o"
              />
            </a>
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
CategorgList.propTypes = propTypes;
export default CategorgList;

class TopLevel extends Component {
  constructor(context, props) {
    super(context, props);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.state = {
      value: this.props.data.name,
      visable: false
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.data.id != this.props.data.id) {
      this.setState({
        value: nextProps.data.name
      });
    }
  }
  handleChange(e) {
    const value = e.target.value;
    this.setState({
      value
    });
  }
  show() {
    this.setState({
      visable: true
    });
  }
  hide() {
    this.setState({
      visable: false
    });
  }
  render() {
    const data = this.props.data;
    return (
      <div
        className={
          this.props.checkedCategoryId == data.id
            ? "topLevelItem topLevelItem-checked"
            : "topLevelItem "
        }
        onClick={e => {
          this.props.onClick && this.props.onClick(e, data.id);
        }}
        onMouseEnter={this.show}
        onMouseLeave={this.hide}
      >
        {data.editable
          ? <div>

              <Input
                value={this.state.value}
                style={{ width: 220, marginLeft: 5, marginTop: 3 }}
                onChange={e => this.handleChange(e)}
              />
              <a
                className="mr5 ml5"
                onClick={this.props.editDone.bind(null, {
                  value: this.state.value,
                  id: this.props.data.id,
                  status: "done"
                })}
              >
                <Icon type="check" />
              </a>
              <a>
                <Icon
                  type="close"
                  onClick={this.props.editDone.bind(null, {
                    value: this.state.value,
                    id: this.props.data.id,
                    status: "cancel"
                  })}
                />
              </a>

            </div>
          : <div>
              {data.name}
              {this.state.visable
                ? <span className="fr">
                    <a>
                      <Icon
                        type="edit"
                        className="mr5"
                        onClick={this.props.edit.bind(this, data.value)}
                      />
                    </a>
                    <a>
                      <Icon
                        type="delete"
                        className="mr5"
                        onClick={this.props.delete.bind(this, data.id)}
                      />
                    </a>
                    {data.sequence > 1 &&
                      <a>
                        <Icon
                          onClick={this.props.setUp.bind(this, data.id)}
                          type="to-top"
                        />
                      </a>}

                  </span>
                : null}
            </div>}
      </div>
    );
  }
}
