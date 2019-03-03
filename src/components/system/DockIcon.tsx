import * as React from "react";

import "../../style/DockIcon.scss";

interface DockIconProps {
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  source: number;
}

export default function DockIcon(props: DockIconProps) {
  const { onClick, source } = props;
  return (
    <div onClick={onClick} className="DockIcon">
      <img className="DockIcon--image" src={String(source)} alt="DockIcon" />
    </div>
  );
}
