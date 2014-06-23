var _ = require('highland');
var asana = require('./asana');

module.exports = function(apiKey) {
  return asana.get(apiKey, '/users/me').flatMap(function(user) {
    return _(user.workspaces).flatMap(function(workspace) {
      return asana.get(apiKey, '/tasks', {
        'assignee': user.id,
        'workspace': workspace.id,
        'opt_fields': [
          'name',
          'assignee_status',
          'created_at',
          'completed',
          'completed_at',
          'due_on',
          'projects.name',
          'workspace.name'
        ].join(',')
      }).flatMap(function(tasks) {
        return _(tasks);
      });
    });
  });
};