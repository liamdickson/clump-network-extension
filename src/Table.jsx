"use strict";

var React = require('react');
var PropTypes = React.PropTypes;
var TableRow = require('./TableRow');
var partial = require('lodash.partial');

module.exports = React.createClass({
    propTypes: {
        setSelectedObject: PropTypes.func.isRequired,
        harData: PropTypes.any.isRequired,
        headers: PropTypes.any.isRequired
    },
    headerData: function(i, j) {
        if(j === 0){
            return "Request URL";
        }else{
            return "Code";
        }
    },
    render: function() {
        var self = this;
        return (
            <table>
                {this.props.headers.map((header, i) => {
                    return (<th className={"th-"+i} key={header}>{header}</th>);
                })}
                {this.props.harData.map((request, i) => {
                    return <TableRow
                        key={i}
                        data={request}
                        onClick={partial(this.props.setSelectedObject, i)}
                    />;
                })}
            </table>
        )
    }
});