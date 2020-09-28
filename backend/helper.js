class Helper {
  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  constructErrorReson(errors) {
    const msg = [];
    const errorKeys = Object.keys(errors);
    errorKeys.map((key, index) => {
      msg.push(errors[key].message.replace('Path', 'Param'));
    });
    return msg;
  }

  construcResponse(status, res = null, message = null) {
    console.log('param', {
      status,
      res,
      message,
    });
    let resObj = {};
    resObj.message = message ? message : res._message;
    resObj.status = status;

    if (status >= 200 && status < 300) {
      if (res) {
        resObj.data = res;
      }
      resObj.success = true;
    }

    if (status >= 400 && status < 600) {
      if (res && res.hasOwnProperty('errors')) {
        resObj.error = res.errors;
        resObj.reason = this.constructErrorReson(res.errors);
      }
      resObj.success = false;
    }

    if (status >= 500) {
      resObj.message = 'Server error';
    }

    console.log('resObj', resObj);
    return resObj;
  }
}

module.exports = new Helper();
