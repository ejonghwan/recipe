import React, { useState } from 'react'
import { dbService } from 'fbase'

function List({ msgArr, self }) {
    // console.log(msgArr)

    const [toggle, setToggle] = useState(false);
    const [editText, setEditText] = useState('');

    const handleDel = e => {
        const ok = window.confirm('delete?')
        if(ok) {
          dbService.doc(`msg/${msgArr.id}`).delete();
        }
    }

    const handleEditSubmit = e => {
      e.preventDefault();
      dbService.doc(`msg/${msgArr.id}`).update({
        msg: editText,
      });
      setToggle(false)
    }

    const handleEdit = e => {
        setToggle(prev => !prev)
        console.log(msgArr.id)
    }

    const handleChange = e => {
      const { target: { value } } = e
      setEditText(value)
    }
    




  return (
    <li>
        <div>{`${msgArr.userName} / ${msgArr.createAd}`}</div>
        <div>{`${msgArr.msg}`}</div>
        <div><img src={msgArr.img} width="50px" height="50px" /></div>
        {self && (<>
            <button onClick={handleEdit}>edit</button>
            <button onClick={handleDel}>del</button>
        </>)}
        {toggle && (<>
          <form onSubmit={handleEditSubmit}>
            <input type="text" onChange={handleChange} placeholder={msgArr.msg} value={editText} />
            <button type="submit">ok</button>
          </form>
        </>)}
    </li>
  );
}

export default List;
