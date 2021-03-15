$(function () {
    getUserInfo();
    $("#logout").on("click", function () {
        localStorage.removeItem("my3Token");
        location.href = "/login.html";
    })
})

function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem("my3Token") || ""
        // },
        success: (res) => {
            // console.log(res);
            if (res.status != 0) {
                layer.msg(res.message, {
                    icon: 5
                });
                location.href = "/login.html";
                return;
            }
            layer.msg(res.message, {
                icon: 6
            });
            render(res.data);
        }
    })
}

function render(data) {
    let name = data.nickname || data.username;
    $(".welcome").text("欢迎  " + name);
    if (data.user_pic) {
        $(".layui-nav-img").attr("src", data.user_pic);
        $(".text-avatar").hide();
        $(".userName").text(name);
    } else {
        $(".layui-nav-img").hide();
        $(".text-avatar").text(name[0].toUpperCase());
        $(".userName").text(name);
    }
}