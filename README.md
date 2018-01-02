## MOFISH项目资讯爬虫

**项目地址**：http://www.mofish.online

**相关技术**：`request`、`puppeteer`、`cheerio`、`mocha`、`cron`

**如何开发**

0、在`SeedsList`配置需要抓取的站点

1、`Downloader`默认使用`request`方式抓去指定网页，`puppeteer`用于下载前端渲染的页面

2、拓展`TextExtract`提取网页内容即可


### 安装依赖

```
npm i
```

### 运行

**开发**

```
cp mongo.example.js mongo.js

npm run dev
```

**测试用例**

```
npm run test
```

**生产环境**

```
npm run spider
```

### TODO

移除mongodb，使用已经开发好的API持久化数据

