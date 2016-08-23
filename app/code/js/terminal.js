function Terminal() {
  this.app = new App().app;
  this.workingDirectory = "home";
}

Terminal.prototype.resetCurrentInput = function() {
  var input = currentSpan().find(".input");
  input.prop("contenteditable", true);
  input.text("");
  input.focus();
}

Terminal.prototype.addRow = function(editable) {
  var clone = $("#typedRowTemplate").html();
  $("#terminal").append(clone);
  if (editable) {
    this.currentSpan().find("#cwd").html(this.workingDirectory);
    this.currentSpan().addClass("inputLine");
    this.currentSpan().append($("#inputTemplate").html());
    var input = this.currentSpan().find(".input");
    input.focus();

    var self = this;
    input.keydown(function(event) {
      if (event.keyCode == 13) {
        event.preventDefault();
        input.prop("contenteditable", false);
        self.currentSpan().find(".cursor").hide();
        var cmd = input.text();
        if (cmd.length == 0) {
          self.addRow(true);
          return;
        }
        self.runCmdNew(self.parseArgs(cmd));
      } else if (event.keyCode == 9) {
        event.preventDefault();
      }
    });
  } else {
    this.currentRow().find("span:not(:last)").hide();
  }
}

Terminal.prototype.currentRow = function() {
  return $("#terminal").children().last();
}

Terminal.prototype.currentSpan = function() {
  return this.currentRow().children().last();
}

Terminal.prototype.parseArgs = function(raw) {
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
    command: $.trim(cmd),
    flags: flags,
    args: args,
  };
}

Terminal.prototype.runCmdNew = function(args) {
  var executable = this[this.app.bin[args.command]];
  if (executable == undefined) {
    this.println("command not found: " + args.command);
    this.addRow(true);
  } else {
    executable.apply(this, args);
  }
}

Terminal.prototype.ls = function(cmd) {
  console.log(cmd);
  const dir = this.app[this.workingDirectory].contents;

  var result = "";
  for (var key in dir) {
    var id = key;
    var klass = "";
    var isDir = dir[key].contents != undefined;
    var isLink = dir[key].sym != undefined;

    if (id != "") {
      var permstring = "";
      if (isDir) {
        klass += "blue ";
        id += "/";
      } else if (isLink) {
        id = "@" + id;
        klass += "red ";
      }

      var line = '<span class="' + klass + '">' + id + '</span>'
      if (cmd.flags.indexOf("l") >= 0) {
        line = permstring + " " + line;
        if (isLink) {
          line += '<span class="blue"> -> ' + $(this).attr("href") + '</span><br>';
        }
      } else {
        line += "&nbsp;&nbsp;&nbsp;&nbsp;"
      }

      result += line;
    }
  }

  this.println(result);
  this.addRow(true);
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

Terminal.prototype.println = function(text) {
  this.addRow(false);
  this.currentSpan().html(text);
}

Terminal.prototype.type = function(strings, done) {
  if (strings.length == 0) {
    done();
    return
  }

  this.addRow(false);
  var self = this;
  this.currentSpan().typed({
    typeSpeed: 0,
    showCursor: false,
    strings: [" " + strings[0]],
    onStringTyped: function() {
      setTimeout(function() {
        self.type(strings.slice(1), done);
      }, 500);
    },
  });
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

