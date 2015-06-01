var React = require('react');
var PropTypes = React.PropTypes;
var ResizableTable = require('./ResizableTable');

module.exports = React.createClass({
    propTypes: {
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        harLog: PropTypes.any,
        selectedObject: PropTypes.any.isRequired,
        setSelectedObject: PropTypes.func.isRequired
    },
    componentDidMount: function() {
        var self = this;
        $(".clumpPanel").click(function () {
            self.props.setSelectedObject(self.props.selectedObject ? 0 : 1);
        });
    },
    render: function() {
        var panel;
        if(this.props.harLog.requests.length) {
            panel = <div className="clumpPanel">
                <ResizableTable
                    width={this.props.width}
                    height={this.props.height}
                    harLog={this.props.harLog}
                    selectedObject={this.props.selectedObject}
                    setSelectedObject={this.props.setSelectedObject}
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