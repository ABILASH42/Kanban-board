import React, { useEffect, useRef, useState ,memo } from "react";
import useClickOutside from "../hooks/useClickOutside";

function Card(props) {
  const [isEditing, setEditing] = useState(false);
  let [item, setitem] = useState({
    title: props.title,
    discription: props.discription,
  });

  const isEditingRef = useRef();
  const cardRef = useRef();
  const itemRef = useRef();

  function inputchange(e) {
    let { value, name } = e.target;
    setitem((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  useEffect(() => {
    isEditingRef.current = isEditing;
  }, [isEditing]);

  useEffect(() => {
    itemRef.current = item;
  }, [item]);

  useEffect(() => {
    if (isEditing.current) {
      cardRef.current.querySelector('input[name="title"]')?.focus();
    }
  }, [isEditing]);

  useClickOutside(cardRef, () => {
    if (isEditingRef) {
      setEditing(false);
      props.editData(props.col, props.id, itemRef.current);
    }
  });

  return (
    <div
      className="bg-white rounded-xl  p-4 my-2 mx-4 shadow-md w-11/12 relative "
      onDoubleClick={() => setEditing(true)}
      ref={cardRef}
    >
      <div className="absolute top-2 right-2">
        <button
          onClick={() => {
            props.deleteData(props.col, props.id);
          }}
          className="cursor-pointer"
        >
          <img className="w-4" src="/img/delete.png" alt="del" />
        </button>
      </div>
      {isEditing ? (
        <>
          <input
            name="title"
            type="text"
            onChange={inputchange}
            value={item.title}
            className="outline-0 h-7  font-bold text-lg w-9/10"
          />
          <input
            onChange={inputchange}
            name="discription"
            type="text"
            placeholder="Discription"
            className="outline-0 text-gray-600 w-9/10"
            value={item.discription}
          />
        </>
      ) : (
        <>
          <h1 className="font-bold text-lg break-words w-9/10">{item.title}</h1>
          <p className="text-gray-600 break-words w-9/10">{item.discription}</p>
        </>
      )}
    </div>
  );
}

export default memo(Card);
