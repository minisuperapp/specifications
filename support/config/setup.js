const { defineParameterType } = require('cucumber');

defineParameterType({
  name: 'boolean',
  regexp:/true|false/,
  type: Boolean,
  transformer: b => b == 'true'
});
