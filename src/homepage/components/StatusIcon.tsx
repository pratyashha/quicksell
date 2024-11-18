import {
  DoneIcon,
  BacklogIcon,
  InProgressIcon,
  TodoIcon,
  CancelledIcon,
} from "../../assets/_index";

interface StatusIconProps {
  status: string;
}

export const StatusIcon: React.FC<StatusIconProps> = ({ status }) => {
  let IconComponent;

  switch (status.toLowerCase()) {
    case "done":
      IconComponent = DoneIcon;
      break;
    case "backlog":
      IconComponent = BacklogIcon;
      break;
    case "in progress":
      IconComponent = InProgressIcon;
      break;
    case "todo":
      IconComponent = TodoIcon;
      break;
    case "cancelled":
      IconComponent = CancelledIcon;
      break;
    default:
      return <span>Unknown Status</span>; // Fallback for unrecognized status
  }

  return (
    <div className="StatusIcon">
      <IconComponent />
    </div>
  );
};
