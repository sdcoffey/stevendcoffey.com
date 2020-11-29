import { Command, CommandResult } from "shlep";

import { State, Dispatch } from "../redux";

type Executable = (command: Command, dispatch: Dispatch, state: State) => CommandResult;

export type File = {
  executable?: Executable;
};

type FsNode = {
  name: string;
  children?: FsNode[];
  executable?: Executable;
};

class FilesystemNode {
  name: string;
  children: FilesystemNode[] | null;
  executable: Executable | null;
  parentNode: FilesystemNode | null;

  constructor(opts: {
    name: string;
    children?: FilesystemNode[];
    executable?: Executable;
    parentNode?: FilesystemNode;
  }) {
    this.name = opts.name;
    this.children = opts.children || null;
    this.executable = opts.executable || null;
    this.parentNode = opts.parentNode || null;
  }

  isDir(): boolean {
    return !!this.children;
  }

  path(): string {
    if (this.isRoot()) {
      return "/";
    }

    let par = this.parentNode;
    const path = [this.name];

    while (par) {
      path.unshift(par.name);
      par = par.parentNode;
    }

    return "/" + path.join("/");
  }

  isRoot(): boolean {
    return !this.parentNode;
  }

  dir(): string {
    if (this.isRoot() || !this.parentNode) {
      return this.path();
    }

    return this.parentNode.path();
  }

  find(path: string): FilesystemNode | null {
    if (path === this.path()) {
      return this;
    }

    if (this.children) {
      for (const child of this.children) {
        const foundChild = child.find(path);
        if (foundChild) {
          return foundChild;
        }
      }
    }

    return null;
  }
}

export class Filesystem {
  rootNode: FilesystemNode;

  constructor(files: Record<string, File>) {
    this.rootNode = new FilesystemNode({ name: "", children: [] });
    Object.keys(files).forEach((key: string) => {
      const pathElements = key.split("/");
      const currentPath: string[] = [];
      pathElements.forEach((pathElement: string, index: number) => {
        const resolvedPath = currentPath.length === 0 ? "/" : currentPath.join("/");
        debugger;
        if (currentPath.length === 0) {
          currentPath.push(pathElement);
          return;
        }
        const node = this.rootNode.find(resolvedPath);
      });
    });
  }
}
