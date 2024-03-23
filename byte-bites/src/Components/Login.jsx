import { useEffect, useState } from "react";
import styles from "./Styles/Login.module.css";
function Login(){

    const [email, setEmail]= useState('');
    const [password, setPassword] = useState('');
    const [isCredentialsValid, setIsCredentialsValid]= useState(true);
   
 

    const validate = (e) => {
        e.preventDefault();
        if (email.length >= 50)
            setEmail(email.substring(0,50))
        if (email.length >= 30)
            setPassword(password.substring(0,30))

        if (validEmail() && password >= 8){
            var hashedPassword = hashPassword();
            // WRITE API CALL TO CHECK IF USERNAME & PASSWORD EXIST IN DATABASE
            // WRITE LOGIC FOR WHAT HAPPENS 
        }
        else {
            setIsCredentialsValid(false)
        }
            
    }

    const hashPassword = () => {
        

        // Convert the data to a Uint8Array
        const dataBuffer = new TextEncoder().encode(password);

        // Hash the data using SHA-256 algorithm
        crypto.subtle.digest('SHA-256', dataBuffer)
            .then(hashBuffer => {
                // Convert the hash buffer to a hexadecimal string
                const hashedData = Array.from(new Uint8Array(hashBuffer))
                    .map(byte => byte.toString(16).padStart(2, '0'))
                    .join('');

                return hashedData;
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    const validEmail = () => {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,50}$/;
        return regexEmail.test(email);
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
                        <label for="Email" className={styles.form_label}>
                            Email
                        </label>
                        <input type="text" value={email} className={styles.form_input}
                            name="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
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