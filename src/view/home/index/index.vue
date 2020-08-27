<template>
  <div>
    <el-card class="box-card">
      <div class="header-left">
        <div class="image">
          <img
            style="width:50px; height:50px; border-radius:50% "
            :src="this.$store.state.userInfo.photo"
          />
        </div>
        <div class="info">
          <span>
            <b>黑马头条官方账号</b>
          </span>
          <span class="info-vido">视频发布</span>
        </div>
      </div>
      <div class="header-right">
        <div class="fensi">
          <span>
            <b>222</b>
          </span>
          <span class="fensi-x">粉丝数</span>
        </div>
        <el-divider direction="vertical"></el-divider>
        <div class="fensi">
          <span>
            <b>333</b>
          </span>
          <span class="fensi-x">累计阅读量</span>
        </div>
        <el-divider direction="vertical"></el-divider>
        <div class="fensi">
          <span>
            <b>444</b>
          </span>
          <span class="fensi-x">累计评论数</span>
        </div>
      </div>
    </el-card>

    <!-- 下面部分 -->
    <el-col>
      <el-col :span="15">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>最新图文</span>
            <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
          </div>
          <div class="content">
            <img
              style="width:100px; height:80px;"
              src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=372372667,1126179944&fm=26&gp=0.jpg"
              alt
            />
          </div>
          <div class="content">
            <img
              style="width:100px; height:80px;"
              src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3056216629,1469615337&fm=26&gp=0.jpg"
              alt
            />
          </div>
        </el-card>

        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>动态</span>
            <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
          </div>
          <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
          <div id="main" style="width: 600px;height:400px;" ref="echar"></div>
        </el-card>
      </el-col>
      <el-col :span="9">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>粉丝数据</span>
          </div>

          <div id="main" style="width: 420px;height:400px;" ref="wrap"></div>
        </el-card>

        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>最新图文</span>
          </div>
          <div id="main" style="width: 35 0px;height:400px;" ref="newArt"></div>
        </el-card>
      </el-col>
    </el-col>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
      mobie: "鸭肉",
      data: [10, 52, 200, 334, 390, 330, 220]
    };
  },
  mounted() {
    // 获取要渲染的标签dom
    var myChart = echarts.init(this.$refs.wrap);
    // 配置
    let option = {
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        orient: "vertical",
        left: 10,
        data: ["直达"]
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          selectedMode: "single",
          radius: [0, "30%"],
          label: {
            position: "inner"
          },
          labelLine: {
            show: false
          },
          legendHoverLink: {
            hover: true
          },
          data: [
            { value: 335, name: "直达", selected: true },
            { value: 679, name: "营销广告" },
            { value: 1548, name: "搜索引擎" }
          ]
        },
        {
          name: "访问来源",
          type: "pie",
          radius: ["40%", "55%"],
          label: {},
          data: [
            { value: 335, name: this.mobie },
            { value: 310, name: "邮件营销" },
            { value: 234, name: "联盟广告" },
            { value: 135, name: "视频广告" },
            { value: 1048, name: "百度" },
            { value: 251, name: "谷歌" },
            { value: 147, name: "必应" },
            { value: 102, name: "其他" }
          ]
        }
      ]
    };
    myChart.setOption(option);

    //雷达
    var Chart = echarts.init(this.$refs.newArt);
    option = {
      title: {},
      tooltip: {},
      radar: {
        // shape: 'circle',
        name: {
          textStyle: {
            color: "#fff",
            backgroundColor: "#999",
            borderRadius: 3,
            padding: [3, 5]
          }
        },
        indicator: [
          { name: "销售", max: 6500 },
          { name: "管理", max: 16000 },
          { name: "信息技术", max: 30000 },
          { name: "客服", max: 38000 },
          { name: "研发", max: 52000 },
          { name: "市场", max: 25000 }
        ]
      },
      series: [
        {
          name: "预算 vs 开销（Budget vs spending）",
          type: "radar",
          // areaStyle: {normal: {}},
          data: [
            {
              value: [4300, 10000, 28000, 35000, 50000, 19000],
              name: "预算分配（Allocated Budget）"
            },
            {
              value: [5000, 14000, 28000, 31000, 42000, 21000],
              name: "实际开销（Actual Spending）"
            }
          ]
        }
      ]
    };
    Chart.setOption(option);

    // 曲线表
    // 基于准备好的dom，初始化echarts实例
    var mChart = echarts.init(this.$refs.echar);

    // 指定图表的配置项和数据
    option = {
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
    mChart.setOption(option);
  }
};
</script>

<style lang='less' scoped>
.box-card {
  margin: 10px;
  padding-bottom: 30px;

  .header-left {
    width: 300px;
    height: 80px;
    float: left;
    display: flex;
    align-items: center;
    margin-left: 20px;
    .info {
      display: flex;
      flex-direction: column;
      align-content: space-around;
    }
    .info-vido {
      color: #ccc;
      font-size: 8px;
      padding: 5px 0;
    }
    span {
      font-size: 14px;
      margin-left: 10px;
    }
    .image {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }

  .header-right {
    width: 500px;
    height: 80px;
    float: right;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }
  /deep/.el-card__body {
    padding: 0 !important;
  }
  .fensi {
    display: flex;
    flex-direction: column;
    text-align: center;
    margin: 0 30px;
  }
  .fensi-x {
    font-size: 8px;
    color: #ccc;
  }
  .box1 {
    width: 500px;
    height: 500px;
    background: red;
  }
}
/deep/.el-card__header {
  background: #f2f3f5;
}

.content {
  width: 90%;
  height: 100px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
}
</style>