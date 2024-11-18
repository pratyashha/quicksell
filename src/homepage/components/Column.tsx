import "./column.css";
import { FC, useEffect, useState } from "react";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import Card, { CardType } from "./Card";
import { usePreferences } from "../../providers/PreferencesProvider";
import { AddIcon, ThreeDotMenuIcon } from "../../assets/_index";

export type ColumnType = {
  id: string;
  title: string;
  cards: CardType[];
};

const Column: FC<ColumnType> = ({ id, title, cards }) => {
  const [sortedCards, setSortedCards] = useState<CardType[]>(cards);
  const { ordering } = usePreferences();
  const { setNodeRef } = useDroppable({ id: id });
  const itemIds = cards.map((card) => card.id);

  useEffect(() => {
    if (ordering === "priority") {
      const sorting = cards.sort((a, b) => (b.priority > a.priority ? 1 : -1));
      setSortedCards(() => sorting);
    } else {
      const sorting = cards.sort((a, b) => a.title.localeCompare(b.title));
      return setSortedCards(() =>
        // Convert the id and userId to string to avoid errors
        sorting.map((card) => ({
          ...card,
          id: card.id.toString(),
          userId: card.userId.toString(),
        }))
      );
    }
  }, [ordering, cards]);

  return (
    <SortableContext id={id} items={itemIds} strategy={rectSortingStrategy}>
      <div
        ref={setNodeRef}
        style={{
          minWidth: "350px",
        }}
      >
        <div className="ColumnHeader">
          <div className="ColumnName">{title}</div>
          <div className="ColumnMenu">
            <ThreeDotMenuIcon />
            <AddIcon />
          </div>
        </div>
        {sortedCards.map((card) => (
          <Card key={card.id} {...card} />
        ))}
      </div>
    </SortableContext>
  );
};

export default Column;
