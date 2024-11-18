import { HighPriorityIcon, LowPriorityIcon, MediumPriorityIcon, NoPriorityIcon, UrgentPriorityColorIcon, UrgentPriorityGreyIcon } from "../../assets/_index";

interface PriorityIconProps {
    priority: number;
  }
  
  export const PriorityIcon: React.FC<PriorityIconProps> = ({ priority }) => {
    let Icon;
  
    switch (priority) {
      case 4: // Urgent
        Icon = UrgentPriorityColorIcon;
        break;
      case 3: // High
        Icon = HighPriorityIcon;
        break;
      case 2: // Medium
        Icon = MediumPriorityIcon;
        break;
      case 1: // Low
        Icon = LowPriorityIcon;
        break;
      case 0: // No priority
        Icon = NoPriorityIcon;
        break;
      default:
        Icon = UrgentPriorityGreyIcon; // Default icon if priority value is not in range
        break;
    }
  
    return (
      <div className="PriorityIcon">
        <Icon height={"100%"} width={"100%"}/>
      </div>
    );
  };