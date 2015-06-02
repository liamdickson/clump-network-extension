var React = require('react');
var PropTypes = React.PropTypes;
var Inspector = require('react-json-inspector');

module.exports = React.createClass({
    propTypes: {
        harLog: PropTypes.any,
        selectedObject: PropTypes.any.isRequired
    },
    render: function() {
        return (<div className="clumpPane">
            <div className="paneWrapper">
                <h2>Response Body</h2>
                <Inspector data={this.props.harLog.responses[this.props.selectedObject].payload}
                    search={false}
                    class={'json-data'}
                />
            </div>
        </div>);
    }
});