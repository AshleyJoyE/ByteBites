import { useEffect, useState } from "react";
import styles from "./Styles/Login.module.css";
function Login(){

    const [username, setUsername]= useState('');
    const [password, setPassword] = useState('');
    useEffect(() => {
        console.log('username: ', username);
      }, [username]); 
      useEffect(() => {
        console.log('password: ' , password );
      }, [password]); 

    const validate = (e) => {
        e.preventDefault();
        var hashedPassword = hashPassword();
        // WRITE API CALL TO CHECK IF USERNAME & PASSWORD EXIST IN DATABASE
        // WRITE LOGIC FOR WHAT HAPPENS 
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
    
    return (
        <div className={styles.div_primary}>
            <div className={styles.div_graphic}>
                <p className={styles.byte_bites}> Bite-Bytes </p>
                <img className={styles.img_chef} src="https://static.vecteezy.com/system/resources/previews/028/577/460/non_2x/chef-face-3d-rendering-icon-illustration-free-png.png">
                </img>
            </div>
            <div className={styles.div_form_section}>
                <p className={styles.header}>
                LOG IN
                </p>
                <div> {username}</div>
                <div> {password}</div>
                <form className={styles.div_form_primary} onSubmit={validate}>
                    <div className={styles.div_form_secondary}>
                        <label for="Username" className={styles.form_label}>
                            Username
                        </label>
                        <input type="text" value={username} className={styles.form_input}
                            name="Username"
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
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

                        <input type="submit" className={styles.form_submit} value="Log In">  
                            
                        </input>
                        <p className={styles.form_p}>Don't have an account? <a href="/login">Create one today!</a></p>
                    </div>
                    
                    
                </form>
            </div>
            
            
        </div>
        

    )
}
export default Login;