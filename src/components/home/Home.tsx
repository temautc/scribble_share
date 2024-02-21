import { useEffect, useState } from "react";
import CalendarButton from "../buttons/CalendarButton";
import Dropdown from "../common/Dropdown";
const home = () => {
  const [selectedDay, setSelectedDay] = useState("");
  const currentDate = new Date();
  const [selectMonth, setSelectMonth] = useState(currentDate.getMonth());
  const [selectYear, setSelectYear] = useState(currentDate.getUTCFullYear());
  const [daysInMonth, setDaysInMonth] = useState(
    33 - new Date(selectYear, selectMonth, 33).getDate()
  );
  const arrayYears = [2024, 2025];
  const arrayMonth = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  type TodoEventsValue = {
    id: string;
    timeBegin: string;
    timeEnd: string;
    title: string;
    description: string;
  };

  const todoEvents: TodoEventsValue[] = [
    {
      id: "1-1-2024",
      timeBegin: "8:30",
      timeEnd: "10:00",
      title: "Совещание",
      description: "Совещание на продление страховки.",
    },
    {
      id: "2-1-2024",
      timeBegin: "10:30",
      timeEnd: "12:00",
      title: "Встреча с клиентом",
      description: "Обсуждение нового проекта.",
    },
    {
      id: "13-1-2024",
      timeBegin: "14:00",
      timeEnd: "15:30",
      title: "Конференц-звонок",
      description: "Еженедельный конференц-звонок с филиалом.",
    },
    {
      id: "4-2-2024",
      timeBegin: "16:00",
      timeEnd: "17:00",
      title: "Планерка",
      description: "Планерка отдела продаж.",
    },
    {
      id: "31-0-2024",
      timeBegin: "17:30",
      timeEnd: "19:00",
      title: "Встреча с наставником",
      description: "Профессиональное консультирование.",
    },
  ];

  const checkNotes = (dayId: string) => {
    return todoEvents.some((todo) => {
      return todo.id === dayId;
    });
  };

  const prevСalendarButtons = () => {
    const result: { [key: string]: number } = {};
    const dayInWeek = new Date(selectYear, selectMonth, 7).getDay();
    const daysInPrevMonth =
      calculateDayInMonth(selectYear, selectMonth - 1) + 1;
    for (let day = daysInPrevMonth - dayInWeek; day < daysInPrevMonth; day++) {
      result[`${day}-${selectMonth - 1}-${selectYear}`] = day;
    }
    return result;
  };

  const nextСalendarButtons = () => {
    const result: { [key: string]: number } = {};
    const lastDayOfMonth = 33 - new Date(selectYear, selectMonth, 33).getDate();
    const nextMonthDate = new Date(selectYear, selectMonth, lastDayOfMonth);
    const dayOfWeekLDOM = nextMonthDate.getDay();
    if (dayOfWeekLDOM !== 0) {
      for (let day = 1; day <= 7 - dayOfWeekLDOM; day++) {
        result[`${day}-${selectMonth + 1}-${selectYear}`] = day;
      }
    }
    return result;
  };

  const calendarButtons = () => {
    const result: { [key: string]: number } = {};
    for (let day = 1; day <= daysInMonth; day++) {
      result[`${day}-${selectMonth}-${selectYear}`] = day;
    }
    return result;
  };

  const selectDropdowMonth = (data: string) => {
    setSelectMonth(arrayMonth.findIndex((el) => el === data));
  };

  const selectDropdownYear = (data: number) => {
    setSelectYear(arrayYears[arrayYears.findIndex((el) => el === data)]);
  };

  const calculateDayInMonth = (year: number, month: number) => {
    return 33 - new Date(year, month, 33).getDate();
  };

  useEffect(() => {
    const days = calculateDayInMonth(selectYear, selectMonth);
    setDaysInMonth(days);
  }, [selectMonth, selectYear]);

  const handleSelectDay = (indexDay: string) => {
    console.log(indexDay);
    setSelectedDay(indexDay);
  };
  nextСalendarButtons();
  return (
    <div className="flex-1 flex w-full gap-x-10">
      <div className="container mx-auto">
        <div className="bg-block h-full">
          <div className="flex px-[30px] py-[20px]">
            <div className="w-1/2 pr-10">
              <div className="flex items-baseline mb-5">
                <h1 className="text-[24px] font-bold">Календарь</h1>
                <div className="flex w-fit mx-auto gap-x-5">
                  <div>Месяц:</div>
                  <Dropdown
                    selectDropdownDate={selectDropdowMonth}
                    title={arrayMonth[selectMonth]}
                    arrayData={arrayMonth}
                  />
                  <div>Год:</div>
                  <Dropdown
                    selectDropdownDate={selectDropdownYear}
                    title={arrayYears[
                      arrayYears.findIndex((el) => el === selectYear)
                    ].toString()}
                    arrayData={arrayYears}
                  />
                </div>
                <button className="text-[20px] text-[#0861E1] ml-auto">
                  Изменить
                </button>
              </div>
              <div className="grid gap-y-4">
                <ul className="grid grid-rows-1 grid-cols-7 grid-flow-row gap-4">
                  <li className="text-center text-[20px] font-bold text-gray-400">
                    Пн
                  </li>
                  <li className="text-center text-[20px] font-bold text-gray-400">
                    Вт
                  </li>
                  <li className="text-center text-[20px] font-bold text-gray-400">
                    Ср
                  </li>
                  <li className="text-center text-[20px] font-bold text-gray-400">
                    Чт
                  </li>
                  <li className="text-center text-[20px] font-bold text-gray-400">
                    Пт
                  </li>
                  <li className="text-center text-[20px] font-bold text-gray-400">
                    Сб
                  </li>
                  <li className="text-center text-[20px] font-bold text-gray-400">
                    Вс
                  </li>
                </ul>
                <div className="grid grid-rows-5 grid-cols-7 grid-flow-row gap-4 mb-5">
                  {Object.keys(prevСalendarButtons()).map((key) => (
                    <CalendarButton
                      key={key}
                      day={prevСalendarButtons()[key]}
                      indexDay={key}
                      hasNotes={checkNotes(key)}
                      selectDay={handleSelectDay}
                      indexSelectedDay={selectedDay}
                      isCurrentMonth={false}
                    />
                  ))}
                  {Object.keys(calendarButtons()).map((key) => (
                    <CalendarButton
                      key={key} // id
                      day={calendarButtons()[key]} //+
                      indexDay={key}
                      hasNotes={checkNotes(key)}
                      selectDay={handleSelectDay}
                      indexSelectedDay={selectedDay}
                      isCurrentMonth={true}
                    />
                  ))}
                  {Object.keys(nextСalendarButtons()).map((key) => (
                    <CalendarButton
                      key={key}
                      day={nextСalendarButtons()[key]}
                      indexDay={key}
                      hasNotes={checkNotes(key)}
                      selectDay={handleSelectDay}
                      indexSelectedDay={selectedDay}
                      isCurrentMonth={false}
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-y-3">
                <p className="flex items-center text-gray-400">
                  <span className="w-[6px] h-[6px] rounded-full bg-[#0861E1] mr-2"></span>
                  Пользовательские заметки
                </p>
                <p className="flex items-center text-gray-400">
                  <span className="w-[6px] h-[6px] rounded-full bg-[#93DF81] mr-2"></span>
                  Ваши заметки
                </p>
              </div>
            </div>
            <div className="flex flex-col w-1/2">
              <div className="flex mb-5">
                <h1 className="text-[24px] font-bold">Описание</h1>
              </div>
              <div className="flex flex-col">
                <div className="flex bg-block">
                  <div className="flex flex-col justify-center items-center font-bold text-center py-[10px] px-[15px] rounded-l-[14px] text-[#0861E1] bg-[#E7EFFB] border-solid border-[#EDEEF3] border-r-2">
                    <p className="font-normal">8:30</p>
                    <span className="h-[1px] text-[20px] bg-[#0861E1] w-5 my-[5px]"></span>
                    <p className="font-normal">10:00</p>
                  </div>
                  <div className="flex flex-col p-4 gap-y-2">
                    <h2 className="font-bold text-[20px] ">Совещание</h2>
                    <p className="text-[15px]  overflow-hidden whitespace-nowrap w-[197px] text-ellipsis">
                      Совещание на тему продления страховки.
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default home;
