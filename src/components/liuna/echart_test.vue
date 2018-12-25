<template>
  <div>
    <Button to="/page">to_page_分页案例</Button>
    <Button to="/sys_com">刘娜_sys_com</Button>
    <Button to="/layout">to_layout_页面布局</Button>
    <Button to="/">跳转到登录页面</Button>
    <Button to="/yuxuan">to_雨萱姐_的页面</Button>
    <Button to="/echart_test">/echart_test</Button>
    <Button to="/test">to_测试_的页面</Button>
    <Button to="/echart_long">/echart_long</Button>
    <hr>
    <div
      id="echartContainer"
      class="my_chart"
    ></div>
    <div
      class="card_mock"
      v-for="(item,index) in target_list"
      :key="index"
    >
      <p>name:{{item.name}}</p>
      <p>value:{{item.value}}</p>
      <Button
        type="primary"
        @click="add_data"
      >添加数据</Button>
      <p
        v-if="isShow"
        v-for="(item,index) in new_add_data"
        :key="index"
      >{{item.aa}}</p>
    </div>
    <div class="card_mock add_data">

    </div>
  </div>
</template>

<script>
export default {
  name: 'hellowdvw',
  data () {
    return {
      isShow: false,
      msg: 'Welcome to Your Vue.js App',
      target_list: [
        { name: 'yyytest111', value: 'xxxvalue' },
        { name: 'yyytest222', value: 'xxxvalue' }
      ],
      new_add_data: [{ aa: 'asdf' }, { aa: 'sdfgsfg' }]
    }
  },
  mounted () {
    this.drawLine()
  },
  methods: {
    add_data () {
      this.isShow = !this.isShow
    },
    drawLine (_this) {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(
        document.getElementById('echartContainer')
      )
      _this = this
      console.log(_this)
      // 点击事件
      myChart.on('click', function (params) {
        console.log(_this)
        console.log(params)

        let newObject = { name: params.name, value: params.value }
        _this.target_list.push(newObject)
      })

      console.log(this.target_list)

      // 绘制图表
      myChart.setOption({
        title: {
          text: 'Prof是否NSF你ile',
          left: 'center'
        },
        dataZoom: [
          {
            type: 'slider',
            start: 80,
            // 缩放的结束位置的百分比，0 - 100
            end: 100,
            filterMode: 'weakFilter',
            showDataShadow: false,
            top: 400,
            height: 10,
            borderColor: 'transparent',
            backgroundColor: '#e2e2e2',
            handleIcon:
              'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z', // jshint ignore:line
            handleSize: 20,
            handleStyle: {
              shadowBlur: 6,
              shadowOffsetX: 1,
              shadowOffsetY: 2,
              shadowColor: '#aaa'
            },
            labelFormatter: ''
          },
          {
            type: 'inside',
            filterMode: 'weakFilter'
          }
        ],
        grid: {
          height: 300
        },
        tooltip: {},
        xAxis: {
          data: [
            '20181225',
            '20181226',
            '20181227',
            '20181228',
            '20181229',
            '20181230'
          ]
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      })
    }
  }
}
</script>

<style scoped>
.my_chart {
  height: 440px;
  width: 800px;
  margin: 20px auto;
  border: 1px solid #ccc;
}
.card_mock {
  height: 100px;
  width: 150px;
  float: left;
  margin-right: 20px;
  border: 1px solid #ccc;
}
</style>
