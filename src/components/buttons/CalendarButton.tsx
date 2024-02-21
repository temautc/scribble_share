type CalendarButtonProps = {
  indexDay: string,
  day: number,
  hasNotes: boolean,
  selectDay: Function,
  indexSelectedDay: string,
  isCurrentMonth: boolean,
}

const CalendarButton = ({
  indexDay,
  day,
  hasNotes,
  selectDay,
  indexSelectedDay,
  isCurrentMonth,
}: CalendarButtonProps) => {
  const checkSelected = (index: string) => {
    return indexSelectedDay === index;
  };

  return (
    <button
      type="button"
      onClick={() => selectDay(indexDay)}
      className={`flex flex-col border-solid border-[2px] border-transparent items-center justify-center text-center text-[20px] rounded-lg 
      hover:border-solid hover:border-[1px] hover:border-[#0861E1] py-1 ${
        checkSelected(indexDay)
          ? "bg-[#0861E1] text-white drop-shadow-[0_3px_5px_rgba(8,97,225,1)]"
          : "hover:bg-white"
      } ${hasNotes ? "hover:m-[1px]" : ""} ${
        isCurrentMonth && !checkSelected(indexDay) ? "text-black" : ""
      } ${!isCurrentMonth && !checkSelected(indexDay) ? "text-zinc-400" : ""}`}
    >
      {day}
      {hasNotes && (
        <span
          className={`${
            checkSelected(indexDay) ? "bg-white" : "bg-[#0861E1]"
          } w-[6px] h-[6px] rounded-full`}
        ></span>
      )}
    </button>
  );
};

export default CalendarButton;
