import mongoose from 'mongoose'
import Downloader from './src/Downloader'
import TextExtract from './src/TextExtract'
import seedsList from './src/SeedsList'
import config from './src/config'
import newsService from './src/storage/services/NewsService'

mongoose.Promise = global.Promise
mongoose.connect(config.mongodbConfig.url, {
  useMongoClient: true
})

let spider = () => {
  seedsList.forEach(async element => {
    let respondData = await new Downloader(
      `${element.host}${element.seed}`
    ).downloadHTML()
    let extractData = new TextExtract(element, respondData).extract()
    storage(extractData)
  })
}

let storage = async newsList => {
  let newsListTem = []
  for (const item of newsList) {
    let newsData = await newsService.findObj({ url: item.url })
    if (!newsData && item.url) {
      newsListTem.push(item)
    }
  }
  console.log('新增加链接：' + newsListTem.length)
  if (newsListTem.length === 0) {
    return
  }
  try {
    await newsService.batchSave(newsListTem)
  } catch (error) {
    console.log('保存失败')
    console.log(error)
  }
}

spider()
