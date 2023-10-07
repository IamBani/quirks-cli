module.exports = {
  '*.js': ['prettier --write packages/**/*.js', 'eslint packages/**/*.js --fix']
}
