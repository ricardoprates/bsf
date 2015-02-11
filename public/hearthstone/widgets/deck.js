(function ($)
{
    $.widget("hearthstone.deck", {
        // default options
        options: {
            maxSize: 30,
            maxRepetition: 2,
            maxLegendaryRepetition: 1
        },

        // lifecycle
        _create: function ()
        {
            this.cards = {};
            this.size = 0;
        },

        _destroy: function ()
        {
        },

        // private
        _add: function (card)
        {
            this.size++;
            this.cards[card.name] = $.extend({count: 1}, card);
        },

        _remove: function (entry)
        {
            this.size--;
            delete this.cards[entry.name];
        },

        _increment: function (entry)
        {
            this.size++;
            entry.count++;
        },

        _decrement: function (entry)
        {
            this.size--;
            entry.count--;
        },

        // public
        add: function (card)
        {
            if (this.size < this.options.maxSize)
            {
                var entry = this.cards[card.name];
                if (!entry)
                {
                    this._add(card);
                }
                else if (entry.count < this.options.maxRepetition)
                {
                    this._increment(entry);
                }
            }
        },

        remove: function (card)
        {
            var entry = this.cards[card.name];
            if (entry)
            {
                if (entry.count > 1)
                {
                    this._decrement(entry);
                }
                else
                {
                    this._remove(entry);
                }
            }
        }
    })
})(jQuery);