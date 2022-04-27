import { useDrag } from "react-dnd";
import { ItemType } from "./ItemType";

const styles = {
  position: "absolute",
  border: "1px dashed pink",
  backgroundColor: "white",
  padding: "0.5rem 1rem",
  cusor: "move",
};
export const Box = ({ id, left, top, hideSourceOnDrag, children }) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemType.BOX,
      item: { id, left, top },
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
      })
    }),
    [id, left, top]
  );

  if (hideSourceOnDrag && isDragging) {
    return <div ref={drag} />;
  }

  return (
    <div ref={drag} style={{ ...styles, left, top }}>
      {children}
    </div>
  );
};
