$(function () {
    let layer = layui.layer;
    let form = layui.form;
    form.verify({
        username: function (value, item) { //value：表单的值、item：表单的DOM对象
                if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                    return '用户名不能有特殊字符';
                }
                if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                    return '用户名首尾不能出现下划线\'_\'';
                }
                if (/^\d+\d+\d$/.test(value)) {
                    return '用户名不能全为数字';
                }

                //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
                if (value === 'xxx') {
                    alert('用户名不能为敏感词');
                    return true;
                }
            }

            //我们既支持上述函数式的方式，也支持下述数组的形式
            //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
            ,
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        nickname: function (value) {
            if (value.trim().length < 1 || value.trim().length > 6) {
                return "昵称长度1-6位数";
            }
        }
    });

    initUserInfo();

    function initUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            dataType: 'json',
            success: (res) => {
                // console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message, {
                        icon: 5
                    });
                }
                form.val("formInfo", res.data);
            }
        })
    }
    $("form").on("submit", function (e) {
        e.preventDefault();
        let formInfo = $("form").serialize();
        $.ajax({
            url: '/my/userinfo',
            method: "POST",
            data: formInfo,
            dataType: 'json',
            success: (res) => {
                // console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message, {
                        icon: 5
                    });
                }
                layer.msg(res.message, {
                    icon: 6
                });
                window.parent.getUserInfo();
            }
        })
    })
    $("button[type=reset]").on("click", function (e) {
        e.preventDefault();
        // $("form")[0].reset();
        initUserInfo();
    })

})