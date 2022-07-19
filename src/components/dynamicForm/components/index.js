const file = require.context('./', true, /\.vue/)
const components = {}
file.keys().forEach((key) => {
  components[file(key).default.name] = file(key).default || file(key)
})

export default components
