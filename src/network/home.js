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

// 知识雷达列表
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

// 版本推送
export function editionPush(data) {
  return request({
    method: 'post',
    url: '/service/versions/save',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token'))
    },
    data
  })
}

// 版本信息
export function getEditionInfo(data) {
  return request({
    method: 'post',
    url: '/service/versions/list',
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

// 文件上传
export function uploadFile(data) {
  return request({
    method: 'post',
    url: '/service/attachment/upload',
    headers: { //请求头
      token: JSON.parse(sessionStorage.getItem('token')),
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}