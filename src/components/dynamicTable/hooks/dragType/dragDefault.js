/**
 * 生成表格拖拽功能
 * @param {Object} options 
 * columns antDesign的columns,columns需要响应式
 * dragAreaWidth 拖拽区域的最小宽度
 * isFullScreenDrag 是否支持全屏拖拽  [options.isFullScreenDrag?  document:this]
 * minCellWidth 最小单元格宽度
 * mode 模式
 */
const dragDefault = options => {
  let isMouseDown = false // 鼠标是否按下
  options.columns.forEach((column, index) => {
    let
      oldX,       // 鼠标刚开始按下的时候的X轴距离
      newX,       // 鼠标刚开始按下,并且开始滑动的时候的X轴距离
      initWidth
    column.customHeaderCell = (record) => {
      return {
        onmouseenter(event) {
          this.onmousemove = (event) => {
            if (isMouseDown) this.style.cursor = 'col-resize'
            else if (event.offsetX > this.offsetWidth - options.dragAreaWidth) {
              this.style.cursor = 'col-resize'
            } else {
              this.style.cursor = 'default'
            }
          }
        },
        onmousedown(event) {
          if (event.offsetX > this.offsetWidth - options.dragAreaWidth) {
            this.style.cursor = 'col-resize'
            isMouseDown = true;
            oldX = event.clientX
            initWidth = options.columns[index].width
            document.onmousemove = (event) => {
              document.body.style.cursor = 'col-resize'
              this.style.cursor = 'col-resize'
              if (isMouseDown) {
                newX = event.clientX
                let currentCellWidth = initWidth + newX - oldX
                options.columns[index].width = currentCellWidth <= options.minCellWidth ? options.minCellWidth : currentCellWidth
              } else {
                this.onmousemove = null // isMouseDown是false代表鼠标已经抬起,移除mousemove事件
              }
            }
            document.onmouseup = (event) => {
              isMouseDown = false;
              document.body.style.cursor = 'default'
              this.style.cursor = 'default'
              document.onmousemove = null
              document.onmouseup = null
            }
          } else {
            this.style.cursor = 'default'
          }
        },
        onmouseleave(event) {
          this.onmouseenter = null
        },
        onmouseup(event) {
          isMouseDown = false;
          document.onmousemove = null
          this.style.cursor = 'default'
        }
      }
    }
  })
}
export default dragDefault