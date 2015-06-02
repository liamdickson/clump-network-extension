var React = require('react');
var PropTypes = React.PropTypes;
var TableRow = require('./TableRow');

module.exports = React.createClass({
    propTypes: {
        setSelectedObject: PropTypes.func.isRequired,
        selectedObject: PropTypes.any.isRequired,
        numRows: PropTypes.number.isRequired,
        numCols: PropTypes.number.isRequired,
        cellData: PropTypes.func.isRequired
    },
    headerData: function(i, j) {
        if(j === 0){
            return "Request URL";
        }else{
            return "Code";
        }
    },
    render: function() {
        $("td").unbind();
        var i, className, rows = [], self = this;
        className = 'header';
        rows.push(
            <TableRow
                key={-1}
                row={-1}
                setSelectedObject={this.props.setSelectedObject}
                numCols={this.props.numCols}
                cellData={this.headerData}
                className={className}
            />
        );

        for(i = 0; i < this.props.numRows; i++){
            className = 'row-'+i;
            rows.push(
                <TableRow
                    key={i}
                    row={i}
                    setSelectedObject={this.props.setSelectedObject}
                    numCols={this.props.numCols}
                    cellData={this.props.cellData}
                    className={className}
                />
            );
        }
        $("td").click(function () {
            var fullClass = $(this).parent().attr('class');
            $('.selected').removeClass('selected');
            $(this).parent().addClass('selected');
            var rowNum = /row-(\d+)/.exec(fullClass)[1];
            self.props.setSelectedObject(rowNum);
        });
        return (
            <table>
                {rows}
            </table>
        )
    }
});