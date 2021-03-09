import React, { useState, useEffect } from 'react'
import MyRouter from './MyRouter'
import { authService } from 'fbase'

function App() {

  const [isLogged, setIsLogged] = useState(false);
  const [init, setInit] = useState(false);
  const [user, setUser] = useState();
  


  useEffect( () => {
    authService.onAuthStateChanged((user) => { //비동기함수
      // 비동기 실행
      if(user) {
        setIsLogged(true)
        // setUser(user)
        setUser({
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args)
        })
        // 깊은 복사안됨
        // setUser(JSON.parse(JSON.stringify(authService.currentUser)))
        // 스프레드 복사안됨
        // setUser({...authService.currentUser})
      } else {
        setIsLogged(false)
      };
      setInit(true)
    })
  }, [])


  // const refrashUser = async e => await setUser({...authService.currentUser})
  // const refrashUser = async e => {
    // await setUser(JSON.parse(JSON.stringify(authService.currentUser)))
    // await setUser({...authService.currentUser})
    // let test = await JSON.parse(JSON.stringify(authService.currentUser))
    // let test = await {...authService.currentUser}
    // console.log('client : ', test)
  // }
  const refrashUser = async e => {
    const user = await authService.currentUser
    await setUser({
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args)
    }) 
  }
  

  return (
    <div>
      { init ? <MyRouter isLogged={isLogged} user={user} refrashUser={refrashUser}/> : "loading" }
    </div>
  );
}

export default App;
