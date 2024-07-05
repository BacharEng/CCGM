import React, { useState } from "react";
import DatePicker from "react-datepicker";

const Signup = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [birthday, setbirthday] = useState<Date | null>(new Date());
  const [mobile, setMobile] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isInstructor, setIsInstructor] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const signupAction = () => {};

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1 className="title">Signup</h1>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="form-control"
            placeholder="First name"
          />
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="form-control"
            placeholder="Last name"
          />
          <input
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="form-control"
            placeholder="Mobile"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            placeholder="Password"
          />
          <div className="row date-picker">
            <DatePicker
              className="form-control"
              selected={birthday}
              onChange={(date) => setbirthday(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="Date of birth"
            />
          </div>
          <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" value={isInstructor}/>
  <label className="form-check-label">Default switch checkbox input</label>
</div>
          <div className="row">
            <div className="col-12">
              <button onClick={signupAction} className="btn btn-success">
                Signup
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
