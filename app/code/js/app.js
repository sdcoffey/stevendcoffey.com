function App(type) {}

App.prototype.app = {
  bin: {
    help: {
      fn: "help"
    },
    ls: {
      fn: "ls"
    },
    cd: {
      fn: "cd"
    }
  },
  home: {
    perm: 0755,
    contents: {
      github: {
        perm: 0755,
        sym: "http://www.github.com/sdcoffey"
      }
    }
  }
}
