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

// Table data as a list of array.
var rows = [
  ['a1', 'b1', 'c1'],
  ['a2', 'b3', 'c2'],
  ['a3', 'b3', 'c3'],
  ..... /// and more
];

function rowGetter(rowIndex) {
  return rows[rowIndex];
}

React.render(
  <Table
    rowHeight={50}
    rowGetter={rowGetter}
    rowsCount={rows.length}
    width={5000}
    height={5000}
    headerHeight={50}>
    <Column
      label="Col 1"
      width={3000}
      dataKey={0}
    />
    <Column
      label="Col 2"
      width={2000}
      dataKey={1}
    />
  </Table>,
  document.getElementById('data')
);