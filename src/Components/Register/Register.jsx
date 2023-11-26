import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SocialLogin from '../Login/SocialLogin';
import { AuthContext } from '../provider/AuthProvider';
import Swal from 'sweetalert2';


const Register = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const { createUser } = useContext(AuthContext);

    const handleSignup = (event) => {
        event.preventDefault();

        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name, email, password);

        createUser(email, password)
            .then((result) => {
                const user = result.user;
                console.log(user);

                const saveUser = { name: name, email: email, roal: 'user' };
                fetch("http://localhost:5000/users", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(saveUser),
                });

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Account created successfully!!",
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate(from, { replace: true });
            })

            .catch((error) => console.log(error));
    };





    return (
        <div>


            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="w-1/2 mr-12">{/* <img src={img} alt="" /> */}</div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <h1 className="text-5xl text-center font-bold">SignUp!</h1>

                            <form onSubmit={handleSignup}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        name="name"
                                        className="input input-bordered"
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="email"
                                        name="email"
                                        className="input input-bordered"
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Confirm Password</span>
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="password"
                                        className="input input-bordered"
                                    />
                                    <label className="label">
                                        <a href="#" className="label-text-alt link link-hover">
                                            Forgot password?
                                        </a>
                                    </label>
                                </div>

                                <div className="form-control mt-6">
                                    <input
                                        className="btn btn-primary"
                                        type="submit"
                                        value="Sign Up"
                                    />
                                </div>
                            </form>
                            <p className="my-4 text-center">
                                Already have an account?{" "}
                                <Link className="text-orange-600 font-bold" to="/login">
                                    Login
                                </Link>
                            </p>
                        </div>
                        <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;