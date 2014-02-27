/* actual running of code */

// run execute_code($(".CodeMirror"))

function execute_code(code_mirror){
  // get program lines
  var lines = code_mirror.find(".CodeMirror-lines pre");

  // verify start and end
  if( $(lines[0]).text().trim() != "IT'S SHOWTIME" ){
    console.log("missing IT'S SHOWTIME on first line");
    return;
  }
  if( $(lines[lines.length-1]).text().trim() != "YOU HAVE BEEN TERMINATED" ){
    console.log("missing YOU HAVE BEEN TERMINATED on last line");
    return;
  }

  var known_vars = { };
  var known_functions = { };
  var var_to_name = null;
  var var_to_assign = null;
  var app_stack = ["program"];

  var obtainValue = function(lineWord, lineDom, line_print_num){
    var obtained = { };
    if( lineWord.className == "cm-number" ){
      var number = $(lineWord).text() * 1;
      if( isNaN(number) || Math.round(number) !== number ){
        obtained.error = "Variables can only be integers (check line " + line_print_num + ")";
      }
      else{
        obtained.value = number;
      }
    }
    else if( lineWord.className == "cm-variable" ){
      var varname = $(lineWord).text();
      if(known_vars[varname] !== undefined && known_vars[varname] !== null){
        // defined variable
        // take its value
        obtained.value = known_vars[varname];
      }
      else{
        // undefined variable
        obtained.error = varname + " is undefined at line " + line_print_num;
      }
    }
    else if( lineWord.className == "cm-tag" ){
      // could be a preset value
      var valname = $(lineWord).text();
      if(valname == "@I" && line_dom.text().indexOf("@I LIED") == line_dom.text().indexOf("@I")){
        obtained.value = 0;
      }
      else if(valname == "@NO" && line_dom.text().indexOf("@NO PROBLEMO") == line_dom.text().indexOf("@NO")){
        obtained.value = 1;
      }
    }
    return obtained;
  };

  var run_line_num = function(line_num){
    line_dom = $(lines[line_num]);
    line_text = line_dom.text().trim();
    line_print_num = line_num + 1;

    // skip content in blocks (for example, lines inside an IF when the condition is false)
    var deepest_scope = app_stack[app_stack.length-1];
    if(app_stack.indexOf("if-skip") > -1 || app_stack.indexOf("else-skip") > -1 || app_stack.indexOf("while-skip") > -1){
      if(deepest_scope == "if-skip" || deepest_scope == "else-skip"){
        if(line_text.indexOf("YOU HAVE NO RESPECT FOR LOGIC") > -1){
          if(line_dom.children()[0].className == "cm-tag" && $(line_dom.children()[0]).text() == "YOU"
            && line_dom.children()[1].className == "cm-tag" && $(line_dom.children()[1]).text() == "HAVE"
            && line_dom.children()[2].className == "cm-tag" && $(line_dom.children()[2]).text() == "NO"
            && line_dom.children()[3].className == "cm-tag" && $(line_dom.children()[3]).text() == "RESPECT"
            && line_dom.children()[4].className == "cm-tag" && $(line_dom.children()[4]).text() == "FOR"
            && line_dom.children()[5].className == "cm-tag" && $(line_dom.children()[5]).text() == "LOGIC"
            && line_dom.children().length == 6){
            
            // end of the if block
            app_stack.pop();
          }
        }
        else if(line_text.indexOf("BULLSHIT") > -1){
          if(deepest_scope == "else-skip"){
            // too much bullshit
            console.log("multiple BULLSHIT blocks starting at line " + line_print_num);
            return;
          }
          if(line_dom.children()[0].className == "cm-keyword" && $(line_dom.children()[0]).text() == "BULLSHIT"
            && line_dom.children().length == 1){
            
            // switch to executing commands in the else statement
            app_stack[ app_stack.length-1 ] = "else";
          }
        }
      }

      // if you see another if statement, add a deeper level
      // this means we associate the correct end-if with its if statement
      if(line_text.indexOf("BECAUSE I'M GOING TO SAY PLEASE") > -1){
        if(line_dom.children()[0].className == "cm-tag" && $(line_dom.children()[0]).text() == "BECAUSE"
          && line_dom.children()[1].className == "cm-tag" && $(line_dom.children()[1]).text() == "I"
          && line_dom.children()[2].className == "cm-tag" && $(line_dom.children()[2]).text() == "M"
          && line_dom.children()[3].className == "cm-tag" && $(line_dom.children()[3]).text() == "GOING"
          && line_dom.children()[4].className == "cm-tag" && $(line_dom.children()[4]).text() == "TO"
          && line_dom.children()[5].className == "cm-tag" && $(line_dom.children()[5]).text() == "SAY"
          && line_dom.children()[6].className == "cm-tag" && $(line_dom.children()[6]).text() == "PLEASE"
          && line_dom.children().length > 7){
            app_stack.push("if");
        }
      }
      else if(deepest_scope != "if-skip" && line_text.indexOf("YOU HAVE NO RESPECT FOR LOGIC") > -1){
        if(line_dom.children()[0].className == "cm-tag" && $(line_dom.children()[0]).text() == "YOU"
          && line_dom.children()[1].className == "cm-tag" && $(line_dom.children()[1]).text() == "HAVE"
          && line_dom.children()[2].className == "cm-tag" && $(line_dom.children()[2]).text() == "NO"
          && line_dom.children()[3].className == "cm-tag" && $(line_dom.children()[3]).text() == "RESPECT"
          && line_dom.children()[4].className == "cm-tag" && $(line_dom.children()[4]).text() == "FOR"
          && line_dom.children()[5].className == "cm-tag" && $(line_dom.children()[5]).text() == "LOGIC"
          && line_dom.children().length == 6){
            
          // end of this if block
          app_stack.pop();
        }
      }

      if(deepest_scope == "while-skip"){
        if(line_text.indexOf("CHILL") > -1){
          if(line_dom.children()[0].className == "cm-keyword" && $(line_dom.children()[0]).text() == "CHILL"
            && line_dom.children().length == 1){
            
            // end of the while block
            app_stack.pop();
          }
        }
      }

      // if you see another while statement, add a deeper level
      // this means we associate the correct end-while with its while statement
      if(line_text.indexOf("STICK AROUND") > -1){
        if(line_dom.children()[0].className == "cm-tag" && $(line_dom.children()[0]).text() == "STICK"
          && line_dom.children()[1].className == "cm-tag" && $(line_dom.children()[1]).text() == "AROUND"
          && line_dom.children().length > 2){
            app_stack.push("while");
        }
      }
      else if(deepest_scope != "while-skip" && line_text.indexOf("CHILL") > -1){
        if(line_dom.children()[0].className == "cm-keyword" && $(line_dom.children()[0]).text() == "CHILL"
          && line_dom.children().length == 1){

          // end of this while block
          app_stack.pop();
        }
      }

      // continue to next line without executing stuff
      return run_line_num(line_num + 1);
    }

    // print
    if(line_text.indexOf("TALK TO THE HAND") > -1){

      if(line_dom.children()[0].className == "cm-tag" && $(line_dom.children()[0]).text() == "TALK"
        && line_dom.children()[1].className == "cm-tag" && $(line_dom.children()[1]).text() == "TO"
        && line_dom.children()[2].className == "cm-tag" && $(line_dom.children()[2]).text() == "THE"
        && line_dom.children()[3].className == "cm-tag" && $(line_dom.children()[3]).text() == "HAND"
        && line_dom.children().length > 4){

        if(var_to_assign !== null || var_to_name !== null){
          console.log( "In the middle of assigning or naming a variable at line " + line_print_num );
          return;
        }

        // valid print statement?
        if( line_dom.children()[4].className == "cm-string" ){
          var str = $(line_dom.children()[4]).text();

          // check quotes are on string, then remove them
          if(str[0] != '"' || str[str.length-1] != '"'){
            console.log("Uncontained string at line " + line_print_num);
            return;
          }
          str = str.substring(1).substring(0, str.length-2);
          console.log( str );
        }
        else{
          var meant_value = obtainValue(line_dom.children()[4], line_dom, line_print_num);
          if(meant_value.error){
            console.log(meant_value.error);
            return;
          }
          else{
            console.log(meant_value.value);
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

        if(var_to_assign !== null || var_to_name !== null){
          console.log( "In the middle of assigning a variable at line " + line_print_num );
          return;
        }
        
        var varname = $(line_dom.children()[3]).text();
        if(known_vars[varname] == undefined){
          // prepare to initialise the variable
          var_to_name = varname;
          known_vars[varname] = null;
        }
        else{
          // variable already declared
          console.log("variable " + varname + " was initialised before line " + line_print_num);
          return;
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
          return;
        }
        if(var_to_assign !== null){
          console.log( "In the middle of assigning a variable at line " + line_print_num );
          return;
        }

        if( line_dom.children()[4].className == "cm-string" ){
          console.log( "Variables can only be integers (check line " + line_print_num + ")" );
          return;
        }
        else{
          var meant_value = obtainValue(line_dom.children()[4], line_dom, line_print_num);
          if(meant_value.error){
            console.log(meant_value.error);
            return;
          }
          else{
            known_vars[var_to_name] = meant_value.value;
            var_to_name = null;
          }
        }
      }
    }

    // assign variables, part one
    if(line_text.indexOf("GET TO THE CHOPPER") > -1){
      if(line_dom.children()[0].className == "cm-tag" && $(line_dom.children()[0]).text() == "GET"
        && line_dom.children()[1].className == "cm-tag" && $(line_dom.children()[1]).text() == "TO"
        && line_dom.children()[2].className == "cm-tag" && $(line_dom.children()[2]).text() == "THE"
        && line_dom.children()[3].className == "cm-tag" && $(line_dom.children()[3]).text() == "CHOPPER"
        && line_dom.children()[4].className == "cm-variable"){

        if(var_to_name !== null){
          console.log( "In the middle of naming a variable at line " + line_print_num );
          return;
        }
        
        var varname = $(line_dom.children()[4]).text();
        if(var_to_assign === null){
          if(known_vars[varname] === undefined){
            console.log( "Use HEY CHRISTMAS TREE to initialise a variable before assigning it in line " + line_print_num );
            return;
          }
          var_to_assign = varname;
        }
        else{
          console.log( "In the middle of assigning another variable before line " + line_print_num );
          return;
        }
      }
    }

    // assign variables, part two
    if(line_text.indexOf("HERE IS MY INVITATION") > -1){
      if(line_dom.children()[0].className == "cm-tag" && $(line_dom.children()[0]).text() == "HERE"
        && line_dom.children()[1].className == "cm-tag" && $(line_dom.children()[1]).text() == "IS"
        && line_dom.children()[2].className == "cm-tag" && $(line_dom.children()[2]).text() == "MY"
        && line_dom.children()[3].className == "cm-tag" && $(line_dom.children()[3]).text() == "INVITATION"
        && line_dom.children().length > 4){

        if(var_to_assign === null){
          console.log("Use GET TO THE CHOPPER to start assigning a variable before line " + line_print_num );
          return;
        }

        if( line_dom.children()[4].className == "cm-string" ){
          console.log( "Variables can only be integers (check line " + line_print_num + ")" );
          return;
        }
        else{
          var meant_value = obtainValue(line_dom.children()[4], line_dom, line_print_num);
          if(meant_value.error){
            console.log(meant_value.error);
            return;
          }
          else{
            known_vars[var_to_assign] = meant_value.value;
          }
        }
      }
    }

    // assign variables, ending
    if(line_text == "ENOUGH TALK"){
      if(var_to_assign === null){
        console.log( "no variable to finish assigning at line " + line_print_num );
        return;
      }
      var_to_assign = null;
    }


    // operand for addition
    if(line_text.indexOf("GET UP") > -1){
      if(line_dom.children()[0].className == "cm-tag" && $(line_dom.children()[0]).text() == "GET"
        && line_dom.children()[1].className == "cm-tag" && $(line_dom.children()[1]).text() == "UP"
        && line_dom.children().length > 2){

        if(var_to_assign === null){
          console.log("Use GET TO THE CHOPPER and HERE IS MY INVITATION to start assigning a variable before line " + line_print_num );
          return;
        }

        if( line_dom.children()[2].className == "cm-string" ){
          console.log( "Variables can only be integers (check line " + line_print_num + ")" );
          return;
        }
        else{
          var meant_value = obtainValue(line_dom.children()[2], line_dom, line_print_num);
          if(meant_value.error){
            console.log(meant_value.error);
            return;
          }
          else{
            known_vars[var_to_assign] += meant_value.value;
          }
        }
      }
    }

    // operand for subtraction
    if(line_text.indexOf("GET DOWN") > -1){
      if(line_dom.children()[0].className == "cm-tag" && $(line_dom.children()[0]).text() == "GET"
        && line_dom.children()[1].className == "cm-tag" && $(line_dom.children()[1]).text() == "DOWN"
        && line_dom.children().length > 2){

        if(var_to_assign === null){
          console.log("Use GET TO THE CHOPPER and HERE IS MY INVITATION to start assigning a variable before line " + line_print_num );
          return;
        }

        if( line_dom.children()[2].className == "cm-string" ){
          console.log( "Variables can only be integers (check line " + line_print_num + ")" );
          return;
        }
        else{
          var meant_value = obtainValue(line_dom.children()[2], line_dom, line_print_num);
          if(meant_value.error){
            console.log(meant_value.error);
            return;
          }
          else{
            known_vars[var_to_assign] -= meant_value.value;
          }
        }
      }
    }

    // operand for multiplication
    if(line_text.indexOf("YOU'RE FIRED") > -1){
      if(line_dom.children()[0].className == "cm-tag" && $(line_dom.children()[0]).text() == "YOU"
        && line_dom.children()[1].className == "cm-tag" && $(line_dom.children()[1]).text() == "RE"
        && line_dom.children()[2].className == "cm-tag" && $(line_dom.children()[2]).text() == "FIRED"
        && line_dom.children().length > 3){

        if(var_to_assign === null){
          console.log("Use GET TO THE CHOPPER and HERE IS MY INVITATION to start assigning a variable before line " + line_print_num );
          return;
        }

        if( line_dom.children()[3].className == "cm-string" ){
          console.log( "Variables can only be integers (check line " + line_print_num + ")" );
          return;
        }
        else{
          var meant_value = obtainValue(line_dom.children()[3], line_dom, line_print_num);
          if(meant_value.error){
            console.log(meant_value.error);
            return;
          }
          else{
            known_vars[var_to_assign] *= meant_value.value;
          }
        }
      }
    }

    // operand for division
    if(line_text.indexOf("HE HAD TO SPLIT") > -1){
      if(line_dom.children()[0].className == "cm-tag" && $(line_dom.children()[0]).text() == "HE"
        && line_dom.children()[1].className == "cm-tag" && $(line_dom.children()[1]).text() == "HAD"
        && line_dom.children()[2].className == "cm-tag" && $(line_dom.children()[2]).text() == "TO"
        && line_dom.children()[3].className == "cm-tag" && $(line_dom.children()[3]).text() == "SPLIT"
        && line_dom.children().length > 4){

        if(var_to_assign === null){
          console.log("Use GET TO THE CHOPPER and HERE IS MY INVITATION to start assigning a variable before line " + line_print_num );
          return;
        }

        if( line_dom.children()[4].className == "cm-string" ){
          console.log( "Variables can only be integers (check line " + line_print_num + ")" );
          return;
        }
        else{
          var meant_value = obtainValue(line_dom.children()[4], line_dom, line_print_num);
          if(meant_value.error){
            console.log(meant_value.error);
            return;
          }
          else{
            known_vars[var_to_assign] = Math.round(known_vars[var_to_assign] / meant_value.value);
          }
        }
      }
    }

    // operand for equal
    if(line_text.indexOf("YOU ARE NOT YOU YOU ARE ME") > -1){
      if(line_dom.children()[0].className == "cm-tag" && $(line_dom.children()[0]).text() == "YOU"
        && line_dom.children()[1].className == "cm-tag" && $(line_dom.children()[1]).text() == "ARE"
        && line_dom.children()[2].className == "cm-tag" && $(line_dom.children()[2]).text() == "NOT"
        && line_dom.children()[3].className == "cm-tag" && $(line_dom.children()[3]).text() == "YOU"
        && line_dom.children()[4].className == "cm-tag" && $(line_dom.children()[4]).text() == "YOU"
        && line_dom.children()[5].className == "cm-tag" && $(line_dom.children()[5]).text() == "ARE"
        && line_dom.children()[6].className == "cm-tag" && $(line_dom.children()[6]).text() == "ME"
        && line_dom.children().length > 7){

        if(var_to_assign === null){
          console.log("Use GET TO THE CHOPPER and HERE IS MY INVITATION to start assigning a variable before line " + line_print_num );
          return;
        }

        if( line_dom.children()[7].className == "cm-string" ){
          console.log( "Variables can only be integers (check line " + line_print_num + ")" );
          return;
        }
        else{
          var meant_value = obtainValue(line_dom.children()[7], line_dom, line_print_num);
          if(meant_value.error){
            console.log(meant_value.error);
            return;
          }
          else{
            known_vars[var_to_assign] = (known_vars[var_to_assign] == meant_value.value) * 1;
          }
        }
      }
    }

    // operand for greater than
    if(line_text.indexOf("LET OFF SOME STEAM BENNET") > -1){
      if(line_dom.children()[0].className == "cm-tag" && $(line_dom.children()[0]).text() == "LET"
        && line_dom.children()[1].className == "cm-tag" && $(line_dom.children()[1]).text() == "OFF"
        && line_dom.children()[2].className == "cm-tag" && $(line_dom.children()[2]).text() == "SOME"
        && line_dom.children()[3].className == "cm-tag" && $(line_dom.children()[3]).text() == "STEAM"
        && line_dom.children()[4].className == "cm-tag" && $(line_dom.children()[4]).text() == "BENNET"
        && line_dom.children().length > 5){

        if(var_to_assign === null){
          console.log("Use GET TO THE CHOPPER and HERE IS MY INVITATION to start assigning a variable before line " + line_print_num );
          return;
        }

        if( line_dom.children()[5].className == "cm-string" ){
          console.log( "Variables can only be integers (check line " + line_print_num + ")" );
          return;
        }
        else{
          var meant_value = obtainValue(line_dom.children()[5], line_dom, line_print_num);
          if(meant_value.error){
            console.log(meant_value.error);
            return;
          }
          else{
            known_vars[var_to_assign] = (known_vars[var_to_assign] > meant_value.value) * 1;
          }
        }
      }
    }

    // operand for or
    if(line_text.indexOf("CONSIDER THAT A DIVORCE") > -1){
      if(line_dom.children()[0].className == "cm-tag" && $(line_dom.children()[0]).text() == "CONSIDER"
        && line_dom.children()[1].className == "cm-tag" && $(line_dom.children()[1]).text() == "THAT"
        && line_dom.children()[2].className == "cm-tag" && $(line_dom.children()[2]).text() == "A"
        && line_dom.children()[3].className == "cm-tag" && $(line_dom.children()[3]).text() == "DIVORCE"
        && line_dom.children().length > 4){

        if(var_to_assign === null){
          console.log("Use GET TO THE CHOPPER and HERE IS MY INVITATION to start assigning a variable before line " + line_print_num );
          return;
        }

        if( line_dom.children()[4].className == "cm-string" ){
          console.log( "Variables can only be integers (check line " + line_print_num + ")" );
          return;
        }
        else{
          var meant_value = obtainValue(line_dom.children()[4], line_dom, line_print_num);
          if(meant_value.error){
            console.log(meant_value.error);
            return;
          }
          else{
            known_vars[var_to_assign] = !(!(known_vars[var_to_assign] || meant_value.value)) * 1;
          }
        }
      }
    }

    // operand for and
    if(line_text.indexOf("KNOCK KNOCK") > -1){
      if(line_dom.children()[0].className == "cm-tag" && $(line_dom.children()[0]).text() == "KNOCK"
        && line_dom.children()[1].className == "cm-tag" && $(line_dom.children()[1]).text() == "KNOCK"
        && line_dom.children().length > 2){

        if(var_to_assign === null){
          console.log("Use GET TO THE CHOPPER and HERE IS MY INVITATION to start assigning a variable before line " + line_print_num );
          return;
        }

        if(line_dom.children()[2].className == "cm-string"){
          console.log( "Variables can only be integers (check line " + line_print_num + ")" );
          return;
        }
        else{
          var meant_value = obtainValue(line_dom.children()[2], line_dom, line_print_num);
          if(meant_value.error){
            console.log(meant_value.error);
            return;
          }
          else{
            known_vars[var_to_assign] = !(!(known_vars[var_to_assign] && meant_value.value)) * 1;
          }
        }
      }
    }

    // start conditional
    if(line_text.indexOf("BECAUSE I'M GOING TO SAY PLEASE") > -1){
      if(line_dom.children()[0].className == "cm-tag" && $(line_dom.children()[0]).text() == "BECAUSE"
        && line_dom.children()[1].className == "cm-tag" && $(line_dom.children()[1]).text() == "I"
        && line_dom.children()[2].className == "cm-tag" && $(line_dom.children()[2]).text() == "M"
        && line_dom.children()[3].className == "cm-tag" && $(line_dom.children()[3]).text() == "GOING"
        && line_dom.children()[4].className == "cm-tag" && $(line_dom.children()[4]).text() == "TO"
        && line_dom.children()[5].className == "cm-tag" && $(line_dom.children()[5]).text() == "SAY"
        && line_dom.children()[6].className == "cm-tag" && $(line_dom.children()[6]).text() == "PLEASE"
        && line_dom.children().length > 7){
        
        if(line_dom.children()[7].className == "cm-string"){
          console.log( "BECAUSE I'M GOING TO SAY PLEASE expects integer or variable (check line " + line_print_num + ")" );
          return;
        }
        else{
          var meant_value = obtainValue(line_dom.children()[7], line_dom, line_print_num);
          if(meant_value.error){
            console.log(meant_value.error);
            return;
          }
          else{
            if(meant_value.value){
              app_stack.push("if");
            }
            else{
              app_stack.push("if-skip");            
            }
          }
        }
      }
    }

    // we reach this if we are running code in an if block, then we see an else that we want to skip
    if(line_text.indexOf("BULLSHIT") > -1){
      if(deepest_scope == "else"){
        // too much bullshit
        console.log("multiple BULLSHIT blocks detected at line " + line_print_num);
        return;
      }
      else if(deepest_scope != "if"){
        // too much bullshit
        console.log("BULLSHIT must be in a conditional block - check line " + line_print_num);
        return;
      }
      if(line_dom.children()[0].className == "cm-keyword" && $(line_dom.children()[0]).text() == "BULLSHIT"
        && line_dom.children().length == 1){
            
        // switch to executing commands in the else statement
        app_stack[ app_stack.length-1 ] = "else-skip";
      }
    }

    // start while
    if(line_text.indexOf("STICK AROUND") > -1){
      if(line_dom.children()[0].className == "cm-tag" && $(line_dom.children()[0]).text() == "STICK"
        && line_dom.children()[1].className == "cm-tag" && $(line_dom.children()[1]).text() == "AROUND"
        && line_dom.children().length > 2){

        if(line_dom.children()[2].className == "cm-string"){
          console.log( "STICK AROUND expects integer or variable (check line " + line_print_num + ")" );
          return;
        }
        else{
          var meant_value = obtainValue(line_dom.children()[2], line_dom, line_print_num);
          if(meant_value.error){
            console.log(meant_value.error);
            return;
          }
          else{
            if(meant_value.value){
              app_stack.push("while-" + line_num);
            }
            else{
              app_stack.push("while-skip");            
            }
          }
        }
      }
    }

    // we reach this if we are running code in a while block
    if(line_text.indexOf("CHILL") > -1){
      if(line_dom.children()[0].className == "cm-keyword" && $(line_dom.children()[0]).text() == "CHILL"
        && line_dom.children().length == 1){
        
        if(deepest_scope.indexOf("while-") == -1){
          console.log("CHILL must end a STICK AROUND block - check line " + line_print_num);
          return;
        }

        // jump back to beginning to re-evaluate
        var while_start = deepest_scope.split("-")[1] * 1;
        app_stack.pop();
        return run_line_num(while_start);
      }
    }

    // no unusual movement in control - advance to next line
    run_line_num(line_num+1);
  };
  run_line_num(1);
}