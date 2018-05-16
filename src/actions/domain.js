let domain = "https://api.orvibo.com/stomp"; // 生产环境
if (process.env.NODE_ENV == "test") {
  domain = "https://192.168.2.201:5443/stomp"; // 201测试环境
}
if (process.env.NODE_ENV == "development") {
  // 开发环境
  domain = "http://192.168.2.201:7080/stomp";
}
if (process.env.NODE_ENV == "pre-test") {
  // 集成环境
  domain = "http://192.168.2.201:6443/stomp";
}
export default domain;
