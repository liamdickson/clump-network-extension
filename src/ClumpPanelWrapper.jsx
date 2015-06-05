"use strict";

var React = require('react');
var PropTypes = React.PropTypes;
var ClumpPanel = require('./ClumpPanel');
var ClumpPane = require('./ClumpPane');

module.exports = React.createClass({
    propTypes: {
        harLog: PropTypes.any,
        setSelectedObject: PropTypes.func,
        selectedObject: PropTypes.any
    },
    render: function() {
        var pane;

        if(this.props.selectedObject !== -1) {
            pane = <div className="clumpPanelWrapper">
                <ClumpPanel
                    className='clumpPanel isWithPane'
                    harLog={this.props.harLog}
                    setSelectedObject={this.props.setSelectedObject}
                />
                <ClumpPane
                    harLog={this.props.harLog}
                    setSelectedObject={this.props.setSelectedObject}
                    selectedObject={this.props.selectedObject}
                />
            </div>;
        }else{
            pane = <div className="clumpPanelWrapper">
                <ClumpPanel
                    className='clumpPanel'
                    harLog={this.props.harLog}
                    setSelectedObject={this.props.setSelectedObject}
                />
            </div>
        }

        return pane;
    }
});