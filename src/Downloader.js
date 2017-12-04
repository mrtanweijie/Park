import request from 'request'
import USERAGENT from './UserAgent'
class Downloader {
  constructor (url) {
    this.url = url
  }
  downloadHTML () {
    const ua = USERAGENT[0]
    const options = {
      url: this.url,
      headers: {
        'User-Agent': ua
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
