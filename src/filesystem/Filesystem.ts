import path from "path";

import { Executable } from "./types";

export class FilesystemNode {
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

    return path.join("/");
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

  addChild(node: FilesystemNode): void {
    if (this.children) {
      this.children = [...this.children, node];
    }
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
  private rootNode: FilesystemNode;

  constructor(files: Record<string, Executable | null>) {
    this.rootNode = new FilesystemNode({ name: "", children: [] });
    Object.keys(files).forEach((key: string) => {
      const pathElements = key.split("/");
      let currentPath: string = "/";
      let currentParent = this.rootNode;
      pathElements.forEach((pathElement: string, index: number) => {
        currentPath = path.join(currentPath, pathElement);

        const node = this.rootNode.find(currentPath);
        if (!node) {
          const newNode = new FilesystemNode({
            name: pathElement,
            children: index < pathElements.length - 1 ? [] : undefined,
            executable: files[key] || undefined,
            parentNode: currentParent,
          });
          currentParent.addChild(newNode);
          currentParent = newNode;
        } else {
          currentParent = node;
        }
      });
    });
  }

  find(path: string): FilesystemNode | null {
    return this.rootNode.find(path);
  }
}
