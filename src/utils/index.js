const stringTrim = str => (str ? str.replace(/(^\s*)|(\s*$)/g, '') : '')

const isURL = link => /[a-zA-z]+:\/\/[^\s]*/.test(stringTrim(link))

const fullPath = (host, path) => {
  if (!path) {
    return ''
  }
  if (isURL(path)) {
    return path
  } else {
    return `${host}${path.indexOf('/') === 0 ? '' : '/'}${path}`
  }
}

export { stringTrim, isURL, fullPath }
