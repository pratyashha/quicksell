import * as Popover from "@radix-ui/react-popover";
import "./styles.css";
import { DisplayIcon, DownIcon } from "../../assets/_index";
import CustomSelect from "../select";
import { usePreferences } from "../../providers/PreferencesProvider";

const PopoverMenu = () => {
  const { grouping, setGrouping, ordering, setOrdering } = usePreferences();
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className="DropdownButton" aria-label="Update dimensions">
          <DisplayIcon />
          <span>Display</span>
          <DownIcon />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="PopoverContent" sideOffset={5}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <fieldset className="Fieldset">
              {/* <input className="Input" id="width" defaultValue="100%" /> */}
              <CustomSelect
                label="Grouping"
                placeholder="Status"
                value={grouping}
                setValue={setGrouping}
                options={[
                  { value: "status", label: "Status" },
                  { value: "users", label: "User" },
                  { value: "priority", label: "Priority" },
                ]}
              />
            </fieldset>
            <fieldset className="Fieldset">
              <CustomSelect
                label="Ordering"
                placeholder="Priority"
                value={ordering}
                setValue={setOrdering}
                options={[
                  { value: "priority", label: "Priority" },
                  { value: "title", label: "Title" },
                ]}
              />
            </fieldset>
          </div>
          <Popover.Arrow className="PopoverArrow" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default PopoverMenu;
