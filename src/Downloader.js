import request from 'request'
import { UserAgent } from './Constants'
class Downloader {
  constructor (url) {
    this.url = url
  }
  randomUserAgent () {
    var index = Math.floor(Math.random() * UserAgent.length)
    return UserAgent[index]
  }
  downloadHTML () {
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
}

export default Downloader
