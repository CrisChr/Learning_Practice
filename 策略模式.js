/*
 ** 策略模式：定义一系列的算法并把它们一个个封装起来（将变化的部分不变的部分隔离起来）
 */

/**
 * 奖金计算
 *    变化的部分：工资和绩效等级
 *    不变的部分：每个等级的奖金额度
 */
const strategies = {
  A: function (salary) {
    return salary * 4;
  },
  B: function (salary) {
    return salary * 3;
  },
  C: function (salary) {
    return salary * 2;
  },
};

class Bouns {
  constructor(performace, salary) {
    this.performace = performace;
    this.salary = salary;
  }

  getBounce() {
    return strategies[this.performace](this.salary);
  }
}

const performaceA = new Bouns("A", 12000);
const performaceB = new Bouns("B", 5000);

// console.log('A: ', performaceA.getBounce());
// console.log('B: ', performaceB.getBounce());

/**
 * 表单验证
 *    策略：表单内每项输入的验证规则
 */

// 定义策略对象
const formStrategies = {
  maxLength: function (value, maxLength, errMsg) {
    if (value.length > maxLength) {
      return errMsg;
    }
  },
  isNoEmpty: function (value, errMsg) {
    if (value !== null && value === "") {
      return errMsg;
    }
  },
  isMobile: function (value, errMsg) {
    if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
      return errMsg;
    }
  },
};

const registerForm = document.getElementById("registerForm");

registerForm.onSubmit = function(){
  const errorMsg = validatorFunc();
  if(errorMsg){
    alert(errorMsg);
    return false;
  }
}

const validatorFunc = function () {
  const validator = new Validator();

  // 注意这里的第一个参数传入的是dom节点对象
  validator.add(registerForm.password, "maxLength:8", "密码长度最长为8位！");
  validator.add(registerForm.userName, "isNoEmpty", "用户名不能为空！");
  validator.add(registerForm.mobile, "isMobile", "手机号码格式不正确！");

  const errorMessage = validator.start();
  return errorMessage;
};

class Validator {
  constructor() {
    this.validatorList = []; // 保存校验规则列表
  }

  add(dom, strategy, errMsg) {
    const strategyArr = strategy.split(":");
    this.validatorList.push(function () {
      const st = strategyArr.shift();
      strategyArr.unshift(dom.value);
      strategyArr.push(errMsg);
      return formStrategies[st].apply(dom, strategyArr); // 这里通过apply函数改变this指向：将formStrategies对象里的函数调用指向dom节点，以获取dom节点上的value值
    });
  }

  start() { // 依次执行校验规则列表里的函数
    for (let i = 0, len = this.validatorList.length; i < len; i++) {
      const errorMessage = this.validatorList[i]();
      if (!!errorMessage) {
        return errorMessage;
      }
    }
  }
}
