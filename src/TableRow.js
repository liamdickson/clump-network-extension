var React = require('react');
var PropTypes = React.PropTypes;
var TableData = require('./TableData');

module.exports = React.createClass({
    propTypes: {
        setSelectedObject: PropTypes.func.isRequired,
        row: PropTypes.number.isRequired,
        numCols: PropTypes.number.isRequired,
        cellData: PropTypes.func.isRequired,
        className: PropTypes.string.isRequired
    },
    render: function() {
        var i, data = [], className;
        for(i = 0; i < this.props.numCols; i++){
            className = this.props.className + ' col-'+i;
            data.push(<TableData
                    key={i}
                    className={className}
                    cellData={this.props.cellData}
                    row={this.props.row}
                    col={i}
                />);
        }
        return (
            <tr className={this.props.className}>
                {data}
            </tr>
        )
    }
});