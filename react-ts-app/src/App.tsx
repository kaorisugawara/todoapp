import React, { useState, useEffect } from 'react';
import { collection, getFirestore, setDoc, doc, getDoc } from "firebase/firestore/lite";

import './App.css';
import { Todo } from 'pages/Todo';
import { firebaseApp } from 'index';

function App() {
  const [input, setInput] = useState('');
  const [todoList, setTodoList] = useState<string[]>([]);
  const [finishedList, setFinishedList] = useState<string[]>([]);
  // Loadingを判定する変数
  const [isLoading, setIsLoading] = useState(true);
  // 未完了のTodoが変化したかを監視する変数
  const [isChangedTodo, setIsChangedTodo] = useState(false);
  // 完了済みのTodoが変化したかを監視する変数
  const [isChangedFinished, setIsChangedFinished] = useState(false);

  const db = getFirestore(firebaseApp);

  useEffect(() => {
    (async () => {
      const docRef = collection(db, 'todoList');
      const resTodo = await getDoc(doc(docRef, "todo"));
      const resFinishedTodo = await getDoc(doc(docRef, "finishedTodo"));
      if (resTodo.exists()) setTodoList(resTodo.data().tasks);
      if (resFinishedTodo.exists()) setFinishedList(resFinishedTodo.data().tasks);
      // Loading終了
      setIsLoading(false);
    })()
  }, [db])

  useEffect(() => {
    if (isChangedTodo) {
      (async () => {
        // 通信をするのでLoadingをtrue
        setIsLoading(true)
        const docRef = collection(db, 'todoList');
        setDoc(doc(docRef, "todo"), { tasks: todoList });
        // Loading終了
        setIsLoading(false)
      })()
    }
  }, [todoList, isChangedTodo, db])

  useEffect(() => {
    if (isChangedFinished) {
      (async () => {
        // 通信をするのでLoadingをtrue
        setIsLoading(true);
        const docRef = collection(db, 'todoList');
        setDoc(doc(docRef, "finishedTodo"), { tasks: finishedList });
        // Loading終了
        setIsLoading(false)
      })()
    }
    setIsChangedFinished(false)
  }, [db, finishedList, isChangedFinished])

  const addTodo = async () => {
    if (!!input) {
      setIsChangedTodo(true);
      setTodoList([...todoList, input]);
      setInput('');
    }
  }

  const deleteTodo = (index: number) => {
    setIsChangedTodo(true);
    setTodoList(todoList.filter((_, idx) => idx !== index))
  }

  const deleteFinishTodo = (index: number) => {
    setIsChangedTodo(true);
    setFinishedList(finishedList.filter((_, idx) => idx !== index))
  }

  const finishTodo = (index: number) => {
    deleteTodo(index);
    setIsChangedTodo(true);
    setIsChangedFinished(true);
    const todo = todoList.find((_, idx: number) => idx === index);
    todo && setFinishedList([...finishedList, todo]);
  }

  const reopenTodo = (index: number) => {
    setIsChangedTodo(true);
    setIsChangedFinished(true);
    deleteFinishTodo(index);
    const todo = finishedList.find((_, idx: number) => idx === index);
    todo && setTodoList([...todoList, todo]);
  }

  return (
    <div className="App">
      <div>Todoリスト</div>
      <input onChange={(e) => setInput(e.target.value)} value={input}/>
      <button onClick={() => addTodo()}>追加</button>
      {isLoading ?
        <div>loading</div>
      :
        <div>
          <div>
            <div>未完了</div>
            <Todo todoList={todoList} deleteTodo={deleteTodo} changeTodoStatus={finishTodo} type="todo"/>
          </div>
          <div>
            <div>完了済み</div>
            <Todo todoList={finishedList} deleteTodo={deleteFinishTodo} changeTodoStatus={reopenTodo} type="done"/>
          </div>
        </div>
      }
    </div>
  );
}

export default App;
