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
    <Button to="/echart_cal">/echart_cal</Button>
    <h2>跳转链接</h2>

    <Alert show-icon>当前 iView 版本为 3.0.0</Alert>
    <Table
      ref="myTable"
      border
      :data="dataList"
      :columns="columns"
    >
      <!-- 可展开 -->
      <template
        slot="expandRow"
        slot-scope="props"
      >
        <div style="padding:16px;">
          <Row>
            <Col span="8">
            <span class="expand-key">Name: </span>
            <span class="expand-value">{{ props.row.name }}</span>
            </Col>
            <!--   <Col span="8">
            <span class="expand-key">Age: </span>
            <span class="expand-value">{{ props.row.age }}</span>
            </Col>
            <Col span="8">
            <span class="expand-key">Date: </span>
            <span class="expand-value">{{ props.row.date }}</span>
            </Col>-->
            <Col span="8">
            <span class="expand-key">Dateaa: </span>
            <span class="expand-value">{{ props.row.dateaa }}</span>
            </Col>

            <--
              <Col
              span="8"
              v-for="(item,index) in expand_data"
              :key="index"
            >
              <span class="expand-key">{{item.title}}: </span>
              <span
                class="expand-value"
                v-html="item.content"
              ></span>
              <span class="expand-value">{{ `${props.row+'.'+item.conten}` }}</span>
              <span class="expand-value">{{ props.row.dateaa }}</span>
              </Col> -->

              <Col
                span="8"
                v-for="(item,index) in dataList"
                :key="index"
              >
              <span class="expand-key">{{item.name}}: </span>
              <span
                class="expand-value"
                v-html="item.dateaa"
              ></span>
              <!-- <span class="expand-value">{{ `${props.row+'.'+item.conten}` }}</span> -->
              <!-- <span class="expand-value">{{ props.row.dateaa }}</span> -->
              </Col>
          </Row>
        </div>
      </template>
    </Table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataList: [],
      columns: [
        {
          type: 'expand',
          width: 50,
          render: (h, params) => {
            return h(
              'div',
              this.$refs.myTable.$scopedSlots.expandRow({ row: params.row })
            )
          }
        },
        { type: 'index', title: '序号' },
        { key: 'age', title: 'Age' },
        { key: 'date', title: 'Date' }
      ],
      expand_data: [
        { title: '名字', content: 'dateaa' },
        { title: '年龄', content: 'props.row.age' }
      ]
    }
  },
  mounted () {
    this.dataList = [
      {
        name: 'John Brown',
        age: 18,
        date: '2016-10-03',
        dateaa: '201aa'
      },
      {
        name: 'Jim Green',
        age: 24,
        date: '2016-10-01',
        dateaa: '2016bb'
      },
      {
        name: 'Joe Black',
        age: 30,
        date: '2016-10-02',
        dateaa: '2016cc'
      },
      {
        name: 'Jon Snow',
        age: 26,
        date: '2016-10-04',
        dateaa: '2016dd'
      }
    ]
  }
}
</script>
