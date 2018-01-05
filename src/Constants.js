import UserAgent from './UserAgent'
// 对象状态
const OBJ_STATUS = {
  DELETE: -1,
  DEFAULT: 1000
}

const SOURCECODE = {
  default: 0,
  Readhub: 1,
  oschina: 2,
  toutiao: 3,
  _36kr: 4
}

const DOWNLOADER = {
  default: 0,
  puppeteer: 1
}

export { UserAgent, OBJ_STATUS, SOURCECODE, DOWNLOADER }
