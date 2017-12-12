import cheerio from 'cheerio'
import { stringTrim, fullPath } from './utils'
import { SOURCECODE, OBJ_STATUS } from './Constants'
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
    try {
      if (this.seedData.sourceCode === SOURCECODE.Readhub) {
        return this.readHubExtract()
      }
      if (this.seedData.sourceCode === SOURCECODE.oschina) {
        return this.oscExtract()
      }
      if (this.seedData.sourceCode === SOURCECODE.toutiao) {
        return this.toutiaoExtract()
      }
    } catch (error) {
      console.log(error)
    }
  }
  extractDataFactory (url, title, summary, source) {
    return {
      url,
      title,
      summary,
      source,
      status: OBJ_STATUS.DEFAULT,
      createdTime: new Date(),
      modifyTime: new Date()
    }
  }
  readHubExtract () {
    let nodeList = this.$('#itemList').find('.enableVisited')
    nodeList.each((i, e) => {
      let a = this.$(e).find('a')
      this.extractData.push(
        this.extractDataFactory(
          a.attr('href'),
          a.text(),
          '',
          SOURCECODE.Readhub
        )
      )
    })
    return this.extractData
  }

  oscExtract () {
    let nodeList = this.$('#kinds-of-news').find('.item')
    nodeList.each((i, e) => {
      let a = this.$(e).find('a')
      this.extractData.push(
        this.extractDataFactory(
          fullPath(this.seedData.host, a.attr('href')),
          stringTrim(a.find('.text-ellipsis').text()),
          '',
          SOURCECODE.oschina
        )
      )
    })
    return this.extractData
  }

  toutiaoExtract () {
    let nodeList = this.$('.posts').find('.post .content')
    nodeList.each((i, e) => {
      let a = this.$(e).find('h3.title a')
      let summaryDom = this.$(e).find('.summary')
      this.extractData.push(
        this.extractDataFactory(
          fullPath(this.seedData.host, a.attr('href')),
          stringTrim(a.text()),
          summaryDom.find('a').text(),
          SOURCECODE.toutiao
        )
      )
    })
    return this.extractData
  }
}

export default TextExtract
