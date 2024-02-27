type TodoEventsValue = {
  todo: {
    id: string;
    timeBegin: string;
    timeEnd: string;
    title: string;
    description: string;
  };
};

const DescriptionBlock = ({ todo }: TodoEventsValue) => {
  return (
    <div className="flex bg-block">
      <div className="flex flex-col justify-center items-center font-bold text-center py-[10px] px-[15px] rounded-l-[14px] text-[#0861E1] bg-[#E7EFFB] border-solid border-[#EDEEF3] border-r-2">
        <p className="font-normal">{todo.timeBegin}</p>
        <span className="h-[1px] text-[20px] bg-[#0861E1] w-5 my-[5px]"></span>
        <p className="font-normal">{todo.timeEnd}</p>
      </div>
      <div className="flex flex-col p-4 gap-y-2">
        <h2 className="font-bold text-[20px] ">{todo.title}</h2>
        <p className="text-[15px]  overflow-hidden whitespace-nowrap w-[197px] text-ellipsis">
          {todo.description}
        </p>
      </div>
      <div className="flex ml-auto mr-[30px] items-center">
        <button className="hover:fill-slate-950">
          <svg
            className="hover:fill-black"
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="#7A8697"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4 15.9233C4 14.8241 4.89544 13.9329 6 13.9329H42C43.1046 13.9329 44 14.8241 44 15.9233C44 17.0226 43.1046 17.9138 42 17.9138H6C4.89544 17.9138 4 17.0226 4 15.9233Z" />
            <path d="M4 23.885C4 22.7857 4.89544 21.8946 6 21.8946H42C43.1046 21.8946 44 22.7857 44 23.885C44 24.9843 43.1046 25.8754 42 25.8754H6C4.89544 25.8754 4 24.9843 4 23.885Z" />
            <path d="M6 29.8562C4.89544 29.8562 4 30.7473 4 31.8466C4 32.946 4.89544 33.8371 6 33.8371H30C31.1046 33.8371 32 32.946 32 31.8466C32 30.7473 31.1046 29.8562 30 29.8562H6Z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default DescriptionBlock;
