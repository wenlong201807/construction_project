<template>
  <div>
    <h2>系统与组件的对应关系</h2>
    <Button to="/page">to_page_分页案例</Button>
    <Button to="/sys_com">刘娜_sys_com</Button>
    <Button to="/layout">to_layout_页面布局</Button>
    <Button to="/">跳转到登录页面</Button>
    <Button to="/yuxuan">to_雨萱姐_的页面</Button>
    <Button to="/echart_test">/echart_test</Button>
    <Button to="/test">to_测试_的页面</Button>
    登录的名字:{{name}}******
    登录的密码:{{password}}
    <div style="margin:10px;"></div>
    <Table @on-expand="clickExpandHandle" class="sys_com_table" :columns="sys_com_columns" :data="sys_com_data"></Table>

    <!-- 表格中的输入框获得焦点时，弹出模态框 -->
    <Button type="primary" @click="modal_input = true">显示弹出层</Button>
    <Modal class="compontent_modal" v-model="modal_input" title="系统名字为****所对应的选择组件类型" @on-ok="ok_modal_input" @on-cancel="cancel_modal_input">
      <Transfer :not-found-text="'你所查询的id值不存在'" :data="transform_origin_data" :target-keys="transform_checked_data" :list-style="listStyle" :render-format="render_box" :operations="['To left','To right']" filterable @on-change="handleChange3">
        <div :style="{float: 'right', margin: '5px'}">
          <Button type="primary" size="small" @click="reloadMockData">重新加载数据</Button>
        </div>
      </Transfer>
    </Modal>

  </div>
</template>

<script>
import expandRow from './table_expand.vue'
import axios from 'axios'
export default {
  components: { expandRow },
  data () {
    return {
      // 弹出层的穿梭框
      listStyle: {
        width: '420px',
        height: '400px'
      },

      // 表格中的input对应的弹出层
      modal_input: false,
      // 登录名字
      name: '登录名字',
      password: '56987',
      sys_com_columns: [
        {
          type: 'expand',
          width: 50,
          render: (h, params) => {
            return h(expandRow, {
              props: {
                row: params.row
              }
            })
          }
        },
        {
          title: '编号',
          key: 'id'
        },
        {
          title: '组件名字',
          key: 'compname'
        },
        {
          title: '应用编号',
          key: 'appId'
        },
        {
          title: '系统名字',
          key: 'cname'
        },
        {
          title: '英文名字',
          key: 'ename'
        },
        {
          title: '组件名称',
          key: 'age',
          render: (h, params) => {
            return h('Input', {
              props: {
                row: params.row
              },
              on: {
                focus () {
                  console.log(456)
                }
              }
            })
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 250,
          render: (h, params) => {
            // return h('div', {
            //   props: {
            //     row: params.row
            //   }
            // })
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      // this.show(params.index)
                      this.$Notice.success({
                        title: '我是来说明页面操作的',
                        desc: 'The desc will hide when you set render.',
                        top: 80,
                        duration: 2,
                        render: h => {
                          return h('span', [
                            'This is created by ',
                            h('a', 'render'),
                            ' function'
                          ])
                        }
                      })
                    }
                  }
                },
                '查看'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      // 打开组件选择模态框
                      this.modal_input = true
                      // this.remove(params.index)
                      // 调用组件
                      this.checkMainId()
                    }
                  }
                },
                '组件选择'
              )
            ])
          }
        }
      ],
      sys_com_data: [
        // {
        //   name: 'John Brown',
        //   age: 18,
        //   address: 'New York No. 1 Lake Park',
        //   job: 'Data engineer',
        //   interest: 'badminton',
        //   birthday: '1991-05-14',
        //   book: 'Steve Jobs',
        //   movie: 'The Prestige',
        //   music: 'I Cry'
        // },
      ],

      // 穿梭框中的原始数据与选中数据
      transform_origin_data: [],
      transform_checked_data: []
    }
  },
  created () {
    this.initTable()
  },
  methods: {
    // 初始化表格数据***根据用户名和用户角色查询用户所拥有的系统
    async initTable () {
      let paramsInitTable = {
        username: this.name,
        userType: this.password,
        cc: { aa: 'aa' }
      }
      // JSON.stringify(paramsInitTable)
      const { data } = await axios.get(
        'http://localhost:3000/findSystemByuserName',
        { params: paramsInitTable }
      )
      // const { data } = await axios.get(
      //   'http://localhost:3000/findSystemByuserName',
      //   { params: JSON.stringify(paramsInitTable) }
      // )
      console.log(data)
      this.sys_com_data = data
    },

    // 让用户给系统选择服务主键
    async checkMainId () {
      const { data } = await axios.get(
        'http://localhost:3000/findServiceComponentList'
      )
      console.log(data)
      // 由于穿梭狂特性，需要固定的key为键，字符串数字为name
      data.map((item, index) => {
        item.key = (index + '1').toString()
      })
      this.transform_origin_data = data
    },

    // 弹出层的穿梭框
    handleChange3 (newTargetKeys) {
      // console.log('变化时的数据', newTargetKeys)
      // 将key的值与左侧的数组一一对应起来，查找需要的值，并添加到右侧
      // newTargetKeys.some((item, index) => {
      //   console.log(item, index)

      //   // this.transform_checked_data.push({
      //   //   name: this.transform_origin_data[index].name,
      //   //   securityNode: this.transform_origin_data[index].securityNode,
      //   //   servicePlatformId: this.transform_origin_data[index].servicePlatformId
      //   // })

      //   console.log(item, '变化时的数据', this.transform_origin_data)
      // })
      this.transform_origin_data = newTargetKeys
    },
    render_box (item) {
      // console.log(item)
      return (
        item.key +
        ' - ' +
        item.id +
        ' - ' +
        item.name +
        ' - ' +
        item.securityNode +
        ' - ' +
        item.servicePlatformId
      )
    },
    reloadMockData () {
      this.checkMainId()
    },
    // 穿梭框的搜索空能
    // filterMethod (data, query) {
    //   console.log(data, query)
    // },

    // 表格中input中的弹出层部分
    ok_modal_input () {
      this.$Message.info('Clicked ok_input')
      console.log(
        '我是确定按钮之后获取选中的内容',
        this.transform_checked_data
      )
    },
    cancel_modal_input () {
      this.$Message.info('Clicked cancel_input')
    },

    clickExpandHandle (row, state) {
      if (state === true) {
        console.log('在这里发请求')
      } else {
        console.log('请求失败')
      }
    }
  }
}
</script>

<style>
.sys_com_table {
  width: 900px;
  margin: 10px auto;
}

/* // 弹出层样式 */
.compontent_modal .ivu-modal {
  width: 1000px !important;
  top: 50px;
}
</style>
