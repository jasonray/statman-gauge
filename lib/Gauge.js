var _ = require('underscore');

function Gauge(gaugeName, customValueFunction) {
    var self = this;

    self._value = 0;

    this.name = function () {
        return gaugeName;
    };

    if (customValueFunction) {
        if (typeof(customValueFunction) === 'function') {
            this.value = customValueFunction;
        } else {
            throw new Exception('If you are going to supply a custom value function, it must be a function.');
        }
    } else {
        this.value = function () {
            return self._value;
        };
    }

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

module.exports = Gauge;