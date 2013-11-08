package org.arnoldc

import org.parboiled.errors.ParsingException

class LogicalTest extends ArnoldGeneratorTest{
  it should "False Or True Evaluate True" in {
    val code = "ITS SHOWTIME\n" +
      "RIGHT? WRONG! VAR\n" +
      "YOU SET US UP I LIED\n" +
      "GET TO THE CHOPPER VAR\n" +
      "I LIED\n" +
      "HE HAD TO SPLIT\n" +
      "NO PROBLEMO\n" +
      "ENOUGH TALK\n" +
      "TALK TO THE HAND VAR\n" +
      "YOU HAVE BEEN TERMINATED\n"
    getOutput(code) should equal("1\n")
  }


  it should "True Or False Evaluate True" in {
    val code = "ITS SHOWTIME\n" +
      "RIGHT? WRONG! VAR\n" +
      "YOU SET US UP I LIED\n" +
      "GET TO THE CHOPPER VAR\n" +
      "NO PROBLEMO\n" +
      "HE HAD TO SPLIT\n" +
      "I LIED\n" +
      "ENOUGH TALK\n" +
      "TALK TO THE HAND VAR\n" +
      "YOU HAVE BEEN TERMINATED\n"
    getOutput(code) should equal("1\n")
  }

  it should "True Or True Evaluate True" in {
    val code = "ITS SHOWTIME\n" +
      "RIGHT? WRONG! VAR\n" +
      "YOU SET US UP I LIED\n" +
      "GET TO THE CHOPPER VAR\n" +
      "NO PROBLEMO\n" +
      "HE HAD TO SPLIT\n" +
      "NO PROBLEMO\n" +
      "ENOUGH TALK\n" +
      "TALK TO THE HAND VAR\n" +
      "YOU HAVE BEEN TERMINATED\n"
    getOutput(code) should equal("1\n")
  }

  it should "False Or False Evaluate False" in {
    val code = "ITS SHOWTIME\n" +
      "RIGHT? WRONG! VAR\n" +
      "YOU SET US UP I LIED\n" +
      "GET TO THE CHOPPER VAR\n" +
      "I LIED\n" +
      "HE HAD TO SPLIT\n" +
      "I LIED\n" +
      "ENOUGH TALK\n" +
      "TALK TO THE HAND VAR\n" +
      "YOU HAVE BEEN TERMINATED\n"
    getOutput(code) should equal("0\n")
  }

  it should "False And True Evaluate False" in {
    val code = "ITS SHOWTIME\n" +
      "RIGHT? WRONG! VAR\n" +
      "YOU SET US UP I LIED\n" +
      "GET TO THE CHOPPER VAR\n" +
      "I LIED\n" +
      "KNOCK KNOCK\n" +
      "NO PROBLEMO\n" +
      "ENOUGH TALK\n" +
      "TALK TO THE HAND VAR\n" +
      "YOU HAVE BEEN TERMINATED\n"
    getOutput(code) should equal("0\n")
  }

  it should "True And False Evaluate False" in {
    val code = "ITS SHOWTIME\n" +
      "RIGHT? WRONG! VAR\n" +
      "YOU SET US UP I LIED\n" +
      "GET TO THE CHOPPER VAR\n" +
      "NO PROBLEMO\n" +
      "KNOCK KNOCK\n" +
      "I LIED\n" +
      "ENOUGH TALK\n" +
      "TALK TO THE HAND VAR\n" +
      "YOU HAVE BEEN TERMINATED\n"
    getOutput(code) should equal("0\n")
  }

  it should "True And True Evaluate True" in {
    val code = "ITS SHOWTIME\n" +
      "RIGHT? WRONG! VAR\n" +
      "YOU SET US UP I LIED\n" +
      "GET TO THE CHOPPER VAR\n" +
      "NO PROBLEMO\n" +
      "KNOCK KNOCK\n" +
      "NO PROBLEMO\n" +
      "ENOUGH TALK\n" +
      "TALK TO THE HAND VAR\n" +
      "YOU HAVE BEEN TERMINATED\n"
    getOutput(code) should equal("1\n")
  }
  it should "False And False Evaluate False" in {
    val code = "ITS SHOWTIME\n" +
      "RIGHT? WRONG! VAR\n" +
      "YOU SET US UP I LIED\n" +
      "GET TO THE CHOPPER VAR\n" +
      "I LIED\n" +
      "KNOCK KNOCK\n" +
      "I LIED\n" +
      "ENOUGH TALK\n" +
      "TALK TO THE HAND VAR\n" +
      "YOU HAVE BEEN TERMINATED\n"
    getOutput(code) should equal("0\n")
  }

  it should "False Equals False evaluates True" in {
    val code =
      "ITS SHOWTIME\n" +
        "RIGHT? WRONG! VARFALSE\n" +
        "YOU SET US UP I LIED\n" +
        "RIGHT? WRONG! VARFALSE2\n" +
        "YOU SET US UP I LIED\n" +
        "GET TO THE CHOPPER VARFALSE\n" +
        "I LIED\n" +
        "YOU ARE NOT YOU YOU ARE ME VARFALSE2\n" +
        "ENOUGH TALK\n" +
        "TALK TO THE HAND VARFALSE\n" +
        "YOU HAVE BEEN TERMINATED\n"
    getOutput(code) should equal("1\n")
  }
  it should "True Equals False evaluates False" in {
    val code =
      "ITS SHOWTIME\n" +
        "RIGHT? WRONG! VARFALSE\n" +
        "YOU SET US UP I LIED\n" +
        "RIGHT? WRONG! VARFALSE2\n" +
        "YOU SET US UP I LIED\n" +
        "GET TO THE CHOPPER VARFALSE\n" +
        "NO PROBLEMO\n" +
        "YOU ARE NOT YOU YOU ARE ME VARFALSE2\n" +
        "ENOUGH TALK\n" +
        "TALK TO THE HAND VARFALSE\n" +
        "YOU HAVE BEEN TERMINATED\n"
    getOutput(code) should equal("0\n")
  }

  it should "1 Equals 2 evaluates False" in {
    val code =
      "ITS SHOWTIME\n" +
        "HEY CHRISTMAS TREE ONE\n" +
        "YOU SET US UP 1\n" +
        "HEY CHRISTMAS TREE TWO\n" +
        "YOU SET US UP 2\n" +
        "RIGHT? WRONG! RESULT\n" +
        "YOU SET US UP NO PROBLEMO\n" +
        "GET TO THE CHOPPER RESULT\n" +
        "HERE IS MY INVITATION ONE\n" +
        "YOU ARE NOT YOU YOU ARE ME TWO\n" +
        "ENOUGH TALK\n" +
        "TALK TO THE HAND RESULT\n" +
        "YOU HAVE BEEN TERMINATED\n"
    getOutput(code) should equal("0\n")
  }

  it should "2 is greater than 1 evaluates True" in {
    val code =
      "ITS SHOWTIME\n" +
        "HEY CHRISTMAS TREE ONE\n" +
        "YOU SET US UP 1\n" +
        "HEY CHRISTMAS TREE TWO\n" +
        "YOU SET US UP 2\n" +
        "RIGHT? WRONG! RESULT\n" +
        "YOU SET US UP NO PROBLEMO\n" +
        "GET TO THE CHOPPER RESULT\n" +
        "HERE IS MY INVITATION TWO\n" +
        "LET OF SOME STEAM BENNET ONE\n" +
        "ENOUGH TALK\n" +
        "TALK TO THE HAND RESULT\n" +
        "YOU HAVE BEEN TERMINATED\n"
    getOutput(code) should equal("1\n")
  }

  it should "1 is greater than 2 evaluates False" in {
    val code =
      "ITS SHOWTIME\n" +
        "HEY CHRISTMAS TREE ONE\n" +
        "YOU SET US UP 1\n" +
        "HEY CHRISTMAS TREE TWO\n" +
        "YOU SET US UP 2\n" +
        "RIGHT? WRONG! RESULT\n" +
        "YOU SET US UP NO PROBLEMO\n" +
        "GET TO THE CHOPPER RESULT\n" +
        "HERE IS MY INVITATION ONE\n" +
        "LET OF SOME STEAM BENNET TWO\n" +
        "ENOUGH TALK\n" +
        "TALK TO THE HAND RESULT\n" +
        "YOU HAVE BEEN TERMINATED\n"
    getOutput(code) should equal("0\n")
  }

  it should "3 is greater than 3 evaluates False" in {
    val code =
      "ITS SHOWTIME\n" +
        "HEY CHRISTMAS TREE THREE\n" +
        "YOU SET US UP 3\n" +
        "HEY CHRISTMAS TREE THREE2\n" +
        "YOU SET US UP 3\n" +
        "RIGHT? WRONG! RESULT\n" +
        "YOU SET US UP NO PROBLEMO\n" +
        "GET TO THE CHOPPER RESULT\n" +
        "HERE IS MY INVITATION THREE\n" +
        "LET OF SOME STEAM BENNET THREE2\n" +
        "ENOUGH TALK\n" +
        "TALK TO THE HAND RESULT\n" +
        "YOU HAVE BEEN TERMINATED\n"
    getOutput(code) should equal("0\n")
  }

  it should "detect faulty logical operations" in {
    val code = "ITS SHOWTIME\n" +
      "RIGHT? WRONG! VAR\n" +
      "YOU SET US UP I LIED\n" +
      "GET TO THE CHOPPER VAR\n" +
      "I LIED\n" +
      "I LIED\n" +
      "HE HAD TO SPLIT\n" +
      "NO PROBLEMO\n" +
      "ENOUGH TALK\n" +
      "YOU HAVE BEEN TERMINATED\n"
    intercept[ParsingException] {
      getOutput(code)
    }
  }
}