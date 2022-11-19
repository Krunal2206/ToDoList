import { signInWithPopup, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { auth, provider } from '../../firebase';
import AuthContext from './AuthContext';
import TaskState from '../tasks/TaskState';

const AuthState = (props) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        // eslint-disable-next-line
        let isMounted = true;
        setUser(JSON.parse(localStorage.getItem('user')))
        return () => {
            isMounted = false;
        };
    }, []);

    const SignInWithGoogle = async (e) => {
        e.preventDefault();
        try {
            const res = await signInWithPopup(auth, provider);
            const user = res.user;
            localStorage.setItem('user', JSON.stringify({ uid: user.uid, displayName: user.displayName, photoURL: user.photoURL }))
            setUser(JSON.parse(localStorage.getItem('user')))
        } catch (error) {
            alert(error.message)
        }
    }

    const SignOut = (e) => {
        e.preventDefault();
        signOut(auth).then(() => {
            localStorage.removeItem('user')
            setUser(null)
        })
    }

    return (
        <AuthContext.Provider value={{ SignInWithGoogle, SignOut, user }}>
            <TaskState>
                {props.children}
            </TaskState>
        </AuthContext.Provider>
    )
}

export default AuthState
