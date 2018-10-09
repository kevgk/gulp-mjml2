const through = require('through2');
const mjml2html = require('mjml').default;

module.exports = options => {
  return through.obj(function(file, encoding, cb) {
    const content = file.contents.toString();
    const html = mjml2html(content, options).html;
    file.contents = new Buffer(html);
    this.push(file);
    cb();
  });
};