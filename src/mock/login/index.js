const Mock = require("mockjs")

const getLogin = (req, res) => {
  // console.log(req, res, "XXX")

  return {
    data: Mock.mock({
      'list|1-200': [{
        'id|+4': 1,
        random: Math.random()
      }]
    }),
    code: 200,
    message: "OK"
  }
}


module.exports = {
  getLogin
}