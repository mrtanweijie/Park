import cheerio from 'cheerio'
import { stringTrim, fullPath } from './utils'
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
    if (this.seedData.sourceCode === 0) {
      return this.readHubExtract()
    }
    if (this.seedData.sourceCode === 1) {
      return this.oscExtract()
    }
  }
  readHubExtract () {
    let nodeList = this.$('#itemList').find('.enableVisited')
    nodeList.each((i, e) => {
      let a = this.$(e).find('a')
      this.extractData.push({
        link: a.attr('href'),
        text: a.text()
      })
    })
    return this.extractData
  }

  oscExtract () {
    let nodeList = this.$('#kinds-of-news').find('.item')
    nodeList.each((i, e) => {
      let a = this.$(e).find('a')
      this.extractData.push({
        link: fullPath(this.seedData.host, a.attr('href')),
        text: stringTrim(a.find('.text-ellipsis').text())
      })
    })
    return this.extractData
  }
}

export default TextExtract
