var fs = require('fs');
var tasks = require('./lib/tasks');
var transform = require('./lib/transform');

var ASANA_API_KEY = process.env['ASANA_API_KEY'];
var TODO_FILE = process.env['TODO_FILE'];
var DONE_FILE = process.env['DONE_FILE'];

var asanaTasks = tasks(ASANA_API_KEY);

var incomplete = asanaTasks.fork().filter(function(task) {
  return !task.completed;
}).map(transform);

var completed = asanaTasks.fork().filter(function(task) {
  return task.completed;
}).map(transform);

incomplete.resume();
completed.resume();

incomplete.pipe(fs.createWriteStream(TODO_FILE, {
  encoding: 'utf8'
}));

completed.pipe(fs.createWriteStream(DONE_FILE, {
  encoding: 'utf8'
}));