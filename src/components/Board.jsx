import React, { useEffect } from "react";
import Columns from "./Columns";
import { DragDropContext } from "@hello-pangea/dnd";
import { useTasks } from "../hooks/useTasks";
import UserInfo from "./UserInfo";

function App() {
  const { data, addData, deleteData, editData, clearAll, onDragEnd } =
    useTasks();
  useEffect(() => {
    const storedMode = sessionStorage.getItem("darkMode");
    if (storedMode === "true") {
      document.documentElement.classList.add("dark");
    }
  }, []);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <UserInfo />

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
