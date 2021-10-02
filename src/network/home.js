import { request } from './request'

/* --------首页-------- */
export function card_1(data) {
  return request({
    method: 'post',
    url: '/service/backequipment/getinformation',
    data
  })
}

export function card_2(data) {
  return request({
    method: 'post',
    url: '/service/backequipment/getrequestinfo',
    data
  })
}

export function card_3(data) {
  return request({
    method: 'post',
    url: '/service/backequipment/requestinfoList',
    data
  })
}

/* --------设备配置页-------- */


// 人设数据
export function getCharacter(data) {
  return request({
    method: 'post',
    url: '/service/backequipment/charactersetting',
    data
  })
}
// 提交人设数据
export function submitCharacter(data) {
  return request({
    method: 'post',
    url: '/service/backequipment/savecharactersetting',
    data
  })
}

// 技能列表
export function getSkillList(data) {
  return request({
    method: 'post',
    url: '/service/skill/list',
    data
  })
}

// 技能开关
export function changeSwitch(data) {
  return request({
    method: 'post',
    url: '/service/skill/skillswitch',
    data
  })
}

// 新增知识库
export function addRepository(data) {
  return request({
    method: 'post',
    url: '/service/backequipment/saverepository',
    data
  })
}

// 知识库查询
export function getRepository(data) {
  return request({
    method: 'post',
    url: '/service/backequipment/repositorylist',
    data
  })
}

// 删除知识库
export function deleteRepository(data) {
  return request({
    method: 'post',
    url: '/service/backequipment/deleterepository',
    data
  })
}


// 问答列表
export function getAnswer(data) {
  return request({
    method: 'post',
    url: '/service/backequipment/qalist',
    data
  })
}

// 新增问答
export function addAnswer(data) {
  return request({
    method: 'post',
    url: '/service/backequipment/saverqa',
    data
  })
}

// 删除问答
export function deleteAnswer(data) {
  return request({
    method: 'post',
    url: '/service/backequipment/deleteqa',
    data
  })
}

// 嗅探词列表
export function getSnifferWord(data) {
  return request({
    method: 'post',
    url: '/service/backequipment/snifferwordlist',
    data
  })
}

// 新增嗅探词
export function addSnifferWord(data) {
  return request({
    method: 'post',
    url: '/service/backequipment/saversnifferword',
    data
  })
}

// 删除嗅探词
export function deleteSnifferWord(data) {
  return request({
    method: 'post',
    url: '/service/backequipment/snifferdelete',
    data
  })
}

// 知识雷达列表
export function getKnowledge(data) {
  return request({
    method: 'post',
    url: '/service/backequipment/radarlist',
    data
  })
}

// 版本推送
export function editionPush(data) {
  return request({
    method: 'post',
    url: '/service/versions/save',
    data
  })
}

// 版本信息
export function getEditionInfo(data) {
  return request({
    method: 'post',
    url: '/service/versions/list',
    data
  })
}
