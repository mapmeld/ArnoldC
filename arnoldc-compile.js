/* actual running of code */

// run execute_code($(".CodeMirror"))

function execute_code(code_mirror){
  // get program lines
  var lines = code_mirror.find(".CodeMirror-lines pre");

  // verify start and end
  if( $(lines[0]).text() != "IT'S SHOWTIME" ){
    console.log("missing: IT'S SHOWTIME on first line");
    return;
  }
  if( $(lines[lines.length-1]).text() != "YOU HAVE BEEN TERMINATED" ){
    console.log("missing: YOU HAVE BEEN TERMINATED on last line");
    return;
  }

  var known_vars = { };
  var known_functions = { };
  var var_to_name = null;
  
  for(var line_num=1; line_num<lines.length-1; line_num++){
    line_dom = $(lines[line_num]);
    line_text = line_dom.text();
    line_print_num = line_num + 1;

    // print
    if(line_text.indexOf("TALK TO THE HAND") > -1){
      if(line_dom.children()[0].className == "cm-tag" && $(line_dom.children()[0]).text() == "TALK"
        && line_dom.children()[1].className == "cm-tag" && $(line_dom.children()[1]).text() == "TO"
        && line_dom.children()[2].className == "cm-tag" && $(line_dom.children()[2]).text() == "THE"
        && line_dom.children()[3].className == "cm-tag" && $(line_dom.children()[3]).text() == "HAND"
        && line_dom.children().length > 4){

        // valid print statement?
        if( line_dom.children()[4].className == "cm-string" ){
          var str = $(line_dom.children()[4]).text();

          // check quotes are on string, then remove them
          if(str[0] != '"' || str[str.length-1] != '"'){
            console.log("Uncontained string at line " + line_print_num);
            break;
          }
          str = str.substring(1).substring(0, str.length-2);
          console.log( str );
        }
        else if( line_dom.children()[4].className == "cm-variable" ){
          var varname = $(line_dom.children()[4]).text();
          if(known_vars[varname] !== undefined){
            // defined variable
            // print value
            console.log( known_vars[varname] );
          }
          else{
            // undefined variable
            console.log( varname + " is undefined at line " + line_print_num );
            break;
          }
        }
        else if( line_dom.children()[4].className == "cm-tag" ){
          // could be a command value
          var valname = $(line_dom.children()[4]).text();
          if(valname == "@I" && line_dom.children().length > 5){
            valname = $(line_dom.children()[5]).text();
            if(valname == "LIED"){
              console.log(0);
            }
          }
          else if(valname == "@NO" && line_dom.children().length > 5){
            valname = $(line_dom.children()[5]).text();
            if(valname == "PROBLEMO"){
              console.log(1);
            }
          }
        }
      }
    }

    // initialise variables
    if(line_text.indexOf("HEY CHRISTMAS TREE") > -1){
      if(line_dom.children()[0].className == "cm-tag" && $(line_dom.children()[0]).text() == "HEY"
        && line_dom.children()[1].className == "cm-tag" && $(line_dom.children()[1]).text() == "CHRISTMAS"
        && line_dom.children()[2].className == "cm-tag" && $(line_dom.children()[2]).text() == "TREE"
        && line_dom.children()[3].className == "cm-variable"){
        
        var varname = $(line_dom.children()[3]).text();
        if(known_vars[varname] == undefined){
          // prepare to initialise the variable
          var_to_name = varname;
          known_vars[varname] = null;
        }
        else{
          // variable already declared
          console.log("variable " + varname + " was initialised before line " + line_print_num);
          break;
        }
      }
    }

    // initialise variables, part two
    if(line_text.indexOf("YOU SET US UP") > -1){
      if(line_dom.children()[0].className == "cm-tag" && $(line_dom.children()[0]).text() == "YOU"
        && line_dom.children()[1].className == "cm-tag" && $(line_dom.children()[1]).text() == "SET"
        && line_dom.children()[2].className == "cm-tag" && $(line_dom.children()[2]).text() == "US"
        && line_dom.children()[3].className == "cm-tag" && $(line_dom.children()[3]).text() == "UP"
        && line_dom.children().length > 4){
        
        if(var_to_name === null){
          console.log("Use HEY CHRISTMAS TREE to initialise a variable before setting its value on line " + line_print_num );
          break;
        }

        if( line_dom.children()[4].className == "cm-string" ){
          console.log( "Variables can only be integers (check line " + line_print_num + ")" );
          break;
        }
        else if( line_dom.children()[4].className == "cm-number" ){
          var number = $(line_dom.children()[4]).text() * 1;
          if( isNaN(number) || Math.round(number) !== number ){
            console.log( "Variables can only be integers (check line " + line_print_num + ")" );
            break;
          }
          else{
            known_vars[var_to_name] = number;
            var_to_name = null;
          }
        }
        else if( line_dom.children()[4].className == "cm-variable" ){
          var varname = $(line_dom.children()[4]).text();
          if(known_vars[varname] !== undefined){
            // defined variable
            // take its value
            known_vars[var_to_name] = known_vars[varname];
            var_to_name = null;
          }
          else{
            // undefined variable
            console.log( varname + " is undefined at line " + line_print_num );
            break;
          }
        }
        else if( line_dom.children()[4].className == "cm-tag" ){
          // could be a command value
          var valname = $(line_dom.children()[4]).text();
          if(valname == "@I" && line_dom.children().length > 5){
            valname = $(line_dom.children()[5]).text();
            if(valname == "LIED"){
              known_vars[var_to_name] = 0;
              var_to_name = null;
            }
          }
          else if(valname == "@NO" && line_dom.children().length > 5){
            valname = $(line_dom.children()[5]).text();
            if(valname == "PROBLEMO"){
              known_vars[var_to_name] = 1;
              var_to_name = null;
            }
          }
        }


      }
    }
  }
}