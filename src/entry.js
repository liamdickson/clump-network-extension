var React = require('react');
var FixedDataTable = require('fixed-data-table');
var Inspector = require('react-json-inspector');

var Table = FixedDataTable.Table;
var Column = FixedDataTable.Column;
var PropTypes = React.PropTypes;

var ResizableTable = React.createClass({
    propTypes: {
        width: PropTypes.number,
        height: PropTypes.number,
        numCols: PropTypes.number,
        requests: PropTypes.any,
        responses: PropTypes.any,
        timings: PropTypes.any
    },
    getInitialState: function() {
        return {
            width: window.innerWidth - 15,
            height: window.innerHeight - 100,
            numCols: 3,
            requests: [],
            responses: [],
            timings: []
        };
    },
    handleResize: function(e) {
        this.setState({width: window.innerWidth - 15});
        this.setState({height: window.innerHeight - 100});
    },
    addNewRequest: function(request) {

        //console.log(request.requestBody);

        var that = this;

        var loc = that.state.requests.length;

        var requests = that.state.requests;
        requests[loc] = request;
        that.setState({requests: requests});
    },
    addNewClump: function(request) {
        var that = this;

        //var loc = that.state.requests.length;
        //
        //var requests = that.state.requests;
        //requests[loc] = request;
        //that.setState({requests: requests});
        //
        //var timings = that.state.timings;
        //timings[loc] = request.timings;
        //that.setState({timings: timings});
        //
        //request.getContent(function (content, encoding) {
        //    var responses = that.state.responses;
        //    responses[loc] = JSON.parse(content);
        //    that.setState({responses: responses});
        //});
    },
    componentDidMount: function() {
        var that = this;
        window.addEventListener('request', function (e) {that.addNewRequest(e.detail)});
        window.addEventListener('resize', this.handleResize);
        this.devToolsListenerFunc = function(request) {
            if(request.request.url.includes("clump")){
                //that.addNewClump(request);
                chrome.devtools.network.getHAR(function (harLog) {console.log(harLog)});
            }
        };
        chrome.devtools.network.onRequestFinished.addListener(this.devToolsListenerFunc);
    },
    componentDidUnMount: function() {
        window.removeEventListener('resize', this.handleResize);
        chrome.devtools.network.onRequestFinished.removeListener(this.devToolsListenerFunc);
    },
    render: function() {
        if(this.state.requests.length !== 0) {
            var that = this;
            function rowGetter(index) {
                var request = that.state.requests[index];
                var requestString = request ? JSON.stringify(request) : "";
                var timing = that.state.timings[index];
                var timingString = timing ? JSON.stringify(timing) : "";
                var response = that.state.responses[index];
                var responseString = response ? JSON.stringify(response) : "";
                return [
                    requestString,
                    responseString,
                    timingString
                ];
            }

            //React.render(
            //    <Inspector data={ data } />,
            //    document.getElementById('inspector')
            //);

            var req = <Column label="Request"
                width={this.state.width / this.state.numCols}
                dataKey={0} />;

            var res = <Column label="Response"
                width={this.state.width / this.state.numCols}
                dataKey={1} />;

            var tim = <Column label="Timings"
                width={this.state.width / this.state.numCols}
                dataKey={2} />;

            var table = <Table
                rowHeight={50}
                rowGetter={rowGetter}
                rowsCount={this.state.requests.length}
                width={this.state.width}
                maxHeight={this.state.height}
                headerHeight={50}>
            {req}
            {res}
            {tim}
            </Table>;
            return table;
        }else{
            return (
                <div>
                    <h4>Listening for Clump Requests...</h4>
                </div>
            )
        }
    }
});

React.render(<ResizableTable />, document.getElementById('data'));

window.messageReceived = function (request) {
    var requestEvent = new CustomEvent('request', {'detail': request});
    window.dispatchEvent(requestEvent);
};