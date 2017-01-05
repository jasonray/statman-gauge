var _ = require('underscore');

function Gauge(gaugeName, customValueFunction) {
    var self = this;

    var _value = 0;

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
            return _value;
        };
    }

    self.shiftValue = function (delta) {
        _value = _value + delta;
    }

    this.set = function (value) {
        if (!_.isNumber(value)) throw new Error('A gauge value can only be set to a numeric value');
        _value = value;
    };
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

module.exports = Gauge;