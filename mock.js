// 用mockjs模拟生成数据
var Mock = require('mockjs')

module.exports = () => {
    // 使用 Mock
    var data = Mock.mock({
            'manage|50': [{
                // 属性 id 是一个自增数，起始值为 1，每次增 1
                'id|+1': 1,
                server_num: 'AL04@natural(100, 999)',
                server_name: '@ctitle(5)',
                component_num: '1080@natural(10, 99)',
                component_type: 'P@natural(1, 9)',
                'server_state|1-2': 1 // '1可用'2不可用
            }],
            'checkDetail|50': [{
                // 属性 id 是一个自增数，起始值为 1，每次增 1
                'id|+1': 1,
                server_num: 'AL0442@natural(100, 999)',
                server_name: '@ctitle(5,10)',
                server_vision: '0@natural(0, 9)',
                server_type: '组件服务',
                server_component: 'AL0@natural(10, 99)',
                server_boolean: '@boolean()',
                'server_state|1-2': 1 // '1可用'2不可用
            }],
            'init|50': [{
                'id|+1': 1,
                view_path: '<h2>/views/A05814@natural(100, 999)/01</h2>',
                server_path: '<h2>/services/A0581/A058141@natural(10, 99)/0@natural(1, 9)</h2>'
            }],
            'law|50': [{
                'id|+1': 1,
                ID: 'CN024_A0781_@natural(1, 9)',
                law_name: '@ctitle(5)_境内法人CN024(村镇银行)',
                law_zone: 'CN'
            }],
            // 调用别人的接口（根据用户名和用户角色查询所有用户所拥有的系统）
            'findSystemByuserName|10': [{
                'id|+1': 1,
                appId: 'AL04@natural(100, 999)',
                compname: 'N-ISMM@natural(10, 99)',
                cname: '管理机构@natural(10, 99)',
                ename: 'manage@natural(10, 99)'
            }],

            // 让用户给系统选择服务主键
            'findServiceComponentList|10': [{
                'id|+1': 1 + 'OLD_COST',
                name: 'OLD_COST@natural(10, 99)',
                securityNode: 'Y15100@natural(10, 99)',
                servicePlatformId: 'COST@natural(10, 99)'
            }]
        })
        // 返回的data会作为json-server的数据
    return data
}