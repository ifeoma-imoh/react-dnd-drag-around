import { useState } from "react";
import { useDrop } from "react-dnd";
import { ItemType } from "./ItemType";
import { Box } from "./Box";

const styles = {
  width: 400,
  height: 400,
  border: "1px solid black",
  position: "relative",
};

export const Container = ({ hideSourceOnDrag }) => {
  const [boxes, setBoxes] = useState({
    a: { top: 20, left: 80, title: "You can drag me around oh" },
    b: { top: 180, left: 20, title: "Meee too! Please drag me around.." },
  });

  const moveBox = (id, top, left) => {
    setBoxes({ ...boxes, [id]: { ...boxes[id], left, top } });
  };
  const [, drop] = useDrop(
    () => ({
      accept: ItemType.BOX,
      drop(item, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset();
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        moveBox(item.id, top, left);
      },
    }),
    [moveBox]
  );
  return (
    <div ref={drop} style={styles}>
      {Object.keys(boxes).map((key) => {
        const { left, top, title } = boxes[key];
        return (
          <Box
            key={key}
            id={key}
            left={left}
            top={top}
            hideSourceOnDrag={hideSourceOnDrag}
          >
            {title}
          </Box>
        );
      })}
    </div>
  );
};
