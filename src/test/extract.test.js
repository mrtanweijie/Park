/* global describe, it */
import { expect } from 'chai'
import Extract from '../Extract'
describe('Extract test', () => {
  it('extract', done => {
    let htmlStr =
      '<div id="data-list"><div id="list"><div class="item"><a class="title-link" href="https://www.facebook.com/">哈哈哈哈1</a><div class="content-text">密密麻麻么1</div></div><div class="item"><a class="title-link" href="https://www.facebook.com/">哈哈哈哈2</a><div class="content-text">密密麻麻么2</div></div></div></div>'
    let obj = {
      title: { dom: '.title-link', target: 'text' },
      link: { dom: '.title-link', target: 'attr', attrName: 'href' },
      content: { dom: '.content-text', target: 'text' }
    }
    let ex = new Extract(htmlStr, '#list', '.item', obj)
    let extractData = ex.extract()
    console.log(extractData)
    expect(extractData).to.be.a('Array')
    done()
  })
})
