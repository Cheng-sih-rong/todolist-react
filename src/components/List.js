import React from 'react';
import { useLocation } from 'react-router-dom';
import Button from './Button';


function List(prop) {

    const location = useLocation()
    const path = location.pathname


    const btnDisplay = {
        display: path === '/done' ? 'none' : 'flex'
    }

    const title = path === '/undo' ? '待辦' : '完成'


    //項目

    const itemLoop = function (list) {
        const deleteItem = prop.fuc.deleteItem
        const doneItem = prop.fuc.doneItem

        return list.map((item) => {
            return (<div key={item.key}>
                <div className="flex item-wrap">
                    <p>{item.content}</p>
                    <div className="flex center gap-10">
                        <div onClick={() => deleteItem(item.key)}><Button content="刪除" type="detele" /></div>
                        <div style={btnDisplay} onClick={() => doneItem(item.key)}><Button content="完成" /></div>
                    </div>

                </div>
                <hr />
            </div>)
        })
    }


    return (
        <div className="content-edit wrap">
            <div className="title">
                <h3>{title + '項目'}</h3>
                {`(${prop.show.length > 0 ? `你有${prop.show.length}個${title}項目` : `目前無${title}項目`})`}
            </div>
            <div className="item">
                {itemLoop(prop.show)}
            </div>

        </div>
    );
}

export default List;
