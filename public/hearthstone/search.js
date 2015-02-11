var misc = require(__dirname + '/misc.js');

function _searchFilter(searchText)
{
    return function cardFilter(item)
    {
        if (!searchText && !(searchText === 0))
        {
            return true;
        }

        var splitTokens = searchText.toString().split(' ');

        var minionSpec = /^(\d+)\/(\d+)$/;                              //e.g.: 3/4
        var propertySpec = /^([a-z]+)=([a-z0-9]+(?:\|[a-z0-9]+)*)$/i;   //e.g.: cost=1|2

        var searchTokens = [];
        for (i = 0; i < splitTokens.length; i++)
        {
            var matches;
            var rawToken = splitTokens[i];

            if (matches = rawToken.match(minionSpec))
            {
                var attack = matches[1];
                var health = matches[2];
                searchTokens.push({key: 'attack', value: attack});
                searchTokens.push({key: 'health', value: health});
            }
            else if (matches = rawToken.match(propertySpec))
            {
                var propertyName = matches[1];
                var propertyValues = matches[2];
                searchTokens.push({key: propertyName, value: propertyValues});
            }
            else
            {
                searchTokens.push({key: 'any', value: misc.canonicalForm(rawToken)});
            }
        }

        for (i = 0; i < searchTokens.length; i++)
        {
            var foundMatch = false;
            var token = searchTokens[i];

            for (var property in item)
            {
                if (property !== '$$hashKey' && (token.key == 'any' || token.key == property))
                {
                    var value = item[property];
                    value = misc.canonicalForm(value);

                    if (token.value && (value == token.value || value.search(token.value) != -1 || misc.isNickname(token.value, value)))
                    {
                        foundMatch = true;
                        break;
                    }
                }
            }

            if (!foundMatch)
            {
                return false;
            }
        }

        return true;
    }
}

module.exports.searchFilter = _searchFilter;