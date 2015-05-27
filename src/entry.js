// chrome.devtools.network.onRequestFinished.addListener( function(request) {
// 	if(request.request.url.includes("clump")){
//         JSONFormatter.format(request, {collapse: false, appendTo: '#data'});
// 	}
// });
//
//chrome.devtools.network.onRequestFinished.addListener( function(request) {
//	if(request.request.url.includes("clump")){
//		if(passed){
//    		ext_console += ",";
//    	}
//    	ext_console += "\"obj" + passed + "\":" + JSON.stringify(request, null, 4);
//    	passed += 1;
//	}
//});
//
//document.getElementById("log_btn").addEventListener("click", function(){
//	$('#log').text(ext_console + "}");
//});

var React = require('react');
var FixedDataTable = require('fixed-data-table');

var Table = FixedDataTable.Table;
var Column = FixedDataTable.Column;
var PropTypes = React.PropTypes;

var ResizableTable = React.createClass({
    propTypes: {
        width: PropTypes.number,
        numCols: PropTypes.number,
        clumps: PropTypes.any
    },
    getInitialState: function() {
        return {
            width: window.innerWidth - 15,
            numCols: 3,
            clumps: [
                ['a1', 'b1', 'c1'],
                ['a2', 'b3', 'c2'],
                ['a3', 'b3', 'c3']
            ]
        };
    },
    handleResize: function(e) {
        this.setState({width: window.innerWidth - 15});
        this.addNewClump(['a4','b4','c4']);
    },
    addNewClump: function(clump) {
        var clumps = this.state.clumps.concat(clump);
        this.setState({clumps: clumps})
    },
    componentDidMount: function() {
        window.addEventListener('resize', this.handleResize);
        //chrome.devtools.network.onRequestFinished.addListener( function(request) {
        //	if(request.request.url.includes("clump")){
        //         this.addNewClump({
        //             request: request.request,
        //             response: request.response,
        //             timings: request.timings
        //         });
        //	}
        //});
    },
    componentDidUnMount: function() {
        window.removeEventListener('resize', this.handleResize);
    },
    render: function() {
        var that = this;
        function rowGetter(index) {
            return that.state.clumps[index];
        }

        var req = <Column label="Request"
            width={this.state.width/this.state.numCols}
            dataKey={0} />;

        var res = <Column label="Response"
            width={this.state.width/this.state.numCols}
            dataKey={1} />;

        var tim = <Column label="Timings"
            width={this.state.width/this.state.numCols}
            dataKey={2} />;

        var table = <Table
            rowHeight={50}
            rowGetter={rowGetter}
            rowsCount={this.state.clumps.length}
            width={this.state.width}
            height={300}
            headerHeight={50}>
            {req}
            {res}
            {tim}
        </Table>;

        return table;
    }
});

React.render(<ResizableTable />, document.getElementById('data'));