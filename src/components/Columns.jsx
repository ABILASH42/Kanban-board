import React, { useState ,memo } from "react";
import Card from "./Card";
import Form from "./Form";
import { Droppable, Draggable } from "@hello-pangea/dnd";

function Columns(props) {
  const [show, setShow] = useState(false);

  function formClose() {
    setShow((prev) => !prev);
  }

  return (
    <section className="flex flex-col justify-start items-center gap-3 relative">
      <div className="flex justify-start items-start w-9/10 gap-3">
        <h1 className="text-xl font-bold dark:text-white text-gray-500">{props.name}</h1>
        <div className="bg-white dark:bg-gray-600 rounded-2xl w-10 flex justify-center items-center">
          <p className="font-bold dark:text-white">{props.data.length}</p>
        </div>
      </div>
      <button
        onClick={formClose}
        className="w-9/10 h-11 dark:text-white text-blue-500 font-bold  border-gray-300 border rounded-sm hover:bg-blue-500 hover:text-white shadow dark:hover:bg-white dark:hover:text-black"
      >
        + Add New Task
      </button>
      {show && (
        <Form col={props.col} addData={props.addData} formClose={formClose} />
      )}

      <Droppable droppableId={props.col}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="h-lvh w-full"
          >
            {props.data.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Card
                      key={item.id}
                      id={item.id}
                      col={props.col}
                      title={item.title}
                      discription={item.discription}
                      deleteData={props.deleteData}
                      editData={props.editData}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </section>
  );
}

export default memo(Columns);
