import React, { Component } from "react";
import { Form, Input, Select, Tabs, Modal, message } from "antd";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import immutable from "immutable";
import { Link } from "react-router";
import * as applicationActions from "../../../actions/application";
import {
  BasicConfig,
  LanuageSelect,
  ThirdParty,
  Framework,
  ClientType
} from "../../../components/ApplicationManager";

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;
class AddOrEdit extends Component {
  constructor(context, props) {
    super(context, props);
    this.deleteTag = this.deleteTag.bind(this);
    this.saveService = this.saveService.bind(this);
    this.addLanguage = this.addLanguage.bind(this);
    this.saveColor = this.saveColor.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.showModal = this.showModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.filterLanguageList = this.filterLanguageList.bind(this);
    this.changeBgc = this.changeBgc.bind(this);
    this.changeThemec = this.changeThemec.bind(this);
    this.changeFontc = this.changeFontc.bind(this);
    this.changeSecurityBgColor = this.changeSecurityBgColor.bind(this);
    this.saveWechat = this.saveWechat.bind(this);
    this.saveQQ = this.saveQQ.bind(this);
    this.saveWeibo = this.saveWeibo.bind(this);
    this.changeClient = this.changeClient.bind(this);
    this.state = {
      loading: true,
      applicationLanguages: {
        id: "1",
        appLanguageVOList: []
      },
      applicationInfo: {
        // manufactureName: "厂商名称",
        // appCode: "厂商source",
        // name: "应用名称"
      },
      filter: "",
      visible: false,
      selectedRowKeys: [],
      type: "Android",
      wechatData: {},
      weiboData: {},
      qqData: {},
      basicData: {}
    };
  }
  changeClient(value) {
    this.setState(
      {
        type: value
      },
      () => {
        this.getInfo();
      }
    );
    // 加载iso 或 安卓的 数据
  }
  showModal() {
    this.setState({
      visible: true,
      newKey: +new Date()
    });
  }
  saveService(e) {
    e.preventDefault();
    this.refs.basicInfo.refs.serviceConfig.validateFieldsAndScroll(
      (err, values) => {
        if (!err) {
          const id = this.getApplicationId();
          const data = {
            id,
            ...values
          };
          applicationActions.updateApplicationServerInfo(data).then(res => {
            if (res.code == "000000") {
              message.success("保存成功");

              //this.basicInfo(); 使用Redux 重写
            } else {
              alert(res.message);
            }
          });
        }
      }
    );
  }
  saveXiaoFang = e => {
    e.preventDefault();
    this.refs.thirdParty.refs.xiaoFang.validateFieldsAndScroll(
      (err, values) => {
        if (!err) {
          const id = this.getApplicationId();

          const data = {
            id,
            ...values,
            authorityId: this.state.wechatData.id
          };
          applicationActions.updateXiaoFangInfo(data).then(res => {
            if (res.code == "000000") {
              message.success("保存成功");
              this.getInfo();
            } else {
              alert(res.message);
            }
          });
        }
      }
    );
  };
  saveWechat(e) {
    e.preventDefault();
    this.refs.thirdParty.refs.wechat.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const id = this.getApplicationId();

        const data = {
          id,
          ...values,
          authorityId: this.state.wechatData.id
        };
        applicationActions.updateWechatInfo(data).then(res => {
          if (res.code == "000000") {
            message.success("保存成功");
            this.getInfo();
          } else {
            alert(res.message);
          }
        });
      }
    });
  }
  saveQQ(e) {
    e.preventDefault();

    this.refs.thirdParty.refs.qq.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const id = this.getApplicationId();

        const data = {
          id,
          ...values,
          authorityId: this.state.qqData.id
        };
        applicationActions.updateQQInfo(data).then(res => {
          if (res.code == "000000") {
            message.success("保存成功");
            this.getInfo();
          } else {
            alert(res.message);
          }
        });
      }
    });
  }
  saveWeibo(e) {
    e.preventDefault();
    this.refs.thirdParty.refs.weibo.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const id = this.getApplicationId();

        const data = {
          id,
          ...values,
          authorityId: this.state.weiboData.id
        };
        applicationActions.updateWeiboInfo(data).then(res => {
          if (res.code == "000000") {
            message.success("保存成功");
            this.getInfo();
          } else {
            alert(res.message);
          }
        });
      }
    });
  }
  getApplicationId() {
    const router = this.context.router;
    return router.params.id;
  }
  getInfo() {
    const platform = this.state.type;
    const id = this.getApplicationId();
    const data = {
      platform,
      id
    };
    // this.setState({
    //   render: false,
    // });
    const promises = [];
    promises.push(applicationActions.getWechatInfo(data));
    promises.push(applicationActions.getQQInfo(data));
    promises.push(applicationActions.getWeiboInfo(data));
    promises.push(applicationActions.getXiaoFangInfo(data));
    Promise.all(promises).then(res => {
      this.setState({
        wechatData: res[0].data,
        qqData: res[1].data,
        weiboData: res[2].data,
        xiaoFangDate: res[3].data
        //render: true,
      });
    });
  }
  changeBgc(value) {
    this.setState({
      bgc: value
    });
    console.log("changeBgc", value);
  }
  changeThemec(value) {
    this.setState({
      themec: value
    });
    console.log("changeThemec", value);
  }

  changeFontc(value) {
    this.setState({
      fontc: value
    });
    console.log("changeFontc", value);
  }
  changeSecurityBgColor(value) {
    this.setState({
      securityBgColor: value
    });
  }
  handleCancel() {
    this.setState({
      visible: false
    });
  }
  componentDidMount() {
    this.init();
  }

  onSearch() {}
  onSelectChange(selectedRowKeys) {
    this.setState(
      {
        selectedRowKeys
      },
      () => {
        this.relatedLanguageStatus();
      }
    );
  }
  saveColor() {
    const oldData = this.state.basicData;
    const id = this.getApplicationId();
    const data = {
      id,
      backgroundColor: this.state.bgc || oldData.backgroundColor,
      topicColor: this.state.themec || oldData.topicColor,
      fontColor: this.state.fontc || oldData.fontColor,
      securityBgColor: this.state.securityBgColor || oldData.securityBgColor
    };
    applicationActions.updateApplicationTheme(data).then(res => {
      if (res.code == "000000") {
        message.success("保存成功");
        this.getInfo();
      } else {
        alert(res.message);
      }
    });
  }
  deleteTag(value) {
    const selectedRowKeys = this.state.selectedRowKeys.filter(item => {
      return item != value;
    });
    this.setState(
      {
        selectedRowKeys
      },
      () => {
        this.relatedLanguageStatus();
      }
    );
  }
  relatedLanguageStatus() {
    const selectedRowKeys = this.state.selectedRowKeys;
    if (selectedRowKeys.length <= 0) {
      this.refs.basicInfo.setFields({
        selectedLanguage: {
          value: null,
          errors: [new Error("请选择适用产品!")]
        }
      });
    } else {
      this.refs.basicInfo.setFieldsValue({
        selectedLanguage: selectedRowKeys
      });
    }
  }
  addLanguage() {}
  goBack() {
    const router = this.context.router;
    router.goBack();
  }
  isUpdate() {
    const userId = this.getUserId();
    if (typeof userId != "undefined") {
      return true;
    }
    return false;
  }
  handleSubmit(e) {
    e.preventDefault();
    this.refs.basicInfo.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // this.doAction(values).then((res) => {
        //   if (res.code == "000000") {
        //     const router = this.context.router;
        //     router.push('/Content/AccountManagement/List');
        //   } else {
        //     alert(res.message);
        //   }
        // })
      }
    });
  }

  handleOk() {
    this.setState({
      visible: false
    });
  }
  handleCancel(e) {
    //this.refs.VerifyCode.clear()
    this.setState({
      visible: false
    });
  }
  init() {
    // 初始化 list
    this.setState({
      selectedRowKeys: ["1", "2"]
    });
    const promises = [];
    promises.push(this.getApplicationLanguage());
    promises.push(this.getBasicInfo());
    promises.push(this.getApplicationInfo());
    Promise.all(promises).then(() => {
      this.setState({
        loading: false
      });
    });
    // 获取应用的多语言列表
    //  this.getApplicationLanguage();
    // 第三方登录
    this.getInfo();

    // 获取基础信息
    //this.getApplicationInfo();

    // 获取语言列表

    applicationActions.getLanguageList().then(res => {
      this.setState((state, props) => ({
        languageList: res.data
      }));
    });
  }
  getApplicationLanguage = () => {
    const id = this.getApplicationId();
    return applicationActions.getApplicationLanguage(id).then(res => {
      this.setState((state, props) => ({
        applicationLanguages: res.data
      }));
    });
  };
  updateApplicationLanguage = e => {
    e.preventDefault();
    this.refs.basicInfo.refs.languageConfig.validateFieldsAndScroll(
      (err, values) => {
        if (!err) {
          for (let i in values) {
            if (values[i] == undefined) {
              delete values[i];
            }
          }

          const newList = this.state.applicationLanguages.appLanguageVOList;
          for (let i = 0; i < newList.length; i++) {
            const id = newList[i].id;

            for (const key in values) {
              if (key.includes(id) && key.includes("appName")) {
                newList[i].appName = values[key];
              }
              if (key.includes(id) && key.includes("manufactureName")) {
                newList[i].manufactureName = values[key];
              }
              if (key.includes(id) && key.includes("historyUrl")) {
                // if (values[key].fileList && values[key].fileList.length <= 0) {
                //   const name = key;
                //   const data = {};
                //   data[key] = {
                //     value: [],
                //     errors: [new Error("请上传更新日志")]
                //   };
                //   this.refs.basicInfo.refs.languageConfig.setFields(data);
                //   this.refs.basicInfo.refs.languageConfig.validateFieldsAndScroll();
                //   return;
                // }

                if (values[key][0]) {
                  newList[i].historyUrl = values[key][0].url;
                } else {
                  if (!values[key].file) {
                    newList[i].historyUrl = "";
                  } else {
                    newList[i].historyUrl = values[key].file.response
                      ? values[key].file.response.data.url
                      : "";
                  }
                }
              }
              if (key.includes(id) && key.includes("agreementUrl")) {
                if (values[key].fileList && values[key].fileList.length <= 0) {
                  const name = key;
                  const data = {};
                  data[key] = {
                    value: [],
                    errors: [new Error("请上用户传协议")]
                  };
                  this.refs.basicInfo.refs.languageConfig.setFields(data);
                  this.refs.basicInfo.refs.languageConfig.validateFieldsAndScroll();
                  return;
                }

                if (values[key][0]) {
                  newList[i].agreementUrl = values[key][0].url;
                } else {
                  newList[i].agreementUrl = values[key].file.response.data.url;
                }
              }
            }
          }

          const id = this.getApplicationId();
          applicationActions
            .updateApplicationLanguage({
              id,
              appLanguageVOJson: JSON.stringify(newList)
            })
            .then(res => {
              if (res.code == "000000") {
                message.success("保存成功");
                this.getApplicationLanguage();
              } else {
                alert(res.message);
              }
            });
        }
      }
    );
  };
  updateApplicationOtherInfo = e => {
    e.preventDefault();
    this.refs.basicInfo.refs.otherConfig.validateFieldsAndScroll(
      (err, values) => {
        if (!err) {
          for (let i in values) {
            if (values[i] == undefined) {
              delete values[i];
            }
          }
          values.id = this.getApplicationId();
          if (
            values.iosAuthFilename &&
            values.iosAuthFilename.file &&
            values.iosAuthFilename.file.name
          ) {
            values.iosAuthFilename = values.iosAuthFilename.file.name;
          } else {
            delete values.iosAuthFilename;
          }
          applicationActions.updateApplicationOtherInfo(values).then(res => {
            if (res.code == "000000") {
              message.success("保存成功");
            } else {
              alert(res.message);
            }

            // 更新多语言列表
          });
        }
      }
    );
  };
  getApplicationInfo() {
    const id = this.getApplicationId();
    return applicationActions.getApplication(id).then(res => {
      this.setState((state, props) => ({
        applicationInfo: res.data
      }));
    });
  }
  getBasicInfo() {
    const id = this.getApplicationId();
    return applicationActions.getApplicationBasicInfo(id).then(res => {
      this.setState({
        basicData: res.data
      });
    });
  }
  filterLanguageList(value) {
    this.setState({
      filter: value.trim()
    });
  }
  updateApplication = e => {
    e.preventDefault();
    this.refs.basicInfo.refs.basicInfo.validateFieldsAndScroll(
      (err, values) => {
        if (!err) {
          for (let i in values) {
            if (values[i] == undefined) {
              delete values[i];
            }
          }
          values.id = this.getApplicationId();

          applicationActions.updateApplication(values).then(res => {
            if (res.code == "000000") {
              message.success("保存成功");
              window.location.reload();
              // this.getApplicationInfo();
              // this.getApplicationLanguage();
            } else {
              alert(res.message);
            }
          });
        }
      }
    );
  };
  render() {
    if (this.state.loading) {
      return null;
    }

    return (
      <div className=" mt20">

        <Tabs type="card">

          <TabPane tab="基础功能" key="1">
            <BasicConfig
              ref="basicInfo"
              addId={this.getApplicationId()}
              updateApplication={this.updateApplication}
              languageList={this.state.languageList || []}
              updateApplicationOtherInfo={this.updateApplicationOtherInfo}
              updateApplicationLanguage={this.updateApplicationLanguage}
              applicationLanguages={this.state.applicationLanguages}
              applicationInfo={this.state.applicationInfo}
              data={this.state.basicData}
              handleSubmit={this.handleSubmit}
              saveService={this.saveService}
              saveColor={this.saveColor}
              changeBgc={this.changeBgc}
              changeThemec={this.changeThemec}
              changeFontc={this.changeFontc}
              changeSecurityBgColor={this.changeSecurityBgColor}
              deleteTag={this.deleteTag}
              addLanguage={this.showModal}
            />
          </TabPane>
          <TabPane tab="功能框架" key="2">
            <Framework applicationLanguages={this.state.applicationLanguages} />
          </TabPane>
          <TabPane tab="第三方协议" key="3">
            <div>
              <div>
                <ClientType onClick={this.changeClient} />
              </div>

              <ThirdParty
                ref="thirdParty"
                type={this.state.type}
                xiaoFangData={this.state.xiaoFangDate}
                wechatData={this.state.wechatData}
                weiboData={this.state.weiboData}
                qqData={this.state.qqData}
                // data={null}
                saveXiaoFang={this.saveXiaoFang}
                saveWechat={this.saveWechat}
                saveQQ={this.saveQQ}
                saveWeibo={this.saveWeibo}
              />

            </div>
          </TabPane>
        </Tabs>

      </div>
    );
  }
}
AddOrEdit.contextTypes = {
  router: React.PropTypes.object
};
AddOrEdit = Form.create({})(AddOrEdit);
function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({}, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AddOrEdit);
