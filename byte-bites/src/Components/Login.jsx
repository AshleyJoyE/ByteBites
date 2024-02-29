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
        <div>
            <div className={styles.Header}>
            LOG IN
            </div>
            <div> {username}</div>
            <div> {password}</div>
            <form className={styles.Form} onSubmit={validate}>
                <div className={styles.CenterForm}>
                    <label for="Username">
                        Username
                    </label>
                    <input type="text" value={username} 
                        name="Username"
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username">
                        
                    </input>
                    <label for="Password">
                        Password
                    </label>
                    <input type="password" value={password} 
                        name="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password">
                    </input>

                    <input type="submit">

                    </input>
                </div>
                
                
            </form>
        </div>
        

    )
}
export default Login;