// 实例化Vue
const vm = new Vue({
    el: '#root',
    data: {
        info: JSON.parse(localStorage.getItem("persistence_user_info")) || [],
        recycleInfo: JSON.parse(localStorage.getItem("recycle_user_info")) || [],
        showOperate: false,
        addCode: '',
        addName: '',
        addSex: '',
        addAge: '',
        inquireCodeValue: '',
        inquireNameValue: '',
        ifOwl: true,
        ifOwlSpeak: true,
        owlSpeak: '可以持久化存储信息哦',
        owlLoadIfSucceed: false,
        owlLoadInfo: 'canvas加载中...',
        ascOrDesc: 'asc',
        // 猫头鹰随机说的句子
        owlRandomSpeak: [
            '可以持久化存储信息哦',
            'JavaScript是最好的语言',
            '没有对象? new一个',
            '本人面向百度、CSDN编程',
            '我以后在给代码加注释',
            '见鬼了，昨天还好好的',
            '启动！ Ctrl+C大法',
            '它在我电脑上能运行',
        ],
        showRecycle: false
    },
    methods: {
        add() {
            // 使所有用于增加操作的表单值为空
            this.addCode = this.addName = this.addSex = this.addAge = '';
            this.showOperate = true;
            // 下一次DOM更新结束后执行指定的回调函数
            this.$nextTick(function () {
                this.$refs.addCode.focus();
            });
        },
        affirm() {
            let code = this.addCode;
            let name = this.addName;
            let sex = this.addSex;
            let age = this.addAge;
            // 判断所有用于输入新增用户信息的表单 值是否为空
            if (code == '' || name == '' || sex == '' || age == '') return alert('信息不完整');
            // 判断是否有学号重复
            for (let i = 0; i < this.info.length; i++) {
                if (this.info[i].code == this.addCode) return alert('学号重复!');
            }
            // 新建一个学生对象
            let obj = {
                id: Math.random(),
                code,
                name,
                sex,
                age,
                satisfy: true,
                isEdit: false
            }
            // 把这个学生对象添加到info
            this.info.push(obj);
            this.showOperate = false;
            this.OwlSpeakShow('欢迎新同学：' + name);
        },
        deleteInfo(user) {
            // 添加到回收站
            let obj = {
                id: user.id,
                code: user.code,
                name: user.name,
                sex: user.sex,
                age: user.age,
                satisfy: user.satisfy,
                isEdit: user.isEdit,
                date: +new Date(),
            };
            this.recycleInfo.unshift(obj);
            // 删除一个学生对象
            this.info = this.info.filter(item => item.id != user.id);
            this.OwlSpeakShow(user.name + ' 的信息删除成功');
        },
        edit(user) {
            // 判断是否为编辑状态
            if (user.isEdit) {
                // 非编辑状态
                // 判断当前行的学号是否与其他学号重复
                this.currentCodeIfRepeat(user);
            } else {
                // 编辑状态
                user.isEdit = true;
                // 下一次DOM更新结束后执行指定的回调函数
                this.$nextTick(function () {
                    // 点击编辑后使第一个文本框赋值
                    this.$refs.editFirst.forEach(item => {
                        if (item.value == user.code) return item.focus();
                    });
                });
            }
        },
        // 按学号查询
        inquireCode() {
            let meetsNum = 0;
            let inquireInfo;
            // 判断是查询回收站的表格还是学生信息的表格
            this.showRecycle ? inquireInfo = this.recycleInfo : inquireInfo = this.info;
            inquireInfo.forEach(element => {
                element.code.toString().indexOf(this.inquireCodeValue) != -1 ? element.satisfy = true : element.satisfy = false;
                element.satisfy && meetsNum++;
            });
            this.inquireCodeValue ? this.OwlSpeakShow('有 ' + meetsNum + ' 位同学符合查询条件') : this.OwlSpeakShow('输入后会自动查询');
        },
        // 按姓名查询
        inquireName() {
            this.banSpace();
            let meetsNum = 0;
            let inquireInfo;
            // 判断是查询回收站的表格还是学生信息的表格
            this.showRecycle ? inquireInfo = this.recycleInfo : inquireInfo = this.info;
            inquireInfo.forEach(element => {
                element.name.indexOf(this.inquireNameValue) != -1 ? element.satisfy = true : element.satisfy = false;
                element.satisfy && meetsNum++;
            });
            this.inquireNameValue ? this.OwlSpeakShow('有 ' + meetsNum + ' 位同学符合查询条件') : this.OwlSpeakShow('输入后会自动查询');
        },
        inquireAlone(mark) {
            if (mark == 'code') {
                this.inquireCode();
                this.inquireNameValue = '';
            } else if (mark == 'name') {
                this.inquireName();
                this.inquireCodeValue = '';
            }
        },
        // 禁止输入空格
        banSpace() {
            window.event.target.value = window.event.target.value.replace(/\s+/g, ''); //适用于keyup事件
            if (window.event.keyCode == 32 || window.event.code == 'Space' || window.event.key == ' ') return window.event.returnValue = false; //适用于keydown事件
        },
        // 判断所有学号是否重复，并把重复学号所在的行设为编辑状态
        allCodeIfRepeat() {
            let flag = false;
            for (let i = 0; i < this.info.length; i++) {
                let frequency = 0;
                let element = this.info[i];
                for (let j = 0; j < this.info.length; j++) {
                    let elements = this.info[j];
                    if (element.code == elements.code) {
                        frequency++;
                        if (frequency > 1) {
                            element.isEdit = true;
                            flag = true;
                        }
                    }
                }
            }
            flag && alert('学号重复!');
            return flag;
        },
        // 判断当前行的学号是否与其他学号重复
        currentCodeIfRepeat(user) {
            let frequency = 0;
            for (let i = 0; i < this.info.length; i++) {
                if (this.info[i].code == user.code) {
                    frequency++;
                    if (frequency > 1) {
                        alert('学号重复!');
                        return true;
                    }
                }
            }
            user.isEdit = false;
            return false;
        },
        OwlSpeakShow(speak) {
            this.ifOwlSpeak = true;
            this.owlSpeak = speak;
        },
        OwlSpeakHide() {
            this.ifOwlSpeak = false;
        },
        // 学生信息表格排序
        variousSort(mark) {
            // 根据学号排序
            if (mark == 'code') {
                this.ascOrDesc == 'asc' ? this.info.sort((a, b) => a.code - b.code) : this.info.sort((a, b) => b.code - a.code);
            }
            // 根据姓名排序
            else if (mark == 'name') {
                this.ascOrDesc == 'asc' ? this.info.sort((a, b) => a.name.localeCompare(b.name)) : this.info.sort((a, b) => b.name.localeCompare(a.name));
            }
            // 根据性别排序
            else if (mark == 'sex') {
                this.ascOrDesc == 'asc' ? this.info.sort((a, b) => a.sex.localeCompare(b.sex)) : this.info.sort((a, b) => b.sex.localeCompare(a.sex));
            }
            // 根据年龄排序
            else if (mark == 'age') {
                this.ascOrDesc == 'asc' ? this.info.sort((a, b) => a.age - b.age) : this.info.sort((a, b) => b.age - a.age);
            }
            this.ascOrDesc == 'asc' ? this.ascOrDesc = 'desc' : this.ascOrDesc = 'asc';
        },
        // 回收站表格排序
        recycleVariousSort(mark) {
            if (mark == 'code') {
                this.ascOrDesc == 'asc' ? this.recycleInfo.sort((a, b) => a.code - b.code) : this.recycleInfo.sort((a, b) => b.code - a.code);
            }
            // 根据姓名排序
            else if (mark == 'name') {
                this.ascOrDesc == 'asc' ? this.recycleInfo.sort((a, b) => a.name.localeCompare(b.name)) : this.recycleInfo.sort((a, b) => b.name.localeCompare(a.name));
            }
            // 根据日期排序
            else if (mark == 'date') {
                this.ascOrDesc == 'asc' ? this.recycleInfo.sort((a, b) => a.date - b.date) : this.recycleInfo.sort((a, b) => b.date - a.date);
            }
            this.ascOrDesc == 'asc' ? this.ascOrDesc = 'desc' : this.ascOrDesc = 'asc';
        },
        // 对于iframe加载成功的处理
        owlLoad() {
            this.owlLoadIfSucceed = true;
            this.owlLoadInfo = '隐藏';
        },
        // 在回收站彻底删除
        thoroughDeleteInfo(user) {
            // 彻底删除一个学生对象
            this.recycleInfo = this.recycleInfo.filter(item => item.id != user.id);
        },
        // 在回收站还原一个学生
        reductionInfo(user) {
            let repeat = false;
            for (let i = 0; i < this.info.length; i++) {
                if (this.info[i].code == user.code) {
                    alert('学号重复!');
                    repeat = true;
                    this.info[i].isEdit = repeat;
                    user.isEdit = repeat;
                } 
            }
            // 添加到学生信息表
            let obj = {
                id: user.id,
                code: user.code,
                name: user.name,
                sex: user.sex,
                age: user.age,
                satisfy: user.satisfy,
                isEdit: repeat
            };
            this.info.unshift(obj);
            this.thoroughDeleteInfo(user);
        },
        allEmpty() {
            this.recycleInfo = [];
        }
    },
    filters: {
        timeformater(value, str = 'YYYY年MM月DD日 HH:mm:ss') {
            return dayjs(value).format(str);
        },
    },
    watch: {
        // 深度监视info
        info: {
            deep: true,
            handler(value) {
                localStorage.setItem("persistence_user_info", JSON.stringify(value));
            },
        },
        // 深度监视recycleInfo
        recycleInfo: {
            deep: true,
            handler(value) {
                localStorage.setItem("recycle_user_info", JSON.stringify(value));
            },
        },
    },
    mounted() {
        // 恢复各个属性的默认值（防止刷新网页后还处于编辑、查询等状态）
        this.info.forEach(element => {
            element.isEdit = false;
            element.satisfy = true;
        });
        // 对于（在编辑状态并且有学号重复的情况下刷新网页）的措施
        // 判断所有学号是否重复，并把重复学号所在的行设为编辑状态
        this.allCodeIfRepeat();
        // 让猫头鹰随机说话
        setInterval(() => {
            !this.ifOwlSpeak && this.OwlSpeakShow(this.owlRandomSpeak[Math.floor(Math.random() * this.owlRandomSpeak.length)]);
        }, 6000);
    }
});
