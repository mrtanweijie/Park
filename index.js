import Downloader from './src/Downloader'
import TextExtract from './src/TextExtract'
import seedsList from './src/SeedsList'

let downloader = () => {
  seedsList.forEach(async element => {
    let respondData = await new Downloader(`${element.host}${element.seed}`).downloadHTML()
    let extractData = new TextExtract(element, respondData).extract()
    console.log(extractData)
  })
}

downloader()
