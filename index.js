#!/usr/bin/env node

const new2man = require('./new2man')
const arguments = require('./lib/cli')

let command = {},
    runOptions = {}

try {
    command = arguments.command()

    if (command.name === 'run') {
        runOptions = arguments.commandOptions(command)

        if (runOptions === 'run-help') command = {name: 'run-help'}
    }
} catch (e) {
    const commandName = command.name || 'main'
    process.stderr.write('error: ' + e.message + '\n')
    process.stdout.write(new2man.help(commandName) + '\n')
    process.exit()
}

switch (command.name) {
    case 'run':
        new2man.run(runOptions, (error, summary) => {
            if (error) throw error
            if (summary.run.failures.length) process.exit(85)
        })
        break

    case 'version':
        process.stdout.write(new2man.version() + '\n')
        break

    case "run-help":
        process.stdout.write(new2man.help('run') + '\n')
        break

    default:
        process.stdout.write(new2man.help() + '\n')
}
