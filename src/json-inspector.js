var React = require('react');
var D = React.DOM;

var Leaf = require('./lib/leaf');
var leaf = React.createFactory(Leaf);
var SearchBar = require('./lib/search-bar');
var searchBar = React.createFactory(SearchBar);

var filterer = require('./lib/filterer');
var isEmpty = require('./lib/is-empty');
var lens = require('./lib/lens');
var noop = require('./lib/noop');

module.exports = React.createClass({
    getDefaultProps: function() {
        return {
            data: null,
            search: searchBar,
            className: '',
            id: 'json-' + Date.now(),
            onClick: noop,
            validateQuery: function(query) {
                return query.length >= 2;
            }
        };
    },
    getInitialState: function() {
        return {
            query: ''
        };
    },
    render: function() {
        var p = this.props;
        var s = this.state;

        var data = s.query ? s.filterer(s.query) : p.data;

        var rootNode = leaf({
            data: data,
            onClick: p.onClick,
            id: p.id,
            getOriginal: this.getOriginal,
            query: s.query,
            label: 'root',
            isRoot: true
        });

        var notFound = D.div({ className: 'json-inspector__not-found' }, 'Nothing found');

        return D.div({ className: 'json-inspector ' + p.className },
            this.renderToolbar(),
            isEmpty(data) ? notFound : rootNode);
    },
    renderToolbar: function() {
        var search = this.props.search;

        if (search) {
            return D.div({ className: 'json-inspector__toolbar' },
                search({ onChange: this.search, data: this.props.data }));
        }
    },
    search: function(query) {
        if (query === '' || this.props.validateQuery(query)) {
            this.setState({
                query: query
            });
        }
    },
    componentDidMount: function() {
        this.createFilterer(this.props.data);
    },
    componentWillReceiveProps: function(p) {
        this.createFilterer(p.data);
    },
    shouldComponentUpdate: function (p, s) {
        return s.query !== this.state.query ||
            p.data !== this.props.data ||
            p.onClick !== this.props.onClick;
    },
    createFilterer: function(data) {
        this.setState({
            filterer: filterer(data)
        });
    },
    getOriginal: function(path) {
        return lens(this.props.data, path);
    }
});
