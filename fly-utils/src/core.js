import { utils } from "./utils";
import { request } from "./request";

const queryByPageUrl = "/fly/public/api/data/page"; // 分页查询post
const queryAllUrl = "/fly/public/api/data/all"; //查询所有post
const saveUrl = "/fly/public/api/data/save"; //新增/编辑post
const delUrl = "/fly/public/api/datadelete"; //删除post

const urlMap = {
  test: "https://m.test.ximalaya.com",
  prod: "https://work.ximalaya.com",
};

export const FlyUtils = {
  env: "", //环境变量test/prod，初始化必传
  appKey: "", //应用的key，初始化必传
  appSecret: "", //用来加密，初始化必传
  appCode: "", //应用对应的编码，初始化必传
  signature: "", //签名密钥
  opsId: "", //对应访问人的opsId，用以权限判断
  init(params) {
    this.initParams(params);
  },
  initParams(param) {
    if (["test", "prod"].includes(param?.env)) {
      this.env = param.env;
    } else {
      console.error("缺少或env参数不正确，可能的值有test、prod！");
      return false;
    }
    if (param?.hasOwnProperty("appKey") && param?.hasOwnProperty("appCode")) {
      this.appKey = param.appKey;
      this.appCode = param.appCode;
    } else {
      console.error("缺少appKey和appCode！");
      return false;
    }
    if (param?.hasOwnProperty("appSecret")) {
      this.appSecret = param.appSecret;
    } else {
      console.error("缺少appSecret！");
      return false;
    }
    return true;
  },
  getOrigin() {
    return urlMap[this.env];
  },
  validateInit() {
    if (!this.appKey || !this.appCode || !this.appSecret || !this.env) {
      console.error("请检查appKey、appCode、appSecret、env参数是否完善");
      return false;
    }
    return true;
  },
  getSignature(req) {
    let reqStr = "";
    const reqArr = [];
    for (const key in req) {
      reqArr.push(
        `${key}=${
          typeof req[key] === "string" ? req[key] : JSON.stringify(req[key])
        }`
      );
    }
    reqStr = reqArr.join("&");
    return utils.signGenerator(this.appSecret, reqStr);
  },
  query({ opsId, entityCode, params }) {
    if (!this.validateInit()) {
      return Promise.reject("请先初始化应用");
    }
    const url = `${this.getOrigin()}${queryAllUrl}`;
    const req = {
      entityCode,
      params,
    };
    const signature = this.getSignature(req);
    const sign = {
      appKey: this.appKey,
      appCode: this.appCode,
      opsId,
      signature,
    };
    return request.post({
      url,
      data: {
        sign,
        body: req,
      },
    });
  },
  queryByPage({ opsId, entityCode, pageNo, pageSize, params }) {
    if (!this.validateInit()) {
      return Promise.reject("请先初始化应用");
    }
    const url = `${this.getOrigin()}${queryByPageUrl}`;
    const req = {
      entityCode,
      params,
      pageNo,
      pageSize,
    };
    const signature = this.getSignature(req);
    const sign = {
      appKey: this.appKey,
      appCode: this.appCode,
      opsId,
      signature,
    };
    return request.post({
      url,
      data: {
        sign,
        body: req,
      },
    });
  },
  save({ opsId, entityCode, params }) {
    if (!this.validateInit()) {
      return Promise.reject("请先初始化应用");
    }
    const url = `${this.getOrigin()}${saveUrl}`;
    const req = {
      entityCode,
      data: params,
    };
    const signature = this.getSignature(req);
    const sign = {
      appKey: this.appKey,
      appCode: this.appCode,
      opsId,
      signature,
    };
    return request.post({
      url,
      data: {
        sign,
        body: req,
      },
    });
  },
  del({ opsId, entityCode, params }) {
    if (!this.validateInit()) {
      return Promise.reject("请先初始化应用");
    }
    const url = `${this.getOrigin()}${delUrl}`;
    const req = {
      entityCode,
      id: params,
    };
    const signature = this.getSignature(req);
    const sign = {
      appKey: this.appKey,
      appCode: this.appCode,
      opsId,
      signature,
    };
    return request.post({
      url,
      data: {
        sign,
        body: req,
      },
    });
  },
};
