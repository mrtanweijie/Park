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
    } catch (error) {
      console.log(error)
    }
  }
  extractDataFactory (url, title, source) {
    return {
      url,
      title,
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
        this.extractDataFactory(a.attr('href'), a.text(), SOURCECODE.Readhub)
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
          SOURCECODE.oschina
        )
      )
    })
    return this.extractData
  }
}

export default TextExtract
