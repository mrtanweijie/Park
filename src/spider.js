import mongoose from 'mongoose'
import Downloader from './Downloader'
import TextExtract from './TextExtract'
import seedsList from './SeedsList'
import config from './config'
import newsService from './storage/services/NewsService'

mongoose.Promise = global.Promise
mongoose.connect(config.mongodbConfig.url, {
  useMongoClient: true
})

let spider = () => {
  console.time('spider')
  seedsList.forEach(async element => {
    let respondData = await new Downloader(
      `${element.host}${element.seed}`,
      element.downloader
    ).downloadHTML()
    let extractData = new TextExtract(element, respondData).extract()
    storage(element, extractData)
  })
  console.timeEnd('spider')
}

let storage = async (seedData, newsList) => {
  let newsListTem = []
  for (const item of newsList) {
    let newsData = await newsService.findObj({ url: item.url })
    if (!newsData && item.url) {
      newsListTem.push(item)
    }
  }
  console.log(`[${seedData.text}]新增加链接： ${newsListTem.length}`)
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

export default spider
