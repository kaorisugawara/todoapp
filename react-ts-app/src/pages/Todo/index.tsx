import React from 'react';

interface TodoProps {
    todoList: string[];
    deleteTodo: (idx: number) => void;
    type: string;
    changeTodoStatus: (idx: number) => void;
}

const Todo:React.FC<TodoProps> = (props: TodoProps) => (
  <div>
    {props.todoList.map((todo, idx) => (
      <div>
        {todo}
        <button onClick={() => props.deleteTodo(idx)}>削除</button>
        <button onClick={() => props.changeTodoStatus(idx)}>{props.type === "todo" ? "完了済みにする" : "戻す"}</button>
      </div>
    ))}
  </div>
)

export { Todo };