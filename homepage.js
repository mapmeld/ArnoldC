var myCodeMirror = CodeMirror( $("#program")[0], {
  mode: "text/x-ruby",
  lineNumbers: true
});

myCodeMirror.setValue("IT'S SHOWTIME\nYOU HAVE BEEN TERMINATED");

var lastcode = myCodeMirror.getValue();
var refreshTimeout = null;
setInterval(function(){
  if(lastcode != myCodeMirror.getValue()){
    lastcode = myCodeMirror.getValue();
    window.clearTimeout(refreshTimeout);
    refreshTimeout = setTimeout(function(){
      $(".outputter").html("");
      execute_code($(".CodeMirror"));
    }, 250);
  }
}, 100);

console = {
  log: function(msg){
    $(".outputter").append(msg + "\n");
  }
};

execute_code($(".CodeMirror"));