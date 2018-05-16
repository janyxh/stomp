import React, { PureComponent, Component, PropTypes } from "react";
import ConfigInfo from "../ConfigInfo";
import { Button, Input, Popconfirm, Icon, Modal, message } from "antd";
import * as applicationAtions from "../../../../../actions/application";

class ConfigList extends Component {
  constructor(context, props) {
    super(context, props);
    this.state = {
      ConfigInfo: {
        nameLangVOList: []
      },
      showNewCategory: false,
      list: [
        {
          name: "分组1",
          value: "0",
          childern: [
            {
              name: "支架鼎折覆餗",
              value: "1"
            },
            {
              name: "支架鼎折覆餗",
              value: "3"
            },
            {
              name: "支架鼎折覆餗",
              value: "133"
            }
          ]
        },
        {
          name: "分组2",
          value: "2",
          childern: [
            {
              name: "支架鼎折覆餗",
              value: "234"
            },
            {
              name: "支架鼎折覆餗",
              value: "33453"
            },
            {
              name: "支架鼎折覆餗",
              value: "3454"
            }
          ]
        },
        {
          name: "分组3",
          value: "5",
          childern: [
            {
              name: "支架鼎折覆餗",
              value: "21231"
            },
            {
              name: "支架鼎折覆餗",
              value: "345343"
            },
            {
              name: "支架鼎折覆餗",
              value: "3453454"
            }
          ]
        },
        {
          name: "分组4",
          value: "6",
          childern: [
            {
              name: "支架鼎折覆餗",
              value: "2345345"
            },
            {
              name: "支架鼎折覆餗",
              value: "3453453"
            },
            {
              name: "支架鼎折覆餗",
              value: "4345345"
            }
          ]
        }
      ]
    };
  }
  componentDidMount() {
    this.getData().then(() => {
      const id = this.state.list[0].childern[0].id;
      console.log("ok");
      this.onClick(id, 0);
    });
  }
  getApplicationId = () => {
    const router = this.context.router;
    return router.params.id;
  };
  getData = () => {
    const id = this.getApplicationId();
    return applicationAtions.getApplicationMemu(id).then(res => {
      console.log(res.data);
      const list = res.data;
      const newList = [];
      list.map(item => {
        const childern = item.memberVOList.map(ele => {
          return {
            value: ele.id,
            name: ele.name,
            ...ele
          };
        });
        newList.push({
          childern,
          name: item.groupName,
          value: item.groupIndex
        });
      });
      this.setState({
        list: newList
      });
    });
  };
  setUp(value) {
    const id = this.getApplicationId();
    const groupIndex = value;
    applicationAtions
      .updateApplicationGroupOrder({ id, groupIndex })
      .then(res => {
        this.getData();
      });
  }
  setUpMember = value => {
    const id = this.getApplicationId();
    const memberId = value;
    applicationAtions.updateAppGroupMemberOrder({ id, memberId }).then(res => {
      this.getData();
    });
  };
  edit(value) {
    const list = this.state.list;
    const loop = arry => {
      for (const i in arry) {
        if (arry[i].value == value) {
          arry[i].editable = true;
        }
        if (Array.isArray(arry[i].childern)) {
          loop(arry[i].childern);
        }
      }
    };
    loop(list, value);

    this.setState();
  }
  cancelEdit(value) {
    const list = this.state.list;
    const loop = arry => {
      for (const i in arry) {
        console.log(arry[i].value);
        if (arry[i].value == value) {
          arry[i].editable = false;
        }
        if (arry[i].value == "") {
          delete arry[i];
          return;
        }
        if (Array.isArray(arry[i].childern)) {
          loop(arry[i].childern);
        }
      }
    };

    loop(list, value);

    this.setState();
  }
  editDone({ value, id, status, memberId }) {
    if (status == "done") {
      const appId = this.getApplicationId();
      const data = {
        id: appId,
        groupIndex: id + 1,
        memberName: value
      };
      if (memberId) {
        data.memberId = memberId;
        data.nameLangVOJson = [];
        applicationAtions.updateAppGroupMember(data).then(() => {
          this.getData();
        });
      } else {
        applicationAtions.addApplicationGroupMember(data).then(() => {
          this.getData();
        });
      }
    } else {
      this.cancelEdit(id);
    }
  }
  confirm = text => {
    Modal.confirm({
      title: "确认",
      content: "删除此分组会一并删除分组下的功能模块，请确认是否继续删除？",
      okText: "确定",
      cancelText: "取消",
      onOk: this.delete.bind(this, text)
    });
  };
  delete(value) {
    //
    const id = this.getApplicationId();
    const groupIndex = value;
    applicationAtions
      .deleteApplicationGroup({
        id,
        groupIndex
      })
      .then(() => {
        this.setState({
          ConfigInfo: null
        });
        this.getData();
      });
  }
  confirmMember = value => {
    Modal.confirm({
      title: "确认",
      content: "请确认是否继续删除此功能模块？",
      okText: "确定",
      cancelText: "取消",
      onOk: this.deleteMember.bind(this, value)
    });
  };
  deleteMember = value => {
    const id = this.getApplicationId();
    const memberId = value;
    applicationAtions
      .deleteApplicationGroupMember({
        id,
        memberId
      })
      .then(() => {
        this.setState({
          ConfigInfo: null
        });
        this.getData();
      });
  };
  showNewCategory() {
    this.setState({
      showNewCategory: true
    });
  }
  hideNewCategory() {
    this.setState({
      showNewCategory: false
    });
  }
  saveNewCategory(value) {
    const id = this.getApplicationId();
    const memberName = value;
    applicationAtions.addApplicationGroup({ id, memberName }).then(res => {
      this.getData();
    });
    console.log(value);
    this.hideNewCategory();
    //
  }
  newCategory = id => {
    const { list } = this.state;
    for (let i = 0; i < list.length; i++) {
      if (list[i].value == id) {
        list[i].childern.push({
          name: "",
          value: "",
          editable: true
        });
      }
    }
    this.setState((state, props) => ({ list }));
  };
  onClick = (id, index) => {
    console.log(id);
    const data = this.state.list[index].childern.find(item => {
      if (item.id == id) {
        return item;
      }
    });
    this.setState((state, props) => ({ checkId: id, ConfigInfo: data }));
  };
  saveConfigInfo = () => {
    const btn = this.refs.configInfo.refs.btn;
  };
  handleSubmit = e => {
    const configInfo = this.refs.configInfo;

    e.preventDefault();
    configInfo.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const iconFileName = Array.isArray(values.iconFileName)
          ? values.iconFileName[0].name
          : values.iconFileName.file.response.data.fileName;
        const data = {
          id: this.getApplicationId(),
          memberId: this.state.ConfigInfo.id,
          iconFileName,
          url: values.link
        };
        const list = [];
        for (const v in values) {
          if (v != "link") {
            list.push({
              id: v,
              name: values[v]
            });
          }
        }
        data.nameLangVOJson = JSON.stringify(list);
        applicationAtions.updateAppGroupMember(data).then(res => {
          if (res.code == "000000") {
            message.success("保存成功");
            this.getData();
          } else {
            alert(res.message);
          }
        });
      }
    });
  };
  render() {
    return (
      <div>
        <div className="fl">

          <div className="config-list-title">
            「我的」列表
            <a>
              <Icon
                className="ml5"
                type="plus-square-o"
                onClick={() => {
                  this.setState({
                    showNewCategory: true
                  });
                  const div = document.getElementById("scrolldIV");
                  setTimeout(() => {
                    div.scrollTop = div.scrollHeight;
                  }, 100);
                }}
              />
            </a>
          </div>
          <div className="config-list-root mt10" id="scrolldIV">

            <TopCategory
              hideNewCategory={this.hideNewCategory.bind(this)}
              showNewCategory={this.state.showNewCategory}
              saveNewCategory={this.saveNewCategory.bind(this)}
              list={this.state.list}
              checkId={this.state.checkId}
              setUpMember={this.setUpMember}
              editDone={this.editDone.bind(this)}
              newCategory={this.newCategory}
              edit={this.edit.bind(this)}
              delete={this.confirm.bind(this)}
              deleteMember={this.confirmMember}
              setUp={this.setUp.bind(this)}
              onClick={this.onClick}
            />
          </div>
        </div>
        {this.state.ConfigInfo &&
          this.state.ConfigInfo.id &&
          <div className="fl">

            <div className="config-list-title">
              配置信息
            </div>
            <ConfigInfo
              ref="configInfo"
              appId={this.getApplicationId()}
              data={this.state.ConfigInfo}
              handleSubmit={this.handleSubmit}
            />
          </div>}

        <div className="clearfix" />

      </div>
    );
  }
}
const propTypes = {};
ConfigList.contextTypes = {
  router: React.PropTypes.object
};
ConfigList.propTypes = propTypes;
export default ConfigList;

class LineImg extends Component {
  render() {
    return (
      <div className="line-img-root">

        <div className="line-img-vertical" />
        <div className="pr">
          <div className="line-img-horizontal" />
          <div className="line-img-dot" />
        </div>

      </div>
    );
  }
}
class CategoryList extends Component {
  constructor(context, props) {
    super(context, props);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.state = {
      value: this.props.data.name,
      visable: false
    };
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
        className="top-cateory-root"
        onMouseEnter={this.show}
        onMouseLeave={this.hide}
      >

        {data.editable
          ? <div>
              <Icon type="appstore-o" className="mr5" />
              <Input
                value={this.state.value}
                style={{ width: 270, marginLeft: 5, marginTop: 3 }}
                onChange={e => this.handleChange(e)}
              />
              <a
                className="mr5 ml5"
                onClick={this.props.editDone.bind(null, {
                  value: this.state.value,
                  id: this.props.data.value,
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
                    id: this.props.data.value,
                    status: "cancel"
                  })}
                />
              </a>

            </div>
          : <div>

              <Icon type="appstore-o" className="mr5" />
              {data.name}
              {this.state.visable
                ? <span className="fr">
                    <a>
                      <Icon
                        type="plus-square-o"
                        className="mr5"
                        onClick={this.props.newCategory.bind(this, data.value)}
                      />
                    </a>
                    <a>
                      <Icon
                        type="delete"
                        className="mr5"
                        onClick={this.props.delete.bind(this, data.value)}
                      />
                    </a>
                    {data.index > 0 &&
                      <a>
                        <Icon
                          onClick={this.props.setUp.bind(this, data.value)}
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

class CategoryItem extends Component {
  constructor(context, props) {
    super(context, props);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.state = {
      value: this.props.data.name,
      visable: false
    };
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
          this.props.checkId == data.value
            ? "category-item-root category-item-root-checked"
            : "category-item-root"
        }
        onMouseEnter={this.show}
        onMouseLeave={this.hide}
        onClick={() => this.props.onClick(data.value, data.index)}
      >
        <LineImg />
        {data.editable
          ? <div>

              <Input
                value={this.state.value}
                style={{ width: 270, marginLeft: 5, marginTop: 3 }}
                onChange={e => this.handleChange(e)}
              />
              <a
                className="mr5 ml5"
                onClick={this.props.editDone.bind(null, {
                  value: this.state.value,
                  id: data.index,
                  status: "done",
                  memberId: data.id
                })}
              >
                <Icon type="check" />
              </a>
              <a>
                <Icon
                  type="close"
                  onClick={this.props.editDone.bind(null, {
                    value: this.state.value,
                    id: data.index,
                    status: "cancel"
                  })}
                />
              </a>

            </div>
          : <div>
              <div className="fl mt10 ml5">
                {data.name}
              </div>
              {this.state.visable
                ? <span className="fr mt10">
                    {
                      // <a>
                      //                       <Icon
                      //                         type="edit"
                      //                         className="mr5"
                      //                         onClick={this.props.edit.bind(this, data.value)}
                      //                       />
                      //                     </a>
                    }

                    <a>
                      <Icon
                        type="delete"
                        className="mr5"
                        onClick={this.props.delete.bind(this, data.value)}
                      />
                    </a>
                    {this.props.num > 0 &&
                      <a>
                        <Icon
                          onClick={this.props.setUp.bind(this, data.value)}
                          type="to-top"
                        />
                      </a>}

                  </span>
                : null}

            </div>}

        <div className="clearfix" />
      </div>
    );
  }
}
class NewCategory extends Component {
  constructor(context, props) {
    super(context, props);
    this.state = {
      value: null
    };
  }
  handleChange(e) {
    const value = e.target.value;
    this.setState({
      value
    });
  }
  render() {
    const data = {};
    return (
      <div className="top-cateory-root">

        <Icon type="appstore-o" className="mr5" />
        {"新分组"}

        <Input
          value={this.state.value}
          style={{ width: 250, marginLeft: 5, marginTop: 3 }}
          onChange={e => this.handleChange(e)}
        />
        <a
          className="mr5 ml5"
          onClick={() => {
            this.props.saveNewCategory(this.state.value);
          }}
        >
          <Icon type="check" />
        </a>
        <a>
          <Icon type="close" onClick={this.props.hideNewCategory} />
        </a>

      </div>
    );
  }
}
class TopCategory extends Component {
  render() {
    const list = this.props.list;
    return (
      <div>
        {list.map((item, index) => {
          return (
            <div key={item.value}>
              <CategoryList
                data={{ ...item, index }}
                editDone={this.props.editDone}
                newCategory={this.props.newCategory}
                delete={this.props.delete}
                setUp={this.props.setUp}
              />

              <div className="category-item">

                {item.childern.map((val, num) => {
                  return (
                    <CategoryItem
                      editDone={this.props.editDone}
                      edit={this.props.edit}
                      delete={this.props.deleteMember}
                      setUp={this.props.setUpMember}
                      onClick={this.props.onClick}
                      data={{ ...val, index }}
                      num={num}
                      checkId={this.props.checkId}
                      key={val.value}
                    />
                  );
                })}
              </div>

            </div>
          );
        })}
        {this.props.showNewCategory
          ? <NewCategory
              hideNewCategory={this.props.hideNewCategory}
              saveNewCategory={this.props.saveNewCategory}
            />
          : null}
      </div>
    );
  }
}
