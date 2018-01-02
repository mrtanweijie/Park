/* global describe, it */
import { expect } from 'chai'
import Downloader from '../Downloader'
import { DOWNLOADER } from '../Constants'
describe('downloader test', () => {
  it('puppeteer downloader', async done => {
    let respondData = await new Downloader(
      'http://www.mofish.online/'
    ).downloadHTML(DOWNLOADER.puppeteer)
    console.log(respondData)
    expect(respondData).to.be.a('string')
    done()
  })
})
