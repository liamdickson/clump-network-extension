"use strict";

var React = require('react');
var PropTypes = React.PropTypes;

module.exports = React.createClass({
    propTypes: {
        data: PropTypes.any.isRequired
    },
    render: function() {
        return (
            <tr className={"selectable "+this.props.data.responseVars.className} onClick={this.props.onClick}>
                <td className={"col-0"}>{this.props.data.id}</td>
                <td className={"col-1 "+this.props.data.requestVars.className}>{this.props.data.requestVars.display}</td>
                <td className={"col-2"}>{this.props.data.request.method}</td>
                <td className={"col-3 "+this.props.data.responseVars.className}>{this.props.data.responseVars.display}</td>
            </tr>
        )
    }
});