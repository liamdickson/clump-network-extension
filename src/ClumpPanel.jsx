"use strict";

var React = require('react');
var Promise = require('es6-promise').Promise;
var PropTypes = React.PropTypes;
var Table = require('./Table');

module.exports = React.createClass({
    propTypes: {
        className: PropTypes.string,
        harLog: PropTypes.any,
        setSelectedObject: PropTypes.func.isRequired
    },
    render: function() {
        var panel;
        if(this.props.harLog.length) {
            panel = <div className={this.props.className}>
                <Table
                    setSelectedObject={this.props.setSelectedObject}
                    harData={this.props.harLog}
                    headers={['','URL','Method','Code']}
                />
            </div>;
        }else{
            panel = <div className="clumpPanel">
                <h4>Listening for Clump Requests...</h4>
            </div>
        }
        return panel;
    }
});