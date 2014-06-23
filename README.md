AsanaTxt
========

A node script for porting Asana in todo.txt

Configuration
-------------

AsanaTxt assumes that you have the following environment variables

- `ASANA_API_KEY`: The API Key you want to use with Asana
- `TODO_FILE`: Where incomplete todos should go
- `DONE_FILE`: Where completed todos should go

Conflict Resolution
-------------------

Currently this script just makes the todo.txt files a mirror of Asana and nukes any tasks in there. If you want more sync capabilities, I'm happy to work with you and take pull requests.
