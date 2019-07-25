const path = require('path');
const commandLineArgs = require('command-line-args');
const commandLineUsage = require('command-line-usage');

const optionDefinitions = [
    {name: 'collection', type: String, defaultOption: true},
];

CollectionProcessor = {
    parseFunction: f => f.toString().split("\n").slice(1, -1),

    replaceScript: basePath => s => {
        s.exec = CollectionProcessor.parseFunction(require(path.resolve(basePath, s.src)));
        delete s.src;
    }
};

module.exports = {
    commandParameters: function () {
        let options = commandLineArgs(optionDefinitions);
        let workingDir = (typeof options['working-dir'] !== 'undefined') ? options['working-dir'] : process.cwd();

        let collectionFile = path.resolve(workingDir, options.collection);

        return {
            collectionFile: collectionFile,
        }
    },

    runOptions: function (options) {
        const collection = require(options.collectionFile);
        const basePath = path.dirname(options.collectionFile);

        collection.item
            .reduce((x, i) => x.concat(i.event), [])
            .reduce((x, i) => x.concat(i.script), [])
            .filter(s => typeof s.exec === 'undefined')
            .filter(s => typeof s.src !== 'undefined')
            .forEach(CollectionProcessor.replaceScript(basePath));

        return {
            collection: collection,
            environment: options.envFile ? require(options.envFile) : null,
            reporters: 'cli',
            color: 'on',
            iterationData: options.dataFile ? require(options.dataFile): null
        };
    },

    handler: {
        default: function (error, summary) {
            if (error) {
                throw error;
            }

            if (summary.run.failures.length > 0) {
                process.exit(85);
            }
        }
    }
};
