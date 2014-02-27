var myCodeMirror = CodeMirror( $("#program")[0], {
  mode: "text/x-ruby",
  lineNumbers: true
});

myCodeMirror.setValue("IT'S SHOWTIME\n  HEY CHRISTMAS TREE isLessThan10\n    YOU SET US UP @NO PROBLEMO\n  HEY CHRISTMAS TREE n\n    YOU SET US UP 0\n  STICK AROUND isLessThan10\n    GET TO THE CHOPPER n\n      HERE IS MY INVITATION n\n      GET UP 1\n    ENOUGH TALK\n    TALK TO THE HAND n\n    GET TO THE CHOPPER isLessThan10\n      HERE IS MY INVITATION 10\n      LET OFF SOME STEAM BENNET n\n    ENOUGH TALK\n  CHILL\nYOU HAVE BEEN TERMINATED");

var lastcode = myCodeMirror.getValue();
var refreshTimeout = null;
setInterval(function(){
  var currentcode = myCodeMirror.getValue();
  if(lastcode != currentcode){
    lastcode = currentcode;
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
