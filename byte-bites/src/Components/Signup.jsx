import { useEffect, useState } from "react";
import styles from "./Styles/Signup.module.css";
function Signup(){

    const [email, setEmail]= useState('');
    const [isEmailCharactersValid, setIsEmailCharactersValid,]= useState(true);
    const [isEmailValid, setIsEmailValid,]= useState(true);
    const [password, setPassword] = useState('');
    const [isPasswordCharactersValid, setIsPasswordCharactersValid,]= useState(true);
    const [isPasswordValid, setIsPasswordValid,]= useState(true);
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [isPasswordRepeatCharactersValid, setIsPasswordRepeatCharactersValid,]= useState(true);
    const [name, setName] = useState('');
    const [isNameCharactersValid, setIsNameCharactersValid,]= useState(true);
    const [isPasswordMatching, setIsPasswordMatching]= useState(true);
    const regexAllowedCharacters = /^[a-zA-Z0-9_!@#$%^&*()-_+=]+$/
    
   
  
   
    
  
    // runs everytime email, password, password repeat, or name is changed
    useEffect(() => { 

        // make sure entries are not longer than 30 characters
        if (name.length >= 30)
            setName(name.substring(0,30))
        if (email.length >= 30)
            setEmail(email.substring(0,30))
        if (password.length >= 30)
            setPassword(password.substring(0,30))
        if (passwordRepeat.length >= 30)
            setPasswordRepeat(passwordRepeat.substring(0,30))

        // check that no invalid characters have been entered
        setIsEmailCharactersValid(email ? regexAllowedCharacters.test(email) : true);
        setIsNameCharactersValid(name ? regexAllowedCharacters.test(name) : true)
        setIsPasswordCharactersValid(password ? regexAllowedCharacters.test(password) : true)
        setIsPasswordRepeatCharactersValid(passwordRepeat ? regexAllowedCharacters.test(passwordRepeat) : true)
        validEmail()
        validPassword()



    }, [email, password, passwordRepeat, name])

    const validate = (e) => {
        e.preventDefault();
        // confirm that input only contains valid data
        if (isEmailCharactersValid && isNameCharactersValid && isPasswordCharactersValid){
            setIsPasswordMatching(password === passwordRepeat)
            if (isEmailValid && isPasswordValid && name.length > 0 && isPasswordMatching ){
                var hashedPassword = hashPassword();
                // WRITE API CALL TO ADD USERNAME & PASSWORD TO DB
                // WRITE LOGIC FOR WHAT HAPPENS 
            }
            else {
                // ERROR MESSAGE for INVALID EMAIL
            }
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
        
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,30}$/;
        setIsEmailValid(regexEmail.test(email));
      
    }

    const validPassword = () => {
        const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_+=])[A-Za-z\d!@#$%^&*()-_+=]{8,30}$/;
        setIsPasswordValid(regexPassword.test(password));
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
                CREATE AN ACCOUNT
                </p>
               
                <form className={styles.div_form_primary} onSubmit={validate}>
                    <div className={styles.div_form_secondary}>
                        <label for="Name" className={styles.form_label}>
                            Full Name
                        </label>
                        <input type="text" value={name} className={styles.form_input}
                            name="Name"
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your full name"
                            >
                        </input>
                        {!isNameCharactersValid && <p className={styles.error_message}> Invalid Character(s) Entered! </p>}
                        <label for="Email" className={styles.form_label}>
                            Email
                        </label>
                        <input type="text" value={email} className={styles.form_input}
                            name="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            >
                            
                        </input>
                        {!isEmailCharactersValid && <p className={styles.error_message}> Invalid Character(s) Entered! </p>}
                        {!isEmailValid && <p className={styles.error_message}> Invalid Email Address! </p>}
                        <label for="Password" className={styles.form_label}>
                            Password
                        </label>
                        <input type="password" value={password} className={styles.form_input}
                            name="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password">
                        </input>
                        {!isPasswordCharactersValid && <p className={styles.error_message}> Invalid Character(s) Entered! </p>}
                        {!isPasswordValid && <p className={styles.error_message}> Password Must Contain Uppercase, Lowercase, Numemrical, Special Characters, and 8 Characters </p>}

                        <label for="RepeatPassword" className={styles.form_label}> Re-enter Password </label>
                        <input type="password" value={passwordRepeat} className={styles.form_input}
                            name="RepeatPassword"
                            onChange={(e) => setPasswordRepeat(e.target.value)}
                            placeholder="Enter your password">
                        </input>
                        {!isPasswordRepeatCharactersValid && <p className={styles.error_message}> Invalid Character(s) Entered! </p>}
                        {!isPasswordMatching && <p className={styles.error_message}> Passwords Must Match! </p>}
                        <input type="submit" className={styles.form_submit} value="Log In">  
                            
                        </input>
                        <p className={styles.form_p}> Already have an account? <a href="/Login">Log in!</a></p>
                    </div>
                    
                    
                </form>
            </div>
            
            
        </div>
        

    )
}
export default Signup;