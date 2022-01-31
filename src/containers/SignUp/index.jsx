import React from 'react';

const SignUp = () => {
    return ( 
        <div style={{width:"100%",display:"grid",placeItems:"center",padding:"50px"}}>
            <div style={{width:"400px"}}>
            <form>
           
                <div className="mb-3">
                    <label for="firstName" className="form-label">Your Name</label>
                    <input type="text" className="form-control" id="firstName" placeholder='Your Name' />
                </div>
                   
                <div className="mb-3">
                    <label for="username" className="form-label">Username</label>
                    <input type="text" className="form-control" id="username" placeholder='Username'/>
                </div>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Email'/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label" >Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder='Password'/>
                </div>    
                <div className="mb-3">
                    <label for="contact" className="form-label">Contact Number</label>
                    <input type="alphanumeric" className="form-control" id="contact" placeholder='Contact'/>
                </div>            
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            </div>
        </div>
    );
}
 
export default SignUp;