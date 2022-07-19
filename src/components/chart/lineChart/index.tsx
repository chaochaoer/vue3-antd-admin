import { defineComponent, PropType } from 'vue'
import { Line } from 'vue-chartjs'
import { ChartData } from '../types'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
  Plugin
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale
)

export default defineComponent({
  name: 'lineChart',
  components: {
    Line
  },
  props: {
    chartData: {
      type: Object as PropType<ChartData>,
      required: true
    },
    chartId: {
      type: String,
      default: 'line-chart'
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
      type: Array as PropType<Plugin<'line'>[]>,
      default: () => []
    }
  },
  setup(props) {
    return () => (
      <Line
        chartData={props.chartData}
        chartOptions={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "right",
              labels: {
                boxWidth: 0
              }
            },
          }
        }}
        width={props.width}
        height={props.height}
        chartId={props.chartId}
        cssClasses={props.cssClasses}
        styles={props.styles}
        plugins={props.plugins}
      />
    )
  }
})
