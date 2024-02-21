import React from "react";

interface ITodo {
    todo: any;
}

const Scribble = ({ todo }: ITodo) => {
    return <div>{todo.title}</div>;
};

export default Scribble;
