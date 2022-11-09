import Mock from "mockjs"
import { MockMethod } from 'vite-plugin-mock'

const Random = Mock.Random

// 返回车牌号
function getPlate() {
    let stateList = '京津冀晋辽吉沪苏浙皖闽琼赣鲁豫鄂湘粤渝川贵云陕甘蒙黑桂藏青宁新'
    let charList = 'ABCDEFGHJKLMNQPRSTUVWXYZ'
    let numList = '1234567890'
    let halfList = [charList, numList]
    let state = dicingChar(stateList)
    let city = dicingChar(charList)
    let sequence = ''
    for (let i = 0; i < 5; i++) {
        sequence += dicingChar(halfList[Math.round(Math.random())])
    }

    return `${state}${city} ${sequence}`
}

function dicingChar(series) {
    return series[~~(Math.random() * series.length)]
}

function generateVIN(): string {
    let str: string = "";
    for (let i = 0; i < 15; i++) {
        str += Random.integer(0, 9).toString()
    }
    return str
}

// 车辆列表数据
let data = Mock.mock({
    "code": 200,
    "data|1-15": [{
        "车牌号": getPlate,
        "车辆型号": () => ("万象-K" + Random.integer(0, 1000)),
        "车辆启用时间": '@DATETIME("yyyy-MM-dd")',
        "剩余电量": () => Random.integer(0, 100) + "%",
        "状态|1": ["异常", "熄火"],
        "线路": () => (Random.integer(1, 1000) + "路"),
        "理论续航里程": () => (Random.integer(300, 500) + "公里"),
        "当日行驶里程": () => Random.integer(100, 250) + "公里",
        // // 车辆详情数据
        "车辆详情": {
            "所属公司/承修单位|1": ["电车公司/维修一公司", "电车公司/维修二公司", "电车公司/维修三公司", "电车公司/维修四公司",
                "衡泰集团/部门一", "衡泰集团/部门二", "衡泰集团/部门三", "衡泰集团/部门四",
                "腾讯公司/微信部门", "腾讯公司/QQ部门", "腾讯公司/WEGAME部门", "腾讯公司/行政部门"],
            "VIN": generateVIN,
            "车辆状态|1": ["使用中", "闲置中"],
            "续航里程": () => Random.integer(100, 3000) + "km",
            "储能总量": () => Random.integer(100, 1500) + "KWh",
            "额定电压": () => Random.integer(20, 100) + "V",
            "充电记录|20-120": [{
                "充电日期": '@DATETIME("yyyy-MM-dd")',
                "充电开始时间": () => Random.integer(0, 11) + ":" + Random.integer(0, 59),
                "充电开始电量": () => Random.integer(0, 50) + "%",
                "充电完成时间": () => Random.integer(12, 23) + ":" + Random.integer(0, 59),
                "充电完成电量": () => Random.integer(51, 100) + "%",
                "充电时长": () => Random.integer(1, 12) + ":" + Random.integer(1, 59)
            }]
        }
    }]
})

// 首页数据
let homePageData = Mock.mock({
    "code": 200,
    "data": {
        "电动车总数": () => Random.integer(10000, 150000),
        "出车总数": () => Random.integer(30000, 45000),
        "监控车辆": () => Random.integer(10000, 30000),
        "list|10-100": [{
            "公司": () =>"@cword(2, 8)" + "有限公司",
            "车辆总数": () => Random.integer(100, 1000),
            "监控车辆": "@车辆总数",
            "监控车辆占比": () => Random.integer(4, 90) + "%",
            "出车总数": "@车辆总数",
            "出车总数占比": () => Random.integer(30, 80) + "%"
        }]
    }
})

export default [{
    url: "/api/getLowPowerCarList",
    method: "get",
    response: () => {
        return data
    }
}, {
    url: "/api/homePageData",
    method: "get",
    response: () => {
        return homePageData
    }
}] as MockMethod[]

console.log(data);
console.log(homePageData);