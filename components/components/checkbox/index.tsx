import { CheckboxWrapper, Label } from "./style";
import { ReactNode } from "react";
import {TChecked} from "../../types/common.ts";

type TProps = {
  size: string;
  className?: string;
  checked?: TChecked;
  disabled?: boolean;
  onSelect: () => void;
  label?: string;
  children: ReactNode;
};

/**
 * checked
 * disabled
 * onSelect
 * label
 * children
 * */

export const CheckBox = (props: TProps) => {
  const { size, className, checked, disabled, onSelect, label, children } =
    props;
  return (
    <CheckboxWrapper
      size={size || "sm"}
      className={`${className} no-select`}
      checked={checked}
      disabled={disabled}
      onClick={() => {
        if (!disabled && onSelect) {
          onSelect();
        } else {
          return false;
        }
      }}
    >
      <Label>{label || children}</Label>
    </CheckboxWrapper>
  );
};
