String.prototype.toTitleCase = function() {
  return this.replace(/(?:^|\s)\w/g, function(match) {
    return match.toUpperCase();
  });
  return this;
};


$(document).ready(function() {
  var typespeed = 10;
  var cd = "menu"
  var strings = ["Hi, ^100 I'm Steve.", "I'm a designer, ^100 software engineer, ^100 and dog enthusiast." + String.fromCodePoint(0x1F436), "Check out some stuff I've worked on!"];
  // @ifdef !DEBUG
  typespeed = 0;
  strings = ["debug mode"];
  // @endif

  type(strings, function() {
    addRow(true);
  });

  $("body").click(function() {
    var input = currentSpan().find(".input");
    input.focus();
  });

  function resetCurrentInput() {
    var input = currentSpan().find(".input");
    input.prop("contenteditable", true);
    input.text("");
    input.focus();
  }

  function addRow(editable) {
    var clone = $("#typedRowTemplate").html();
    $("#terminal").append(clone);
    if (editable) {
      currentRow().find("#cd").html(cd);
      currentSpan().addClass("inputLine");
      currentSpan().append($("#inputTemplate").html());
      var input = currentSpan().find(".input");
      input.focus();
      input.keydown(function(event) {
        if (event.keyCode == 13) {
          event.preventDefault();
          input.prop("contenteditable", false);
          currentSpan().find(".cursor").hide();
          var cmd = input.text();
          if (cmd.length == 0) {
            addRow(true);
            return;
          }
          runCmd(parseArgs(cmd));
        }
      });
    } else {
      currentRow().find("span:not(:last)").hide();
    }
  }

  function currentRow() {
    return $("#terminal").children().last();
  }

  function currentSpan() {
    return currentRow().children().last();
  }

  function parseArgs(raw) {
    var unparsedArgs = raw.split(' ');
    var cmd = unparsedArgs[0];
    unparsedArgs = unparsedArgs.slice(1);
    var flags = "";
    var args = [];
    for (i = 0; i < unparsedArgs.length; i++) {
      if (unparsedArgs[i].indexOf("-") == 0) {
        flags += unparsedArgs[i].replace("-", "");
      } else {
        args.push(unparsedArgs[i]);
      }
    }

    return {
      cmd: $.trim(cmd),
      flags: flags,
      args: args,
    };
  }

  function pwd() {
    var curItem = $("#" + cd);
    var absPath = curItem.attr("id");
    while(curItem.attr("id") != "menu") {
      absPath += "/" + curItem.attr("id");
      do {
        curItem = curItem.parent();
      } while(typeof curItem.attr("id") == "undefined");
    }
    return absPath;
  }

  function runCmd(cmd) {
    switch(cmd.cmd) {
      case "pwd":
        print(pwd());
        addRow(true);
        break;
      case "ls":
        print(ls(cmd));
        addRow(true);
        break;
      case "cd":
        if (cmd.args.length > 0) {
          changeDirectory(cmd.args[0]);
        }
        addRow(true);
        break;
      default:
        print("Unrecognized command: " + cmd.cmd)
        addRow(true);
    }
  }

  function ls(cmd) {
    console.log(cmd);
    var result = "";
    var elem = $("#" + cd);

    var searchpattern = " > li";
    if (cd != "menu") {
      searchpattern = "> ul" + searchpattern;
    }
    $.each(elem.find(searchpattern), function(i) {
      var id = $(this).attr("id");
      var klass = "";
      var isDir = $(this).children().length > 0;
      var isLink = (typeof $(this).attr("href")) != 'undefined';

      if (id != "") {
        var permstring = "";
        if (isDir) {
          permstring = "drwxr-xr-x ";
          klass += "blue ";
          id += "/";
        } else if (isLink) {
          permstring = "-rwxr-xr-x "
          id = "@" + id;
          klass += "red ";
        }

        var line = '<span class="' + klass + '">' + id + '</span>'
        if (cmd.flags.indexOf("l") >= 0) {
          line = permstring + line;
          if (isLink) {
            line += '<span class="blue"> -> ' + $(this).attr("href") + '</span><br>';
          }
        } else {
          line += "&nbsp;&nbsp;&nbsp;&nbsp;"
        }

        result += line;
      }
    });
    return result;
  }

  function changeDirectory(item) {
    if (item == "..") {
      cd = "menu";
      return;
    }
    var id = item.toLowerCase();
    var elem = $("#" + cd).find("#" + id);
    var href = elem.attr("href");
    if (elem.length == 0) {
      print("cd: No such file or directory: " + item);
    } else if (typeof href == 'undefined') {
      cd = id.replace(/[^a-zA-Z 0-9]+/g, '');
    } else {
      window.open(href, "_blank");
    }
  }

  function print(text) {
    addRow(false);
    currentSpan().html(text);
  }

  function type(strings, done) {
    if (strings.length == 0) {
      done();
      return
    }

    addRow(false);
    currentSpan().typed({
      typeSpeed: 0,
      showCursor: false,
      strings: [" " + strings[0]],
      onStringTyped: function() {
        setTimeout(function() {
          type(strings.slice(1), done);
        }, 500);
      },
    });
  }
});
