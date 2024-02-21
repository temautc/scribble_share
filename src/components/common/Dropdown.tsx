import { useState, useEffect, useRef } from "react";

interface DropdownProps {
  title: string;
  arrayData: any[];
  selectDropdownDate: Function;
}

const dropdown = ({ title, arrayData, selectDropdownDate }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedData, setSelectedData] = useState(title);

  const changeState = () => {
    setIsOpen((open) => !open);
  };

  const dropdownRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("click", closeDropdownOutsideClick);
    }
    return () => {
      window.removeEventListener("click", closeDropdownOutsideClick);
    };
  }, [isOpen]);

  const closeDropdownOutsideClick = (event: any) => {
    if (!dropdownRef.current) {
      return 0;
    }
    if (!dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const selectData = (data: string) => {
    selectDropdownDate(data);
    setSelectedData(data);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <h1
        onClick={() => changeState()}
        className="text-[#0861E1] cursor-pointer"
      >
        {selectedData}
      </h1>
      <div className="absolute flex gap-x-1 z-10">
        <ol
          className={`${
            isOpen ? "flex" : "hidden"
          } flex flex-col h-fit bg-block min-w-[150px] w-full py-2 mt-2 gap-y-2`}
        >
          {arrayData.map((data, index) => (
            <li
              onClick={() => {
                selectData(data);
              }}
              key={index}
              className="px-3 py-1 hover:bg-[#EDEEF3] cursor-pointer"
            >
              {data}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default dropdown;
