import cheerio from 'cheerio'
import { stringTrim, fullPath } from './utils'
import { SOURCECODE } from './Constants'
class TextExtract {
  constructor (seedData, html) {
    this.seedData = seedData
    this.html = html
    this.extractData = []
    this.$ = cheerio.load(this.html)
  }
  extract () {
    if (!this.html) {
      return []
    }
    if (this.seedData.sourceCode === SOURCECODE.Readhub) {
      return this.readHubExtract()
    }
    if (this.seedData.sourceCode === SOURCECODE.oschina) {
      return this.oscExtract()
    }
  }
  readHubExtract () {
    let nodeList = this.$('#itemList').find('.enableVisited')
    nodeList.each((i, e) => {
      let a = this.$(e).find('a')
      this.extractData.push({
        url: a.attr('href'),
        title: a.text(),
        source: SOURCECODE.Readhub
      })
    })
    return this.extractData
  }

  oscExtract () {
    let nodeList = this.$('#kinds-of-news').find('.item')
    nodeList.each((i, e) => {
      let a = this.$(e).find('a')
      this.extractData.push({
        url: fullPath(this.seedData.host, a.attr('href')),
        title: stringTrim(a.find('.text-ellipsis').text()),
        source: SOURCECODE.oschina
      })
    })
    return this.extractData
  }
}

export default TextExtract
