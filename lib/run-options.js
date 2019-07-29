const clonedeep = require('lodash.clonedeep'),
    path = require('path'),
    fs = require('fs')

const parseFunction = f => fs.readFileSync(f).toString('utf8').split("\n")

const replaceScript = basePath => s => {
    s.exec = parseFunction(path.resolve(basePath, s.src))
    delete s.src
}

module.exports = o => {
    let options = clonedeep(o)

    const collectionPath = path.resolve(options.workingDir, options.collection)
    const basePath = path.dirname(collectionPath)

    options.collection = require(collectionPath)

    options.collection.item
        .reduce((x, i) => x.concat(i.event), [])
        .reduce((x, i) => x.concat(i.script), [])
        .filter(s => typeof s.exec === 'undefined')
        .filter(s => typeof s.src !== 'undefined')
        .forEach(replaceScript(basePath))

    return options
}
