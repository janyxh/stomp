// 这里封装 superagent ,并且使用Promise,可以前后端同构；
import superagent from "superagent";
import { browserHistory } from "react-router";
import domain from "./domain";
// 服务器
// host
export default function requestAPI(path, data, mode = "GET") {
  return new Promise((reslove, reject) => {
    let request = null;
    const domainPath = `${domain}${path}`;
    // const domainPath = path
    switch (mode.toUpperCase()) {
      case "POST":
        request = superagent.post(domainPath);
        request.send(data);
        break;
      case "GET":
        request = superagent.get(domainPath);
        request.query(data);
        break;
      case "DELETE":
        request = superagent.del(domainPath);
        request.send(data);
        break;
      case "PUT":
        request = superagent.put(domainPath);
        request.send(data);
        break;
      default:
    }
    request
      .withCredentials()
      .set("Content-Type", "application/x-www-form-urlencoded")
      .end((err, { body } = {}) => {
        if (err) {
          reject(err);
          return;
        }
        if (body.code === "010006") {
          browserHistory.replace("/");
          return;
        }
        // 权限不足
        if (body.code === "010007") {
          window.location.reload(true);
        }
        reslove(body);
      });
  });
}
