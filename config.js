// Core configuration for DozerJS
var config = {

  // Environment configuration
  env: {
    // Public root
    publicHTTP: 'public/src',
    // Port to run over
    port: 8181
  },

  // Session secret
  secret: '6de5661ab3c401bcb266dff913',

  // Express logging
  expressLogging: 'short',

  // Database store configuration
  db: {

    // Specify adapter to use
    adapter: 'nedb',

    // Adapter specific configuration
    config: {
      // Will store data in /data
      store: 'data'
    }

  },

  // CORS configuration
  cors: {
    origin: '*',
    methods: 'GET,PUT,POST,DELETE',
    headers: 'Content-Type'
  },

  // Custom express middleware components
  middleware: [],

  expressConfig: [],

  // Define common regular expressions for validation
  regEx: {
    float: /^[0-9]*[.][0-9]+$/,
    alphanum: /^[a-zA-Z0-9]+$/,
    hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/,
    slug: /^[a-z0-9-]+$/i,
    email: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
    url: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
    ipv4: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
    phone: /^(([0-9]{1})*[- .(]*([0-9]{3})[- .)]*[0-9]{3}[- .]*[0-9]{4})+$/,
    ssn: /^([0-9]{3}[-]*[0-9]{2}[-]*[0-9]{4})+$/
  }

};

module.exports = config;
