const commandLineUsage = require('command-line-usage')
const runOptions = require('./lib/run-options')
const newman = require('newman')

const mainUsage = [
    {
        header: 'new2man',
        content: 'new2man is a CLI test runner built on top of Postman/Newman'
    },
    {
        header: 'Usage',
        content: 'new2man [options] [command]'
    },
    {
        header: 'Options',
        optionList: [
            {
                name: 'version',
                alias: 'v',
                type: Boolean,
                description: 'output the newman version number'
            },
            {
                name: 'help',
                alias: 'h',
                type: Boolean,
                description: 'output usage information'
            }
        ]
    },
    {
        header: 'Commands',
        content: [
            {
                name: 'run [options] <collection>',
                description: 'run tests on a Postman Collection'
            }
        ]
    },
    {
        content: [
            'To get available options for a command:\n' +
            'new2man [command] -h'
        ]
    }
]

const runUsage = [
    {
        header: 'Usage',
        content: 'run <collection> [options]'
    },
    {
        header: 'Arguments',
        content: [
            {name: 'collection', description: 'URL or path to a Postman Collection'}
        ]
    },
    {
        header: 'Options',
        optionList: [
            {name: 'environment', alias: 'e', description: 'Specify a URL or Path to a Postman Environment', typeLabel: '<path>'},
            {name: 'globals', alias: 'g', description: 'Specify a URL or Path to a file containing Postman Globals', typeLabel: '<path>'},
            {name: 'folder', description: 'Specify folder to run from a collection. Can be specified multiple times to run multiple folders (default: [])', typeLabel: '<path>'},
            {name: 'working-dir', description: 'The path of the directory to be used as the working directory', typeLabel: '<path>'},
            {name: 'no-insecure-file-read', description: 'Prevents reading the files situated outside of the working directory', type: Boolean},
            {name: 'reporters', alias: 'r', description: 'Specify the reporters to use for this run. (default: ["cli"])', typeLabel: '[reporters]'},
            {name: 'iteration-count', alias: 'n', description: 'Define the number of iterations to run', typeLabel: '<n>'},
            {name: 'iteration-data', alias: 'd', description: 'Specify a data file to use for iterations (either json or csv)', typeLabel: '<path>'},
            {name: 'export-environment', alias: '', description: 'Exports the environment to a file after completing the run', typeLabel: '<path>'},
            {name: 'export-globals', alias: '', description: 'Specify an output file to dump Globals before exiting', typeLabel: '<path>'},
            {name: 'export-collection', alias: '', description: 'Specify an output file to save the executed collection', typeLabel: '<path>'},
            {name: 'postman-api-key', alias: '', description: 'API Key used to load the resources from the Postman API', typeLabel: '<apiKey>'},
            {name: 'delay-request', alias: '', description: 'Specify the extent of delay between requests (milliseconds) (default: 0)', typeLabel: '[n]'},
            {name: 'bail', alias: '', description: 'Specify whether or not to gracefully stop a collection run on encountering an errorand whether to end the run with an error based on the optional modifier', typeLabel: '[modifiers]'},
            {name: 'suppress-exit-code', alias: 'x', description: 'Specify whether or not to override the default exit code for the current run', type: Boolean},
            {name: 'silent', description: 'Prevents newman from showing output to CLI', type: Boolean},
            {name: 'disable-unicode', description: 'Forces unicode compliant symbols to be replaced by their plain text equivalents', type: Boolean},
            {name: 'global-var', alias: '', description: 'Allows the specification of global variables via the command line, in a key=value format (default: [])', typeLabel: '<value>'},
            {name: 'env-var', alias: '', description: 'Allows the specification of environment variables via the command line, in a key=value format (default: [])', typeLabel: '<value>'},
            {name: 'color', alias: '', description: 'Enable/Disable colored output. (auto|on|off) (default: "auto")', typeLabel: '<value>'},
            {name: 'timeout', alias: '', description: 'Specify a timeout for collection run (in milliseconds) (default: 0)', typeLabel: '[n]'},
            {name: 'timeout-request', alias: '', description: 'Specify a timeout for requests (in milliseconds). (default: 0)', typeLabel: '[n]'},
            {name: 'timeout-script', alias: '', description: 'Specify a timeout for script (in milliseconds). (default: 0)', typeLabel: '[n]'},
            {name: 'ignore-redirects', alias: '', description: 'If present, Newman will not follow HTTP Redirects', type: Boolean},
            {name: 'insecure', alias: 'k', description: 'Disables SSL validations', type: Boolean},
            {name: 'ssl-client-cert', alias: '', description: 'Specify the path to the Client SSL certificate. Supports .cert and .pfx files', typeLabel: '<path>'},
            {name: 'ssl-client-key', alias: '', description: 'Specify the path to the Client SSL key (not needed for .pfx files)', typeLabel: '<path>'},
            {name: 'ssl-client-passphrase', alias: '', description: 'Specify the Client SSL passphrase (optional, needed for passphrase protected keys)', typeLabel: '<path>'},
            {name: 'verbose', alias: '', description: 'Show detailed information of collection run and each request sent', type: Boolean},
            {name: 'help', alias: 'h', description: 'Output usage information', type: Boolean},
        ]
    },
]

module.exports = {
    version: () => {
        return process.env.NEWMAN_VERSION;
    },

    help: (command = 'main') => {
        if (command === 'run') {
            return commandLineUsage(runUsage)
        }

        // in every other case
        return commandLineUsage(mainUsage)
    },

    run: (options, callback) => {
        return newman.run(runOptions(options), callback);
    },
};
