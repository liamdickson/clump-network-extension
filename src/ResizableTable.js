var React = require('react');
var PropTypes = React.PropTypes;

module.exports = React.createClass({
    propTypes: {
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        harLog: PropTypes.any.isRequired,
        selectedObject: PropTypes.any.isRequired,
        setSelectedObject: PropTypes.func.isRequired
    },
    cellRenderer: function(cellData, cellDataKey, rowData, rowIndex, columnData, width){
        var divStyle = {
            width: this.props.width/2-5,
            color: "red"
        };
        return <div style={divStyle}>{cellData}</div>;
    },
    cellDataGetter: function(cellDataKey, rowData) {
        return rowData[cellDataKey].url;
    },
    rowGetter: function(index) {
        return [
            this.props.harLog.requests[index] ? this.props.harLog.requests[index] : "",
            this.props.harLog.responses[index] ? this.props.harLog.responses[index] : ""
        ];
    },
    render: function() {
        var self = this;
        var i;

        var table = <Table
            rowHeight={50}
            rowGetter={this.rowGetter}
            rowsCount={this.props.harLog.requests.length}
            width={this.props.width}
            height={this.props.height}
            headerHeight={50}>
            <Column
                label="Requests"
                width={this.props.width/2}
                cellRenderer={this.cellRenderer}
                cellDataGetter={this.cellDataGetter}
                dataKey={0}
            />
            <Column
                label="Responses"
                width={this.props.width/2}
                cellRenderer={this.cellRenderer}
                cellDataGetter={this.cellDataGetter}
                dataKey={1}
            />
        </Table>;
        return table;
    }
});