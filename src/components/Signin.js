import React, { useContext } from 'react'
import AuthContext from '../context/authentication/AuthContext';

const Signin = () => {

    const { SignInWithGoogle } = useContext(AuthContext);

    return (
        <div className='d-flex align-items-center justify-content-center' style={{ minHeight: '95vh', backgroundColor: 'lightgray' }}>
            <div className='d-flex flex-column align-items-center justify-content-evenly' style={{
                height: '50vh'
            }}>
                <h2 className='fs-1'>ToDo List</h2>
                <button className="btn btn-primary" type="submit" onClick={SignInWithGoogle}>SignIn with Google</button>
            </div>
        </div>
    )
}

export default Signin
