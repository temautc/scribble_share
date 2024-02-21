import React from "react";
import { IoIosClose } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import CheckBoxItem from "./CheckBoxItem";

const ScribleItem = ({ todoes, changeTodo }: any) => {
    return (
        <div className="flex flex-col w-fit h-fit bg-zinc-700 min-w-[200px] p-3">
            <div className="flex w-full justify-end">
                <FaRegEdit className="text-zinc-300 my-auto" />
                <IoIosClose className="text-zinc-300 my-auto" size={24} />
            </div>
            {todoes.map((todo: any) => (
                <button
                    className="flex h3 text-zinc-300"
                    key={todo._id}
                    onClick={() => changeTodo(todo._id)}
                >
                    <CheckBoxItem isCompleted={todo.isComplete}/>
                    <p className="flex">{todo.title}</p>
                </button>
            ))}
        </div>
    );
};

export default ScribleItem;
