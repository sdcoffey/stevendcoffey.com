$(document).ready(function() {
  var debug = window.location.host.includes("localhost");
  var term = new Terminal();
  var typespeed = debug ? 0 : 10 ;
  var strings = debug ? ["debug mode"] : ["Hi, ^100 I'm Steve.", "I'm a designer, ^100 software engineer, ^100 and dog enthusiast." + String.fromCodePoint(0x1F436), "Check out some stuff I've worked on!"];

  term.type(strings, function() {
    term.addRow(true);
  });

  $("body").click(function() {
    var input = term.currentSpan().find(".input");
    input.focus();
  });
});
