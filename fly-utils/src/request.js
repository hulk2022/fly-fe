export const request = {
  createXHR() {
    if (typeof XMLHttpRequest != "undefined") {
      return new XMLHttpRequest();
    } else if (typeof ActiveXObject != "undefined") {
      if (typeof agreement.callee.activeXString != "string") {
        let versions = [
            "MSXML2.XMLHTTP.6.0",
            "MSXML2.XMLHTTP.3.0",
            "MSXML2.XMLHTTP",
          ],
          i,
          len;
        for (i = 0, len = versions.length; i < len; i++) {
          try {
            new ActiveXObject(versions[i]);
            arguments.callee.activeXString = versions[i];
            break;
          } catch (ex) {}
        }
      }
      return new ActiveXObject(arguments.callee.activeXString);
    } else {
      throw new Error("No XHR object available.");
    }
  },
  get(params) {
    let { url, data } = params;
    if (data) {
      url += "?";
      Object.keys(data).forEach((key) => (url += `${key}=${data[key]}&`));
      url = url.slice(0, -1);
    }
    const xhr = this.createXHR();
    return new Promise((resolve, reject) => {
      xhr.open("get", url);
      xhr.send();
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
            try {
              const res = JSON.parse(xhr.responseText);
              resolve(res);
            } catch (e) {
              resolve(xhr.responseText);
            }
          } else {
            reject(xhr.status);
          }
        }
      };
    });
  },
  post(params) {
    const defaultContentType = "application/json";
    const { url, data, contentType = defaultContentType } = params;
    const xhr = this.createXHR();
    let sendParams = "";
    if (data) {
      if (contentType === "application/x-www-form-urlencoded") {
        Object.keys(data).forEach(
          (key) => (sendParams += `${key}=${data[key]}&`)
        );
        sendParams = sendParams.slice(0, -1);
      } else {
        sendParams = JSON.stringify(data);
      }
    }
    return new Promise((resolve, reject) => {
      xhr.open("post", url);
      xhr.setRequestHeader("Content-Type", contentType);
      xhr.send(sendParams);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
            try {
              const res = JSON.parse(xhr.responseText);
              resolve(res);
            } catch (e) {
              resolve(xhr.responseText);
            }
          } else {
            reject(xhr.status);
          }
        }
      };
    });
  },
};
