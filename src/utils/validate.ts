import type { Rule } from 'ant-design-vue/es/form';
type ruleTypes = null | ((_rule: Rule, value: string) => Promise<any>) | keyof typeof rules | (keyof typeof rules)[]
const rules = {
  isPhone: {
    pattern: /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/,
    message: "手机号格式不正确",
  },
  isNum: {
    pattern: /^\d+$/,
    message: "请输入纯数字",
  }
}

export default function validate(
  required: boolean,
  trigger: 'blur' | 'change' | ['change', 'blur'],
  ruleTypes?: ruleTypes,
  extra?: { [key: string]: string | number }
): Rule {
  const testSingleRule = (ruleTypes: keyof typeof rules, value: string) => {
    let rule = rules[ruleTypes]
    if (!rule.pattern.test(value)) return Promise.reject(rule.message);
    return Promise.resolve();
  }
  return {
    required,
    trigger,
    ...extra,
    validator: async (_rule: Rule, value: string) => {
      if (required) if (value === '') return Promise.reject('该字段为必填项');
      if (ruleTypes) {
        if (typeof ruleTypes === 'string') return testSingleRule(ruleTypes, value)
        else if (ruleTypes instanceof Array) for (let ruleType of ruleTypes) return testSingleRule(ruleType, value)
        else if (ruleTypes instanceof Function) return ruleTypes(_rule, value)
      }
      return Promise.resolve();
    }
  }
}

