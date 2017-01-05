var _ = require('lodash');
var format = require('string-template');

function Gauge(gaugeName, customValueFunction) {
    var self = this;

    if (!(this instanceof Gauge)) {
        return new Gauge();
    }

    self._value = 0;
    self._name = gaugeName;

    if (customValueFunction) {
        if (_.isFunction(customValueFunction)) {
            this.value = customValueFunction;
        } else {
            throw new Error('If you are going to supply a custom value function, it must be a function.');
        }
    }
}

Gauge.prototype.name = function () {
    var self = this;
    return self._name;
};

Gauge.prototype.set = function (value) {
    var self = this;
    if (!_.isNumber(value)) throw new Error('A gauge value can only be set to a numeric value');
    self._value = value;
};

Gauge.prototype.increment = function (delta) {
    var self = this;
    if (typeof delta === "undefined") {
        self.shiftValue(1);
    } else {
        self.shiftValue(delta);
    }
};

Gauge.prototype.decrement = function (delta) {
    var self = this;
    if (typeof delta === "undefined") {
        self.shiftValue(-1);
    } else {
        self.shiftValue(-1 * delta);
    }
};

Gauge.prototype.shiftValue = function (delta) {
    var self = this;
    self._value = self._value + delta;
};

Gauge.prototype.value = function () {
    var self = this;
    return self._value;
};

Gauge.prototype.toString = function () {
    var self = this;

    if (self.name()) {
        var templateWithName = "[{name}: {value}]";
        return format(templateWithName, {name: self.name(), value: self.value()});
    } else {
        var templateWithoutName = "[{value}]";
        return format(templateWithoutName, {name: self.name(), value: self.value()});
    }
};

module.exports = Gauge;