const through = require('through2');
const mjml2html = require('mjml').default;
const PluginError = require('plugin-error');

module.exports = options => {
  return through.obj(function(file, encoding, cb) {

    const PLUGINNAME = 'gulp-mjml2';

    if (file.isNull()) {
			cb(null, file);
			return;
		}

		if (file.isStream()) {
			cb(new PluginError(PLUGINNAME, 'Streaming not supported'));
			return;
		}

    try {
			const content = file.contents.toString();
      const html = mjml2html(content, options).html;
      file.contents = new Buffer(html);
      this.push(file);
		} catch (err) {
			this.emit('error', new PluginError(PLUGINNAME, err));
		}

    cb();
  });
};

module.exports.mjml = mjml2html;