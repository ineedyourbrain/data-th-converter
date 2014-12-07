//
//  converter.js
//  Mr-Data-Converter
//
//  Created by Shan Carter on 2010-09-01.
//



function DataConverter(nodeId) {

  //---------------------------------------
  // PUBLIC PROPERTIES
  //---------------------------------------

  this.nodeId                 = nodeId;
  this.node                   = $("#"+nodeId);

  

  this.inputTextArea          = {};
  this.outputTextArea         = {};

  this.inputHeader            = {};
  this.outputHeader           = {};

  
  this.inputText              = "";
  this.outputText             = "";


}

//---------------------------------------
// PUBLIC METHODS
//---------------------------------------

DataConverter.prototype.create = function(w,h) {
  var self = this;

  //build HTML for converter
  this.inputHeader = $('<div class="groupHeader" id="inputHeader"><p class="groupHeadline">Input table HTML  (No data on hand? <a href="#" id="insertSample">Use sample</a>)</p></div>');
  this.inputTextArea = $('<textarea class="textInputs" id="dataInput"></textarea>');
  var outputHeaderText = '<div class="groupHeader" id="inputHeader">';
  this.outputHeader = $(outputHeaderText);
  this.outputTextArea = $('<textarea class="textInputs" id="dataOutput"></textarea>');

  this.node.append(this.inputHeader);
  this.node.append(this.inputTextArea);
  this.node.append(this.outputHeader);
  this.node.append(this.outputTextArea);

  this.dataSelect = this.outputHeader.find("#dataSelector");


  this.outputTextArea.click(function(evt){this.select();});


  $("#insertSample").bind('click',function(evt){
    evt.preventDefault();
    self.insertSampleData();
    self.convert();
  });

  $("#dataInput").keyup(function() {self.convert();});
  $("#dataInput").change(function() {
    self.convert();
  });

  this.resize(w,h);
};

DataConverter.prototype.resize = function(w,h) {

  var paneWidth = w;
  var paneHeight = (h-90)/2-20;

  this.node.css({width:paneWidth});
  this.inputTextArea.css({width:paneWidth-20,height:paneHeight});
  this.outputTextArea.css({width: paneWidth-20, height:paneHeight});

}

DataConverter.prototype.convert = function() {

  this.inputText = this.inputTextArea.val();
  var input_text = this.inputTextArea.val();
  this.outputText = "";
  // console.info(typeof input_text)

  //make sure there is input data before converting...
  if (this.inputText.length > 0) {

    var headertext = [];
    var table_obj = $(this.inputText),
    table_class = table_obj.attr("class") + " responsive-table",
    table_id = table_obj.attr("id");
    
    var tablehead = $('thead', table_obj), 
    headers = $('th', tablehead),
    tablebody = $('tbody', table_obj),
    tablerows = $('tr', tablebody),
    tablefooter = $('tfoot', table_obj),
    tablefootrows = $('tr', tablefooter),
    final_output = "",
    table_stles = '\n<style>\n * {-webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; } *:before, *:after {-webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; } .responsive-table {width: 100%; margin-bottom: 1.5em; } @media (min-width: 48em) {.responsive-table {font-size: .9em; } } @media (min-width: 62em) {.responsive-table {font-size: 1em; } } .responsive-table thead {position: absolute; clip: rect(1px 1px 1px 1px); /* IE6, IE7 */ clip: rect(1px, 1px, 1px, 1px); padding: 0; border: 0; height: 1px; width: 1px; overflow: hidden; } @media (min-width: 48em) {.responsive-table thead {position: relative; clip: auto; height: auto; width: auto; overflow: auto; } } .responsive-table thead th {background-color: #111; border: 1px solid #111; font-weight: normal; text-align: center; color: white; } .responsive-table thead th:first-of-type {text-align: left; } .responsive-table tbody, .responsive-table tr, .responsive-table th, .responsive-table td {display: block; padding: 0; text-align: left; white-space: normal; } @media (min-width: 48em) {.responsive-table tr {display: table-row; } } .responsive-table th, .responsive-table td {padding: .5em; vertical-align: middle; } @media (min-width: 30em) {.responsive-table th, .responsive-table td {padding: .75em .5em; } } @media (min-width: 48em) {.responsive-table th, .responsive-table td {display: table-cell; padding: .5em; } } @media (min-width: 62em) {.responsive-table th, .responsive-table td {padding: .75em .5em; } } @media (min-width: 75em) {.responsive-table th, .responsive-table td {padding: .75em; } } .responsive-table caption {margin-bottom: 1em; font-size: 1em; font-weight: bold; text-align: center; } @media (min-width: 48em) {.responsive-table caption {font-size: 1.5em; } } .responsive-table tfoot {font-size: .8em; font-style: italic; } @media (min-width: 62em) {.responsive-table tfoot {font-size: .9em; } } @media (min-width: 48em) {.responsive-table tbody {display: table-row-group; } } .responsive-table tbody tr {margin-bottom: 1em; border: 2px solid #111; } @media (min-width: 48em) {.responsive-table tbody tr {display: table-row; border-width: 1px; } } .responsive-table tbody tr:last-of-type {margin-bottom: 0; } @media (min-width: 48em) {.responsive-table tbody tr:nth-of-type(even) {background-color: rgba(94, 94, 94, 0.1); } } .responsive-table tbody th[scope="row"] {background-color: #111; color: white; } @media (min-width: 48em) {.responsive-table tbody th[scope="row"] {background-color: transparent; color: #555; text-align: left; } } .responsive-table tbody td {text-align: right; } @media (min-width: 30em) {.responsive-table tbody td {border-bottom: 1px solid #111; } } @media (min-width: 48em) {.responsive-table tbody td {text-align: center; } } .responsive-table tbody td[data-type=currency] {text-align: right; } .responsive-table tbody td[data-title]:before {content: attr(data-title); float: left; font-size: .8em; color: rgba(94, 94, 94, 0.75); } @media (min-width: 30em) {.responsive-table tbody td[data-title]:before {font-size: .9em; } } @media (min-width: 48em) {.responsive-table tbody td[data-title]:before {content: none; } } \n</style>';

    //if no thead alert
    if(tablehead.length<1 || header.length<1){alert("please provide a <thead> and <th> elements in your code")}
    //delete children of table

    for(var i = 0; i < headers.length; i++) {
      var current = headers[i];
      headertext.push( current.textContent.replace( /\r?\n|\r/,"") );
    }
    for (var i = 0, row; row = tablerows[i]; i++) {
      for (var j = 0, col; col = row.cells[j]; j++) {
        col.setAttribute("data-th", headertext[j]);        
      } 
    }
    final_output = "<table class='"+ table_class + "' id='" + table_id + "'>" + table_obj.html() + "</table>" +table_stles;

    this.outputTextArea.val(final_output);

  }; //end test for existence of input text
}


DataConverter.prototype.insertSampleData = function() {
  this.inputTextArea.val(" <table class='myclass'  id='myid'>\n <thead>\n<tr class='myclass'>\n <th class='myclass'>Month</th>\n <th>Savings</th>\n </tr>\n</thead>\n<tbody>\n  <tr>\n <td>January</td>\n <td>$100</td>\n </tr>\n </tbody>\n </table>\n "); }


