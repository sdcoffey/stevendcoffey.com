function App(type) {}

App.prototype.app = {
  bin: {
    help: "help",
    ls: "ls",
    cd: "cd"
  },
  home: {
    name: "~",
    perm: 0755,
    contents: {
      github: {
        perm: 0755,
        sym: "http://www.github.com/sdcoffey"
      },
      projects: {
      }
    }
  }
}

App.prototype.command = function(cmdName) {
  return this.app.bin[cmdName];
}

App.prototype.changeDirectory = function(newDirectory) {
  this.workingDirectory = newDirectory;
}

App.prototype.findParent = function(directParent) {
  if (directParent == null) {
    directParent = this.app.home
  }

  if (directParent.contents == undefined) {
    return undefined;
  } else if (directParent.contents[this.workingDirectory.name] != undefined) {
    return directParent;
  } else {
    for (var key in directParent.contents) {
      this.findParent(directParent.contents[key]);
    }
  }

  return undefined;
}

