import { SOURCECODE, DOWNLOADER } from './Constants'
export default [
  {
    sourceCode: SOURCECODE.Readhub,
    text: 'ReadHub',
    host: 'https://readhub.me',
    seed: '/tech',
    downloader: DOWNLOADER.defaut
  },
  {
    sourceCode: SOURCECODE.oschina,
    text: '开源中国',
    host: 'https://www.oschina.net',
    seed: '/news/industry',
    downloader: DOWNLOADER.defaut
  },
  {
    sourceCode: SOURCECODE.toutiao,
    text: '开发者头条',
    host: 'https://toutiao.io',
    seed: '/posts/hot/7',
    downloader: DOWNLOADER.defaut
  },
  {
    sourceCode: SOURCECODE._36kr,
    text: '36Kr',
    host: 'http://36kr.com',
    seed: '/newsflashes',
    downloader: DOWNLOADER.puppeteer
  }
]
