const header = () => {
  return (
    <div className="flex w-full">
      <div className="container mx-auto">
        <div className="flex bg-block my-5 px-[30px] py-[15px] align-middle">
          <a className="flex align-middle" href="/">
            <img src="/src/assets/Logo.svg" alt="Scribble Share Logo" />
          </a>
          <div className="flex w-full justify-end">
            <button>
              <img src="/src/assets/icons/header/Burger.svg" alt="Scribble Share Logo" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default header;
