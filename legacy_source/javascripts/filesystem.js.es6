'use strict';

class File {

  constructor(options) {
    this.name = '';
    this.perm = options.perm || 755;
    this.link = options.link;

    this._children = {};
  }

  get isDir() {
    return this.children.length > 0;
  }

  get isLink() {
    return this.link !== undefined;
  }

  get isRoot() {
    return this.parent === undefined;
  }

  get children() {
    return Object.values(this._children).sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      } else if (a.name > b.name) {
        return 1;
      }

      return 0;
    });
  }

  child(name) {
    return this._children[name];
  }

  addChildren(files) {
    for (let name in files) {
      let file = files[name];

      file.name = name;
      file.parent = this;
      this._children[name] = file;
    }

    return this;
  }

  filepath() {
    let path = this.name;

    let parent = this.parent;

    if (!parent) {
      return '/';
    }

    while (parent) {
      path = `${parent.name}/${path}`;
      parent = parent.parent;
    }

    return path;
  }
}

class FileSystem {

  constructor() {
    this._root = new File({
      name: '',
      perm: 700,
    }).addChildren({
      home: new File({
        perm: 755,
      }).addChildren({
        steve: new File({
          perm:755
        }).addChildren({
          photos: new File({
            perm: 755,
            link: '/colors'
          }),
          home: new File({
            perm: 755,
            link: '/'
          }),
          resume: new File({
            perm: 755,
            link: '/resume'
          }),
          github: new File({
            perm: 755,
            link: 'https://github.com/sdcoffey'
          })
        })
      })
    });
  }

  get root() {
    return this._root;
  }

  find(filepath) {
    let pathElements = filepath.split('/');

    let curObj = this.root;
    for (let i in pathElements) {
      let pathElement = pathElements[i];

      if (pathElement === '') {
        continue;
      }

      if (curObj.children && curObj.child(pathElement)) {
        curObj = curObj.child(pathElement);
      } else {
        return null;
      }
    }

    return curObj;
  }
}

