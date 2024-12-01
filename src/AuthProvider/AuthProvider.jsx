import { useEffect, useState } from "react"
import { createContext } from "react"
import Auth from "../firebase/firebase_config"
import { createUserWithEmailAndPassword ,signInWithEmailAndPassword , GoogleAuthProvider, signInWithPopup ,  GithubAuthProvider, signOut, onAuthStateChanged, updateProfile } from "firebase/auth"
import Swal from "sweetalert2"

export const TaskContext = createContext(null)

const AuthProvider = ({children}) => {
    const [users,setUsers] = useState(null)
    const [loading,setLoading] = useState(true)

    const googleProvider = new GoogleAuthProvider()
    const githubProvider = new GithubAuthProvider()

    const registerUsers =(email,pass)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(Auth,email,pass)
    }

    const signInUsers =(email,pass)=>{
        setLoading(true)
        return signInWithEmailAndPassword(Auth,email,pass)
    }


    const signInWithGoogle =()=>{
        setLoading(true)
        return signInWithPopup(Auth,googleProvider)
    }

    const signInWithGithub =()=>{
        setLoading(true)
        return signInWithPopup(Auth,githubProvider)
    }

    const logOutUsers =async()=>{
        setLoading(true)
        try{
            await signOut(Auth)
        }catch(err){
            throw err;
        }finally{
            setLoading(false)
        }
    }

    const updatedUserProfile =async (updatedData)=>{
        try{
            if(Auth.currentUser){
                await updateProfile(Auth.currentUser,updatedData)
                await Auth.currentUser.reload()
                setUsers({...Auth.currentUser})
            }
        }
        catch(err){
            Swal.fire({
                title: `${err.message || err.code}`,
                text: "Thanks For Being With Us",
                icon: "warning",
                confirmButtonText: "close",
              })
        }
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(Auth,currentUser=>{
                setLoading(false)
                setUsers(currentUser)
        })
        return()=> unsubscribe()
    },[])


    const taskInfo = {
        registerUsers,
        signInUsers,
        signInWithGoogle,
        signInWithGithub,
        logOutUsers,
        updatedUserProfile,
        users,
        loading
    }

  return (
    <TaskContext.Provider value={taskInfo}>
      {children}
    </TaskContext.Provider>
  )
}

export default AuthProvider

