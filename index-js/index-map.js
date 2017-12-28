/**
 * 地图生成js
 */

var geoCoordMap = city2018;
var BJData = line2018;
var ageArr = [0,1,2,3,4,5,6,7,8,9,10,11,12];
var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var dataItem = data[i]; //是二维数组中的一维数组
        var fromCoord = geoCoordMap[dataItem[0].name];//出发点
        var toCoord = geoCoordMap[dataItem[1].name];//目的地
        if (fromCoord && toCoord) {
            res.push([{
                coord: fromCoord,
                value: dataItem[0].age
            }, {
                coord: toCoord
            }]);
        }
    }
    return res;
};

var color = ['#a6c84c', '#ffa022', '#46bee9'];
var series = [];
[
    ['首都', BJData]
].forEach(function (item, i) {
    series.push(
        {//地点间连线
            type: 'lines',
            zlevel: 2,
            effect: {
                show: true,
                period: 3, //箭头指向速度，值越小速度越快
                trailLength: 0.33, //特效尾迹长度[0,1]值越大，尾迹越长重
                symbol: 'arrow', //箭头图标 arrow  没有箭头 rect
                symbolSize: 5, //图标大小
            },
            lineStyle: {
                normal: {
                    width: 1, //尾迹线条宽度
                    opacity: 0.3, //尾迹线条透明度
                    curveness: 0.3 //尾迹线条曲直度
                }
            },
            data: convertData(item[1]) //item[1] 是 BJData，也就是行走路线
        }, 
        {//地点 -- 起点
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zlevel: 1.2,
            rippleEffect: { //涟漪特效
                period: 5, //动画时间，值越小速度越快
                brushType: 'stroke', //波纹绘制方式 stroke, fill
                scale: 6 //波纹圆环最大限制，值越大波纹越大
            },
            label: {
                normal: {
                    show: true,
                    position: 'right', //显示位置
                    offset: [5, 0], //偏移设置
                    formatter: '{b}' //圆环显示文字
                },
                emphasis: {
                    show: false
                }
            },
            symbol: 'circle',
            symbolSize: function (val) {
                return 4 + val[2] / 10; //圆环大小
            },
            itemStyle: {
                normal: {
                    show: false,
                    color: '#f00'
                }
            },
            data: item[1].map(function (dataItem) {  //item[1] 是 BJData，也就是行走路线
                // console.log(dataItem[0].name) //地名
                return {
                    name: dataItem[0].name,
                    value: geoCoordMap[dataItem[0].name].concat([dataItem[0].age])
                };
            }),
        },
        { //地点 -- 目的地
            type: 'scatter',
            coordinateSystem: 'geo',
            zlevel: 1.2,
            rippleEffect: { //涟漪特效
                period: 5, //动画时间，值越小速度越快
                brushType: 'stroke', //波纹绘制方式 stroke, fill
                scale: 6 //波纹圆环最大限制，值越大波纹越大
            },
            label: {
                normal: {
                    show: true,
                    position: 'right',
                    //offset:[5, 0],
                    color: '#00ffff',
                    formatter: '{b}',
                    textStyle: {
                        color: "#00ffff"
                    }
                },
                emphasis: {
                    show: true
                }
            },
            symbol: 'pin',
            symbolSize: 30,
            itemStyle: {
                normal: {
                    show: true,
                    color: '#9966cc'
                }
            },
            data: [{
                    name: item[0],
                    value: geoCoordMap[item[0]].concat([])
                }]
            
        }
    );
});

option = {
    backgroundColor: '#404a59',
    title: {
        text: '1994~2017年',
        textStyle: {
            color: '#fff',
            fontSize: 20
        },
        padding: [20, 20, 20, 20]
    },
    tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(12, 204, 104, 0.92)',
        borderColor: '#FFFFCC',
        showDelay: 0,
        hideDelay: 0,
        enterable: true,
        transitionDuration: 0,
        extraCssText: 'z-index:100',
        formatter: function (params, ticket, callback) {
            //根据业务自己拓展要显示的内容
            var res = "";
            var name = params.name;
            var value = params.value;
            if(name==''){
                res = value+"岁";
            }else{
                res = "<span style='color:red;'>目的地：" + name + "</span><br/>" + value;
            }
            return res;
        }
    },
    visualMap: { //图例值控制
        min: 0,
        max: 100,
        calculable: true,
        // 12~1
        color: ['#FF0000','#ff3333','orange', 'yellow', 'lime', 'aqua'],
        textStyle: {
            color: '#fff'
        }
    },
    geo: {
        map: 'china',
        label: {
            emphasis: {
                show: false
            }
        },
        roam: true, //是否允许缩放
        layoutCenter: ['50%', '50%'], //地图位置
        layoutSize: "125%",
        itemStyle: {
            normal: {
                color: 'rgba(51, 69, 89, .5)', //地图背景色
                borderColor: 'rgba(100,149,237,1)' //省市边界线
            },
            emphasis: {
                color: 'rgba(37, 43, 61, .5)' //悬浮背景
            }
        }
    },

    series: series
};