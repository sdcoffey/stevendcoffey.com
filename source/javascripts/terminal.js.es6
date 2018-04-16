'use strict';

class Terminal {

  constructor(bodyElem, startingPath) {
    this._fs = new FileSystem();
    this._workingDirectory = this._fs.find(startingPath);

    bodyElem.click(() => {
      let input = this._currentSpan().find('.input');

      input.focus();
    });

    this._addRow(true);
  }

  ls(cmd) {
    let children = this._workingDirectory.children;

    let result = '';
    for (let i in children) {
      let child = children[i];
      let klass = '';
      let id = child.name;

      let permstring = '';
      if (child.isDir) {
        klass += 'blue ';
        id += '/';
      }

      let line = `<span class='${klass}'>${id}</span>`
      if (cmd.flags.indexOf('l') >= 0) {
        line = permstring + ' ' + line;
        if (child.isLink) {
          line += `<span class='blue'> -> ${child.link}</span><br>`;
        }
      } else {
        line += '&nbsp;&nbsp;&nbsp;&nbsp;'
      }

      result += line;
    }

    this._echo(result);
    this._addRow(true);
  }

  cd(cmd) {
    if (cmd.args.length == 0) {
      this._addRow(true);
      return;
    }

    let item = cmd.args[0];

    if (item == '..') {
      if (!this._workingDirectory.isRoot) {
        this._workingDirectory = this._workingDirectory.parent;
      }
    } else if (item !== '.') {
      item = this._workingDirectory.child(item);

      if (!item) {
        this._echo('cd: No such file or directory: ' + cmd.args[0]);
      } else if (item.isLink) {
        if (item.link[0] == '/') {
          window.location = item.link;
        } else {
          window.open(item.link, '_blank');
        }
      } else if (item.isDir) {
        this._workingDirectory = item;
      } else {
        this._echo('cd: not a directory: ' + item.name);
      }
    }

    this._addRow(true);
  }

  help() {
    this._echo('Welcome to the terminal! Type \'ls\' to see were to go from here.');
    this._echo('Type \'cd\' and a destination to go!');
    this._addRow(true);
  }

  echo(cmd) {
    let text = cmd.args[0];

    if (text[0] == `'`) {
      text = text.slice(1, text.length-1);
    }

    this._echo(text);
    this._addRow(true);
  }

  _echo(text) {
    this._addRow(false);
    this._currentSpan().html(text);
  }

  pwd(cmd) {
    let curItem = $('#' + cd);
    let absPath = curItem.attr('id');
    while(curItem.attr('id') != 'menu') {
      absPath += '/' + curItem.attr('id');
      do {
        curItem = curItem.parent();
      } while(typeof curItem.attr('id') == 'undefined');
    }
    return absPath;
  }

  _addRow(editable) {
    let clone = $('#typedRowTemplate').html();

    $('#terminal').append(clone);

    let span = this._currentSpan();
    if (editable) {
      this._setWd(this._workingDirectory.filepath());
      span.addClass('inputLine');
      span.append($('#inputTemplate').html());

      let input = span.find('.input');

      input.focus();

      input.keyup(this._keyup.bind(this));
      input.keydown(this._keydown.bind(this));
    } else {
      this._currentRow().find('span:not(:last)').hide();
    }
  }

  _setWd(workingDir) {
    this._currentRow().find('#wd').html(workingDir);
  }

  _currentRow() {
    return $('#terminal').children().last();
  }

  _currentSpan() {
    return this._currentRow().children().last();
  }

  _runCmd(args) {
    let executable = this[args.command];
    if (executable == undefined) {
      this._echo(`command not found: '${args.command}'. Type 'help' for options.`);
      this._addRow(true);
    } else {
      executable.call(this, args);
    }
  }

  _keydown(event) {
    if (event.keyCode == 37 || event.keyCode == 39) { // left/right arrow
      let cursor = this._currentSpan().find('.cursor');
      let leftMargin = parseInt(cursor.css('margin-left'));
      let currentText = this._currentRow().find('.input').html();
      let delta = 10;

      if (event.keyCode == 37) {
        if (currentText.length == 0) {
          return;
        }
        let leftLimit = currentText.length * -delta + 1;

        if (leftMargin - delta >= leftLimit) {
          leftMargin -= delta;
        }
      } else if (event.keyCode == 39) {
        if (leftMargin > 0) {
          return;
        }

        leftMargin += delta;
      }

      cursor.css({'margin-left': `${leftMargin}px`});
    } else if (event.keyCode == 13 || event.keyCode == 9) { // tab/enter
      event.preventDefault();
    }
  }

  _keyup(event) {
    if (event.keyCode == 17) {
      return false;
    }

    if (event.ctrlKey) {
      if (event.keyCode == 85) {
        this._currentRow().find('.input').html('');
      }
    } else{
      if (event.keyCode == 13) {
        let input = $(event.target);

        input.prop('contenteditable', false);
        this._currentSpan().find('.cursor').hide();
        let cmd = input.text();
        if (cmd.length == 0) {
          this._addRow(true);
          return;
        }
        this._runCmd(this._parseCmd(cmd));
      }
    }
  }

  _parseCmd(raw) {
    let unparsedArgs = raw.split(' ');
    let cmd = unparsedArgs[0];
    unparsedArgs = unparsedArgs.slice(1);

    let flags = "";
    let args = [];

    for (let i = 0; i < unparsedArgs.length; i++) {
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
}
