import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const API_BASE = "http://localhost:5000";

export function useFetchTasks() {
  const queryClient = useQueryClient();
  const userName = sessionStorage.getItem("userName");

  const { data = { todo: [], progress: [], review: [], done: [] }, isLoading } =
    useQuery({
      queryKey: ["tasks", userName],
      queryFn: async () => {
        const [todo, progress, review, done] = await Promise.all([
          fetch(`${API_BASE}/todo?userName=${userName}`).then((res) =>
            res.json()
          ),
          fetch(`${API_BASE}/progress?userName=${userName}`).then((res) =>
            res.json()
          ),
          fetch(`${API_BASE}/review?userName=${userName}`).then((res) =>
            res.json()
          ),
          fetch(`${API_BASE}/done?userName=${userName}`).then((res) =>
            res.json()
          ),
        ]);
        return { todo, progress, review, done };
      },
      enabled: !!userName,
    });

  const addData = useMutation({
    mutationFn: async ({ col, item }) => {
      const newItem = { ...item, id: crypto.randomUUID(), userName };
      await fetch(`${API_BASE}/${col}`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });
      return { col, newItem };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", userName] });
    },
  });

  const editData = useMutation({
    mutationFn: async ({ col, id, item }) => {
      await fetch(`${API_BASE}/${col}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...item, id }),
      });
      return { col, id, item };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", userName] });
    },
  });

  const deleteData = useMutation({
    mutationFn: async ({ col, id }) => {
      await fetch(`${API_BASE}/${col}/${id}`, { method: "DELETE" });
      return { col, id };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", userName] });
    },
  });

  const clearAll = useMutation({
    mutationFn: async () => {
      const cols = ["todo", "progress", "review", "done"];
      for (const col of cols) {
        const res = await fetch(`${API_BASE}/${col}?userName=${userName}`);
        const items = await res.json();
        await Promise.all(
          items.map((item) =>
            fetch(`${API_BASE}/${col}/${item.id}`, { method: "DELETE" })
          )
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", userName] });
    },
  });

  const onDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceCol = source.droppableId;
    const destCol = destination.droppableId;

    const sourceItems = [...data[sourceCol]];
    const [moved] = sourceItems.splice(source.index, 1);

    if (sourceCol === destCol) {
      editData.mutate({
        col: sourceCol,
        id: moved.id,
        item: { ...moved, order: destination.index, userName },
      });
    } else {
      deleteData.mutate({ col: sourceCol, id: moved.id });
      addData.mutate({ col: destCol, item: moved });
    }
  };

  return {
    data,
    isLoading,
    addData,
    editData,
    deleteData,
    clearAll,
    onDragEnd,
  };
}
