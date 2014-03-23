var Datastore = require('nedb');

// DozerJS NeDB component
var nedb = function (table, config) {
  this.table = table;
  this.config = config;
  this.store = new Datastore(config.store + '/' + table + '.db');
  this.store.loadDatabase();
};

// Returns count of fields based on query
nedb.prototype.count = function (query, cb) {
  this.store.count(query, cb);
};

// Returns entire contents of data store
nedb.prototype.all = function (cb) {
  this.store.find({}, cb);
};

// Finds specific entry
nedb.prototype.find = function (query, cb) {
  this.store.find(query, cb);
};

// Inserts new record, generates _id
nedb.prototype.insert = function (data, cb) {
  this.store.insert(data, cb);
};

// Updates existing record
nedb.prototype.update = function (query, data, cb) {
  this.store.update(query, data, cb);
};

// Removes existing record
nedb.prototype.remove = function (query, cb) {
  this.store.remove(query, cb);
};

module.exports = nedb;
