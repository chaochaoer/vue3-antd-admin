import dragDefault from "./dragType/dragDefault"
import dragLine from "./dragType/dragLine"

const customDragCol = (options) => {
  if (!options.columns) throw new Error("columns为必传项")
  // 设置默认值
  options.dragAreaWidth = options.dragAreaWidth ? options.dragAreaWidth : 20
  options.minCellWidth = options.minCellWidth ? options.minCellWidth : 30

  if (options.mode === undefined || options.mode === "default") {
    dragDefault(options)
  } else if (options.mode === "line") {
    console.log(options, "options")
    dragLine(options)
  }
}
export default customDragCol