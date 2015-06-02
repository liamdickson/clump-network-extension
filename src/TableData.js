var React = require('react');
var PropTypes = React.PropTypes;

module.exports = React.createClass({
    propTypes: {
        row: PropTypes.number.isRequired,
        col: PropTypes.number.isRequired,
        cellData: PropTypes.func.isRequired,
        className: PropTypes.string.isRequired
    },
    render: function() {
        return (
            <td className={this.props.className}>
                {this.props.cellData(this.props.row,this.props.col)}
            </td>
        )
    }
});