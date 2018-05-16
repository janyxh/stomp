import React, { PureComponent, PropTypes, Component } from "react";
import {
  Table,
  Button,
  Popconfirm,
  Input,
  Upload,
  Icon,
  Tag,
  Modal,
  message
} from "antd";
import { Title } from "../../../../components";
import * as applicationActions from "../../../../actions/application";
import domain from "../../../../actions/domain";
class EditableCell extends React.Component {
  state = {
    value: this.props.value,
    editable: this.props.editable || false,
    language: this.props.language
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.editable !== this.state.editable) {
      this.setState({
        editable: nextProps.editable
      });
      if (nextProps.editable) {
        this.cacheValue = this.state.value;
      }
    }

    if (nextProps.status && nextProps.status !== this.props.status) {
      if (nextProps.status === "save") {
        this.props.onChange(this.state.value);
      } else if (nextProps.status === "cancel") {
        this.setState({
          value: this.cacheValue
        });
        this.props.onChange(this.cacheValue);
      }
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.editable !== this.state.editable ||
      nextState.value !== this.state.value
    );
  }
  handleChange(e) {
    const value = e.target.value;
    this.setState({
      value
    });
  }
  render() {
    const { value, editable, language } = this.state;
    let text = null;
    if (language) {
      if (editable) {
        text = <span className="mr10">{language}  </span>;
      } else {
        text = <Tag color="#B6B6C5">{language}</Tag>;
      }
    }

    return (
      <div>
        {editable
          ? <div className="mb10">
              {text}
              <Input
                value={value}
                style={{ width: 150 }}
                onChange={e => this.handleChange(e)}
              />

            </div>
          : <div className="editable-row-text">

              <span className="mr10">

                {(value && value.toString()) || " "}
              </span>

              {text}
            </div>}
      </div>
    );
  }
}

function beforeUpload(file) {
  const name = file.name;
  const reg = new RegExp("(png)$", "i");
  const isFile = reg.test(name);
  if (!reg.test(name)) {
    message.error("上传图片必须以png结尾");
  }
  const isLt10M = file.size / 1024 / 1024 < 10;
  if (!isLt10M) {
    message.error("图片不能超过 10MB");
  }
  const nameReg = /[^\u0000-\u00FF]/;
  const isSuccessName = !nameReg.test(name);
  if (nameReg.test(name)) {
    message.error("上传文件名不能有中文字符");
  }
  return isLt10M && isFile && isSuccessName;
}
class AppNavigation extends Component {
  constructor(context, props) {
    super(context, props);
    this.handleAdd = this.handleAdd.bind(this);
    this.picChange = this.picChange.bind(this);
    this.state = {
      newDisabled: false,
      count: 0,
      languageType: [],
      // dataList: [],
      loading: true,
      data: [
        {
          key: "0",
          name: {
            editable: false,
            value: [
              { value: "1", language: "简体中文", id: "1" },
              { value: "2", language: "繁体中文", id: "2" }
            ]
          },
          pic: {
            value: {
              url:
                "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
              name: "默认图片"
            }
          },
          checkedpic: {
            value: {
              url:
                "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
              name: "选中图片"
            }
          },
          order: {
            value: "32"
          },
          link: {
            editable: false,
            value: "London, Park Lane no. 0"
          }
        }
      ],
      fileList: [
        {
          uid: -1,
          name: "xxx.png",
          status: "done",
          url:
            "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        }
      ]
    };
    this.columns = [
      {
        title: "顺序",
        dataIndex: "order",
        key: "order"
      },
      {
        title: "默认图标",
        dataIndex: "pic",
        key: "pic",
        render: (text, record, index) => {
          let fileList = text
            ? [
                {
                  uid: -1,
                  name: "默认图标.png",
                  status: "done",
                  url: text.url
                }
              ]
            : [];
          if (text && text.length > 0) {
            fileList = text;
          }
          return (
            <div>
              <Upload
                style={{
                  padding: 0,
                  margin: 0
                }}
                name="multipartFile"
                withCredentials
                action={`${domain}/applications/v1/${this.getApplicationId()}/navigations/iconfile/`}
                listType="picture-card"
                beforeUpload={beforeUpload}
                fileList={fileList}
                onChange={files => {
                  this.picChange(files, index, "pic");
                }}
              >
                {fileList.length >= 1
                  ? null
                  : <div className="ant-upload-icon">
                      <Icon type="plus" />
                      <div className="ant-upload-text">上传</div>
                    </div>}
              </Upload>
            </div>
          );
        }
      },
      {
        title: "选中图标",
        dataIndex: "checkedpic",
        key: "checkedpic",
        render: (text, record, index) => {
          let fileList = text
            ? [
                {
                  uid: -1,
                  name: "选中图标.png",
                  status: "done",
                  url: text.url
                }
              ]
            : [];
          if (text && text.length > 0) {
            fileList = text;
          }

          return (
            <div>
              <Upload
                style={{
                  padding: 0,
                  margin: 0
                }}
                name="multipartFile"
                withCredentials
                action={`${domain}/applications/v1/${this.getApplicationId()}/navigations/iconfile/`}
                listType="picture-card"
                fileList={fileList}
                beforeUpload={beforeUpload}
                onChange={files => {
                  this.picChange(files, index, "checkedpic");
                }}
              >
                {fileList.length >= 1
                  ? null
                  : <div className="ant-upload-icon">
                      <Icon type="plus" />
                      <div className="ant-upload-text">上传</div>
                    </div>}
              </Upload>
            </div>
          );
        }
      },
      {
        title: "名称",
        dataIndex: "name",
        key: "name",
        render: (text, record, index) =>
          this.renderColumns(this.state.data, index, "name", text)
      },
      {
        title: "链接",
        dataIndex: "link",
        key: "link",
        render: (text, record, index) =>
          this.renderColumns(this.state.data, index, "link", text)
      },

      {
        title: "操作",
        key: "id",
        dataIndex: "id",

        width: 50,
        render: (text, record, index) => {
          const { editable } = this.state.data[index].name;
          const comp = index != 0
            ? <a onClick={() => this.ascOrder(index)}><Icon type="to-top" /></a>
            : null;
          return (
            <div className="editable-row-operations">
              {editable
                ? <span>
                    <a
                      className="mr10"
                      onClick={() => this.editDone(index, "save")}
                    >
                      保存
                    </a>
                    <Popconfirm
                      title="确定要取消吗？"
                      onConfirm={() => this.editDone(index, "cancel")}
                    >
                      <a>取消</a>
                    </Popconfirm>
                  </span>
                : <span className="myaction">
                    <a>
                      <Icon
                        type="edit"
                        className="mr10"
                        onClick={() => this.edit(index)}
                      />

                    </a>

                    <a>
                      <Icon
                        onClick={this.confirm.bind(null, index)}
                        className="mr10"
                        type="delete"
                      />
                    </a>

                    {comp}
                  </span>}
            </div>
          );
        }
      }
    ];
  }
  picChange({ fileList }, index, key) {
    const { data } = this.state;
    if (fileList.length == 0) {
      data[index][key] = fileList;
    } else {
      data[index][key].value = fileList;

      if (fileList[0] && fileList[0].status == "done") {
        data[index][key] = {
          value: {
            url: fileList[0].thumbUrl,
            name: fileList[0].response.data.fileName
          }
        };
      }
    }
    this.setState({
      data
    });
  }

  componentDidMount() {
    this.getData();
  }

  confirm = index => {
    Modal.confirm({
      title: "确认",
      content: "确定删除此导航吗？",
      okText: "确定",
      cancelText: "取消",
      onOk: this.delete.bind(null, index)
    });
  };

  ascOrder(index) {
    const data = {
      id: this.getApplicationId(),
      navigationId: this.state.data[index].navigationId
    };
    applicationActions.updateApplicationNavOrder(data).then(() => {
      this.getData();
    });
  }
  renderColumns(data, index, key, text) {
    const { editable, status } = data[index][key];
    if (typeof editable === "undefined") {
      return text;
    }
    let list = [];
    if (Array.isArray(text)) {
      list = text.map(item => {
        return (
          <EditableCell
            editable={editable}
            value={item.value}
            language={item.language}
            onChange={value => this.handleChange(key, index, value, item)}
            status={status}
          />
        );
      });
    } else {
      list.push(
        <EditableCell
          editable={editable}
          value={text}
          onChange={value => this.handleChange(key, index, value)}
          status={status}
        />
      );
    }

    return list;
  }
  handleChange(key, index, value, item) {
    const { data } = this.state;

    if (item && Array.isArray(data[index][key].value)) {
      for (let i = 0; i < data[index][key].value.length; i++) {
        if (data[index][key].value[i].id == item.id) {
          data[index][key].value[i].value = value;
        }
      }
    } else {
      data[index][key].value = value;
    }
    this.setState({
      data
    });
  }
  edit(index) {
    const { data } = this.state;
    Object.keys(data[index]).forEach(item => {
      if (
        data[index][item] &&
        typeof data[index][item].editable !== "undefined"
      ) {
        data[index][item].editable = true;
      }
    });

    this.setState({
      data
    });
  }
  delete = index => {
    const id = this.getApplicationId();
    const navigationId = this.state.data[index].navigationId;
    applicationActions.deleteApplicationNav({ id, navigationId }).then(id => {
      this.getData();
    });
    // const data = [...this.state.data];
    // data.splice(index, 1);
    // this.setState({
    //   data
    // });
  };
  editDone(index, type) {
    let { data } = this.state;

    // 要恢复的注释
    Object.keys(data[index]).forEach(item => {
      if (
        data[index][item] &&
        typeof data[index][item].editable !== "undefined"
      ) {
        data[index][item].editable = false;
        data[index][item].status = type;
      }
    });

    if (
      index == data.length - 1 &&
      type == "cancel" &&
      data[index].status == "new"
    ) {
      data.splice(index, 1);
      this.setState((state, props) => ({ newDisabled: false, data }));
      return;
    }

    this.setState(
      {
        data
      },
      () => {
        data[index] &&
          Object.keys(data[index]).forEach(item => {
            if (
              data[index][item] &&
              typeof data[index][item].editable !== "undefined"
            ) {
              delete data[index][item].status;
            }
          });
        if (type == "cancel") {
          return;
        }
        console.log("okkk");
        const saveData = this.state.data[index];
        let nameLangVOJson = saveData.name.value.map(ele => {
          return {
            name: ele.value,
            languageCode: ele.languageCode
          };
        });
        const newData = {
          id: this.getApplicationId(),
          sequence: index + 1,
          defaultIconUrl: saveData.pic.value ? saveData.pic.value.name : null,
          selectedIconUrl: saveData.checkedpic.value
            ? saveData.checkedpic.value.name
            : null,
          url: saveData.link.value,
          nameLangVOJson: JSON.stringify(nameLangVOJson)
        };
        if (!this.verifyData(newData)) {
          this.edit(index);
          return;
        }
        if (data[index].status == "new") {
          applicationActions.addApplicationNav(newData).then(() => {
            this.getData();
            this.setState({
              newDisabled: false
            });
          });

          //console.log(data[index]);
        } else {
          // 更新
          newData.navigationId = saveData.navigationId;
          nameLangVOJson = saveData.name.value.map(ele => {
            return {
              name: ele.value,
              id: ele.id
            };
          });
          if (!this.verifyData(newData)) {
            this.edit(index);
            return;
          }
          newData.nameLangVOJson = JSON.stringify(nameLangVOJson);
          applicationActions.updateApplicationNav(newData).then(() => {
            this.getData();
          });
        }
      }
    );
  }
  verifyData = val => {
    const data = val;
    if (!data.defaultIconUrl) {
      alert("默认ICON不能为空");
      return false;
    }
    if (!data.selectedIconUrl) {
      alert("选中ICON不能为空");
      return false;
    }
    if (data.url.length <= 0) {
      alert("跳转链接不能为空");
      return false;
    }
    const ele = JSON.parse(data.nameLangVOJson).find(item => {
      return item.name.length <= 0;
    });
    if (ele) {
      console.log("ok");
      alert("对应语言名称不能为空");
      return false;
    }
    return true;
  };
  getApplicationId = () => {
    const router = this.context.router;
    return router.params.id;
  };
  getData = () => {
    this.setState({
      loading: true
    });
    const id = this.getApplicationId();

    applicationActions.getApplicationAllNav(id).then(res => {
      let data = res.data;
      if (!data) {
        return;
      }

      const list = data.map(item => {
        const languageList = item.nameLangVOList.map(ele => {
          return {
            value: ele.name,
            language: ele.languageName,
            languageCode: ele.languageCode,
            id: ele.id
          };
        });

        const val = {
          navigationId: item.id,
          pic: {
            value: {
              url: item.defaultIconUrl ? item.defaultIconUrl : "",
              name: item.defaultIconUrl
                ? item.defaultIconUrl.substring(
                    item.defaultIconUrl.lastIndexOf("/") + 1,
                    item.defaultIconUrl.length
                  )
                : "默认图片"
            }
          },
          checkedpic: {
            value: {
              url: item.selectedIconUrl ? item.selectedIconUrl : "",
              name: item.selectedIconUrl
                ? item.selectedIconUrl.substring(
                    item.selectedIconUrl.lastIndexOf("/") + 1,
                    item.selectedIconUrl.length
                  )
                : "选中图片"
            }
          },
          order: {
            value: item.sequence
          },
          link: {
            editable: false,
            value: item.url ? item.url : ""
          },
          name: {
            editable: false,
            value: languageList
          }
        };
        return val;
      });

      this.setState({
        data: list,
        loading: false
      });
    });
  };
  handleAdd() {
    const { data } = this.state;
    const applicationLanguages = this.props.applicationLanguages.map(ele => {
      return {
        value: "",
        language: ele.languageName,
        languageCode: ele.languageCode,
        id: ele.id
      };
    });
    const newData = {
      status: "new",
      key: data.length,
      name: {
        editable: false,
        value: applicationLanguages
      },
      pic: {
        // value: {
        //   url:
        //     "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        //   name: "默认图片"
        // }
      },
      checkedpic: {
        // value: {
        //   url:
        //     "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        //   name: "选中图片"
        // }
      },
      order: {
        value: data.length + 1
      },
      link: {
        editable: false,
        value: ""
      }
    };
    this.setState(
      {
        data: [...data, newData],
        newDisabled: true
      },
      () => {
        this.edit(this.state.data.length - 1);
      }
    );
  }
  render() {
    if (this.state.loading) {
      return null;
    }
    const { data } = this.state;
    console.log(this.state.data);
    const dataSource = data.map(item => {
      const obj = {};
      Object.keys(item).forEach(key => {
        obj[key] = key === "key" ? item[key] : item[key].value;
      });
      return obj;
    });
    const columns = this.columns;
    return (
      <div>
        <div className="ml50 mt10">

          <Table
            style={{
              width: 800
            }}
            columns={this.columns}
            dataSource={dataSource}
            pagination={false}
          />
          {dataSource.length < 5
            ? <Button
                type="primary"
                className="mt20"
                disabled={this.state.newDisabled}
                onClick={this.handleAdd}
              >
                添加主导航
              </Button>
            : null}

        </div>
      </div>
    );
  }
}
AppNavigation.contextTypes = {
  router: React.PropTypes.object
};
const propTypes = {};
AppNavigation.propTypes = propTypes;
export default AppNavigation;
