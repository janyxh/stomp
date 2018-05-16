import React, { PureComponent, PropTypes, Component } from "react";
import { Icon, Input, Modal, Button, Form, Row, Col } from "antd";
import { Title } from "../../../";
import * as applicationActions from "../../../../actions/application";
// import MenuManager from "../../MenuManager";
import CategorySelect from "./CategorySelect";
import CategorgList from "./CategorgList";

const FormItem = Form.Item;

class AppDevList extends Component {
  constructor(context, props) {
    super(context, props);
    this.showSelectList = this.showSelectList.bind(this);
    this.hideSelectList = this.hideSelectList.bind(this);
    this.state = {
      //show: false,
      topCategory: [],
      loading: true,
      secondCategory: []
    };
  }
  componentDidMount() {
    this.init();
  }
  init = () => {
    // 获取设备列表

    //

    // 获取设备的一级分类
    //const id = this.getId();
    this.getApplicationTopCategory();
  };
  getApplicationTopCategory = () => {
    const id = this.getId();
    this.setState(
      {
        // loading: true
      }
    );
    applicationActions.getApplicationTopCategory(id).then(res => {
      // const list = res.data.categoryVOList.map(item=>{
      //   return {
      //     ...item,
      //     name: item.name,
      //     value: item.id,
      //   }
      // })
      this.setState({
        topCategory: res.data,
        //loading: false,
        show: false
      });
    });
  };
  getDeviceCategory = languageCode => {
    return applicationActions.getDeviceCategory(languageCode).then(res => {
      const data = res.data;

      const deviceCategory = data.map(item => {
        const childern = item.sonDeviceCategoryVOList.map(val => {
          val.value = val.id;
          return val;
        });
        item.childern = childern;
        item.value = item.id;
        return item;
      });
      this.setState({
        deviceCategory
      });
    });
  };
  showSelectList(languageCode) {
    this.getDeviceCategory(languageCode).then(() => {
      this.setState({
        show: true,
        newKey: +new Date(),
        languageCode
      });
    });
  }
  hideSelectList() {
    this.setState({
      show: false
    });
  }

  onClick = (e, value) => {
    // if (e.target.className != "topLevelItem") {
    //   return;
    // }
    // const id = this.getId();
    // const categoryId = value;

    // applicationActions
    //   .getApplicationSecondCategory(id, categoryId)
    //   .then(res => {
    //     this.setState({
    //       categoryId,
    //       secondCategory: res.data.categoryVOList || []
    //     });
    //   });
    this.setState(
      {
        categoryId: value
      },
      () => {
        this.getApplicationSecondCategory();
      }
    );
  };
  getApplicationSecondCategory() {
    const id = this.getId();
    const categoryId = this.state.categoryId;
    applicationActions
      .getApplicationSecondCategory(id, categoryId)
      .then(res => {
        this.setState({
          secondCategory: res.data.categoryVOList || []
        });
      });
  }
  editDone = ({ value, id, status }) => {
    if (status == "done") {
      const appId = this.getId();
      const categoryId = id;
      const data = {
        id: appId,
        categoryId,
        name: value
      };

      applicationActions.updateApplicationCategory(data).then(() => {
        this.init(id);
        //this.cancelEdit(id);
      });

      // 更新代码
    } else {
      this.cancelEdit(id);
    }
  };
  cancelEdit(value) {
    const list = this.state.topCategory;
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
    loop(list);
    const secondList = this.state.secondCategory;
    loop(secondList);

    this.setState({
      topCategory: list,
      secondCategory: secondList
    });
  }
  getId = () => {
    const router = this.context.router;
    return router.params.id;
  };
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
    const id = this.getId();
    const categoryId = value;
    applicationActions
      .deleteApplicationCategory({ id, categoryId })
      .then(() => {
        this.setState({
          deleteId: value
        });
        this.init(value);
      });
  };
  setUp = value => {
    const id = this.getId();
    const categoryId = value;

    applicationActions
      .updateApplicationCategoryOrder({ id, categoryId })
      .then(() => {
        this.init();
      });
  };
  addCategory = () => {
    const data = this.state.deviceCategory;

    const createCategoryVO = [];
    data.map(item => {
      let id = null;
      const sonIDS = [];
      item.childern.map(ele => {
        if (ele.checked) {
          id = item.value;
          sonIDS.push(ele.value);
        }
      });
      if (item.checked) {
        id = item.value;
      }
      if (id) {
        createCategoryVO.push({
          id,
          sonIdList: sonIDS
        });
      }
    });

    const id = this.getId();
    const params = {
      id,
      createCategoryVO: JSON.stringify(createCategoryVO),
      languageCode: this.state.languageCode
    };
    applicationActions.addApplicationCategory(params).then(() => {
      this.init();
      // this.showSelectList();
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 14
      }
    };

    return (
      <div>
        <Modal
          key={this.state.newKey}
          width="700"
          title="分类列表"
          onOk={this.addCategory}
          onCancel={this.hideSelectList}
          visible={this.state.show}
          okText="保存"
        >
          <CategorySelect list={this.state.deviceCategory} />
        </Modal>
        {this.state.topCategory.map(item => {
          return (
            <div key={item.languageCode}>
              <Title text={item.languageName} />

              <div className="mt20 ml50">

                <CategorgList
                  data={item}
                  applicationId={this.getId()}
                  getApplicationSecondCategory={
                    applicationActions.getApplicationSecondCategory
                  }
                  deleteId={this.state.deleteId}
                  //deviceCategory={this.state.deviceCategory}
                  secondCategory={this.state.secondCategory}
                  topCategory={item.categoryVOList}
                  onClick={this.onClick}
                  show={this.showSelectList.bind(this, item.languageCode)}
                  editDone={this.editDone}
                  setUp={this.setUp}
                  delete={this.confirm}
                />

              </div>

            </div>
          );
        })}

      </div>
    );
  }
}
const propTypes = {};
AppDevList.propTypes = propTypes;
AppDevList.contextTypes = {
  router: React.PropTypes.object
};
AppDevList = Form.create({})(AppDevList);
export default AppDevList;
