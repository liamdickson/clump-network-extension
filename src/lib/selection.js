var React = require('react');
var input = React.DOM.input;

var noop = require('./noop');

module.exports = React.createClass({
    getDefaultProps: function() {
        return {
            value: ''
        };
    },
    render: function() {
        return input({
            className: 'json-inspector__selection',
            value: this.props.value,
            size: Math.max(1, this.props.value.length - 1),
            tabIndex: '-1',
            spellCheck: 'false',
            onClick: this.onClick,
            onFocus: this.onFocus,
            onChange: this.onChange
        });
    },
    onChange: noop,
    onClick: function(e) {
        e.stopPropagation();
    },
    onFocus: function(e) {
        e.target.select();
    }
});
