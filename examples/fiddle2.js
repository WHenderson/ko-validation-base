// Generated by CoffeeScript 1.10.0
(function() {
  var base, isAn, ko, registerValidator;

  ko = require('../index');

  isAn = require('is-an');

  registerValidator = function(name, defaultOptions, defaultOption) {
    if (defaultOption == null) {
      defaultOption = 'params';
    }
    ko.extenders[name] = function(target, options) {
      var o;
      target.extend({
        fallible: true
      });
      if (!isAn.Object(options)) {
        o = {};
        o[defaultOption] = options;
        options = o;
      }
      options = ko.utils.extend(ko.utils.extend({}, ko.extenders[name].options), options);
      target.errors.add(name, function() {
        var isValid, message, params, ref, value;
        value = target();
        params = (ref = ko.utils.unwrapObservable(options.params)) != null ? ref : [];
        if (!isAn.Array(params)) {
          params = [params];
        }
        isValid = options.validator.call(target, value, params, options);
        if (isValid === false) {
          message = options.message;
          if (typeof message === 'string') {
            message = message.replace(/(?:\\(.))|{(\d+)}/g, function(match, escape, group) {
              if (escape != null) {
                return escape;
              }
              return params[group];
            });
          }
          return message;
        } else if (isValid === true) {

        } else {
          return isValid;
        }
      });
      return target;
    };
    ko.extenders[name].options = defaultOptions;
    return this;
  };

  registerValidator('required', {
    message: 'is required',
    params: [true],
    validator: function(value, params) {
      var isRequired;
      isRequired = params[0];
      if (isRequired) {
        return (value != null) && value !== '';
      } else {
        return true;
      }
    }
  });

  base = ko.observable().extend({
    required: true
  });

  console.log(base.errors());

  base(10);

  console.log(base.errors());

  base(void 0);

  console.log(base.errors());

  base = ko.observable().extend({
    required: false
  });

  console.log(base.errors());

}).call(this);