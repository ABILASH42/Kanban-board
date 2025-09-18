import { useState, useEffect, useCallback } from "react";

const API_BASE = "http://localhost:5000";

export function useTasks() {
  const userName = sessionStorage.getItem("userName");

  const [data, setData] = useState({
    todo: [],
    progress: [],
    review: [],
    done: [],
  });

  
  useEffect(() => {
    const fetchData = async () => {
      const [todo, progress, review, done] = await Promise.all([
        fetch(`${API_BASE}/todo?userName=${userName}`).then((res) => res.json()),
        fetch(`${API_BASE}/progress?userName=${userName}`).then((res) => res.json()),
        fetch(`${API_BASE}/review?userName=${userName}`).then((res) => res.json()),
        fetch(`${API_BASE}/done?userName=${userName}`).then((res) => res.json()),
      ]);
      setData({ todo, progress, review, done });
    };
    fetchData();
  }, []);

  const addData = useCallback(async (col, item) => {
    const newItem = { ...item, id: crypto.randomUUID() ,userName:userName };
    setData((prev) => ({ ...prev, [col]: [...prev[col], newItem] }));

    await fetch(`${API_BASE}/${col}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    });
  }, []);

  const deleteData = useCallback(async (col, id) => {
    setData((prev) => ({
      ...prev,
      [col]: prev[col].filter((item) => item.id !== id),
    }));

    await fetch(`${API_BASE}/${col}/${id}`, {
      method: "DELETE",
    });
  }, []);


  const editData = useCallback(async (col, id, item) => {
    setData((prev) => {
      const updatedArray = prev[col].map((task) =>
        task.id === id ? { ...item, id } : task
      );
      return { ...prev, [col]: updatedArray };
    });

    await fetch(`${API_BASE}/${col}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...item, id }),
    });
  }, []);


  const clearAll = async () => {
  const cols = ["todo", "progress", "review", "done"];

  for (const col of cols) {
    const res = await fetch(`${API_BASE}/${col}?userName=${userName}`);
    const items = await res.json();

    await Promise.all(
      items.map(item =>
        fetch(`${API_BASE}/${col}/${item.id}`, {
          method: "DELETE",
        })
      )
    );
  }

  setData({ todo: [], progress: [], review: [], done: [] });
};




  // const onDragEnd = useCallback(
  //   async (result) => {
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
  //           fetch(`${API_BASE}/${sourceCol}/${item.id}`, { method: "DELETE" })
  //         )
  //       );
  //       await Promise.all(
  //         sourceItems.map((item) =>
  //           fetch(`${API_BASE}/${sourceCol}`, {
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

  //       await fetch(`${API_BASE}/${sourceCol}/${movedItem.id}`, {
  //         method: "DELETE",
  //       });

  //       await fetch(`${API_BASE}/${destinationCol}`, {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(movedItem),
  //       });
  //     }
  //   },
  //   [data]
  // );


  const onDragEnd = useCallback(
  async (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceCol = source.droppableId;
    const destinationCol = destination.droppableId;

    if (sourceCol === destinationCol && source.index === destination.index) return;

    const sourceItems = Array.from(data[sourceCol]);
    const [movedItem] = sourceItems.splice(source.index, 1);

    if (sourceCol === destinationCol) {
      sourceItems.splice(destination.index, 0, movedItem);
      setData((prev) => ({ ...prev, [sourceCol]: sourceItems }));

      await fetch(`${API_BASE}/${sourceCol}/${movedItem.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...movedItem, order: destination.index, userName }),
      });
    } else {

      const destinationItems = Array.from(data[destinationCol]);
      destinationItems.splice(destination.index, 0, movedItem);

      setData((prev) => ({
        ...prev,
        [sourceCol]: sourceItems,
        [destinationCol]: destinationItems,
      }));

      await fetch(`${API_BASE}/${sourceCol}/${movedItem.id}`, {
        method: "DELETE",
      });

      await fetch(`${API_BASE}/${destinationCol}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...movedItem, userName }),
      });
    }
  },
  [data, userName]
);

  return { data, addData, deleteData, editData, clearAll, onDragEnd };
}
