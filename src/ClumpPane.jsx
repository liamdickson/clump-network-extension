"use strict";

var React = require('react');
var PropTypes = React.PropTypes;
var Inspector = require('./json-inspector');

module.exports = React.createClass({
    propTypes: {
        harLog: PropTypes.any,
        selectedObject: PropTypes.any.isRequired,
        setSelectedObject: PropTypes.func.isRequired
    },
    rawToggle: function() {
        $('.detailsWrapper').toggle();
        $('.rawDetails').toggle();
    },
    close: function() {
        this.props.setSelectedObject(-1);
    },
    render: function() {
        return (<div className="clumpPane">
            <div className={"paneButtons"}>
                <div className={"closeButton"} onClick={this.close}>X</div>
                <button className={"rawButton"} onClick={this.rawToggle}>Toggle Raw</button>
            </div>
            <div className={"paneWrapper"}>
                <div className={"rawDetails"}>
                    <h3>Request:</h3>
                    {JSON.stringify(this.props.harLog[this.props.selectedObject].request, null, " ")}
                    <h3>Response:</h3>
                    {this.props.harLog[this.props.selectedObject].err ?
                        this.props.harLog[this.props.selectedObject].response.payload :
                        JSON.stringify(this.props.harLog[this.props.selectedObject].response, null, " ")}
                </div>
                <div className={"detailsWrapper"}>
                    <h2>Details</h2>
                    <h3>Method:</h3>
                    <p>{this.props.harLog[this.props.selectedObject].response.method}</p>
                    <h3>Code:</h3>
                    <p>{this.props.harLog[this.props.selectedObject].response.httpCode}</p>
                    <h3>URL:</h3>
                    <p>{this.props.harLog[this.props.selectedObject].response.url}</p>
                    <h3>Request:</h3>
                    <Inspector
                        data={this.props.harLog[this.props.selectedObject].request}
                        search={false}
                    />
                    <h3>Response:</h3>
                    <Inspector
                        data={this.props.harLog[this.props.selectedObject].response.payload}
                        search={false}
                    />
                </div>
            </div>
        </div>);
    }
});