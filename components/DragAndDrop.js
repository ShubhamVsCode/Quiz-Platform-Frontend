// import { createStyles, Text } from "@mantine/core";
// import { useListState } from "@mantine/hooks";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// const useStyles = createStyles((theme) => ({
//   item: {
//     ...theme.fn.focusStyles(),
//     display: "flex",
//     alignItems: "center",
//     borderRadius: theme.radius.md,
//     border: `1px solid ${
//       theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
//     }`,
//     padding: `${theme.spacing.sm}px ${theme.spacing.xl}px`,
//     backgroundColor:
//       theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.white,
//     marginBottom: theme.spacing.sm,
//   },

//   itemDragging: {
//     boxShadow: theme.shadows.sm,
//   },

//   symbol: {
//     fontSize: 30,
//     fontWeight: 700,
//     width: 60,
//   },
// }));

// export function DndList({ data }) {
//   const { classes, cx } = useStyles();
//   const [state, handlers] = useListState(data);

//   const items = state.map((item, index) => (
//     <Draggable key={item.symbol} index={index} draggableId={item.symbol}>
//       {(provided, snapshot) => (
//         <div
//           className={cx(classes.item, {
//             [classes.itemDragging]: snapshot.isDragging,
//           })}
//           {...provided.draggableProps}
//           {...provided.dragHandleProps}
//           ref={provided.innerRef}
//         >
//           <Text className={classes.symbol}>{item.symbol}</Text>
//           <div>
//             <Text>{item.name}</Text>
//             <Text color="dimmed" size="sm">
//               Position: {item.position} • Mass: {item.mass}
//             </Text>
//           </div>
//         </div>
//       )}
//     </Draggable>
//   ));

//   return (
//     <DragDropContext
//       onDragEnd={({ destination, source }) =>
//         handlers.reorder({ from: source.index, to: destination?.index || 0 })
//       }
//     >
//       <Droppable droppableId="dnd-list" direction="vertical">
//         {(provided) => (
//           <div {...provided.droppableProps} ref={provided.innerRef}>
//             {items}
//             {provided.placeholder}
//           </div>
//         )}
//       </Droppable>
//     </DragDropContext>
//   );
// }

import React from "react";

const DragAndDrop = ({ options }) => {
  const handleOnDragEnd = (result) => {
    if (!result?.destination) return;

    const tasks = [...todos];

    const [reorderedItem] = tasks.splice(result.source.index, 1);

    tasks.splice(result.destination.index, 0, reorderedItem);

    const idsOrderArray = tasks.map((task) => task.id);
    localStorage.setItem("taskOrder", JSON.stringify(idsOrderArray));

    updateTodos(tasks);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="todos">
        {(provided) => (
          <section {...provided.droppableProps} ref={provided.innerRef}>
            {options.map((opt, index) => {
              return (
                <Draggable
                  key={index}
                  draggableId={index.toString()}
                  index={index}
                >
                  {(provided) => (
                    <article
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <>
                        <div className="flex justify-between">
                          <p
                            className={`${
                              opt.is_correct && "text-green-600"
                            } duration-500 font-semibold`}
                          >
                            {optionName.at(i)}.
                          </p>
                          <Checkbox
                            label="Correct Option"
                            checked={opt.is_correct}
                            onChange={(e) => handleChange(e, i)}
                            color="green"
                          />
                        </div>
                        <div className="relative">
                          <TextBox
                            id={`rte-option-${i}`}
                            name="option"
                            className={`${
                              opt.is_correct && "bg-green-200"
                            } duration-500`}
                            value={options[i].option_text}
                            onChange={(value) =>
                              setOptions((prev) => {
                                prev[i].option_text = value;
                                return [...prev];
                              })
                            }
                          />
                          <button
                            onClick={() => deleteOption(i)}
                            className="absolute hover:text-red-600 -right-8 bottom-0"
                          >
                            <ArchiveBoxXMarkIcon className="w-6" />
                          </button>
                        </div>
                      </>
                    </article>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </section>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DragAndDrop;
