import React, { useState } from "react";
import Item from "./Items";
import DropWrapper from "./DropWrapper";
import Col from "./Col";
import { data, statuses } from "../data/data";

const Homepage = () => {
  const [items, setItems] = useState(data);

  const onDrop = (item, monitor, status) => {
    setItems((prevState) => {
      const newItems = prevState
        .filter((i) => i.id !== item.id)
        .concat({ ...item, status });
      return [...newItems];
    });
  };

  const moveItem = (dragIndex, hoverIndex) => {
    const item = items[dragIndex];
    setItems((prevState) => {
      const newItems = prevState.filter((i, idx) => idx !== dragIndex);
      newItems.splice(hoverIndex, 0, item);
      return [...newItems];
    });
  };

  return (
    <div className={"row"}>
      {statuses.map((s) => {
        return (
          <div key={s.status} className={"col-wrapper"}>
            <h4 className={"col-header"}>{s.status.toUpperCase}</h4>
            <DropWrapper onDrop={onDrop} status={s.status}>
              <Col>
                {items
                  .filter((i) => i.status === s.status)
                  .map((i, idx) => (
                    <Item
                      key={i.id}
                      item={i}
                      index={idx}
                      moveItem={moveItem}
                      status={s}
                    />
                  ))}
              </Col>
            </DropWrapper>
          </div>
        );
      })}
    </div>
  );
};

export default Homepage;
