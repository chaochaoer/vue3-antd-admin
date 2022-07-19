import { defineComponent, PropType } from 'vue'
import { Pie } from 'vue-chartjs'
import { ChartData } from '../types'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  Plugin
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

export default defineComponent({
  name: 'PieChart',
  components: {
    Pie
  },
  props: {
    chartData: {
      type: Object as PropType<ChartData>,
      required: true
    },
    chartId: {
      type: String,
      default: 'pie-chart'
    },
    width: {
      type: Number,
      default: 200
    },
    height: {
      type: Number,
      default: 200
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object as PropType<Partial<CSSStyleDeclaration>>,
      default: () => { }
    },
    plugins: {
      type: Array as PropType<Plugin<'pie'>[]>,
      default: () => []
    }
  },
  setup(props) {
    return () => (
      <Pie
        chartData={props.chartData}
        chartOptions={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "right",
            },
          }
        }}
        chartId={props.chartId}
        width={props.width}
        height={props.height}
        cssClasses={props.cssClasses}
        styles={props.styles}
        plugins={props.plugins}
      />
    )
  }
})
