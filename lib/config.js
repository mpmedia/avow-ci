var _ = require('./utility');
var fs = require('fs');

/**
 * All interaction with DozerJS configuration settings is abstracted through the `Config`
 * class.
 *
 * @class Config
 */
var Config = function () {
  this.init.apply(this, _.toArray(arguments));
  return {
    'get': this.get.bind(this),
    'set': this.set.bind(this)
  };
};

_.extend(Config.prototype, /** @lends Config */ {

  'init': function () {
    this.loadConfig();
  },

  'config': null,

  'getEnv': function () {
    if (process.env.NODE_ENV === 'production') {
      return 'production';
    } else {
      return 'dev';
    }
  },

  'loadConfig': function () {
    var config, prodConfig;
    config = require(__dirname + '/../config.js');
    if (this.getEnv() === 'production' && fs.existsSync(__dirname + '/../config.prod.js')) {
      prodConfig = require(__dirname + '/../config.prod.js');
      config = _.merge(config, prodConfig);
    }
    this.config = config;
  },

  /**
   * Returns a configuration setting with the specified key. Deeply-nested values can
   * be accessed using dot syntax. If the specified key does not exist, the method will
   * return undefined.
   *
   * @param key - The key of the setting to be returned ('some_setting', 'some.nested.setting')
   * @returns {Mixed}
   */
  'get': function (key) {
    var result;
    if (!key) {
      return _.cloneDeep(this.config);
    }
    result = _.getPath(this.config, key);
    if (!_.isObject(result) || _.isArray(result)) {
      return result;
    }
    return _.cloneDeep(result);
  },

  /**
   * Sets a configuration value. Deeply-nested values can be set using dot syntax.
   *
   * @param key - The key of the setting to be set ('some_setting', 'some.nested.setting')
   * @param value - The value to be set.
   */
  'set': function (key, value) {
    var ks;
    if (!key) {
      throw 'No key specified.';
    }
    ks = key.split('.');
    this.config = _.setPath(this.config, value, ks);
  }

});

module.exports = new Config();
