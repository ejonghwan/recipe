import React, { useState, useEffect, Fragment } from 'react'
import { authService, dbService, storageService } from 'fbase';
import { useHistory } from 'react-router-dom'


const Profile = ({ user, refrashUser }) => {

  const [newName, setNewName] = useState(user.displayName)
  const [photo, setPhoto] = useState('https://firebasestorage.googleapis.com/v0/b/testjjj-14ea5.appspot.com/o/4C95ZttFm9cyMD4FDtS3uhY4lsx2%2F0wqwi60jfqge?alt=media&token=c86fc6e2-19c0-4606-8b50-f276e595c89b')
  const [profileSrc, setProfileSrc] = useState(authService.currentUser.photoURL)

  const history = useHistory()

  const handleLogoutSubmit = async e => {
    e.preventDefault()
    await authService.signOut()
    history.push('/')
  }

  //filter
  const getMyInfo = async () => {
    const info = await dbService.collection("msg")
    .where("createId", "==", user.uid)
    .orderBy("createAd")
    .get()
    // info.docs.map(item => console.log(item))
  }



  useEffect(() => {
    getMyInfo()
    console.log('server', authService.currentUser)
  }, [])

  const handleEditSubmit = async e => {
    e.preventDefault()
    await user.updateProfile({
      displayName: newName,
      photoURL:profileSrc,
    })
    refrashUser()
    console.log('client : ', user);
  };

  const handleChange = e => {
    const { target: {value, name} } = e
    switch(name) {
      case 'newName' :
        setNewName(value)
        break

      case 'photo' :
        setPhoto(value)
        break

      default : return false 
    }
  }

  const randomName = () => {
    return Math.random().toString(30).replace(".", "")
  }
  
  const handleImageUploadSubmit = async e => {
    e.preventDefault();
    const child = await storageService.ref().child(`${user.uid}/profile/${randomName()}`);
    const putData = await child.putString(photo, "data_url");
    const profileImg = await putData.ref.getDownloadURL()
    console.log(profileImg)
    setProfileSrc(profileImg)

  }


  const handleImgChange = e => {
    const { target: { files } } = e;
    const theFile = files[0]
    const reader = new FileReader();
    reader.onloadend = end => {
      const { currentTarget: { result } } = end
      // console.log(result)
      setPhoto(result)
    }
    reader.readAsDataURL(theFile)
  }

  return (
    <div>
      email: {user.email}<br />
      <form onSubmit={handleEditSubmit}>
        <label htmlFor="newName">userName</label>
        <input type="text" id="newName" name="newName" value={newName} onChange={handleChange} /><br />
        <label htmlFor="photo">userphoto</label>
        <input type="text" id="photo" name="photo" onChange={handleChange} />
        <button type="submit">submit</button>
      </form>
      <Fragment>
        <form onSubmit={handleImageUploadSubmit}>
          <input type="file" accept="image/*" onChange={handleImgChange}/>
          <button type="submit">profile img upload</button>
        </form>
      </Fragment>
      <div><img src={profileSrc} width="50px"/></div>
      <form onSubmit={handleLogoutSubmit}>
        <button type="submit">logout</button>
      </form>
    </div>
  );
}

export default Profile;
