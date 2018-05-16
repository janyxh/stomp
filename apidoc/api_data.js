define({ "api": [
  {
    "type": "get",
    "url": "/user",
    "title": "",
    "name": "getAllUser",
    "group": "User",
    "description": "<p>获取所有用户</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "Code",
            "description": "<p>成功返回 1, 失败返回 0</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>消息</p>"
          },
          {
            "group": "Success 200",
            "type": "list",
            "optional": false,
            "field": "data",
            "description": "<p>返回结果</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "返回参数",
          "content": "{\n    \"data\": [\n        {\n            \"userId\": \"1\",\n            \"username\": \"13928424080\",\n            \"name\": \"Mini 主机 (中性版 Hub002)\",\n            \"phone\": \"000000000021\",\n            \"role\": \"1.1.0\",\n            \"email\": \"1.3.10.2\",\n            \"action\": \"1\"\n        },\n        {\n            \"userId\": \"2\",\n            \"username\": \"13928424080\",\n            \"name\": \"Mini 主机 (中性版 Hub002)\",\n            \"phone\": \"000000000021\",\n            \"role\": \"1.1.0\",\n            \"email\": \"1.3.10.2\",\n            \"action\": \"1\"\n        },\n        {\n            \"userId\": \"3\",\n            \"username\": \"13928424080\",\n            \"name\": \"Mini 主机 (中性版 Hub002)\",\n            \"phone\": \"000000000021\",\n            \"role\": \"1.1.0\",\n            \"email\": \"1.3.10.2\",\n            \"action\": \"1\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Number",
            "optional": false,
            "field": "Code",
            "description": "<p>返回 0</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误消息</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/actions/user.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/user/:userId",
    "title": "",
    "name": "getUser",
    "group": "User",
    "description": "<p>获取用户信息</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "Code",
            "description": "<p>成功返回 1, 失败返回 0</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>消息</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>返回结果</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Number",
            "optional": false,
            "field": "Code",
            "description": "<p>返回 0</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误消息</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/actions/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/user",
    "title": "",
    "name": "getUser",
    "group": "User",
    "description": "<p>增加用户</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "Code",
            "description": "<p>成功返回 1, 失败返回 0</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>消息</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>返回结果</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Number",
            "optional": false,
            "field": "Code",
            "description": "<p>返回 0</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误消息</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/actions/user.js",
    "groupTitle": "User"
  }
] });
