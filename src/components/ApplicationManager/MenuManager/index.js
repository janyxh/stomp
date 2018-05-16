import React, { PureComponent, PropTypes } from "react";
import { Tree, Icon, Input, Upload, Modal, Button, Form, Row, Col } from "antd";
const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;
class ListItem extends PureComponent {
  constructor(context, props) {
    super(context, props);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.state = {
      visable: false
    };
  }
  onMouseOver() {
    this.setState({
      visable: true
    });
  }
  onMouseLeave() {
    this.setState({
      visable: false
    });
  }

  render() {
    const comp = this.props.isTopLevel
      ? <Icon className="mr5" type="plus" onClick={this.props.add} />
      : null;
    return (
      <span onMouseOver={this.onMouseOver} onMouseLeave={this.onMouseLeave}>
        <span
          style={{
            color: "#08c",
            width: 150,
            display: "inline-block"
          }}
        >
          {this.props.name}
        </span>
        {this.state.visable
          ? <span className="fr">
              <Icon type="edit" className="mr5" onClick={this.props.edit} />
              <Icon type="delete" className="mr5" onClick={this.props.delete} />
              {comp}
            </span>
          : null}
      </span>
    );
  }
}
class MenuManager extends PureComponent {
  constructor(context, props) {
    super(context, props);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);
    this.add = this.add.bind(this);
    this.saveItem = this.saveItem.bind(this);
    this.handelCancel = this.handelCancel.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handlePreview = this.handlePreview.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
    this.state = {
      visable: false,
      value: "",
      previewVisible: false,
      previewImage: "",
      fileList: [
        {
          uid: -1,
          name: "xxx.png",
          status: "done",
          url:
            "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        }
      ],
      menuList: [
        {
          key: "0-0",
          name: "一级菜单",
          children: [
            {
              key: "0-0-1-0",
              name: "一级菜单的子菜单"
            }
          ]
        },
        {
          key: "0-1",
          name: "1级菜单",
          children: [
            {
              key: "0-1-1-0",
              name: "二级菜单的子菜单"
            }
          ]
        }
      ]
    };
  }
  saveItem() {
    const value = this.state.value.trim();
    if (value.length > 0) {
      console.log(value);
      const newList = this.state.menuList;
      // 判断是否是一级菜单
      if (this.state.parentId) {
        // 掉头用后天接口添加菜单
        console.log(this.state.parentId);
        newList.forEach(item => {
          if (item.key == this.state.parentId) {
            item.children.push({
              key: +new Date(),
              name: value
            });
          }
        });
        this.setState({
          menuList: newList,
          parentId: null
        });
      } else {
        newList.push({
          key: +new Date(),
          name: value,
          children: []
        });
        console.log(this.state.menuList);
        this.setState({
          menuList: newList,
          parentId: null
        });
      }
      this.handelCancel();
    } else {
      alert("请输入列表名称");
      return;
    }
  }
  onMouseOver() {
    console.log("ok");
  }
  update() {
    const newList = this.state.menuList;

    const loop = data =>
      data.forEach((item, index) => {
        if (item.key == this.state.currentId) {
          item.name = this.state.value;
        }
        if (item.children) {
          loop(item.children);
        }
      });
    loop(newList);
    this.setState({
      menuList: newList,
      parentId: null,
      visable: false,
      value: null
    });
  }
  edit(value) {
    let v = null;
    const newList = this.state.menuList;
    const loop = data =>
      data.forEach((item, index) => {
        if (item.key == value) {
          v = item.name;
        }
        if (item.children) {
          loop(item.children);
        }
      });
    loop(newList);
    console.log(v);
    this.setState({
      currentId: value,
      visable: true,
      value: v,
      isEdit: true
    });
  }
  delete(value) {
    if (!value) {
      return;
    }
    const newList = this.state.menuList;

    const loop = data =>
      data.forEach((item, index) => {
        if (item.key == value) {
          data.splice(index, 1);
        }
        if (item.children) {
          loop(item.children);
        }
      });
    loop(newList);
    this.setState({
      menuList: newList
    });
  }
  add(value) {
    this.setState({
      visable: true,
      parentId: value,
      isEdit: false
    });
  }
  handelCancel() {
    this.setState({
      visable: false,
      value: ""
    });
  }
  onChange(e) {
    // console.log(e.target.va÷lue);
    this.setState({
      value: e.target.value
    });
  }
  handleCancel() {
    this.setState({
      previewVisible: false
    });
  }

  handlePreview(file) {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    });
  }

  handleChange({ fileList }) {
    console.log(fileList);
    this.setState({
      fileList
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 8
      }
    };

    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div className="ant-upload-icon">
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const loop = data =>
      data.map(item => {
        if (item.children) {
          return (
            <TreeNode
              key={item.key}
              title={
                <ListItem
                  key={item.key}
                  name={item.name}
                  isTopLevel={true}
                  edit={this.edit.bind(this, item.key)}
                  delete={this.delete.bind(this, item.key)}
                  add={this.add.bind(this, item.key)}
                />
              }
            >
              {loop(item.children)}
            </TreeNode>
          );
        }
        return (
          <TreeNode
            key={item.key}
            title={
              <ListItem
                key={item.key}
                name={item.name}
                isTopLevel={false}
                edit={this.edit.bind(this, item.key)}
                delete={this.delete.bind(this, item.key)}
              />
            }
          />
        );
      });
    return (
      <div>

        <Form onSubmit={this.handleSubmit}>
          <Row gutter={20}>
            <Col span={12}>
              <FormItem {...formItemLayout} label="菜单管理">

                <Button
                  type="primary"
                  shape="circle"
                  icon="plus"
                  onClick={this.add.bind(this, null)}
                />
                <Tree
                  showLine
                  className="draggable-tree"
                  showIcon
                  defaultExpandAll
                >
                  {loop(this.state.menuList)}

                </Tree>
                <div>
                  {this.state.visable
                    ? <div>
                        <Input
                          value={this.state.value}
                          onChange={this.onChange}
                          style={{
                            width: 200
                          }}
                        />
                        <span className="cp">
                          <Icon
                            type="check"
                            className="mr5 ml5"
                            onClick={
                              this.state.isEdit ? this.update : this.saveItem
                            }
                          />
                          {" "}<Icon onClick={this.handelCancel} type="close" />
                        </span>
                      </div>
                    : null}

                </div>
              </FormItem>
            </Col>
            <Col span={12} pull={4}>
              <FormItem {...formItemLayout} label="图标">
                <Upload
                  action="//jsonplaceholder.typicode.com/posts/"
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={this.handlePreview}
                  onChange={this.handleChange}
                >
                  {fileList.length >= 1 ? null : uploadButton}
                </Upload>
                <Modal
                  visible={previewVisible}
                  footer={null}
                  onCancel={this.handleCancel}
                >
                  <img
                    alt="example"
                    style={{
                      width: "100%"
                    }}
                    src={previewImage}
                  />
                </Modal>
              </FormItem>

              <FormItem {...formItemLayout} label="跳转链接">
                {getFieldDecorator("link", {
                  initialValue: "",
                  rules: [
                    {
                      required: true,
                      message: "请输入跳转链接"
                    }
                  ]
                })(<Input />)}

              </FormItem>
            </Col>
          </Row>

          <FormItem {...formItemLayout} label=" ">
            <Button type="primary" htmlType="submit" size="large">保存</Button>
          </FormItem>

        </Form>

      </div>
    );
  }
}
const propTypes = {};
MenuManager.propTypes = propTypes;
MenuManager = Form.create({})(MenuManager);
export default MenuManager;
