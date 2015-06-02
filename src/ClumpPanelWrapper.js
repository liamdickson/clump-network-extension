var React = require('react');
var PropTypes = React.PropTypes;
var ClumpPanel = require('./ClumpPanel');
var ClumpPane = require('./ClumpPane');

module.exports = React.createClass({
    propTypes: {
        harLog: PropTypes.any
    },
    getInitialState: function() {
        return {selectedObject: -1};
    },
    setSelectedObject: function(i) {
        this.setState({selectedObject: i});
    },
    render: function() {
        var pane;
        var clumpPanel = <ClumpPanel
            harLog={this.props.harLog}
            selectedObject={this.state.selectedObject}
            setSelectedObject={this.setSelectedObject}
        />;
        var clumpPane = <ClumpPane
            harLog={this.props.harLog}
            selectedObject={this.state.selectedObject}
        />;

        if(this.state.selectedObject !== -1) {
            pane = <div className="clumpPanelWrapper">
                {clumpPanel}
                {clumpPane}
            </div>;
        }else{
            pane = <div className="clumpPanelWrapper">
                {clumpPanel}
            </div>
        }

        return pane;
    }
});