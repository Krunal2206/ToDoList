import React, { useContext } from 'react';
import { Avatar, Zoom, Tooltip } from '@mui/material';
import Signin from './Signin';
import ToDo from './ToDo';
import AuthContext from '../context/authentication/AuthContext';

const Navbar = () => {

    const { SignInWithGoogle, SignOut, user } = useContext(AuthContext);

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark sticky-top">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">ToDo List</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse flex-row-reverse" id="navbarSupportedContent">
                        <form className="d-flex" role="search">
                            {!user ?
                                <Tooltip title='SIGN IN' placement="bottom" TransitionComponent={Zoom} arrow>
                                    <button className="btn btn-primary" type="submit" onClick={SignInWithGoogle}>SIGN IN</button>
                                </Tooltip>
                                : <>
                                    <Tooltip title={user.displayName} placement="bottom" TransitionComponent={Zoom} arrow>
                                        <Avatar src={user.photoURL} className='mx-3' />
                                    </Tooltip>
                                    <Tooltip title='SIGN OUT' placement="bottom" TransitionComponent={Zoom} arrow>
                                        <button className="btn btn-primary" type="submit" onClick={SignOut}>SIGN OUT</button>
                                    </Tooltip>
                                </>}
                        </form>
                    </div>
                </div>
            </nav>

            {user ? <ToDo /> : <Signin />}
        </>
    )
}

export default Navbar
