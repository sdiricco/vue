<script>
import { Line } from 'vue-chartjs'
import "chartjs-plugin-streaming";


export default {
  name: 'Chart',
  extends: Line,
  props: {
    data: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },
  mounted () {
    this.renderChart(this.data, this.options)
  }
}
</script>

