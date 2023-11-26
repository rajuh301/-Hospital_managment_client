import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import useAdmin from '../../hooks/useAdmin';

const Navbar = () => {

    const { user, logOut } = useContext(AuthContext)
    const [isAdmin] = useAdmin(null);

    const hanidleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error))
    }


    return (
        <div>
            <div className="">

                <div className=''>
                    {
                        user ? <>
                            <p>{user?.displayName}</p>

                            <button onClick={hanidleLogOut} className="btn btn-ghost">LogOut</button>
                        </> : <>
                            <Link to='/login'>Login</Link>
                        </>
                    }

                </div>
            </div>
        </div>
    );
};

export default Navbar;