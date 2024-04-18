import { MdModeEditOutline, MdDelete } from "react-icons/md";
import { motion as m } from "framer-motion";
import { useDispatch } from "react-redux";
import { deleteTodo, updateTodo } from "../Store/Slice/TodoSlice";
import { useEffect, useState } from "react";
import UpdateModal from "./UpdateModal";
import { toast } from "react-hot-toast";
import { BsCheckCircle, BsCheckCircleFill } from "react-icons/bs";

const style = {
  ico: "ico w-[40px] aspect-square grid place-content-center bg-indigo-700 text-xl text-neutral-50 rounded-full cursor-pointer hover:drop-shadow-glow   border-2 border-indigo-700 hover:border-2 hover:border-indigo-300 transition-all duration-300 ",
};

const Task = ({ task }) => {
  const [modalOpen, setModalOpen] = useState(false); //this state control the todo box popup and close
  const [checked, setChecked] = useState(false); //The checked state manages task completion status for rendering and interaction logic.
  const [title, setTitle] = useState("");//This line of code initializes a state variable named title with an empty string and a function setTitle to update its value.

  const dispatch = useDispatch(); //dispatch is used to send actions to the Redux store, enabling you to manage and update the application state in a predictable and centralized manner.

  
  // This useEffect updates the task title and checks/unchecks the task based on its completion status, triggered by changes in task.status or title.
  useEffect(() => {
    setTitle(task.task);
    if (task.status === "complete") {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [task.status, title]);

  //This handleCheck function toggles the task's completion status (setChecked(!checked)), updates the task in the Redux store with the new status, and displays a toast notification based on the task's status change.
  const handleCheck = () => {
    setChecked(!checked);
    dispatch(
      updateTodo({
        ...task,
        title,
        status: checked ? "incomplete" : "complete",
      })
    );
    if (task.status === "complete") {
      toast.error("Task Incompleted!");
    } else {
      toast.success("Task Completed!");
    }
  };

  //This priorityBorder function takes a data parameter and returns a border color class based on the value of data. If data is "high," it returns "border-red-500"; if it's "medium," it returns "border-orange-400"; otherwise, it returns "border-green-400".
  const priorityBorder = (data) => {
    if (data == "high") {
      return "border-red-500";
    } else if (data == "medium") {
      return "border-orange-400";
    } else {
      return "border-green-400";
    }
  };

  return (
    <>
      <m.div
        initial={{ opacity: 0, translateY: "-20px" }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ ease: "easeInOut", duration: 0.66 }}
        className={`task bg-gray-800 p-4 rounded-lg relative shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] flex flex-col justify-between border-l-[.5rem] ${priorityBorder(
          task.priority
        )}`}
      >
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2">
            <span
              className={`text-xs font-bold ${
                task.status === "complete" ? "text-green-400" : "text-red-400"
              }`}
            >
              {task.status}
            </span>

            <span className={`text-xs text-gray-400 `}>
              {task.date}, {task.time}
            </span>
          </div>
          <h5
            className={`text-2xl mb-12 capitalize ${
              task.status === "complete" ? "line-through" : "" 
            }`}
          >
            {task.task}
          </h5>
        </div>

        <div className="footer flex flex-row items-center gap-2 justify-between">
          <span className={`text-xs uppercase opacity-60`}>
            {task.priority}
          </span>

          {/* This block of code creates a clickable edit icon <MdModeEditOutline/> that sets the modalOpen state to true when clicked, opening an edit modal for the task. */}
          <div className="flex flex-row items-center gap-2">
            <div
              className={style.ico}
              onClick={() => {
                setModalOpen(true);
              }}
            >
              <MdModeEditOutline />
            </div>

            {/* This block of code creates a clickable delete icon MdDelete  that triggers the deletion of a todo item when clicked, showing a "Removed" error toast. */}
            <div
              className={style.ico}
              onClick={() => {
                dispatch(deleteTodo(task.id));
                toast.error("Removed");
              }}
            >
              <MdDelete />
            </div>

            {/* This code creates a clickable circle icon that changes appearance based on the task's completion status and triggers the handleCheck function when clicked */}
            <div
              className={`ico w-[40px] aspect-square grid place-content-center ${
                task.status === "complete" ? "bg-white" : "bg-indigo-700"
              } text-xl text-neutral-50 rounded-full cursor-pointer hover:drop-shadow-glow   border-2 border-indigo-700 hover:border-2 hover:border-indigo-300 transition-all duration-300 `}
              onClick={handleCheck}
            >
              {task.status === "incomplete" ? (
                <BsCheckCircle/>
              ) : (
                <BsCheckCircleFill className="text-indigo-600" />
              )}
            </div>
          </div>
        </div>
      </m.div>
      <UpdateModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        todo={task}
      />
    </>
  );
};

export default Task;
