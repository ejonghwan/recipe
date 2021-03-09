import React, { useState } from 'react'
import { authService, dbService, fb } from 'fbase'

function Auth() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [err, setErr] = useState('');
    const [account, setAccount] = useState(false)
   console.log(account)

    const handleChange = e => {
        const { target: {name, value} } = e
        if(name === "email") {
            setEmail(value)
        } else if(name === "password") {
            setPassword(value)
        }
    }

    const handleSubmit = async e => {
        e.preventDefault()
        let data;
        try {
            if(account) {
                data = await authService.createUserWithEmailAndPassword(email, password)
                console.log(data)
                await dbService.collection("user1").add({
                    a: "afsaasasd423424asddd",
                    b: "호asdasas242432424dasddasd호",
                    d: email,
                    e: data.user.uid
                })
                
               
            } else {
                data = await authService.signInWithEmailAndPassword(email, password)
            }
           
        } catch (err) {
            console.log(err)
            setErr(err.message)
        }
        setAccount(true)

    }

    const handleToggle = e => {
        setAccount(prev => !prev)
    }

    const handleGoogleLogin = e => {
        // authService.GoogleAuthProvider()
        const provider = new fb.auth.GoogleAuthProvider()
        authService.signInWithPopup(provider)

    }

  return (
    <div>
      <form onSubmit={handleSubmit}>
          <input 
            type="email" 
            value={email}
            onChange={handleChange}
            name="email" 
            /> 
        <input 
            type="password" 
            value={password}
            onChange={handleChange}
            name="password" 
            />
        <input type="submit" value={account ? "create" : "login"}/>
        <div onClick={handleToggle}>{account ? "login" : "create"}</div>
        
      </form>

      <button onClick={handleGoogleLogin}>google login</button>
      <div>{err}</div>
    </div>
  );
}

export default Auth;
