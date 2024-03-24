import { useEffect, useState } from "react";
import styles from "./Styles/Login.module.css";
import { useNavigate } from 'react-router-dom';
function Login(){

    const [emailOrUsername, setEmailOrUsername]= useState('');
    const [password, setPassword] = useState('');
    const [isCredentialsValid, setIsCredentialsValid]= useState(true);
    const navigate = useNavigate();
    const handleHomeNav = () => navigate(`/`);

    const validate = async (e) => {
        e.preventDefault();
        if (emailOrUsername.length >= 50)
            setEmailOrUsername(emailOrUsername.substring(0,50))
        if (password.length >= 30)
            setPassword(password.substring(0,30))
        console.log("inside block")
        if (emailOrUsername.length >= 4 && password.length >= 8){
            try {
                // validate credentials
                const response = await fetch(`http://localhost:3010/api/getCredentialsVerification?email=${encodeURIComponent(emailOrUsername)}&username=${encodeURIComponent(emailOrUsername)}&password=${encodeURIComponent(password)}`, 
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                console.log(data)
    
                // credentials are valid
                if (data.status === 200) {
                    console.log("Credentials valid");
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
        <div className={styles.div_primary}>
            <div className={styles.div_graphic}>
            <button className={styles.byte_bites} onClick={() => window.location.href = '/'}>Byte-Bites</button>
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
                        {!isCredentialsValid && <p className={styles.error_message}> Invalid Credentials! </p>}
                        <input type="submit" className={styles.form_submit} value="Log In">  
                            
                        </input>
                        <p className={styles.form_p}>Don't have an account? <a href="/Signup">Create one today!</a></p>
                    </div>
                    
                    
                </form>
            </div>
            
            
        </div>
        

    )
}
export default Login;