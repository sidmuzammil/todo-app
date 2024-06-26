import { AiOutlinePlus } from "react-icons/ai";
import { motion as m } from "framer-motion"; // framermotion for animation

const SmallAddBtn = ({ setModalOpen }) => {
  return (
    <m.div
      initial={{ opacity: 0, translateX: "-150px" }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ ease: "easeInOut", duration: 0.85 }}
      className={
        "fixed bottom-[2rem] left-[1rem] lg:left-[1.5rem]  w-[80px] aspect-square bg-indigo-600 grid place-content-center rounded-full cursor-pointer hover:drop-shadow-glow   border-2 border-indigo-700 hover:border-2 hover:border-indigo-300 transition-all duration-300 z-[999] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]"
      }
      onClick={() => setModalOpen(true)}
    >
      {/* icon imported from rect-icons */}
      <AiOutlinePlus className={"text-xl "} />
    </m.div>
  );
};

export default SmallAddBtn;
