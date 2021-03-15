let baseURL = 'http://api-breakingnews-web.itheima.net';

$.ajaxPrefilter(function (options) {
    options.url = baseURL + options.url;
    if (options.url.indexOf("/my/") != -1) {
        options.headers = {
            Authorization: localStorage.getItem("my3Token") || ""
        }

        options.complete = function (res) {
            console.log(res);
            let resRps = res.responseJSON;
            if (resRps.status === 1 && resRps.message === "身份认证失败！") {
                localStorage.removeItem("my3Token");
                location.href = "/login.html";
            }
        }
    }
})