import { useEffect, useState } from "react";
import styles from "./Styles/Signup.module.css";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import NavBar from './NavBar';

function Signup(){

    const [email, setEmail]= useState('');
    const [isEmailCharactersValid, setIsEmailCharactersValid,]= useState(true);
    const [isEmailValid, setIsEmailValid,]= useState(true);
    const [password, setPassword] = useState('');
    const [isPasswordCharactersValid, setIsPasswordCharactersValid,]= useState(true);
    const [isPasswordValid, setIsPasswordValid,]= useState(true);
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [isPasswordRepeatCharactersValid, setIsPasswordRepeatCharactersValid,]= useState(true);
    const [username, setUsername] = useState('');
    const [isUsernameValid, setIsUsernameValid,]= useState(true);
    const [isUsernameCharactersValid, setIsUsernameCharactersValid,]= useState(true);
    const [isPasswordMatching, setIsPasswordMatching]= useState(true);
    const [isAccountNotFound, setIsAccountNotFound]= useState(true);
    const regexAllowedCharacters = /^[a-zA-Z0-9_!@#$%^&*()-_+=]+$/
    const handleHomeNav = () => navigate(`/`);
    const navigate = useNavigate();
  
    // runs everytime email, password, password repeat, or name is changed
    useEffect(() => { 

        // make sure entries are not longer than 30 characters
        if (username.length >= 30)
            setUsername(username.substring(0,30))
        if (email.length >= 50)
            setEmail(email.substring(0,50))
        if (password.length >= 30)
            setPassword(password.substring(0,30))
        if (passwordRepeat.length >= 30)
            setPasswordRepeat(passwordRepeat.substring(0,30))

        // check that no invalid characters have been entered
        setIsEmailCharactersValid(email ? regexAllowedCharacters.test(email) : true);
        setIsUsernameCharactersValid(username ? regexAllowedCharacters.test(username) : true)
        setIsPasswordCharactersValid(password ? regexAllowedCharacters.test(password) : true)
        setIsPasswordRepeatCharactersValid(passwordRepeat ? regexAllowedCharacters.test(passwordRepeat) : true)
        validEmail()
        validUsername()
        validPassword()
        setIsPasswordMatching(password == passwordRepeat)

    }, [email, password, passwordRepeat, username])


    // when user navigates to page, check if user is already logged in, if so return to home,
    useEffect(() => {
        const currentUser = localStorage.getItem("user");
        if (currentUser) {
            handleHomeNav();
        }
      }, []);
    // create an account
    const createAccount = async (e) => {
        e.preventDefault();
        // confirm that input only contains valid data
        if (isEmailCharactersValid && isUsernameCharactersValid && isPasswordCharactersValid) {
            setIsPasswordMatching(password === passwordRepeat);
            if (isEmailValid && isPasswordValid && username.length > 3 && isPasswordMatching) {
                try {
                    // check if account already exists
                    const response = await fetch(`https://bytebites-bzpd.onrender.com/api/getUser?email=${encodeURIComponent(email)}&username=${encodeURIComponent(username)}`, 
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    });
                    const data = await response.json();
                    console.log(data)
    
                    // create account if it doesn't exist already
                    if (!response.ok) {
                        setIsAccountNotFound(true);
                        const postResponse = await fetch("https://bytebites-bzpd.onrender.com/api/postUser", {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                email: email,
                                username: username, 
                                password: password
                            })
                        });

                        // account is created
                        if (postResponse.ok) {
                            // get user information
                            const response = await fetch(`https://bytebites-bzpd.onrender.com/api/getUser?email=${encodeURIComponent(email)}&username=${encodeURIComponent(username)}`, 
                            {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                            });
                            if (response.ok){
                                const data = await response.json();
                                // create default collection for new user
                                const postResponseCollection = await fetch("https://bytebites-bzpd.onrender.com/api/postCollection", {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        collectionName: username.toLowerCase() + "'s saved recipes",
                                        owner_id: data._id
                                    })
                                });
                                if (postResponseCollection.ok){
                                     // store the user in localStorage
                                    localStorage.setItem('user', response.data)
                                    localStorage.setItem('id', data._id)
                                    localStorage.setItem('username', data.username);
                                    localStorage.setItem('profilePhoto', data.profilePhoto);
                                    localStorage.setItem('email', data.email);
                                    localStorage.setItem('bio', data.bio);
                                    localStorage.setItem('isAdmin', data.admin);
                                    handleHomeNav();
                                }
                                // post request failed
                                else {
                                    throw new Error(`HTTP error! Status: ${postResponse.status}`);
                                }
                            }
                            else {
                                throw new Error(`HTTP error! Status: ${postResponse.status}`);
                            }
                        } 
                        // post request failed
                        else {
                            throw new Error(`HTTP error! Status: ${postResponse.status}`);
                        }
                    }
                    // account already exits 
                    else {
                        setIsAccountNotFound(false);
                        console.log("Account already exists");
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        }
    };

    const validEmail = () => {
        
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,50}$/;
        setIsEmailValid(regexEmail.test(email));
      
    }

    const validUsername = () => {
        setIsUsernameValid(username.length > 3);
    }

    const validPassword = () => {
        const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.!@#$%^&*])[a-zA-Z\d.!@#$%^&*]{8,30}$/
        setIsPasswordValid(regexPassword.test(password));
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
                CREATE AN ACCOUNT
                </p>
               
                <form className={styles.div_form_primary} onSubmit={createAccount}>
                    <div className={styles.div_form_secondary}>
                        <label for="Username" className={styles.form_label}>
                            Username <span className="required-field">*</span>
                        </label>
                        <input type="text" value={username} className={styles.form_input}
                            name="Username"
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            >
                        </input>
                        {!isUsernameCharactersValid && <p className={styles.error_message}> Invalid Character(s) Entered! </p>}
                        {!isUsernameValid && <p className={styles.error_message}> Username is Too Short! </p>}
                        <label for="Email" className={styles.form_label}>
                            Email <span className="required-field">*</span>
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
                            Password <span className="required-field">*</span>
                        </label>
                        <input type="password" value={password} className={styles.form_input}
                            name="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password">
                        </input>
                        {!isPasswordCharactersValid && <p className={styles.error_message}> Invalid Character(s) Entered! </p>}
                        {!isPasswordValid && <p className={styles.error_message}> Password Must Contain Uppercase, Lowercase, Numerical, Special Characters, and atleast 8 Characters </p>}

                        <label for="RepeatPassword" className={styles.form_label}> Re-enter Password <span className="required-field">*</span></label>
                        <input type="password" value={passwordRepeat} className={styles.form_input}
                            name="RepeatPassword"
                            onChange={(e) => setPasswordRepeat(e.target.value)}
                            placeholder="Enter your password">
                        </input>
                        {!isPasswordRepeatCharactersValid && <p className={styles.error_message}> Invalid Character(s) Entered! </p>}
                        {!isPasswordMatching && <p className={styles.error_message}> Passwords Must Match! </p>}
                        {!isAccountNotFound && <p className={styles.error_message}> Username or Email Already Exists! </p>}
                        <input type="submit" className={styles.form_submit} value="Create an Account">  
                            
                        </input>
                        <p className={styles.form_p}> Already have an account? <a href="/Login">Log in!</a></p>
                    </div>
                </form>
            </div>
            
            

            </div>
        </div>
        

    )
}
export default Signup;