import React, { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './App.scss';
import Header from './components/Header';
import Button from './components/Button';
import List from './components/List';

const list = window.localStorage.getItem('list') ? JSON.parse(window.localStorage.getItem('list')) : []

/*元件App*/
function App() {

  //儲存資料內容
  const [todoList, setTodoList] = useState(list)
  // window.localStorage.setItem('list', todoList.JSON.stringfy())
  useEffect(() => {
    window.localStorage.setItem('list', JSON.stringify(todoList))
  }, [todoList])


  /*建立輸入元件input*/
  function Input(prop) {

    //預設useRef
    const inputVal = useRef(null)

    //=========將取得的值存入State的函式 開始=========
    function getInputValue() {
      //通過useRef取得input的值
      const value = inputVal.current.value
      //input裡是空的，不要儲存資料
      if (inputVal.current.value === '') return
      //存入state裡
      else {
        setTodoList([...todoList,
        { key: Date.now(), content: value, done: false }
        ])
        //存入後清空input
        inputVal.current.value = ''
      }
    }
    //=========將取得的值存入State的函式 結束=========

    return (
      <div className="input flex" >
        <input type="text" ref={inputVal} />
        <div onClick={() => getInputValue()}>
          <Button content="新增事項" />
        </div>
      </div>
    );
  }
  /*輸入元件input 結束*/


  /*刪除項目function*/
  const deleteItem = function (index) {
    const list = todoList.filter((item) => item['key'] !== index)
    setTodoList(list)
  }

  /*完成項目function*/
  const doneItem = function (index) {
    const list = todoList.map(function (item) { if (item['key'] === index) item['done'] = true; return item })
    setTodoList(list)
  }

  //  待辦和未完成分別的list
  function doneList(list) {
    return list.filter((item => {
      return item.done && !item.delete
    }))
  }


  function undoList(list) {
    return list.filter((item) => {
      return !item.done && !item.delete
    })
  }


  const location = useLocation()
  const changeFun = location.pathname === '/undo' ? undoList(todoList) : doneList(todoList)




//把App元件頁面結構建立出來
  return (
    <div className="App">
      <Header />
      <div className="container">
        <Input />
        <div className="list-wrapper">
          <List show={location.pathname === '/all' ? todoList : changeFun} fuc={{ deleteItem, doneItem }} />
        </div>
      </div>
    </div>
  )
}

export default App;