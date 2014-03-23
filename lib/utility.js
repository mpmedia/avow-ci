var _ = require('./lodash.custom');

_.mixin({
  'merge': function (obj1, obj2) {
    for (var p in obj2) {
      try {
        // Property in destination object set; update its value.
        if (obj2[p].constructor === Object) {
          obj1[p] = _.merge(obj1[p], obj2[p]);
        } else {
          obj1[p] = obj2[p];
        }
      } catch (e) {
        // Property in destination object not set; create it and set its value.
        obj1[p] = obj2[p];
      }
    }
    return obj1;
  },
  'getPath': function (obj, ks) {
    if (typeof ks === 'string') {
      ks = ks.split('.');
    }
    if (obj === undefined) {
      return void 0;
    }
    if (ks.length === 0) {
      return obj;
    }
    if (obj === null) {
      return void 0;
    }
    return _.getPath(obj[_.first(ks)], _.rest(ks));
  },
  'existy': function (x) {
    return x !== null;
  },
  'isAssociative': function (x) {
    return _.isArray(x) || _.isObject(x);
  },
  'updatePath': function (obj, fun, ks, defaultValue) {
    if (!_.isAssociative(obj)) {
      throw new TypeError('Attempted to update a non-associative object.');
    }
    if (!_.existy(ks)) {
      return fun(obj);
    }

    var deepness = _.isArray(ks);
    var keys = deepness ? ks : [ks];
    var ret = deepness ? _.cloneDeep(obj) : _.clone(obj);
    var lastKey = _.last(keys);
    var target = ret;

    _.each(_.initial(keys), function (key) {
      if (defaultValue && !_.has(target, key)) {
        target[key] = _.clone(defaultValue);
      }
      target = target[key];
    });

    target[lastKey] = fun(target[lastKey]);
    return ret;
  },
  'setPath': function (obj, value, ks, defaultValue) {
    if (!_.existy(ks)) {
      throw new TypeError('Attempted to set a property at a null path.');
    }
    return _.updatePath(obj, function () {
      return value;
    }, ks, defaultValue);
  }
});

module.exports = _;
