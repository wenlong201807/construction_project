import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Page from '@/views/Page'
import Login from '@/views/Login'
import Test from '@/views/Test'
import Yuxuan from '@/views/Yuxuan'
import SysCom from '@/components/liuna/sys_com.vue'
import EchartTest from '@/components/liuna/echart_test.vue'
import EchartLong from '@/components/liuna/echart_long.vue'
import EchartCal from '@/components/liuna/echart_cal.vue'
import UpLoad from '@/views/upload/FileUpload.vue'
import UpLoadIview from '@/views/upload/iview_upload.vue'
import UpLoadTest from '@/views/upload/upload_test.vue'
import SelectTest from '@/components/liuna/select_test.vue'
import Layout from '@/views/Layout'
import Item1 from '@/views/Item1'
import Item2 from '@/views/Item2'
import Item3 from '@/views/Item3'
import Item4 from '@/views/Item4'
import exportExcel from '@/views/excel/export-excel'
import uploadExcel from '@/views/excel/upload-excel'
import Option1 from '@/components/Yuxuan/Item1/Option1'
import Option2 from '@/components/Yuxuan/Item1/Option2'
import Option3 from '@/components/Yuxuan/Item1/Option3'
import Option4 from '@/components/Yuxuan/Item1/Option4'
import excel from '@/components/Yuxuan/Item1/excel'
Vue.use(Router)

export default new Router({
    routes: [{
            path: '/helloWorld',
            name: 'HelloWorld',
            component: HelloWorld
        },
        {
            path: '/sys_com',
            name: 'sys_com',
            component: SysCom
        },
        {
            path: '/echart_test',
            name: 'EchartTest',
            component: EchartTest
        },
        {
            path: '/echart_long',
            name: 'EchartLong',
            component: EchartLong
        },
        {
            path: '/echart_cal',
            name: 'EchartCal',
            component: EchartCal
        },
        {
            path: '/uploadiview',
            name: 'UpLoadIview',
            component: UpLoadIview
        },
        {
            path: '/upload',
            name: 'upload',
            component: UpLoad
        },
        {
            path: '/upload_test',
            name: 'UpLoadTest',
            component: UpLoadTest
        },
        {
            path: '/select_test',
            name: 'SelectTest',
            component: SelectTest
        },
        {
            path: '/',
            name: 'Login',
            component: Login
        },
        {
            path: '/page',
            name: 'Page',
            component: Page
        },
        {
            path: '/export_excel',
            name: 'export_excel',
            component: exportExcel
        },
        {
            path: '/upload_excel',
            name: 'upload_excel',
            component: uploadExcel
        },
        {
            path: '/layout',
            name: 'Layout',
            component: Layout
        },
        {
            path: '/test',
            name: 'Test',
            component: Test
        },
        {
            path: '/yuxuan',
            name: 'Yuxuan',
            component: Yuxuan,
            redirect: '/yuxuan/item1/option1',
            children: [{
                    path: 'item1/option1',
                    name: 'Option1',
                    component: Option1
                },
                {
                    path: 'item1/option2',
                    name: 'Option2',
                    component: Option2
                },
                {
                    path: 'item1/option3',
                    name: 'Option3',
                    component: Option3
                },
                {
                    path: 'item1/option4',
                    name: 'Option4',
                    component: Option4
                },
                {
                    path: 'item1/excel',
                    name: 'excel',
                    component: excel
                }
            ]
        },
        {
            path: '/yuxuan/item1',
            name: 'Item1',
            component: Item1,
            redirect: '/yuxuan/item1'
        },
        {
            path: '/yuxuan/item2',
            name: 'Item2',
            component: Item2
        },
        {
            path: '/yuxuan/item3',
            name: 'Item3',
            component: Item3
        },
        {
            path: '/yuxuan/item4',
            name: 'Item4',
            component: Item4
        }
    ]
})

// children: [
//   {
//     path: 'option1',
//     name: 'Option1',
//     component: Option1
//   },
//   {
//     path: 'option2',
//     name: 'Option2',
//     component: Option2
//   },
//   {
//     path: 'option3',
//     name: 'Option3',
//     component: Option3
//   }
// ]