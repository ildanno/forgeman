const commandLineArgs = require('command-line-args')

const cliArguments = {
    main: [
        {name: 'command', defaultOption: true},
        {name: 'version', alias: 'v', type: Boolean},
        {name: 'help', alias: 'h', type: Boolean},
    ],

    commandOptions: {
        run: [
            {name: 'collection', defaultOption: true},
            {name: 'environment', alias: 'e'},
            {name: 'globals', alias: 'g'},
            {name: 'folder'},
            {name: 'working-dir'},
            {name: 'no-insecure-file-read'},
            {name: 'reporters', alias: 'r'}, // [reporters]
            {name: 'iteration-count', alias: 'n', type: Number},
            {name: 'iteration-data', alias: 'd'},
            {name: 'export-environment'},
            {name: 'export-globals'},
            {name: 'export-collection'},
            {name: 'postman-api-key'},
            {name: 'delay-request', type: Number},
            {name: 'bail'}, // [modifiers]
            {name: 'suppress-exit-code', alias: 'x', type: Boolean},
            {name: 'silent', type: Boolean},
            {name: 'disable-unicode', type: Boolean},
            {name: 'global-var'}, // <value>
            {name: 'env-var'}, // <value>
            {name: 'color'},
            {name: 'timeout', type: Number},
            {name: 'timeout-request', type: Number},
            {name: 'timeout-script', type: Number},
            {name: 'ignore-redirects', type: Boolean},
            {name: 'insecure', alias: 'k', type: Boolean},
            {name: 'ssl-client-cert'},
            {name: 'ssl-client-key'},
            {name: 'ssl-client-passphrase'},
            {name: 'verbose', type: Boolean},
            {name: 'help', alias: 'h', type: Boolean},
        ]
    }
}

const detectCommand = definition => {
    const main = commandLineArgs(definition, {stopAtFirstUnknown: true})
    const argv = main._unknown || []

    if (main.command === 'run') {
        return {name: 'run', options: argv}
    }

    if (main.version) {
        return {name: 'version'}
    }

    if (main.help) {
        return {name: 'help'}
    }

    if (argv.length) {
        throw Error('unknown option `' + argv.pop() + '`')
    }

    if (main.command) {
        throw Error('invalid command `' + main.command + '`')
    }

    if (!main.command) {
        throw Error('no arguments provided')
    }
}

const parseRunOptions = (definition, argv) => {
    const args = commandLineArgs(definition, {argv})

    if ((typeof args.collection) === 'undefined') {
        throw Error('missing required argument `collection`')
    }

    if (args.help) {
        return 'run-help'
    }

    return {
        collection: args.collection,
        environment: args.environment || null,
        globals: args.globals || null,
        iterationCount: args['iteration-count'] || 1,
        iterationData: args['iteration-data'] || null,
        folder: args.folder || null,
        workingDir: args['working-dir'] || process.cwd(),
        insecureFileRead: args['no-insecure-file-read'] || true,
        timeout: args.timeout || Infinity,
        timeoutRequest: args['timeout-request'] || Infinity,
        timeoutScript: args['timeout-script'] || Infinity,
        delayRequest: args['delay-request'] || 0,
        ignoreRedirects: args['ignore-redirects'] || false,
        insecure: args.insecure || false,
        bail: args.bail || false,
        suppressExitCode: args['suppress-exit-code'] || false,
        reporters: args.reporters || ['cli'],
        reporter: null,
        color: args.color || 'auto',
        sslClientCert: args['ssl-client-cert'] || null,
        sslClientKey: args['ssl-client-key'] || null,
        sslClientPassphrase: args['ssl-client-passphrase'] || null,
        // newmanVersion: null,
    }
}

module.exports = {
    command: () => detectCommand(cliArguments.main),

    commandOptions: command => {
        if (command.name === 'run') {
            return parseRunOptions(cliArguments.commandOptions.run, command.options)
        }
    },
}
