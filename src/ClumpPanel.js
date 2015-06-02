var React = require('react');
var Promise = require('es6-promise').Promise;
var PropTypes = React.PropTypes;
var Table = require('./Table');

module.exports = React.createClass({
    propTypes: {
        harLog: PropTypes.any,
        selectedObject: PropTypes.any.isRequired,
        setSelectedObject: PropTypes.func.isRequired
    },
    getData: function(i, j) {
        var text = "";
        if(j === 0 && this.props.harLog.requests[i]){
            text = this.props.harLog.requests[i] ? this.props.harLog.requests[i].url : '';
        }else if(j === 1 && this.props.harLog.responses[i]){
            text = this.props.harLog.responses[i].httpCode;
            if(text === 200){
                text = <div className='goodCode'>{text}</div>;
            }else{
                text = <div className='badCode'>{text}</div>;
            }
        }
        return text;
    },
    render: function() {
        var panel;
        if(this.props.harLog.requests.length) {
            panel = <div className="clumpPanel">
                <Table
                    harLog={this.props.harLog}
                    setSelectedObject={this.props.setSelectedObject}
                    selectedObject={this.props.selectedObject}
                    numRows={this.props.harLog.requests.length}
                    numCols={2}
                    cellData={this.getData}
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