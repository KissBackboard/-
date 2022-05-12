// 默认的学生信息，方便测试各个功能（可删除）
const defaultInfo = [{
    id: Math.random(),
    code: 2033,
    name: '百里玄策',
    sex: '男',
    age: 23,
    satisfy: true,
    isEdit: false
}, {
    id: Math.random(),
    code: 3044,
    name: '百里守约',
    sex: '男',
    age: 25,
    satisfy: true,
    isEdit: false
}, {
    id: Math.random(),
    code: 2044,
    name: '蔡文姬',
    sex: '女',
    age: 20,
    satisfy: true,
    isEdit: false
}, {
    id: Math.random(),
    code: 2055,
    name: '甄姬',
    sex: '女',
    age: 25,
    satisfy: true,
    isEdit: false
}, {
    id: Math.random(),
    code: 3011,
    name: '虞姬',
    sex: '女',
    age: 22,
    satisfy: true,
    isEdit: false
}]

// 把默认的学生信息添加到浏览器本地存储（若已经有信息则不添加）
localStorage.getItem('persistence_user_info') || localStorage.setItem('persistence_user_info', JSON.stringify(defaultInfo));

// 默认的学生信息，方便测试各个功能（可删除）
const defaultRecycleInfo = [{
    id: Math.random(),
    code: 4022,
    name: '司空震',
    sex: '男',
    age: 33,
    satisfy: true,
    isEdit: false,
    date: +new Date()
}, {
    id: Math.random(),
    code: 4033,
    name: '高渐离',
    sex: '男',
    age: 30,
    satisfy: true,
    isEdit: false,
    date: +new Date() - 1000
}, {
    id: Math.random(),
    code: 5011,
    name: '瑶',
    sex: '女',
    age: 20,
    satisfy: true,
    isEdit: false,
    date: +new Date() - 2000
}, {
    id: Math.random(),
    code: 4077,
    name: '小乔',
    sex: '女',
    age: 22,
    satisfy: true,
    isEdit: false,
    date: +new Date() - 3000
}, {
    id: Math.random(),
    code: 5066,
    name: '大乔',
    sex: '女',
    age: 25,
    satisfy: true,
    isEdit: false,
    date: +new Date() - 4000
}]

// 把默认的学生信息添加到浏览器本地存储（若已经有信息则不添加）
localStorage.getItem('recycle_user_info') || localStorage.setItem('recycle_user_info', JSON.stringify(defaultRecycleInfo));