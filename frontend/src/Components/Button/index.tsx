import { Button } from "@mantine/core";
import React, { ReactNode, CSSProperties } from "react";
interface ButtonProps {
  type?: "button" | "reset" | "submit" | undefined;
  variant?: string;
  children: ReactNode;
  maintine?: string;
  clsName?: string;
  customStyle?: CSSProperties;
  color?: string;
  [key: string]: any;
}

const Btn: React.FC<ButtonProps> = ({
  type,
  variant = "",
  children,
  maintine,
  clsName = "",
  customStyle,
  color,
  ...rest
}: ButtonProps) => {
  return maintine ? (
    <Button
      type={type}
      variant=""
      color={color}
      style={{ ...customStyle }}
      className={`${clsName ? clsName : ""}`}
      {...rest}
    >
      {children}
    </Button>
  ) : (
    <button
      style={{
        ...customStyle,
        borderRadius: "8px",
        background: "var(--color-primary)",
        color: "var(--white-color)",
        border: "none",
      }}
      className={`${clsName ? clsName : ""}`}
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Btn;
