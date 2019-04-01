import * as React from "react";
import classNames from "classnames";
import moment from "moment";

import { Apple } from "../shared/icons";
import { BlurView } from "../shared/BlurView";

import "../../style/SystemToolbar.scss";

interface SystemToolbarProps {}
interface SystemToolbarState {
  currentTime: moment.Moment;
}

export default class SystemToolbar extends React.Component<
  SystemToolbarProps,
  SystemToolbarState
> {
  timerToken: number = 0;

  state = {
    currentTime: moment()
  };

  componentDidMount() {
    this.timerToken = window.setInterval(this._updateTime, 1000);
  }

  componentWillUnmount() {
    window.clearInterval(this.timerToken);
  }

  render() {
    const { currentTime } = this.state;

    return (
      <BlurView
        className="SystemToolbar"
        childrenClassName="SystemToolbar--childWrapper"
      >
        <div className="SystemToolbar--menuDock">
          <SystemToolbarItem>
            <Apple height={20} width={20} />
          </SystemToolbarItem>
        </div>
        <div className="SystemToolbar--toolbarDock">
          <SystemToolbarItem className="SystemToolbar--clock">
            <div>{currentTime.format("ddd H:mm:ss")}</div>
          </SystemToolbarItem>
        </div>
      </BlurView>
    );
  }

  _updateTime = () => {
    this.setState({ currentTime: moment() });
  };
}

interface SystemToolbarItemProps {
  className?: string;
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
    const { children, className } = this.props;
    const { active } = this.state;

    return (
      <div
        onClick={this.handleClick}
        className={classNames("SystemToolbarItem", className)}
      >
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
