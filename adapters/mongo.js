var mongoskin = require('mongoskin');
var ObjectID = require("mongoskin").ObjectID;

// DozerJS NeDB component
var mongo = function (table, config) {
  this.table = table;
  this.config = config;
  this.store = mongoskin.db(config.host, {
		username: config.user,
		password: config.pass,
		database: config.database,
		safe: false
	});
};

// Correctly formats ID values
mongo.prototype.formatIds = function (query) {
  // For IDs
  if (query.hasOwnProperty('_id')) {
    query._id = ObjectID.createFromHexString(query._id);
  }
  // For project_id reference
  if (query.hasOwnProperty('project_id')) {
    query.project_id = ObjectID.createFromHexString(query.project_id);
  }
  return query;
};

// Returns count of fields based on query
mongo.prototype.count = function (query, cb) {
  var self = this;
  query = self.formatIds(query);
  self.store.collection(self.table).count(query, function (err, data) {
    cb(err, data);
  });
};

// Returns entire contents of data store
mongo.prototype.all = function (cb) {
  var self = this;
  self.store.collection(self.table).find().toArray(function (err, data) {
    cb(err, data);
  });
};

// Finds specific entry
mongo.prototype.find = function (query, cb, limit, sort) {
  var self = this;
  query = self.formatIds(query);
    self.store.collection(self.table).find(query).limit(limit).sort(sort).toArray(function (err, data) {
      cb(err, data);
    });
};

// Inserts new record, generates _id
mongo.prototype.insert = function (data, cb) {
  var self = this;
  data = self.formatIds(data);
  self.store.collection(self.table).insert(data, function (err, data) {
    cb(err, data);
  });
};

// Updates existing record
mongo.prototype.update = function (query, data, cb) {
  var self = this;
  query = self.formatIds(query);
  data = self.formatIds(data);
  self.store.collection(self.table).update(query, { $set: data }, function (err, data) {
    cb(err, data);
  });
};

// Removes existing record
mongo.prototype.remove = function (query, cb) {
  var self = this;
  query = self.formatIds(query);
  self.store.collection(self.table).remove(query, function (err, data) {
    cb(err, data);
  });
};

module.exports = mongo;