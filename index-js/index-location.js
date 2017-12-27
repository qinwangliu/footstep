/**
 * 获取地点坐标js
 */
var baiduApi =
    "http://api.map.baidu.com/geocoder/v2/?address=${address}&output=json&ak=WOgrMM000YaDyHaB0LniT0tj&callback=?";
// var googleApi = "http://maps.google.com/maps/api/geocode/json?sensor=false&address=${address}";

function check() {
    var city = $('#inputcity').val();
    console.log(city);
    baiduApi = baiduApi.replace("${address}", city);
    // googleApi = googleApi.replace("${address}", city);
    $.ajax({
        url: baiduApi,
        // url: googleApi,
        type: 'GET',
        dataType: 'json',
        timeout: 1000,
        cache: false,
        beforeSend: LoadFunction, //加载执行方法    
        error: erryFunction, //错误执行方法    
        success: succFunction //成功执行方法    
    })
}


function LoadFunction() {
    $("#info").html('加载中...');
}

function erryFunction() {
    // alert("error");
    $('#waring').css('display', 'block');
}

function succFunction(tt) {
    var json = eval(tt); //数组
    var location = json.result.location;
    console.log(json.result.location);
    var pointStr = "经度(lng)：" + location.lng + "<br /><br />纬度(lat)：" + location.lat;
    $("#info").html(pointStr);
}