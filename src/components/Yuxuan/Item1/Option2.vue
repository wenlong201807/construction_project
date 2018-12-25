<template>
  <div class="con">
    <div class="header">header</div>
    <div class="content">

      <div>option2</div>
      <Row>
        <Col span="12"> 开始时间:
        <date-picker
          type="datetime"
          v-model="startTime"
          placeholder="请选择开始时间"
          :options="startTimeOption"
          @on-change="onStartTimeChange"
        ></date-picker>
        </Col>
        <Col span="12"> 结束时间:
        <date-picker
          type="datetime"
          v-model="endTime"
          placeholder="请选择结束时间"
          :options="endTimeOption"
          @on-change="onEndTimeChange"
        ></date-picker>
        </Col>
      </Row>
    </div>
    <div class="footer">footer</div>
    <Row>
      <Col span="12">
      <DatePicker
        type="date"
        :options="options3"
        placeholder="Select date"
        style="width: 200px"
      ></DatePicker>
      </Col>
      <Col span="12">
      <DatePicker
        type="date"
        :options="options4"
        placeholder="Select date"
        style="width: 200px"
      ></DatePicker>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: 'option2',
  data () {
    return {
      startTime: '',
      endTime: '2018-08-11 23:59:59',
      startTimeOption: {},
      endTimeOption: {},

      options3: {
        disabledDate (date) {
          return date && date.valueOf() < Date.now() - 86400000
        }
      },
      options4: {
        disabledDate (date) {
          const disabledDay = date.getDate()
          return disabledDay === 15
        }
      }
    }
  },
  mounted () {
    this.startTime = '2018-08-08 00:00:00';
    this.endTime = '2018-08-11 23:59:59';
    this.onStartTimeChange(this.startTime)
    this.onEndTimeChange(this.endTime)
  },
  methods: {
    /**
     * 开始时间发生变化时触发,设置结束时间不可选择的日期
     * 结束时间应大于等于开始时间,且小于等于当前时间
     * @param {string} startTime 格式化后的日期
     * @param {string} type 当前的日期类型
     */
    onStartTimeChange (startTime, type) {
      this.endTimeOption = {
        disabledDate (endTime) {
          return endTime < new Date(startTime) || endTime > Date.now()
        }
      }
    },

    /**
     * 结束时间发生变化时触发,设置开始时间不可选择的日期
     * 开始时间小于等于结束时间,且小于等于当前时间
     * @param {string} date 格式化后的日期
     * @param {string} type 当前的日期类型
     */
    onEndTimeChange (endTime, type) {
      this.startTimeOption = {
        disabledDate (startTime) {
          return startTime > new Date(endTime) || startTime > Date.now()
        }
      }
    }
  }
}
</script>

<style>
/* .con{
  display: flex;
  flex-direction: column;
} */
.header,
.footer {
  height: 30px;
  background: #ccc;
}
.content {
  height: 100%;
  background: pink;
}
</style>
