import { useEffect, useState } from "react";
import AddButton from "./Components/AddButton";
import Header from "./Components/Header";
import TodoModal from "./Components/TodoModal";
import { Toaster } from "react-hot-toast";

import { useSelector } from "react-redux";
import Task from "./Components/Task";
import SmallAddBtn from "./Components/SmallAddBtn";
import Footer from "./Components/Footer";

const App = () => {
  const [modalOpen, setModalOpen] = useState(false);

  //this items v is a variable that holds the list of to-do items obtained from the Redux store's todoList.
  const items = useSelector((state) => state.todo.todoList);
  const [sticky, setSticky] = useState(false);

  // The useEffect hook adds a scroll event listener to track the user's scrolling position, which then updates the sticky state. This enables the conditional rendering of the sticky "Add" button (SmallAddBtn). As the user scrolls, the todo add button remains sticky at the bottom of the page.
  useEffect(() => {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 300) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    });
  }, []);

  return (
    <>
     {/* If sticky is true, render the <SmallAddBtn> component with the setModalOpen prop; otherwise, don't render it.*/}
      {sticky && <SmallAddBtn setModalOpen={setModalOpen} />}
      <Header />
      <div className="h-full min-h-[calc(100vh_-_180px)]">
        <div className="container p-2 mt-6 grid grid-cols-1 md:grid-cols-3  max-w-[1300px] mx-auto  gap-8 w-full ">
          <AddButton setModalOpen={setModalOpen} />
        {/* "Map through items array, creating <Task> component for each element (elem), passing elem as task prop and index as unique key for React's list rendering optimization." */}
          {items.map((elem, index) => (
            <Task task={elem} key={index} />
          ))}
        </div>
      </div>
      <Footer />
      <TodoModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      {/*  To use the Toaster for notifications when adding a todo or deleting a todo also editing a todo, users can see notifications displayed on the right side, imported at the top, using React Hot Toast.*/}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontSize: "1rem",
            zIndex: 9999,
          },
        }}
      />
    </>
  );
};

export default App;
