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
    table_class = table_obj.attr("class"),
    table_id = table_obj.attr("id");
    
    var tablehead = $('thead', table_obj), 
    headers = $('th', tablehead),
    tablebody = $('tbody', table_obj),
    tablerows = $('tr', tablebody),
    tablefooter = $('tfoot', table_obj),
    tablefootrows = $('tr', tablefooter),
    final_output = "";

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
    final_output = "<table class='"+ table_class + "' id='" + table_id + "'>" + table_obj.html() + "</table>";

    this.outputTextArea.val(final_output);

  }; //end test for existence of input text
}


DataConverter.prototype.insertSampleData = function() {
  this.inputTextArea.val(" <table class='myclass'  id='myid'>\n <thead>\n<tr class='myclass'>\n <th class='myclass'>Month</th>\n <th>Savings</th>\n </tr>\n</thead>\n<tbody>\n  <tr>\n <td>January</td>\n <td>$100</td>\n </tr>\n </tbody>\n </table>"); }


