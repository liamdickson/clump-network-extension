var React = require('react');
var FixedDataTable = require('fixed-data-table');
var Inspector = require('react-json-inspector');

var Table = FixedDataTable.Table;
var Column = FixedDataTable.Column;
var PropTypes = React.PropTypes;

function renderCell(cellData, cellDataKey, rowData, rowIndex, columnData, width) {
    return cellData.render;
}

var ResizableTable = React.createClass({
    propTypes: {
        width: PropTypes.number,
        height: PropTypes.number,
        requests: PropTypes.any,
        responses: PropTypes.any,
        timings: PropTypes.any
    },
    getInitialState: function() {
        return {
            width: window.innerWidth - 15,
            height: window.innerHeight - 100,
            requests: [],
            responses: [],
            timings: []
        };
    },
    handleResize: function(e) {
        this.setState({width: window.innerWidth - 15});
        this.setState({height: window.innerHeight - 100});
    },
    addNewClump: function(harLog) {
        var that = this;

        var filteredHAR = this.parseRequests(harLog);

        var requests = [];
        var timings = [];

        for (var i in filteredHAR) {
            var request = filteredHAR[i];

            requests[i] = request;
            that.setState({requests: requests});

            timings[i] = request.timings;
            that.setState({timings: timings});
        }

        //var responses = [];
        //filteredHar.forEach(function (data) {
        //
        //})
        //var responsePromises = [];
        //for (var i in filteredHAR) {
        //
        //    responsePromises.push(this.getContent(filteredHAR[i]));
        //
        //    Promise.all(responsePromises).then(function (contentArr) {
        //
        //    });
        //
        //    !function(ii) {
        //        filteredHAR[i].getContent(function (content, encoding) {
        //            responses[ii] = JSON.parse(content);
        //            that.setState({responses: responses});
        //        });
        //    }(i)
        //}
    },
    getContent: function (harObj) {
        return new Promise(function (resolve, reject) {
            harObj.getContent(function(content) {
                resolve(content);
            });
        })
    },
    parseRequests: function(harLog) {
        var output = [];
        for (var i in harLog){
            var item = harLog[i];
            if(item.request.url.includes('clump')){
                output.push(item);
            }
        }
        return output;
    },
    componentDidMount: function() {
        var that = this;
        window.addEventListener('resize', this.handleResize);
        this.devToolsListenerFunc = function(request) {
            if(request.request.url.includes("clump")){
                chrome.devtools.network.getHAR(function (harLog) {
                    console.log('new clump added');
                    that.addNewClump(harLog.entries);
                });
            }
        };
        chrome.devtools.network.onRequestFinished.addListener(this.devToolsListenerFunc);
    },
    componentDidUnMount: function() {
        window.removeEventListener('resize', this.handleResize);
        chrome.devtools.network.onRequestFinished.removeListener(this.devToolsListenerFunc);
    },
    render: function() {
        if(this.state.harLog.length !== 0) {
            var that = this;
            function rowGetter(index) {
                var request = that.state.harLog[index];
                var requestData = request ? JSON.parse(request.request.postData.text) : "";
                var response = that.state.responses[index];
                var responseData = response ? response : "";
                var timing = that.state.timings[index];
                var timingData = timing ? timing : "";

                var requestObj = {
                    data: requestData,
                    render:
                        <Inspector data={requestData}
                            search={false}
                            class={'json-data'}
                        />
                };
                var responseObj = {
                    data: responseData,
                    render:
                        <Inspector data={responseData}
                            search={false}
                            class={'json-data'}
                        />
                };
                var timingObj = {
                    data: timingData,
                    render:
                        <Inspector data={timingData}
                            search={false}
                            class={'json-data'}
                        />
                };

                return [
                    requestObj,
                    responseObj,
                    timingObj
                ];
            }

            var numCols = 3;

            var req = <Column label="Request"
                width={this.state.width / numCols}
                cellRenderer={renderCell}
                //cellDataGetter={cellGetter}
                dataKey={0} />;

            var res = <Column label="Response"
                width={this.state.width / numCols}
                cellRenderer={renderCell}
                //cellDataGetter={cellGetter}
                dataKey={1} />;

            var tim = <Column label="Timings"
                width={this.state.width / numCols}
                cellRenderer={renderCell}
                //cellDataGetter={cellGetter}
                dataKey={2} />;

            var table = <Table
                rowHeight={500}
                rowGetter={rowGetter}
                rowsCount={this.state.harLog.length}
                width={this.state.width}
                maxHeight={this.state.height}
                headerHeight={50}>;
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