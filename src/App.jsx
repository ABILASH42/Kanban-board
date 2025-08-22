// import React, { useEffect, useState, useCallback } from "react";
// import Columns from "./components/Columns";
// import { DragDropContext } from "@hello-pangea/dnd";

// function App() {
//   const [data, setData] = useState({
//     todo: [],
//     progress: [],
//     review: [],
//     done: [],
//   });


//   useEffect(() => {
//     const fetchData = async () => {
//       const [todo, progress, review, done] = await Promise.all([
//         fetch("http://localhost:5000/todo").then((res) => res.json()),
//         fetch("http://localhost:5000/progress").then((res) => res.json()),
//         fetch("http://localhost:5000/review").then((res) => res.json()),
//         fetch("http://localhost:5000/done").then((res) => res.json()),
//       ]);
//       setData({ todo, progress, review, done });
//     };
//     fetchData();
//   }, []);

 
//   const addData = useCallback(async (col, item) => {
//     const newItem = { ...item, id: crypto.randomUUID() };
//     setData((prev) => ({ ...prev, [col]: [...prev[col], newItem] }));

//     await fetch(`http://localhost:5000/${col}`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(newItem),
//     });
//   }, []);


//   const deleteData = useCallback(async (col, id) => {
//     setData((prev) => ({
//       ...prev,
//       [col]: prev[col].filter((item) => item.id !== id),
//     }));

//     await fetch(`http://localhost:5000/${col}/${id}`, {
//       method: "DELETE",
//     });
//   }, []);


//   const editData = useCallback(async (col, id, item) => {
//     setData((prev) => {
//       const updatedArray = prev[col].map((task) =>
//         task.id === id ? { ...item, id } : task
//       );
//       return { ...prev, [col]: updatedArray };
//     });

//     await fetch(`http://localhost:5000/${col}/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ ...item, id }),
//     });
//   }, []);

//   const clearAll = async () => {
//     const emptyData = { todo: [], progress: [], review: [], done: [] };

//     for (const col of Object.keys(emptyData)) {
//       await fetch(`http://localhost:5000/${col}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify([]), 
//       });
//     }

//     setData(emptyData);
//   };


//   const onDragEnd = async (result) => {
//     const { source, destination } = result;
//     if (!destination) return;

//     const sourceCol = source.droppableId;
//     const destinationCol = destination.droppableId;

//     if (sourceCol === destinationCol && source.index === destination.index)
//       return;

//     const sourceItems = Array.from(data[sourceCol]);
//     const [movedItem] = sourceItems.splice(source.index, 1);

//     if (sourceCol === destinationCol) {
//       sourceItems.splice(destination.index, 0, movedItem);
//       setData((prev) => ({ ...prev, [sourceCol]: sourceItems }));
//       const currentItems = data[sourceCol];
//       await Promise.all(
//         currentItems.map((item) =>
//           fetch(`http://localhost:5000/${sourceCol}/${item.id}`, {
//             method: "DELETE",
//           })
//         )
//       );
//       await Promise.all(
//         sourceItems.map((item) =>
//           fetch(`http://localhost:5000/${sourceCol}`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(item),
//           })
//         )
//       );
//     } else {
//       const destinationItems = Array.from(data[destinationCol]);
//       destinationItems.splice(destination.index, 0, movedItem);

//       setData((prev) => ({
//         ...prev,
//         [sourceCol]: sourceItems,
//         [destinationCol]: destinationItems,
//       }));

//       await fetch(`http://localhost:5000/${sourceCol}/${movedItem.id}`, {
//         method: "DELETE",
//       });

//       await fetch(`http://localhost:5000/${destinationCol}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(movedItem),
//       });
//     }
//   };

//   return (
//     <DragDropContext onDragEnd={onDragEnd}>
//       <div className="md:grid md:grid-cols-4 p-10 gap-4">
//         {["todo", "progress", "review", "done"].map((col) => (
//           <Columns
//             key={col}
//             name={
//               col === "todo"
//                 ? "To DO"
//                 : col === "progress"
//                 ? "In progress"
//                 : col === "review"
//                 ? "Need Review"
//                 : "Done"
//             }
//             col={col}
//             addData={addData}
//             data={data[col] || []}
//             deleteData={deleteData}
//             editData={editData}
//           />
//         ))}
//         <button
//           onClick={clearAll}
//           className="bg-red-600 bottom-5 right-5 h-15 w-35 rounded-xl text-white hover:scale-110 fixed"
//         >
//           Clear ALL
//         </button>
//       </div>
//     </DragDropContext>
//   );
// }

// export default App;



import React from "react";
import Columns from "./components/Columns";
import { DragDropContext } from "@hello-pangea/dnd";
import { useTasks } from "./hooks/useTasks";
import ToggleDarkModeButton from "./components/ToggleDarkModeButton"

function App() {
  const { data, addData, deleteData, editData, clearAll, onDragEnd } = useTasks();

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <ToggleDarkModeButton/>
      <div className="md:grid md:grid-cols-4 p-10 gap-4">
        {["todo", "progress", "review", "done"].map((col) => (
          <Columns
            key={col}
            name={
              col === "todo"
                ? "To Do"
                : col === "progress"
                ? "In Progress"
                : col === "review"
                ? "Need Review"
                : "Done"
            }
            col={col}
            addData={addData}
            data={data[col] || []}
            deleteData={deleteData}
            editData={editData}
          />
        ))}
        <button
          onClick={clearAll}
          className="bg-red-600 bottom-5 right-5 h-15 w-35 rounded-xl text-white hover:scale-110 fixed"
        >
          Clear ALL
        </button>
      </div>
    </DragDropContext>
  );
}

export default App;
