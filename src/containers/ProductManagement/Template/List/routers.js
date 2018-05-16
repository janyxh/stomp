module.exports = {
  path: 'List(/:id)',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./index').default);
    }, 'List');
  },
}