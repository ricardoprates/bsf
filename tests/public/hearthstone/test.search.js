var logic = require(__dirname + '/../../../public/hearthstone/search.js');

var kt = {
    "name": "Kel\u0027Thuzad",
    "rarity": "Legendary",
    "race": "General",
    "class": "any",
    "cost": "8",
    "attack": "6",
    "health": "8",
    "text": "At the end of each turn, summon all friendly minions that died this turn."
};

var bgh = {
    "name": "Big Game Hunter",
    "rarity": "Epic",
    "race": "General",
    "class": "any",
    "cost": "3",
    "attack": "4",
    "health": "2",
    "text": "\u003cb\u003eBattlecry:\u003c/b\u003e Destroy a minion with an Attack of 7 or more."
};

module.exports['Search by card name'] = function (test)
{
    test.ok(!logic.searchFilter('abomination')(kt), 'Should NOT accept another card name');
    test.ok(logic.searchFilter('Kel\'Thuzad')(kt), 'Should accept an exact name match');
    test.ok(logic.searchFilter('Thuz')(kt), 'Should accept a partial name match');
    test.ok(logic.searchFilter('elthuz')(kt), 'Should accept a match without special characters');

    test.done();
};

module.exports['Search by attack/health'] = function (test)
{
    test.ok(!logic.searchFilter('5')(kt), 'Should NOT accept another attack or health value');
    test.ok(logic.searchFilter('6')(kt), 'Should pass with a matching attack value');
    test.ok(logic.searchFilter('8')(kt), 'Should pass with a matching health value');
    test.ok(logic.searchFilter('8 6')(kt), 'Should pass with both values provided');
    test.ok(logic.searchFilter('6/8')(kt), 'Should pass with both values provided');
    test.ok(!logic.searchFilter('8 4')(kt), 'Should NOT pass with both wrong values');
    test.ok(!logic.searchFilter('8/4')(kt), 'Should NOT pass with both wrong values');

    test.ok(logic.searchFilter('4/2')(bgh), 'Should pass with correct values');
    test.ok(!logic.searchFilter('7/0')(bgh), 'Should not pass with incorrect values');

    test.done();
};

module.exports['Search by card nickname'] = function (test)
{
    test.ok(logic.searchFilter('kt')(kt), 'Should accept "kt" nickname');
    test.ok(logic.searchFilter('BGH')(bgh), 'Should accept "bgh" nickname');

    test.done();
};

module.exports['Search by card text'] = function (test)
{
    test.ok(logic.searchFilter('friendly')(kt), 'Should accept a single word of the text');
    test.ok(logic.searchFilter('friendly minions')(kt), 'Should accept two words of the text');
    test.ok(logic.searchFilter('friendlyminions')(kt), 'Should accept two words of the text without spaces');
    test.ok(logic.searchFilter('end turn summon died')(kt), 'Should accept multiple words of the text');
    test.ok(!logic.searchFilter('end turn summon died zzz')(kt), 'Should NOT accept if a single word is missing');

    test.done();
};

module.exports['Search by card property'] = function (test)
{
    test.ok(logic.searchFilter('')(kt), 'Should accept empty string');
    test.ok(logic.searchFilter(null)(kt), 'Should accept null');
    test.ok(logic.searchFilter(undefined)(kt), 'Should accept undefined');
    test.ok(logic.searchFilter(6)(kt), 'Should accept the number 6 since kt has a 6 somewhere');
    test.ok(!logic.searchFilter(0)(kt), 'Should NOT accept the number 0 (zero) since kt has no 0 (zero)');
    test.ok(!logic.searchFilter("0")(kt), 'Should NOT accept 0 (zero) since kt has no 0 (zero)');
    test.ok(logic.searchFilter('attack=6')(kt), 'Should accept a simple property filter');
    test.ok(logic.searchFilter('attack=4|5|6')(kt), 'Should accept a filter with multiple values');
    test.ok(!logic.searchFilter('cost=9')(kt), 'Should NOT accept an incorrect value');
    test.ok(!logic.searchFilter('swag=alot')(kt), 'Should NOT accept a property that does not exist');
    test.ok(logic.searchFilter('=6')(kt), 'Should ignore a left malformed token and treat as value');
    test.ok(logic.searchFilter('6=')(kt), 'Should ignore a right malformed token and treat as value');
    test.ok(logic.searchFilter('attack=6 =8=')(kt), 'Should ignore a malformed token and combine with other tokens normally');
    test.ok(logic.searchFilter('attack=6 health=8 name=kel')(kt), 'Should accept multiple properties at once');
    test.ok(logic.searchFilter('attack=5|6 health=7|8 name=gnome|kel')(kt), 'Should accept multiple properties with multiple values');
    test.ok(!logic.searchFilter('(*^*) <(^^)> _||+||_')(kt), 'Should NOT accept absolutely invalid tokens');

    test.done();
};
