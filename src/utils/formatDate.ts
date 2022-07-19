// 获取到时间戳，改成时间格式
export default function formatDate(now: number | undefined | "") {
  if(!now) return now
  let oNow: Date = new Date(now)
  const year = oNow.getFullYear() // 取得4位数的年份
  const month = ("0" + (oNow.getMonth() + 1)).slice(-2) // 取得日期中的月份，其中0表示1月，11表示12月
  const date = ("0" + oNow.getDate()).slice(-2) // 返回日期月份中的天数（1到31）
  const hour = ("0" + oNow.getHours()).slice(-2) // 返回日期中的小时数（0到23）
  const minute = ("0" + oNow.getMinutes()).slice(-2) // 返回日期中的分钟数（0到59）
  const second = ("0" + oNow.getSeconds()).slice(-2) // 返回日期中的秒数（0到59）
  return (
    year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
  )
}
