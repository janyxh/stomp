module.exports = {
  path: 'View',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./index').default);
    }, 'View');
  },
};
