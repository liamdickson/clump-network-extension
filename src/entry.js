var React = require('react');
var FixedDataTable = require('fixed-data-table');

var Table = FixedDataTable.Table;
var Column = FixedDataTable.Column;
var PropTypes = React.PropTypes;

var ResizableTable = React.createClass({
    propTypes: {
        width: PropTypes.number,
        height: PropTypes.number,
        numCols: PropTypes.number,
        clumps: PropTypes.any
    },
    getInitialState: function() {
        return {
            width: window.innerWidth - 15,
            height: window.innerHeight - 100,
            numCols: 3,
            clumps: []
        };
    },
    handleResize: function(e) {
        this.setState({width: window.innerWidth - 15});
        this.setState({height: window.innerHeight - 100});
    },
    addNewClump: function(clump) {
        var reqStatuses = this.parseStatus(clump[0]);
        var resStatuses = this.parseStatus(clump[1]);
        var time = this.parseTime(clump[2]);
        var reqStatus =  "No Errors";
        for (var i in reqStatuses){
            if(reqStatuses[i] !== 200){
                reqStatus = "Errors";
            }
        }
        var resStatus =  "No Errors";
        for (var i in resStatuses){
            if(resStatuses[i] !== 200){
                resStatus = "Errors";
            }
        }
        var clumps = this.state.clumps.concat([[reqStatus, resStatus, time]]);
        this.setState({clumps: clumps})
    },
    componentDidMount: function() {
        var that = this;
        window.addEventListener('resize', this.handleResize);
        chrome.devtools.network.onRequestFinished.addListener( function(request) {
        	if(request.request.url.includes("clump")){
                 that.addNewClump([
                     request.request,
                     request.response,
                     request.timings
                 ]);
        	}
        });
    },
    parseStatus(data){
        var key = "httpCode";
        var objects = [];
        for (var i in data) {
            if (!data.hasOwnProperty(i)) continue;
            if (typeof data[i] === 'object') {
                objects = objects.concat(this.parseStatus(data[i], key));
            } else if (i === key) {
                objects.push(data[i]);
            }
        }
        return objects;
    },
    parseTime(timing){
        var totalTime = 0.0;
        for (var i in timing) {
            if(timing[i] !== -1){
                totalTime += timing[i];
            }
        }
        return totalTime;
    },
    componentDidUnMount: function() {
        window.removeEventListener('resize', this.handleResize);
    },
    render: function() {
        if(this.state.clumps.length !== 0) {
            var that = this;

            function rowGetter(index) {
                return that.state.clumps[index];
            }

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
                rowsCount={this.state.clumps.length}
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