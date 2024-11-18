import "./card.css";
import { FC } from "react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { PriorityIcon } from "./PriorityIcon";
import { StatusIcon } from "./StatusIcon";

export type CardType = Ticket & User;
const Card: FC<CardType> = ({
  id,
  title,
  priority,
  status,
  tag,
  name,
  available,
}) => {
  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id,
  });

  const style = {
    zIndex: 100,
    margin: "10px",
    opacity: 1,
    color: "#333",
    background: "white",
    padding: "16px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      <div id={id}>
        <div className="CardHeader">
          <div className="CardTitle">{id}</div>
          <div className="UserCircle">
            {name.charAt(0)}
            <div
              className="AvailableDot"
              data-available={available ? "true" : "false"}
            />
          </div>
        </div>
        <div className="CardContent">
          <StatusIcon status={status} />
          {title}
        </div>
        <div className="CardFooter">
          <div className="CardPriority">
            <PriorityIcon priority={priority} />
          </div>
          {tag.map((t) => (
            <div className="CardStatus">
              <div className="CardTagDot" />
              <div className="CardTagName">{t}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
