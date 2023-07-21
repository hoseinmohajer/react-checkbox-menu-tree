import React from "react";
import { CheckboxWrapper, Label } from "./style";

/**
 * checked
 * disabled
 * onSelect
 * label
 * children
 * */

const CheckBox = (props) => {
  return (
    <CheckboxWrapper
      size={props.size || "sm"}
      className={`${props.className} no-select`}
      checked={props.checked}
      disabled={props.disabled}
      onClick={() => {
        if (!props.disabled) {
          props.onSelect && props.onSelect();
        }
      }}
    >
      <Label>{props.label || props.children}</Label>
    </CheckboxWrapper>
  );
};

export default CheckBox;
