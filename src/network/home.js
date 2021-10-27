import { request } from './request'

/* --------首页-------- */
// 获取设备数据
export function card_1(data) {
  return request({
    method: 'post',
    url: '/service/backequipment/getinformation',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token')),
    },
    data
  })
}

// 获取请求数据
export function card_2(data) {
  return request({
    method: 'post',
    url: '/service/backequipment/getrequestinfo',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    data
  })
}


// 获取请求数据列表
export function card_3(data) {
  return request({
    method: 'post',
    url: '/service/backequipment/requestinfoList',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    data
  })
}


// 请求趋势
export function getTrend(data) {
  return request({
    method: 'post',
    url: '/service/backequipment/userTendency',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    data
  })
}

/* --------设备配置页-------- */


// 人设数据
export function getCharacter(data) {
  return request({
    method: 'post',
    url: '/service/backequipment/charactersetting',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    data
  })
}
// 提交人设数据
export function submitCharacter(data) {
  return request({
    method: 'post',
    url: '/service/backequipment/savecharactersetting',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    data
  })
}

// 技能列表
export function getSkillList(data) {
  return request({
    method: 'post',
    url: '/service/skill/list',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    data
  })
}

// 技能开关
export function changeSwitch(data) {
  return request({
    method: 'post',
    url: '/service/skill/skillswitch',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    data
  })
}

// 新增知识库
export function addRepository(data) {
  return request({
    method: 'post',
    url: '/service/backequipment/saverepository',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    data
  })
}

// 知识库查询
export function getRepository(data) {
  return request({
    method: 'post',
    url: '/service/backequipment/repositorylist',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    data
  })
}

// 删除知识库
export function deleteRepository(data) {
  return request({
    method: 'post',
    url: '/service/backequipment/deleterepository',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    data
  })
}


// 问答列表
export function getAnswer(data) {
  return request({
    method: 'post',
    url: '/service/backequipment/qalist',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    data
  })
}

// 新增问答
export function addAnswer(data) {
  return request({
    method: 'post',
    url: '/service/backequipment/saverqa',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    data
  })
}

// 删除问答
export function deleteAnswer(data) {
  return request({
    method: 'post',
    url: '/service/backequipment/deleteqa',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    data
  })
}

// 嗅探词列表
export function getSnifferWord(data) {
  return request({
    method: 'post',
    url: '/service/backequipment/snifferwordlist',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    data
  })
}

// 新增嗅探词
export function addSnifferWord(data) {
  return request({
    method: 'post',
    url: '/service/backequipment/saversnifferword',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    data
  })
}

// 删除嗅探词
export function deleteSnifferWord(data) {
  return request({
    method: 'post',
    url: '/service/backequipment/snifferdelete',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    data
  })
}

// 嗅探词 探测结果列表
export function getKnowledge(data) {
  return request({
    method: 'post',
    url: '/service/backequipment/radarlist',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    data
  })
}


// 收音机列表
export function getRadioList(data) {
  return request({
    method: 'post',
    url: '/service/backequipment/broadcastlist',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    data
  })
}

// 新增收音机
export function addRadio(data) {
  return request({
    method: 'post',
    url: '/service/backequipment/savebroadcast',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    data
  })
}

// 收音机删除接口，传id字符串用逗号分隔
export function deleteRadio(data) {
  return request({
    method: 'post',
    url: '/service/backequipment/deletebroadcast',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    data
  })
}

// 查询养生知识 分类列表
export function getHealthyList(data) {
  return request({
    method: 'post',
    url: '/service/healthy/gethealthy',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    data
  })
}
// 新增、修改 养生知识 分类
export function addHealthy(data) {
  return request({
    method: 'post',
    url: '/service/healthy/save',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    data
  })
}
//删除养生分类知识 
export function delehealthy(data) {
  return request({
    method: 'post',
    url: '/service/healthy/delehealthy',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    data
  })
}

//  点击分类查询养生知识内容列表
export function getByHealthyList(data) {
  return request({
    method: 'post',
    url: '/service/healthy/gethealthyById',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    data
  })
}
//  点击分类新增、修改养生知识内容列表
export function addByHealthy(data) {
  return request({
    method: 'post',
    url: '/service/healthy/savecontent',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    data
  })
}
//  点击分类删除养生知识内容
export function deleByHealthy(data) {
  return request({
    method: 'post',
    url: '/service/healthy/deletecontent',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    data
  })
}
// 版本推送
export function editionPush(data) {
  return request({
    method: 'post',
    url: '/admin/versionConfig/save',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    data
  })
}

// 版本列表
export function getEditionInfo(params) {
  return request({
    method: 'get',
    url: '/admin/versionConfig/get/page',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    params
  })
}

// 健康顾问列表
export function getCounselorList(data) {
  return request({
    method: 'post',
    url: '/service/doctor/list',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    data
  })
}
// 添加,编辑健康顾问
export function addCounselor(data) {
  return request({
    method: 'post',
    url: '/service/doctor/save',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    data
  })
}
// 删除健康顾问
export function deleteCounselor(data) {
  return request({
    method: 'post',
    url: '/service/doctor/delete',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    data
  })
}

/* --------数据中心页-------- */

// 用户数据
export function getUserData(data) {
  return request({
    method: 'post',
    url: '/service/backequipment/userData',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    data
  })
}

// 设备增长
export function getIncrease(data) {
  return request({
    method: 'post',
    url: '/service/backequipment/eqmentincrease',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    data
  })
}

// 设备活跃
export function getActive(data) {
  return request({
    method: 'post',
    url: '/service/backequipment/eqmentactive',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    data
  })
}

// 系统消息列表
export function getMessageList(data) {
  return request({
    method: 'post',
    url: '/service/remindrule/systemlist',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    data
  })
}

// 版本饼图
export function getDistribution(data) {
  return request({
    method: 'post',
    url: '/service/backequipment/versionPie',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    data
  })
}

// 版本排行
export function getRanking(data) {
  return request({
    method: 'post',
    url: '/service/backequipment/versionRanking',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    data
  })
}

/* --------技能中心页-------- */


// 技能使用次数  "code": "6000001"
export function getSkillsUsed(data) {
  return request({
    method: 'post',
    url: '/service/skill/useskill',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    data
  })
}

// 技能调用排行榜
export function getSkillsRanking(data) {
  return request({
    method: 'post',
    url: '/service/skill/skillranking',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    data
  })
}

// 问答技能使用次数 "code": "308000"
export function getAnswerSkillsUsed(data) {
  return request({
    method: 'post',
    url: '/service/skill/useskill',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    data
  })
}

// 热问排行榜
export function getHotAnswerRanking(data) {
  return request({
    method: 'post',
    url: '/service/backequipment/answeranking',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    data
  })
}

/* --------产品运营页-------- */

// 系统提醒添加
export function addNews(data) {
  return request({
    method: 'post',
    url: '/service/remindrule/systemremindsave',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    data
  })
}

// 用户列表  type: '1' 最新激活、 type: '2' 活跃排名 
export function getUserList(data) {
  return request({
    method: 'post',
    url: '/service/backequipment/userManagement',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    data
  })
}

// 用户信息
export function getUserDetail(data) {
  return request({
    method: 'post',
    url: '/service/backequipment/userInfo',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    data
  })
}

// 用户体征数据
export function getBodyData(data) {
  return request({
    method: 'post',
    url: '/service/backequipment/bodyData',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    data
  })
}

// 用户近期用药
export function getRecentDrug(data) {
  return request({
    method: 'post',
    url: '/service/backequipment/recentDrug',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    data
  })
}

// 用户常用技能
export function getCommonSkill(data) {
  return request({
    method: 'post',
    url: '/service/backequipment/commonlySkills',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    data
  })
}

// 用户标签列表
export function getLabeList(data) {
  return request({
    method: 'post',
    url: '/service/backequipment/labeList',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    data
  })
}

// 用户标签新增
export function addLabeList(data) {
  return request({
    method: 'post',
    url: '/service/backequipment/saveLabe',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    data
  })
}

// 用户标签删除
export function deleteLabeList(data) {
  return request({
    method: 'post',
    url: '/service/backequipment/deleteLabe',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    data
  })
}
// 运营位列表
export function getOperation(data) {
  return request({
    method: 'post',
    url: '/service/information/list',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    data
  })
}

// 新增运营位
export function addOperation(data) {
  return request({
    method: 'post',
    url: '/service/information/save',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    data
  })
}

// 运营位删除
export function deleteOperation(data) {
  return request({
    method: 'post',
    url: '/service/information/delete',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    data
  })
}

// 客服信息
export function getServiceInfo(data) {
  return request({
    method: 'post',
    url: '/service/supportStaff/list',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    data
  })
}

// 客服信息保存
// export function saveServiceInfo(data) {
//   return request({
//     method: 'post',
//     url: '/service/supportStaff/save',
//     headers: { //请求头
//       token: JSON.parse(sessionStorage.getItem('token'))
//     },
//     data
//   })
// }
// 查询客服信息
export function getServicePage(params) {
  return request({
    params,
    method: 'get',
    url: '/admin/customer/get/page',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
  })
}
// 客服信息保存
export function saveServiceInfo(data) {
  return request({
    method: 'post',
    url: '/admin/customer/save',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    data
  })
}
// 客服信息更新
export function updateServiceInfo(data) {
  return request({
    method: 'post',
    url: '/admin/customer/update',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    data
  })
}

// 免打扰时段
export function getNoDisturbing(params) {
  return request({
    method: 'get',
    url: '/admin/screenDisturb/get/page',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    params
  })
}

// 新增免打扰信息
export function addNoDisturbing(data) {
  return request({
    method: 'post',
    url: '/admin/screenDisturb/save',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    data
  })
}

// 修改免打扰信息
export function editNoDisturbing(data) {
  return request({
    method: 'post',
    url: '/admin/screenDisturb/update',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    data
  })
}

// 按条件查询屏保列表信息 Screensaver
export function getScreensaver(params) {
  return request({
    method: 'get',
    url: '/admin/screenSaver/get/page',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    params
  })
}

// 新增屏保信息
export function addScreensaver(data) {
  return request({
    method: 'post',
    url: '/admin/screenSaver/save',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    data
  })
}

// 修改屏保信息
export function editScreensaver(data) {
  return request({
    method: 'post',
    url: '/admin/screenSaver/update',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    data
  })
}

// 列表信息 Luminance
export function getLuminance(params) {
  return request({
    method: 'get',
    url: '/admin/screenLight/get/page',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    params
  })
}

// 新增屏幕亮度列表
export function addLuminance(data) {
  return request({
    method: 'post',
    url: '/admin/screenLight/save',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    data
  })
}


// 新增屏幕亮度信息
export function addLuminance_a(data) {
  return request({
    method: 'post',
    url: '/admin/screenBrightness/save',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    data
  })
}

// 按条件查询屏幕亮度列表信息 Luminance
export function getLuminance_a(params) {
  return request({
    method: 'get',
    url: '/admin/screenBrightness/get/page',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    params
  })
}

// 修改屏幕亮度信息
export function editLuminance(data) {
  return request({
    method: 'post',
    url: '/admin/screenBrightness/update',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    data
  })
}

// 根据ids删除屏幕亮度信息
export function deleteLuminance(params) {
  return request({
    method: 'get',
    url: '/admin/screenLight/delete',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    params
  })
}

// 通话信息 Call
export function getCall(params) {
  return request({
    method: 'get',
    url: '/admin/callSetting/get/page',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    params
  })
}

// 新增
export function addCall(data) {
  return request({
    method: 'post',
    url: '/admin/callSetting/save',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    data
  })
}

// 修改
export function editCall(data) {
  return request({
    method: 'post',
    url: '/admin/callSetting/update',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    data
  })
}

// 根据ids删除版本
export function deleteEdition(params) {
  return request({
    method: 'get',
    url: '/admin/versionConfig/delete',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    params
  })
}

// 修改版本信息
export function editEdition(data) {
  return request({
    method: 'post',
    url: '/admin/versionConfig/update',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    data
  })
}

// 客服信息删除
export function deleteServiceInfo(params) {
  return request({
    params,
    method: 'get',
    url: '/admin/customer/delete',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
  })
}

// 修改信息
export function editInfo(data) {
  return request({
    data,
    method: 'post',
    url: 'admin/user/update',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
  })
}
