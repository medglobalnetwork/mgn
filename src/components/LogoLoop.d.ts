import React from "react";

export interface LogoLoopProps {
  logos: Array<{ node: React.ReactNode }>;
  speed?: number;
  direction?: "left" | "right";
  width?: string;
  gap?: number;
}

declare const LogoLoop: React.FC<LogoLoopProps>;
export default LogoLoop;
