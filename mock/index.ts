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
        "当日行驶里程": () => Random.integer(100, 250) + "公里"
    }]
})

export default [{
    url: "/api/getLowPowerCarList",
    method: "get",
    response: () => {
        return data
    }
}] as MockMethod[]

console.log(data);