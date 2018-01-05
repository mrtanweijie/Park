/* global describe, it */
import { expect } from 'chai'
import Downloader from '../Downloader'
import { DOWNLOADER } from '../Constants'
describe('downloader test', () => {
  it('puppeteer downloader', async done => {
    let respondData = await new Downloader(
      'http://36kr.com/newsflashes',
      DOWNLOADER.puppeteer
    ).downloadHTML()
    expect(respondData).to.be.a('string')
    done()
  })
})
