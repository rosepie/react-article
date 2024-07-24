//柱状图组件封装
import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'

const BarChart = ({ title }) => {
  const chartRef = useRef(null)
  useEffect(() => {
    const myChart = echarts.init(chartRef.current)
    const option = {
      title: {
        text: title
      },
      xAxis: {
        type: 'category',
        data: ['记叙文', '说明文', '议论文', '应用文']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [180, 220, 150, 500],
          type: 'bar'
        }
      ]
    }
    option && myChart.setOption(option)
  }, [title])

  return <div ref={chartRef} style={{ width: 500, height: 400 }}></div>
}

export default BarChart