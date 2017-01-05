/*jslint node: true */
"use strict";

var Gauge = require('../lib/Gauge');
var mocha = require('mocha');
var assert = require('assert');
var should = require('should');

describe('gauge', function () {
    it('gauge returns name', function () {
        var gauge = new Gauge('metric-name');
        gauge.name().should.equal('metric-name');
    });

    it('gauge value initializes to 0', function () {
        var gauge = new Gauge('metric-name');
        gauge.value().should.equal(0);
    });

    it('gauge value increments from 0 to 1', function () {
        var gauge = new Gauge('metric-name');
        gauge.increment();
        gauge.value().should.equal(1);
    });

    it('gauge increments by specified value', function () {
        var gauge = new Gauge('metric-name');
        gauge.set(10);
        gauge.increment(2);
        gauge.value().should.equal(12);
    });

    it('gauge value decrements from 0 to -1', function () {
        var gauge = new Gauge('metric-name');
        gauge.decrement();
        gauge.value().should.equal(-1);
    });

    it('gauge decrements by specified value', function () {
        var gauge = new Gauge('metric-name');
        gauge.decrement(2);
        assert.equal(-2, gauge.value());
    });

    it('gauge can be set to specified value', function () {
        var gauge = new Gauge('metric-name');
        gauge.set(5);
        gauge.value().should.equal(5);
    });

    it('gauge can be set then incremented', function () {
        var gauge = new Gauge('metric-name');
        gauge.set(5);
        gauge.increment();
        gauge.value().should.equal(6);
    });

    it('gauge can be set then decremented', function () {
        var gauge = new Gauge('metric-name');
        gauge.set(5);
        gauge.decrement();
        gauge.value().should.equal(4);
    });

    it('gauge can be incremented more than once', function () {
        var gauge = new Gauge('metric-name');
        gauge.set(5);
        gauge.increment();
        gauge.increment();
        gauge.value().should.equal(7);
    });

    it('gauge can be decremented more than once', function () {
        var gauge = new Gauge('metric-name');
        gauge.set(5);
        gauge.decrement();
        gauge.decrement();
        gauge.value().should.equal(3);
    });

    function testSetWithInvalidInput(input) {
        var gauge = new Gauge('metric-name');
        assert.throws(function () {
            gauge.set(input);
        }, Error, "`set` should throw exception if passed non-numeric value");
    }

    it('unable to set to string', function () {
        var input = "str";
        testSetWithInvalidInput(input);
    });

    it('unable to set to null', function () {
        var input = null;
        testSetWithInvalidInput(input);
    });

    it('unable to set to undefined', function () {
        var input;
        testSetWithInvalidInput(input);
    });

    it('gauge can utilize a custom function to represent value', function () {
        var customValueFunction = function () {
            return 5;
        };

        var gauge = new Gauge('metric-name', customValueFunction);
        assert.equal(5, gauge.value());
    });

    it('gauge will not access a non-function for custom value', function () {
        assert.throws(function () {
            var gauge = new Gauge('metric-name', 5);
        });
    });

    it('with two gauges, values are independent', function () {
        var gaugeA = new Gauge('metric-name');
        gaugeA.set(5);
        gaugeA.increment();
        gaugeA.increment();
        gaugeA.decrement();

        var gaugeB = new Gauge('metric-name');
        gaugeB.set(10);
        gaugeB.increment();
        gaugeB.decrement();
        gaugeB.decrement();

        assert.equal(6, gaugeA.value());
        assert.equal(9, gaugeB.value());
    });

});
