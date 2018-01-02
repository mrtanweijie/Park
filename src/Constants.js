import UserAgent from './UserAgent'
// 对象状态
const OBJ_STATUS = {
  DELETE: -1,
  DEFAULT: 1000
}

const SOURCECODE = {
  defaut: 0,
  Readhub: 1,
  oschina: 2,
  toutiao: 3
}

const DOWNLOADER = {
  defaut: 0,
  puppeteer: 1
}

export { UserAgent, OBJ_STATUS, SOURCECODE, DOWNLOADER }
