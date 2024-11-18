import * as Select from "@radix-ui/react-select";
import "./styles.css";
import { DownIcon } from "../../assets/_index";
import React from "react";

type CustomSelectProps = {
  placeholder?: string;
  label: string;
  options: { value: string; label: string }[];
  value: string;
  setValue: (value: string) => void;
};

const CustomSelect = ({
  label,
  placeholder,
  options,
  value,
  setValue,
}: CustomSelectProps) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
    }}
  >
    <label className="Label">{label}</label>
    <Select.Root value={value} onValueChange={setValue}>
      <Select.Trigger className="SelectTrigger" aria-label="Options">
        <Select.Value
          placeholder={placeholder ? placeholder : "Select an option"}
        />
        <Select.Icon className="SelectIcon">
          <DownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="SelectContent">
          <Select.Viewport className="SelectViewport">
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  </div>
);

const SelectItem = React.forwardRef<
  React.ElementRef<typeof Select.Item>,
  React.ComponentPropsWithoutRef<typeof Select.Item>
>(({ children, ...props }, forwardedRef) => {
  return (
    <Select.Item className={"SelectItem"} {...props} ref={forwardedRef}>
      <Select.ItemText>{children}</Select.ItemText>
    </Select.Item>
  );
});

export default CustomSelect;
