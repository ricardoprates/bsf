module.exports.canonicalForm = function (name)
{
    return name.replace(/\W|_/g, '').toLowerCase();
};

var _nicknames = {
    'kt': 'kelthuzad',
    'bgh': 'biggamehunter',
    'swagaros': 'ragnarosthefirelord'
};

module.exports.isNickname = function (nick, name)
{
    return (_nicknames[nick] == name);
};
