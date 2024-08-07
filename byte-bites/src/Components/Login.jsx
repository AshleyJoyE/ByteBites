import { useEffect, useState } from "react";
import styles from "./Styles/Login.module.css";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import NavBar from './NavBar';

function Login(){

    const [emailOrUsername, setEmailOrUsername]= useState('');
    const [password, setPassword] = useState('');
    const [isCredentialsValid, setIsCredentialsValid]= useState(true);
    const navigate = useNavigate();
    const handleHomeNav = () => navigate(`/`);

    // when user navigates to page, check if user is already logged in, if so return to home,
    useEffect(() => {
        const currentUser = localStorage.getItem("user");
        if (currentUser) {
            handleHomeNav();
        }
      }, []);

    const validate = async (e) => {
        e.preventDefault();
        if (emailOrUsername.length >= 50)
            setEmailOrUsername(emailOrUsername.substring(0,50))
        if (password.length >= 30)
            setPassword(password.substring(0,30))
        if (emailOrUsername.length >= 4 && password.length >= 8){
            try {
                // validate credentials
                const response = await fetch(`https://bytebites-bzpd.onrender.com/api/getUserVerification?email=${encodeURIComponent(emailOrUsername)}&username=${encodeURIComponent(emailOrUsername)}&password=${encodeURIComponent(password)}`, 
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();

    
                // credentials are valid
                if (data.status === 200) {
                    console.log("Credentials valid");
                    console.log(data.username);
                    // store the user in localStorage
                    localStorage.setItem('user', response.data)
                    localStorage.setItem('id', data._id)
                    localStorage.setItem('username', data.username);
                    localStorage.setItem('profilePhoto', data.profilePhoto);
                    localStorage.setItem('email', data.email);
                    localStorage.setItem('bio', data.bio);
                    localStorage.setItem('isAdmin', data.admin);
                    
                    handleHomeNav();
                    // future plan: reset number of unsucessful attempts
                } else {
                    setIsCredentialsValid(false);
                    console.log("Credentials invalid");
                    // future plan: update number of unsucessful attempts
                }
            } catch (error) {
                console.error(error);
                setIsCredentialsValid(false);
                // future plan: update number of unsucessful attempts
            }
        }
        else {
            setIsCredentialsValid(false)
            // future plan: update number of unsucessful attempts
        }   
    }


    return (
        <div>
           <div className={styles.div_nav_bar}>
                <NavBar>   </NavBar>
            </div>
            <div className={styles.div_primary}>
                <div className={styles.div_graphic}>
              
                    <img className={styles.img_chef} src="https://static.vecteezy.com/system/resources/previews/028/577/460/non_2x/chef-face-3d-rendering-icon-illustration-free-png.png">
                    </img>
                </div>
                <div className={styles.div_form_section}>
                    <p className={styles.header}>
                    LOG IN
                    </p>
                    <form className={styles.div_form_primary} onSubmit={validate}>
                        <div className={styles.div_form_secondary}>
                            <label for="EmailOrUsername" className={styles.form_label}>
                                Email or Username
                            </label>
                            <input type="text" value={emailOrUsername} className={styles.form_input}
                                name="EmailOrUsername"
                                onChange={(e) => setEmailOrUsername(e.target.value)}
                                placeholder="Enter your email or username"
                                >
                                
                            </input>
                            <label for="Password" className={styles.form_label}>
                                Password
                            </label>
                            <input type="password" value={password} className={styles.form_input}
                                name="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password">
                            </input>
                            {!isCredentialsValid && <p className={styles.error_message}> Invalid Username or Password! </p>}
                            <input type="submit" className={styles.form_submit} value="Log In">  
                                
                            </input>
                            <p className={styles.form_p}>Don't have an account? <a href="/Signup">Create one today!</a></p>
                        </div>
                        
                        
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Login;