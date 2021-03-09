import React, { useState, useEffect } from 'react'
import { dbService, storageService } from 'fbase'
import List from 'components/List'

function Home({ user }) {

  const [msg, setMsg] = useState('')
  const [msgArr, setMsgArr] = useState([])
  const [imgFile, setImgFild] = useState('')

  const handleChange = e => {
    const { target: { value } } = e;
    setMsg(value)
  }
  // console.log(user)




  useEffect(() => {
    dbService.collection('msg').onSnapshot(snap => {
      const data = snap.docs.map( doc => {
        return {
          id: doc.id,
          ...doc.data()
        }
      })
      setMsgArr(data)
    })
  }, [])

  const createRandomString = () => {
    return Math.random().toString(36).replace(".", "")
  }

  // const ab = async () => {
  //   const aa = await dbService.collection('msg').doc('K6dgaI3i0FUl522wBp6m').collection('ttt').doc('t').get()
    // console.log(aa.data())
  // }

  // ab()
  
  

  const handleSubmit = async e => {
    e.preventDefault();
    const fileUrl = await storageService.ref().child(`${user.uid}/${createRandomString()}`)
    const res = await fileUrl.putString(imgFile, "data_url")
    const imgUrl = await res.ref.getDownloadURL()
    // console.log(imgUrl)
    dbService.collection('msg').add({
      createAd: new Date().getFullYear(),
      createId: user.uid,
      userName: user.email,
      msg: msg,
      img: imgUrl,
    })
    setMsg("");
  }

  const handleFileChange = e => {
    const { target: { files } } = e;
    const theFile = files[0];
    const reader = new FileReader();
    // console.log(reader)
    reader.onloadend = data => {
      const { currentTarget: { result } } = data;
      // console.log(data)
      setImgFild(result)
      // console.log(result)
    }
    
    reader.readAsDataURL(theFile);
  }

  const handleFileDel = () => setImgFild("");


  return (
    <div>
      Home
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} value={msg} />
        <button type="submit">submit</button>
      </form>

      <input type="file" accept="image/*" onChange={handleFileChange} />
      {imgFile && <img src={imgFile} width="50px" height="50px"/>}
      <button onClick={handleFileDel}>file del</button>
      <br /><hr />
      
      <ul>
        {msgArr.map(data => <List msgArr={data} key={data.id} self={user.uid === data.createId}/> )}
      </ul>
    </div>
  );
}

export default Home;
