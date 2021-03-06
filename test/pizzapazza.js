﻿var assert = require('assert'),
    fs = require('fs'),
    moment = require('moment-timezone'),
    parser = require('../parsers/pizzapazza');

moment.locale('sk');

describe('pizzapazza', function() {
    describe('parsing sample 2015-08-01', function() {

        var html = fs.readFileSync(__dirname + '/samples/PizzaPazza.2018-01-19.html', { encoding: "utf-8" });
        var menu;

        before(function(done) {
            parser.parse(html, moment("2018-01-19"), function(menuItems) {
                menu = menuItems;
                done();
            });
        });

        it("should return 3 items", function() {
            assert.equal(menu.length, 3);
        });

        it("1st item correct", function() {
            assert.equal(menu[0].isSoup, true);
            assert.equal(menu[0].text, "Rascová s vajíčkom");
            assert.equal(isNaN(menu[0].price), true);
        });

        it("2nd item correct", function() {
            assert.equal(menu[1].isSoup, false);
            assert.equal(menu[1].text.trim(), "Hovädzí Stroganov, domáce halušky");
            assert.equal(menu[1].price, 4.80);
        });

        it("3rd item correct", function() {
            assert.equal(menu[2].isSoup, false);
            assert.equal(menu[2].text, "Vyprážané rybie filé, slovenský zemiakový šalát");
            assert.equal(menu[2].price, 4.30);
        });
    });
});