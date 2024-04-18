//main header section running in here

const style = {
  container:
    "flex flex-row items-center justify-between px-2 py-4 gap-6  max-w-[1300px] mx-auto",
};

const Header = () => {
  return (
    <header className={"border-b-2 border-indigo-500 stickyHeader"}>
      <div className={style.container}>
        <h1 className={"text-base md:text-2xl font-semibold whitespace-nowrap mx-auto"}>
          Todo Manager
        </h1>
      </div>
    </header>
  );
};

export default Header;
