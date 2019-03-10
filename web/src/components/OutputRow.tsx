import React from "react";

import "../style/OutputRow.scss";

interface OutputRowProps {
  children: string;
}

export default ({ children }: OutputRowProps) => {
  return (
    <div className="OutputRow">
      <div className="OutputRow--text">{children}</div>
    </div>
  );
};
