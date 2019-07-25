const newman = require('newman');
const new2man = require('./new2man');

const commandParameters = new2man.commandParameters();
const runOptions = new2man.runOptions(commandParameters);

newman.run(runOptions, new2man.handler.default);
