import { useEffect, useState } from "react";
import CalendarButton from "../buttons/CalendarButton";
import Dropdown from "../common/Dropdown";
import DescriptionBlock from "./item/DescriptionBlock";
const home = () => {
  const [selectedDay, setSelectedDay] = useState("");
  const currentDate = new Date();
  const [selectMonth, setSelectMonth] = useState(currentDate.getMonth());
  const [selectYear, setSelectYear] = useState(currentDate.getUTCFullYear());

  const [daysInPrevMonth, setDaysInPrevMonth] = useState<MonthDays>({});
  const [daysInMonth, setDaysInMonth] = useState<MonthDays>({});
  const [daysInNextMonth, setDaysInNextMonth] = useState<MonthDays>({});

  const [todoesInDay, setTodoesInDay] = useState<TodoEventsValue[]>([]);

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

  type MonthDays = {
    [key: string]: number;
  };

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
      id: "13-1-2024",
      timeBegin: "16:00",
      timeEnd: "18:30",
      title: "Решение проблем с поставками",
      description: "Разбор проблем связанных с поставками в округе.",
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

  const generateСalendarButtonsInPrevMonth = () => {
    const dayInWeek = new Date(selectYear, selectMonth, 7).getDay();
    const countDaysInPrevMonth =
      calculateDayInMonth(selectYear, selectMonth - 1) + 1;
    if (Object.keys(daysInPrevMonth).length > 0) {
      setDaysInPrevMonth({});
    }
    for (
      let day = countDaysInPrevMonth - dayInWeek;
      day < countDaysInPrevMonth;
      day++
    ) {
      setDaysInPrevMonth((days) => {
        return { ...days, [`${day}-${selectMonth - 1}-${selectYear}`]: day };
      });
    }
  };

  const generateCalendarButtonsInMonth = () => {
    const countDaysInMonth = calculateDayInMonth(selectYear, selectMonth);
    if (Object.keys(daysInMonth).length > 0) {
      setDaysInMonth({});
    }
    for (let day = 1; day <= countDaysInMonth; day++) {
      setDaysInMonth((days) => {
        return { ...days, [`${day}-${selectMonth}-${selectYear}`]: day };
      });
    }
  };

  const generateСalendarButtonsInNextMonth = () => {
    const lastDayOfMonth = 33 - new Date(selectYear, selectMonth, 33).getDate();
    const nextMonthDate = new Date(selectYear, selectMonth, lastDayOfMonth);
    const dayOfWeekLDOM = nextMonthDate.getDay();
    if (Object.keys(daysInNextMonth).length > 0) {
      setDaysInNextMonth({});
    }
    if (dayOfWeekLDOM !== 0) {
      for (let day = 1; day <= 7 - dayOfWeekLDOM; day++) {
        setDaysInNextMonth((days) => {
          return { ...days, [`${day}-${selectMonth + 1}-${selectYear}`]: day };
        });
      }
    }
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
    generateСalendarButtonsInPrevMonth();
    generateCalendarButtonsInMonth();
    generateСalendarButtonsInNextMonth();
  }, [selectMonth, selectYear]);

  const handleSelectDay = (indexDay: string) => {
    setSelectedDay(indexDay);
    setTodoesInDay(
      todoEvents.filter((todo) => {
        return todo.id === indexDay;
      })
    );
  };

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
                  {Object.keys(daysInPrevMonth).map((key) => (
                    <CalendarButton
                      key={key}
                      day={daysInPrevMonth[key]}
                      indexDay={key}
                      hasNotes={checkNotes(key)}
                      selectDay={handleSelectDay}
                      indexSelectedDay={selectedDay}
                      isCurrentMonth={false}
                    />
                  ))}
                  {Object.keys(daysInMonth).map((key) => (
                    <CalendarButton
                      key={key} // id
                      day={daysInMonth[key]}
                      indexDay={key}
                      hasNotes={checkNotes(key)}
                      selectDay={handleSelectDay}
                      indexSelectedDay={selectedDay}
                      isCurrentMonth={true}
                    />
                  ))}
                  {Object.keys(daysInNextMonth).map((key) => (
                    <CalendarButton
                      key={key}
                      day={daysInNextMonth[key]}
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
              <div className="flex flex-col gap-y-5">
                {todoesInDay.map((todoInDay, index) => (
                  <DescriptionBlock key={index} todo={todoInDay} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default home;
