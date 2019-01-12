<template>
  <div class="hello">
    <div class="init_table">
      <Button to="/page">to_page_分页案例</Button>
      <Button to="/sys_com">刘娜_sys_com</Button>
      <Button to="/layout">to_layout_页面布局</Button>
      <Button to="/">跳转到登录页面</Button>
      <Button to="/yuxuan">to_雨萱姐_的页面</Button>
      <Button to="/test">to_测试_的页面</Button>
      登录的名字:{{name}}******
      登录的密码:{{password}}
      <!-- 初始化下拉选择框 -->
      <Select v-model="model_select" style="width:200px">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <!-- 初始化表格使用的搜索框 -->
      <Input v-model="value_search" @on-enter="search_data" style="width: 400px">
      <Select v-model="select_search" slot="prepend" style="width: 120px">
        <Option value="id">序列号</Option>
        <Option value="server_num">服务组件简称</Option>
        <Option value="server_state">服务状态</Option>
        <Option value="component_type">所属组件平台</Option>
        <Option value="component_num">服务组件名称</Option>
        <Option value="component_num">组件安全节点</Option>
      </Select>
      <Button slot="append" icon="ios-search"></Button>
      </Input>
    </div>
    <!-- 初始化表格*****带分页功能 -->
    <Table class="init_table" border :no-filtered-data-text="kong" :data="tableData_init" :columns="tableColumns_init" stripe></Table>
    <div class="init_table" style="margin: 20px auto;overflow: hidden">
      <div style="float: right;">
        <Page :total="dataCount" :page-size="pageSize" show-elevator show-total class="paging" @on-change="init_changepage"></Page>
      </div>
    </div>
    <!-- 查看模态框 -->
    <Modal class="check_modal" v-model="modalCheck" title="查看数据模态框">
      <div>
        <Button type="primary" @click="open_add_modal = true">添加</Button>
        <Modal draggable v-model="open_add_modal" title="添加数据" @on-ok="add_ok" @on-cancel="add_cancel">
          <Input v-model="add_server_path" clearable style="width:350px;">
          <span slot="prepend">服务路径</span>
          </Input>
          <Input v-model="add_view_path" clearable style="width:350px;margin-top:20px;">
          <span slot="prepend">视图路径</span>
          </Input>
        </Modal>
        <Button @click="check_del_checked">删除选中</Button>
      </div>
      <!-- 查看模态框中的表格 -->
      <Table @on-select-all="check_select_all" @on-select="check_select_one" ref="selection" class="init_table" border :no-filtered-data-text="kong" :columns="columns_table" :data="data_table"></Table>
      <!-- 查看模态框中的分页 -->
      <Page :total="check_dataCount" :page-size="check_pageSize" show-elevator show-total class="check_paging" @on-change="check_changepage"></Page>
    </Modal>
    <!-- 修改模态框 -->
    <Modal :styles="{top: '20px',width:'600px'}" v-model="modalFix" title="修改数据模态框" @on-ok="fix_ok" @on-cancel="fix_cancel">
      <table>
        <thead>
          <tr>
            <th style="width:60px">编号</th>
            <th style="width:270px">视图路径</th>
            <th style="width:270px">服务器路径</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td> {{fix_id}}</td>
            <td>
              <Input v-model="fix_view_path" style="width: 260px" />
            </td>
            <td>
              <Input v-model="fix_server_path" style="width: 260px" />
            </td>
          </tr>
        </tbody>
      </table>
    </Modal>
    <!-- 删除一条信息的模态框 -->
    <Modal draggable v-model="modal_del_btn" title="删除提示框" @on-ok="ok_modal_del_btn" @on-cancel="cancel_modal_del_btn">
      <p>您确定要删除id为{{del_one_id}}的数据吗？</p>
    </Modal>

    <!-- 王编辑器模态框 -->
    <Modal draggable :width="700" v-model="modal_wangeditor" title="测试王编辑器动态获取数据" @on-ok="ok_modal_wangeditor" @on-cancel="cancel_modal_wangeditor">
      <h2>您当前查看的数据是第{{del_one_id}}条的数据</h2>
      <Form ref="formInline" :model="formInline">

        <FormItem>
          <Row>
            <h2>编号是(我是动态获取的):{{formInline.id}}</h2>
            <Col span="7">
            <p>视图路径{{formInline.server_path}}</p>
            <editor-bar v-model="formInline.server_path" :isClear="true" @change="(val)=>{val}"></editor-bar>
            </Col>

            <Col offset="2" span="7">
            <p>服务器路径{{formInline.view_path}}</p>
            <editor-bar v-model="formInline.view_path" :isClear="true" @change="(val)=>{val}"></editor-bar>
            </Col>
          </Row>
        </FormItem>

        <FormItem>
          <!-- <Row>
            <Col span="10" v-for="(item,index) in formInline.wang_arr" :key="index">
            <h2>编号是:{{item.id}}</h2>
            <editor-bar v-model="item.server_path" :isClear="false" @change="(val)=>{val}"></editor-bar>
            <editor-bar v-model="item.view_path" :isClear="false" @change="(val)=>{val}"></editor-bar>
            </Col>
          </Row> -->

        </FormItem>
        <FormItem>
          <!-- <Button type="primary" @click="handleSubmit_editor('formInline')">Signin</Button> -->
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import axios from 'axios'
import EditorBar from '@/components/wangeditor/amend.vue'
export default {
  name: 'HelloWorld',
  components: { EditorBar },
  data () {
    return {
      // 王编辑器
      modal_wangeditor: false,
      // modal_wangeditor: true,
      formInline: {
        wang_arr: [],
        server_path: '<h2>我是默认值，动态获取的内容，为什么不能放进夫文本框里面来</h2>',
        id: '',
        view_path: '<h4>我是默认值，动态获取的内容，为什么不能放进夫文本框里面来 </h4>'
      },
      // 接收登录名字和密码
      name: '登录默认名字',
      password: '123456',
      // 删除一条数据的id
      del_one_id: '',
      modal_del_btn: false,
      // 添加模态框
      open_add_modal: false,
      // 初始化表格的搜索框
      value_search: '',
      select_search: 'id',
      // 详情页中复选框中的id数组
      check_ids: [],
      // 初始化的分页的信息
      ajaxHistoryData: [],
      // 初始化信息总条数
      dataCount: 0,
      // 每页显示多少条
      pageSize: 8,
      // 查看模态框中的分页
      check_ajaxHistoryData: [],
      // 初始化信息总条数
      check_dataCount: 0,
      // 每页显示多少条
      check_pageSize: 6,
      // 查看数据模态框中的添加部分
      add_view_path: '',
      add_server_path: '',
      // 查询结果为空时，的提示信息
      kong: '暂无您所查询的结果，请重新查询',
      // 修改模态框中的数据
      fix_id: '',
      fix_view_path: '',
      fix_server_path: '',
      // 初始化表格的数据
      tableData_init: [],
      tableColumns_init: [
        {
          title: '序列号',
          key: 'id',
          sortable: true,
          width: 90
        },
        {
          title: '服务组件简称',
          key: 'server_num',
          render: (h, params) => {
            return h('div', 'A05' + Math.floor(Math.random() * 100))
          },
          filters: [
            {
              label: '大于AL0466',
              value: 1
            },
            {
              label: '小于AL0433',
              value: 2
            },
            {
              label: '大于于AL0433,大于AL0466',
              value: 3
            }
          ],
          filterMultiple: false,
          filterMethod (value, row) {
            if (value === 1) {
              return row.server_num > 'AL0466'
            } else if (value === 2) {
              return row.server_num < 'AL0433'
            } else {
              return row.server_num
            }
          }
        },
        {
          title: '服务状态',
          key: 'server_state',
          render: (h, params) => {
            const row = params.row
            const color =
              row.server_state === 1
                ? 'blue'
                : row.server_state === 2
                  ? 'green'
                  : 'red'
            const text =
              row.server_state === 1
                ? '不可用'
                : row.server_state === 2
                  ? '可用'
                  : '不可用'
            return h(
              'Tag',
              {
                props: {
                  type: 'dot',
                  color: color
                }
              },
              text
            )
          }
        },
        {
          title: '所属组件平台',
          key: 'component_type',
          // width: 50
          filters: [
            {
              label: 'Greater than P5',
              value: 1
            },
            {
              label: 'Less than P5',
              value: 2
            }
          ],
          filterMultiple: false,
          filterMethod (value, row) {
            if (value === 1) {
              return row.component_type > 'P5'
            } else if (value === 2) {
              return row.component_type < 'P5'
            }
          }
        },
        {
          title: '服务组件名称',
          key: 'component_num',
          sortable: true
          // render: (h, params) => {
          //   return h('div', '外部客户同意认证' + params.row.time)
          // }
        },
        {
          title: '组件安全节点号',
          key: 'component_num'
          // render: (h, params) => {
          //   return h('div', '1008' + Math.floor(Math.random() * 1000))
          // }
        },
        {
          title: '操作',
          key: 'check_detail',
          width: 70,
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.modalCheck = true
                      console.log(params.index, params)
                    }
                  }
                },
                '查看'
              )
            ])
          }
        }
      ],
      // 查看模态框
      modalCheck: false,
      // 修改模态框
      modalFix: false,
      // 下拉选择框的数据
      cityList: [
        {
          value: '系统1',
          label: '系统1'
        },
        {
          value: '系统2',
          label: '系统2'
        },
        {
          value: '系统3',
          label: '系统3'
        },
        {
          value: '系统4',
          label: '系统4'
        }
      ],
      model_select: '',
      // 查询详情的表格数据
      columns_table: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '编号',
          key: 'id',
          sortable: true,
          width: 80
        },
        {
          title: '视图路径',
          key: 'view_path'
          // width: 220
        },
        {
          title: '服务器路径',
          key: 'server_path'
          // width: 220
        },
        {
          title: '操作',
          key: 'id',
          width: 200,
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '10px'
                  },
                  on: {
                    click: () => {
                      // 显示修改模态框
                      this.modalFix = true
                      // 将原有内容传递给修改弹出层的input中
                      this.fix_id = params.row.id
                      this.fix_view_path = params.row.view_path
                      this.fix_server_path = params.row.server_path
                    }
                  }
                },
                '修改'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginRight: '10px'
                  },
                  on: {
                    click: () => {
                      // 打开删除模态对话框
                      this.modal_del_btn = true
                      // 将要删除的id赋值给模态框
                      this.del_one_id = params.row.id
                    }
                  }
                },
                '删除'
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
                      // 打开删除模态对话框
                      this.modal_wangeditor = true
                      // 将要删除的id赋值给模态框
                      this.del_one_id = params.row.id
                      console.log('当前行数据', params.row)
                      this.formInline.wang_arr = params.row
                      console.log(this.formInline.wang_arr)
                      this.formInline.id = params.row.id
                      this.formInline.server_path = params.row.server_path
                      this.formInline.view_path = params.row.view_path
                      console.log('服务器路径', this.formInline.server_path)
                      console.log('视图路径', this.formInline.view_path)
                    }
                  }
                },
                '王编辑'
              )
            ])
          }
        }
      ],
      data_table: []
    }
  },
  created () {
    // 获取localstorage中的名字和密码
    let getLogin = JSON.parse(localStorage.getItem('login'))
    this.name = getLogin.name
    this.password = getLogin.password

    this.initData()
    this.initManage()
    // console.log(
    //   this.$route.query.Id,
    //   this.$route.query.user,
    //   this.$route.query.password
    // )
  },
  methods: {
    handleSubmit_editor (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    // 王编辑器的使用
    cancel_modal_wangeditor () {
      console.log('cancel')
    },
    ok_modal_wangeditor () {
      console.log('ok')
      console.log('新编辑的内容****服务器路径', this.formInline.server_path)
      console.log('新编辑的内容****视图路径', this.formInline.view_path)
    },
    // 删除选中当前页所有数据
    check_select_all (selection) {
      selection.map((item, index) => {
        this.check_ids.push(item.id)
      })
    },
    // 删除一行的数据的模态框
    ok_modal_del_btn () {
      axios
        .delete('http://localhost:3000/init/' + this.del_one_id)
        .then(res => {
          if (res.status === 200) {
            let delIndex = this.data_table.findIndex(
              item => item.id === this.del_one_id
            )
            if (delIndex >= 0) {
              this.data_table.splice(delIndex, 1)
            }
          }
        })
      this.$Message.info('成功为您删除id为' + this.del_one_id + '的数据')
    },
    cancel_modal_del_btn () {
      this.$Message.info('您已取消删除')
    },
    // 查看数据中的添加***操作
    add_ok () {
      // 当添加框中的内容为空时，阻止发送请求
      if (this.add_view_path === '' || this.add_server_path === '') {
        this.$Message.info('请填写数据****')
        return false
      }
      let newData = {
        view_path: this.add_view_path,
        server_path: this.add_server_path
      }
      axios.post('http://localhost:3000/init', newData).then(res => {
        // 清空输入框中的内容
        this.add_view_path = this.add_server_path = ''
        // 重新更新页面数据
        this.initData()
        // 修改成功的提示信息
        this.$Message.info('数据添加成功')
      })
    },
    add_cancel () {
      this.$Message.info('取消添加数据')
    },
    // 初始化页面的搜索框***
    search_data () {
      // 发送请求，返回对应数据到表格中
      axios
        .get(
          'http://localhost:3000/manage?' +
          this.select_search +
          '=' +
          this.value_search
        )
        .then(res => {
          this.tableData_init = res.data
        })
    },
    // 详情中的表格数据
    async initData () {
      const { data } = await axios.get('http://localhost:3000/init')
      this.data_table = data
      // 分页中***保存取到的所有数据
      this.check_ajaxHistoryData = this.data_table
      this.check_dataCount = this.data_table.length
      // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
      if (this.data_table.length < this.check_pageSize) {
        this.data_table = this.check_ajaxHistoryData
      } else {
        this.data_table = this.check_ajaxHistoryData.slice(
          0,
          this.check_pageSize
        )
      }
    },
    // 详情页中的全选与全部选
    handleSelectAll (status) {
      this.$refs.selection.selectAll(status)
    },
    // 复选框中选中的数据，获取id值
    check_select_one (selection, row) {
      this.check_ids.push(row.id) // 将所有选中的id加入进一个数组中
    },
    // 删除选中
    check_del_checked () {
      //  每次删除一个，循环删除
      this.check_ids.map((item, index) => {
        // 删除数据库的数据
        axios.delete('http://localhost:3000/init/' + item).then(res => {
          // 删除页面中的数据
          let delIndex = this.data_table.findIndex(
            itemaa => itemaa.id === item
          )
          if (delIndex >= 0) {
            this.data_table.splice(delIndex, 1)
          }
        })
      })
      this.$Message.info('您将要删除id为' + this.string_ids + '的数据')
    },
    // 修改模态框中的确定与取消事件
    fix_ok () {
      // 新修改的数据发给后台
      let todata = {
        id: this.fix_id,
        view_path: this.fix_view_path,
        server_path: this.fix_server_path
      }
      axios
        .put('http://localhost:3000/init/' + this.fix_id, todata)
        .then(res => {
          console.log(res)
        })
      // 发送给后台，重新显示到页面中id不变
      this.data_table.findIndex(item => {
        if (item.id === this.fix_id) {
          item.view_path = this.fix_view_path
          item.server_path = this.fix_server_path
        }
      })
      // 修改成功的提示信息
      this.$Message.info('fix_Clicked ok****修改成功')
    },
    fix_cancel () {
      this.$Message.info('fix_Clicked cancel****取消删除')
    },
    async initManage () {
      const { data } = await axios.get('http://localhost:3000/manage')
      this.tableData_init = data
      // 分页中***保存取到的所有数据
      this.ajaxHistoryData = this.tableData_init
      this.dataCount = this.tableData_init.length
      // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
      if (this.tableData_init.length < this.pageSize) {
        this.tableData_init = this.ajaxHistoryData
      } else {
        this.tableData_init = this.ajaxHistoryData.slice(0, this.pageSize)
      }
    },
    init_changepage (index) {
      var _start = (index - 1) * this.pageSize
      var _end = index * this.pageSize
      this.tableData_init = this.ajaxHistoryData.slice(_start, _end)
    },
    check_changepage (index) {
      let _start = (index - 1) * this.check_pageSize
      let _end = index * this.check_pageSize
      this.data_table = this.check_ajaxHistoryData.slice(_start, _end)
    }
  },
  mounted () { }
}
</script>

<style  >
.paging {
  float: right;
  margin-top: 10px;
}
.init_table {
  width: 900px;
  margin: 10px auto;
}
/* 查看模态框的 */
.check_modal {
  width: 1000px;
}
.check_modal .ivu-modal {
  width: 940px !important;
}
.check_modal .ivu-modal-footer {
  display: none;
}
</style>
