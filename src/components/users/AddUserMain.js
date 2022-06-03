import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Toast from "../LoadingError/Toast";
import * as yup from 'yup'
import { useFormik } from 'formik'
import {useDispatch, useSelector} from 'react-redux'
import { registerRequest } from "../../redux/apiRequest";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHouver: false,
  autoClose: 2000,
};
const AddUserMain = () => {
  const auth = useSelector(state => state.auth.login?.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      role: "",
      isAdmin: ""
    },
    validationSchema: yup.object({
      email: yup.string().email().required("Required"),
      password: yup.string().min(8, "Must be 8 character or more").required("Required"),
      username: yup.string().required("Required"),
      role: yup.string().default("User"),
      isAdmin: yup.string().default("false")
    }),
    onSubmit : values =>{
      // console.log(values)
      const user = {
        username : values.username,
        password: values.password,
        email: values.email,
        role: values.role,
        isAdmin: values.isAdmin
      }
      if(auth?.token){
        registerRequest(dispatch,auth.token,user)
      }else{
        navigate('/login')
      }
    }
  })
  // console.log(formik.errors)
  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={formik.handleSubmit}>
          <div className="content-header">
            <Link to="/users" className="btn btn-danger text-white">
              Trở về
            </Link>
            <h2 className="content-title">Thêm nhân viên</h2>
            <div>
              <button className="btn btn-primary" type="submit">
                Thêm
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-12 col-lg-12">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <div className="mb-4">
                    <label className="form-label">Email</label>
                    <input
                      placeholder="Nhập vào đây..."
                      className="form-control"
                      rows="4"
                      value={formik.values.email}
                      name="email"
                      // required
                      onChange={formik.handleChange}
                    ></input>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Username</label>
                    <input
                      placeholder="Nhập vào đây..."
                      className="form-control"
                      rows="4"
                      value={formik.values.username}
                      name="username"
                      // required
                      onChange={formik.handleChange}
                    ></input>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Password</label>
                    <input
                      placeholder="Nhập vào đây..."
                      className="form-control"
                      rows="4"
                      value={formik.values.password}
                      name="password"
                      // required
                      onChange={formik.handleChange}
                    ></input>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Role</label>
                    <input
                      placeholder="Nhập vào đây..."
                      className="form-control"
                      rows="4"
                      value={formik.values.role}
                      name="role"
                      // required
                      onChange={formik.handleChange}
                    ></input>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Is Admin</label>
                    <input
                      placeholder="Nhập vào đây..."
                      className="form-control"
                      rows="4"
                      value={formik.values.isAdmin}
                      name="isAdmin"
                      // required
                      onChange={formik.handleChange}
                    ></input>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddUserMain;