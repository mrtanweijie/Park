import cheerio from 'cheerio'

/*
 * dataDoms组成
 * // dom: 内容提取的元素
 * // target: 取值 ['text', 'attr'] 表示提取内容的目标位置,text:提取元素内容, attr:提取元素属性
 * // attrName: target = attr 时 'attrName' 不能为空
 * // 示例{title: {dom: '#title', target: 'text', attrName: ''}}
*/
class Extract {
  /**
   * 内容提取构造函数
   * @param {Sting} html  //待提取HTML字符串
   * @param {Sting} zoneDom //提取的内容区域
   * @param {Sting} listDom //内容区域列表数据
   * @param {Object} dataDoms //由数据提取节点名和DOM元素组成
   */
  constructor (html = '', zoneDom = '', listDom = '', dataDoms = {}) {
    this.html = html
    this.extractData = []
    this.zoneDom = zoneDom
    this.listDom = listDom
    this.dataDoms = dataDoms
    this.$ = cheerio.load(this.html)
  }

  extract () {
    // 列表元素
    let nodeList = this.$(this.zoneDom).find(this.listDom)
    console.log('提取节点数:' + nodeList.length)
    // 列表对象数据提取
    nodeList.each((i, e) => {
      let eDomObj = this.$(e)
      let objArray = []
      // 循环dataDoms的key解析提取数据
      Object.keys(this.dataDoms).forEach(objEle => {
        let objEleObj = this.dataDoms[objEle]
        let target = objEleObj['target']
        let attrName = objEleObj['attrName']
        let dom = objEleObj['dom']
        // 提取的目标元素
        let targetDom = eDomObj.find(dom)
        let content = ''
        if (target === 'text') {
          content = targetDom.text()
        } else if (target === 'attr') {
          content = targetDom.attr(attrName)
        }
        objArray.push(`"${objEle}": "${content}"`)
      })
      let objStr = `{${objArray.join(',')}}`
      // 存储节点
      this.extractData.push(JSON.parse(objStr))
    })
    return this.extractData
  }
}

export default Extract
