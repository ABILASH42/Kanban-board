import React, { useRef, useState, useEffect } from "react";
import useClickOutside from "../hooks/useClickOutside";

function Form(props) {
  let [item, setitem] = useState({
    title: "",
    discription: "",
  });

  const formRef = useRef();
  const itemRef = useRef();
  const titleRef = useRef();

  function inputchange(e) {
    let { value, name } = e.target;
    setitem((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  useEffect(() => {
    itemRef.current = item;
  }, [item]);

  function submit() {
    if (itemRef.current.title !== "" || itemRef.current.discription !== "") {
      props.addData(props.col, itemRef.current);
      setitem({ title: "", discription: "" });
    }
    props.formClose();
  }

  useClickOutside(formRef, () => {
    submit();
  });

  return (
    <div
      tabIndex={-1}
      ref={formRef}
      className="bg-white dark:bg-gray-800 flex flex-col justify-center items-start w-11/12 rounded-xl shadow-md  p-4 m-2"
    >
      <input
        ref={titleRef}
        onChange={inputchange}
        name="title"
        type="text"
        placeholder="Task..."
        className="dark:text-white outline-0 h-7 w-full font-bold text-lg "
        value={item.title}
      />
      <textarea
        onChange={inputchange}
        name="discription"
        type="text"
        placeholder="Discription"
        className="dark:text-white outline-0 w-full text-gray-600  break-words"
        value={item.discription}
      />
    </div>
  );
}

export default Form;
