var dateString = function(time) {
  var date = new Date(time);
  return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-');
};

var priority = function(status) {
  switch (status) {
    case 'today':
      return '(A)';
    case 'inbox':
      return '(B)';
    case 'upcoming':
      return '(C)';
    case 'later':
      return '(D)';
    default:
      return '(E)';
  }
};

module.exports = function(task) {
  var todo = [];
  if (task.completed) {
    todo.push('x');
    todo.push(dateString(task['completed_at']));
  }
  todo.push(priority(task['assignee_status']));
  todo.push(dateString(task['created_at']));
  todo.push(task.name.replace(/\n+/g, ' '));
  todo.push('@' + task.workspace.name);
  task.projects.forEach(function(project) {
    todo.push('+' + project.name.replace(/\s+/g, ''));
  });
  if (task['due_on']) {
    todo.push('due:' + task['due_on']);
  }
  todo.push('asana:' + task.id);
  return todo.join(' ') + '\n';
};
