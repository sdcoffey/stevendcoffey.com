function App(type) {}

App.prototype.app = {
  bin: {
    help: "help",
    ls: "ls",
    cd: "cd"
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
