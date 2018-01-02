import request from 'request'
import puppeteer from 'puppeteer'
import { UserAgent } from './Constants'
class Downloader {
  constructor (url) {
    this.url = url
  }
  randomUserAgent () {
    var index = Math.floor(Math.random() * UserAgent.length)
    return UserAgent[index]
  }
  downloadHTML (downloader = 0) {
    if (downloader === 0) {
      return this.requestDownloadHTML()
    } else {
      return this.puppeteerDownloadHTML()
    }
  }

  requestDownloadHTML () {
    const options = {
      url: this.url,
      headers: {
        'User-Agent': this.randomUserAgent()
      }
    }
    return new Promise((resolve, reject) => {
      request(options, (err, response, body) => {
        if (!err && response.statusCode === 200) {
          return resolve(body)
        } else {
          return reject(err)
        }
      })
    })
  }

  puppeteerDownloadHTML () {
    return new Promise(async (resolve, reject) => {
      try {
        const browser = await puppeteer.launch({ headless: true })
        const page = await browser.newPage()
        await page.goto(this.url)
        const bodyHandle = await page.$('body')
        const bodyHTML = await page.evaluate(body => body.innerHTML, bodyHandle)
        return resolve(bodyHTML)
      } catch (err) {
        console.log(err)
        return reject(err)
      }
    })
  }
}

export default Downloader
