import React from "react";

import { Text } from "./style/typography";
import { WHITE } from "./style/colors";

interface OutputRowProps {
  children: string;
}

export default ({ children }: OutputRowProps) => {
  return (
    <div>
      <Text color={WHITE}>{children}</Text>
    </div>
  );
};
