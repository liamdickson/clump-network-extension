var React = require('react');
var PropTypes = React.PropTypes;
var ClumpPanel = require('./ClumpPanel');
var ClumpPane = require('./ClumpPane');

module.exports = React.createClass({
    propTypes: {
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        harLog: PropTypes.any
    },
    getInitialState: function() {
        return {selectedObject: 0};
    },
    setSelectedObject: function(bool) {
        this.setState({selectedObject: bool});
    },
    render: function() {
        var pane;
        var clumpPanel = <ClumpPanel
            width={this.props.width}
            height={this.props.height}
            harLog={this.props.harLog}
            selectedObject={this.state.selectedObject}
            setSelectedObject={this.setSelectedObject}
        />;
        var clumpPane = <ClumpPane
            selectedObject={this.state.selectedObject}
        />;

        if(this.state.selectedObject) {
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