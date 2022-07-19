/**
 * 生成表格拖拽功能
 * @param {Object} options
 * columns antDesign的columns,columns需要响应式
 * dragAreaWidth 拖拽区域的最小宽度
 * minCellWidth 最小单元格宽度
 * mode 模式
 * lineStyle 参考线样式
 */
const dragLine = options => {
  let oLine = document.createElement("div")
  let defaultLineStyle = {
    position: 'absolute',
    top: '0',
    bottom: '0',
    background: 'red',
    width: '5px',
    zIndex: "9999"
  }
  let arr = []
  if (options.lineStyle) {
    for (let key in options.lineStyle) {
      defaultLineStyle[key] = options.lineStyle[key]
    }
  }
  for (let key in defaultLineStyle) {
    let str = key + ":" + defaultLineStyle[key]
    arr.push(str)
  }
  oLine.style.cssText = arr.join(";")
  options.columns.forEach((column, index) => {
    column.customHeaderCell = (record) => {
      let
        oldX,       // 鼠标刚开始按下的时候的X轴距离
        newX,       // 鼠标刚开始按下,并且开始滑动的时候的X轴距离
        isMouseDown = false, // 鼠标是否按下
        initCellOffsetLeft, // 初始单元格距离表格左侧的偏移位
        headerCell = record.title[0]?.el?.closest("th")zzz
      return {
        onmouseenter(event) {
          initCellOffsetLeft = headerCell.offsetLeft
          // 切换游标类型
          this.onmousemove = (event) => {
            if (event.offsetX > this.offsetWidth - options.dragAreaWidth) {
              this.style.cursor = 'col-resize'
            } else {
              this.style.cursor = 'default'
            }
          }
          this.onmousedown = (event) => {
            // 判断游标是否处于可拖拽区域
            if (event.offsetX > this.offsetWidth - options.dragAreaWidth) {
              isMouseDown = true
              oldX = event.clientX
              let offsetX = event.offsetX // 鼠标按下时，距离当前单元格左侧的距离
              headerCell.appendChild(oLine)
              oLine.style.left = offsetX + initCellOffsetLeft + "px"
              document.onmousemove = (event) => {
                if (isMouseDown) {
                  newX = event.clientX
                  let currentCellWidth = offsetX + newX - oldX // 当前的单元格宽度
                  let oLineLeft = currentCellWidth + initCellOffsetLeft // 参考线距离表格左侧的距离
                  let minOLineLeft = initCellOffsetLeft + options.minCellWidth
                  oLineLeft = oLineLeft <= minOLineLeft ? minOLineLeft : oLineLeft
                  oLine.style.left = oLineLeft + "px"
                }
              }
              document.onmouseup = (event) => {
                let currentCellWidth = oLine.offsetLeft - initCellOffsetLeft
                options.columns[index].width = currentCellWidth <= options.minCellWidth ? options.minCellWidth : currentCellWidth
                if (isMouseDown) {
                  headerCell.removeChild(oLine)
                }
                isMouseDown = false
                document.onmousemove = null
                document.onmouseup = null
              }
            }
          }
        },
        onmouseleave() {
          this.onmousemove = null
        }
      }
    }
  })
}
export default dragLine
