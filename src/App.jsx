import React, { useEffect, useState ,useCallback} from "react";
import Columns from "./components/Columns";
import { DragDropContext } from "@hello-pangea/dnd";

function App() {
  let [data, setdata] = useState(() => {
    const prevData = localStorage.getItem("prevData");
    return prevData
      ? JSON.parse(prevData)
      : {
          todo: [],
          progress: [],
          review: [],
          done: [],
        };
  });


  useEffect(() => {
    localStorage.setItem("prevData", JSON.stringify(data));
  }, [data]);

  function clearAll() {
    const emptyState = {
      todo: [],
      progress: [],
      review: [],
      done: [],
    };
    setdata(emptyState);
    localStorage.removeItem("prevData");
  }

  const addData = useCallback((col, item) => {
  setdata((prev) => ({
    ...prev,
    [col]: [...(prev[col] || []), { ...item, id: crypto.randomUUID() }],
  }));
  }, []);

  const deleteData = useCallback((col, id) => {
  setdata((prev) => ({
    ...prev,
    [col]: (prev[col] || []).filter((item) => item.id !== id),
  }));
}, []);

const editData = useCallback((col, id, item) => {
  setdata((prev) => {
    let updatedArray = (prev[col] || []).map((task) =>
      task.id === id ? { ...item, id } : task
    );
    return {
      ...prev,
      [col]: updatedArray,
    };
  });
}, []);

  

  function onDragEnd(result) {
    const { source, destination } = result;

    if (!destination) return;

    const sourceCol = source.droppableId;
    const destinationCol = destination.droppableId;

    if (sourceCol === destinationCol && source.index === destination.index)
      return;

    const sourceItems = Array.from(data[sourceCol]);
    const [moveItem] = sourceItems.splice(source.index, 1);

    if (sourceCol === destinationCol) {
      sourceItems.splice(destination.index, 0, moveItem);
      setdata((prev) => ({
        ...prev,
        [sourceCol]: sourceItems,
      }));
    } else {
      const destinationItems = Array.from(data[destinationCol]);
      destinationItems.splice(destination.index, 0, moveItem);
      setdata((prev) => ({
        ...pre,
        [sourceCol]: sourceItems,
        [destinationCol]: destinationItems,
      }));
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="md:grid md:grid-cols-4 p-10 gap-4">
        <Columns
          name="To DO"
          col="todo"
          addData={addData}
          data={data["todo"] || []}
          deleteData={deleteData}
          editData={editData}
        />
        <Columns
          name="In progrss"
          col="progress"
          addData={addData}
          data={data["progress"] || []}
          deleteData={deleteData}
          editData={editData}
        />
        <Columns
          name="Need Review"
          col="review"
          addData={addData}
          data={data["review"] || []}
          deleteData={deleteData}
          editData={editData}
        />
        <Columns
          name="Done"
          col="done"
          addData={addData}
          data={data["done"] || []}
          deleteData={deleteData}
          editData={editData}
        />
        <button
          onClick={clearAll}
          className="bg-red-600  bottom-5 right-5 h-15 w-35 rounded-xl text-white hover:scale-110 fixed"
        >
          Clear ALL
        </button>
      </div>
    </DragDropContext>
  );
}

export default App;
