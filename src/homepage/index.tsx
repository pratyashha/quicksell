import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverEvent,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import Column, { ColumnType } from "./components/Column";
import { usePreferences } from "../providers/PreferencesProvider";

export default function HomePage({ data }: { data: JSONResponse }) {
  //Use the preference to set the columns
  const { grouping } = usePreferences();

  const [columns, setColumns] = useState<ColumnType[]>([]);

  //Expected Values
  const statuses:Record<string, string> = {
    "Backlog": "Backlog",
    "Todo": "Todo",
    "In progress": "In progress",
    "Done": "Done",
    "Cancelled": "Cancelled"
  }
  const priorities = ["No priority", "Low", "Medium", "High", "Urgent"];

  //Status columns
  const statusColumns: ColumnType[] = Object.keys(statuses).map((status,index) => {
    return {
      id: status + index,
      title: statuses[status],
      cards: data.tickets
        .filter((ticket) => ticket.status === status)
        .map((ticket) => ({
          ...ticket,
          id: String(ticket.id),
          userId: ticket.userId.toString(),
          name:
            data.users.find((user) => user.id === ticket.userId)?.name ?? "",
          available:
            data.users.find((user) => user.id === ticket.userId)?.available ?? false,
        })),
    };
  });

  //Priority columns
  const priorityColumns: ColumnType[] = priorities.map((priority,index) => {
    return {
      id: priority + index,
      title: priority,
      cards: data.tickets
        .filter((ticket) => ticket.priority === index)
        .map((ticket) => ({
          ...ticket,
          id: String(ticket.id),
          userId: ticket.userId.toString(),
          name:
            data.users.find((user) => user.id === ticket.userId)?.name ?? "",
          available:
            data.users.find((user) => user.id === ticket.userId)?.available ?? false,
        })),
    };
  });

  //Users columns
  const usersColumns: ColumnType[] = data.users.map((user) => {
    return {
      id: user.id,
      title: user.name,
      cards: data.tickets
        .filter((ticket) => ticket.userId === user.id)
        .map((ticket) => ({
          ...ticket,
          id: String(ticket.id),
          userId: ticket.userId.toString(),
          name:
            data.users.find((user) => user.id === ticket.userId)?.name ?? "",
          available:
            data.users.find((user) => user.id === ticket.userId)?.available ??
            false,
        })),
    };
  });

  const handleColumnChange = (value: string) => {
    if (value === "status") {
      setColumns(statusColumns);
    } else if (value === "priority") {
      setColumns(priorityColumns);
    } else {
      setColumns(usersColumns);
    }
  };
  useEffect(() => {
    handleColumnChange(grouping);
  }, [grouping]);

  const findColumn = (unique: string | null) => {
    if (!unique) {
      return null;
    }
    if (columns.some((c) => c.id === unique)) {
      return columns.find((c) => c.id === unique) ?? null;
    }
    const id = String(unique);
    const itemWithColumnId = columns.flatMap((c) => {
      const columnId = c.id;
      return c.cards.map((i) => ({ itemId: i.id, columnId: columnId }));
    });
    const columnId = itemWithColumnId.find((i) => i.itemId === id)?.columnId;
    return columns.find((c) => c.id === columnId) ?? null;
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over, delta } = event;
    const activeId = String(active.id);
    const overId = over ? String(over.id) : null;
    const activeColumn = findColumn(activeId);
    const overColumn = findColumn(overId);
    if (!activeColumn || !overColumn || activeColumn === overColumn) {
      return null;
    }
    setColumns((prevState) => {
      const activeItems = activeColumn.cards;
      const overItems = overColumn.cards;
      const activeIndex = activeItems.findIndex((i) => i.id === activeId);
      const overIndex = overItems.findIndex((i) => i.id === overId);
      const newIndex = () => {
        const putOnBelowLastItem =
          overIndex === overItems.length - 1 && delta.y > 0;
        const modifier = putOnBelowLastItem ? 1 : 0;
        return overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      };
      return prevState.map((c) => {
        if (c.id === activeColumn.id) {
          c.cards = activeItems.filter((i) => i.id !== activeId);
          return c;
        } else if (c.id === overColumn.id) {
          c.cards = [
            ...overItems.slice(0, newIndex()),
            activeItems[activeIndex],
            ...overItems.slice(newIndex(), overItems.length),
          ];
          return c;
        } else {
          return c;
        }
      });
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const activeId = String(active.id);
    const overId = over ? String(over.id) : null;
    const activeColumn = findColumn(activeId);
    const overColumn = findColumn(overId);
    if (!activeColumn || !overColumn || activeColumn !== overColumn) {
      return null;
    }
    const activeIndex = activeColumn.cards.findIndex((i) => i.id === activeId);
    const overIndex = overColumn.cards.findIndex((i) => i.id === overId);
    if (activeIndex !== overIndex) {
      setColumns((prevState) => {
        return prevState.map((column) => {
          if (column.id === activeColumn.id) {
            column.cards = arrayMove(overColumn.cards, activeIndex, overIndex);
            return column;
          } else {
            return column;
          }
        });
      });
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          padding: "20px",
          gap: "10px",
          overflow: "scroll",
        }}
      >
        {columns.map((column) => (
          <Column
            key={column.id}
            id={column.id}
            title={column.title}
            cards={column.cards}
          />
        ))}
      </div>
    </DndContext>
  );
}
