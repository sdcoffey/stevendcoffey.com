import * as React from "react";

import { Apple } from "../shared/icons";
import { BlurView } from "../shared/BlurView";

import "../../style/SystemToolbar.scss";

export default function SystemToolbar() {
  return (
    <BlurView
      className="SystemToolbar"
      childrenClassName="SystemToolbar--childWrapper"
    >
      <SystemToolbarItem>
        <Apple height={20} width={20} />
      </SystemToolbarItem>
    </BlurView>
  );
}

interface SystemToolbarItemProps {
  children: React.ReactNode;
}

interface SystemToolbarItemState {
  active: boolean;
}

class SystemToolbarItem extends React.Component<SystemToolbarItemProps> {
  state = {
    active: false
  };

  render() {
    const { children } = this.props;
    const { active } = this.state;

    return (
      <div onClick={this.handleClick} className="SystemToolbarItem">
        {children}
      </div>
    );
  }

  handleClick = () => {
    this.setState({
      active: true
    });
  };
}

interface SystemToolbarItemMenuProps {
  items: string[];
}

class SystemToolbarItemMenu extends React.Component<
  SystemToolbarItemMenuProps
> {
  static defaultProps = {
    items: []
  };

  render() {
    const { items } = this.props;

    return (
      <BlurView className="SystemToolbarItemMenu">
        {items.map((item, i) => (
          <div key={i} className="SystemToolbarItemMenu--menuitem">
            {item}
          </div>
        ))}
      </BlurView>
    );
  }
}
