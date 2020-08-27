<template>
  <div>
    <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
    <div id="main" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
      data: [10, 52, 200, 334, 390, 330, 220]
    };
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("main"));

    // 指定图表的配置项和数据
    var option = {
      title: {
        text: "计算机网络技术"
      },
      tooltip: {},
      legend: {
        data: ["销量"]
      },
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
      },
      yAxis: {
        // y轴
        type: "value",
        show: false, // 是否显示坐标轴
        data: [],
        axisLabel: { show: false }, // 坐标轴刻度标签
        axisLine: { show: false }, // 坐标轴轴线
        axisTick: { show: false }, // 坐标轴刻度
        splitLine: { show: false } // 分割线
      },
      series: [
        {
          type: "bar",
          barWidth: 40, // 柱子宽度
          label: {
            show: true,
            position: "top", // 位置
            color: "#1CD8A8",
            fontSize: 14,
            fontWeight: "bold", // 加粗
            distance: 20 // 距离
          }, // 柱子上方的数值
          itemStyle: {
            barBorderRadius: [20, 20, 0, 0], // 圆角（左上、右上、右下、左下）
            color: new echarts.graphic.LinearGradient(
              0,
              1,
              0,
              0,
              ["#2FAEF2", "#1CD8A8"].map((color, offset) => ({ color, offset }))
            ) // 渐变
          },
          data: [10, 52, 200, 334, 390, 330, 220]
        },
        {
          // 阴影柱形
          type: "bar",
          barWidth: 40,
          itemStyle: {
            color: "rgba(167,167,167,0.2)",
            barBorderRadius: [20, 20, 0, 0]
          },
          barGap: "-100%",
          data: this.data.map(item => {
            return (item += 100);
          })
        },
        {
          type: "line",
          smooth: true, // 线条转折有弧度
          symbol: "circle", // 数值点类型('circle', 'rectangle', 'triangle', 'diamond', 'emptyCircle', 'emptyRectangle', 'emptyTriangle', 'emptyDiamond')
          showSymbol: true,
          symbolSize: 8, // 数值点的大小
          itemStyle: {
            color: ["#1CD8A8"]
          }, // 数值点的颜色
          lineStyle: {
            width: 2,
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: "#2FAEF2" },
              { offset: 1, color: "#1CD8A8" }
            ])
          }, // 线条渐变
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
              { offset: 0, color: "rgba(47,174,242,0)" },
              { offset: 0.5, color: "rgba(34,202,192,0.04)" },
              { offset: 1, color: "rgba(28,216,168,0.52)" }
            ])
          }, // 线条区域渐变
          data: this.data // 折线图的渲染数据
        },
        {
          type: "bar",
          barWidth: 12,
          label: {
            show: true,
            position: "top",
            formatter: params => {
              return params.value + "万";
            },
            color: "#1CD8A8",
            fontSize: 14,
            fontWeight: "bold",
            distance: 25
          }
        }
      ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }
};
</script>

<style>
</style>