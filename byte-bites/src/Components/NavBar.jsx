import React, { useState, useEffect } from 'react';
import styles from "./Styles/NavBar.module.css";
import { useNavigate } from 'react-router-dom';

function NavBar() {
    const [isUserRegistered, setIsUserRegistered]= useState(true);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [profilePhoto, setProfilePhoto]= useState("");
    const dropDownArrowImg = "https://cdn-icons-png.flaticon.com/512/60/60995.png";
    // when user navigates to page, check if user is already logged in and display correct nav bar
    useEffect(() => {
        const currentUser = localStorage.getItem("user");
        if (currentUser) {
            setIsUserRegistered(true);
            setProfilePhoto(currentUser.profilePhoto);
        }
        else{
            setIsUserRegistered(false);
        }
      }, []);

      const signOut = () => {
        localStorage.removeItem('user');
        setIsDropdownVisible(false);
        window.location.reload();
      }
    return (
            <div className={styles.primary_div}>
                <button className={styles.byte_bites} onClick={() => window.location.href = '/'}>Byte-Bites</button>
                {isUserRegistered &&
                    <div className={styles.profile_div}>
                        <img className={styles.profile_img} src={profilePhoto} onClick={() => {window.location.href = '/Profile';}}/>
                        <div className={styles.div_dropdown}>
                            <img className={styles.img_drop_down_array} src={dropDownArrowImg} alt="Drop Down Arrow" onClick={() => setIsDropdownVisible(x => !x)}/>
                        </div>
                        {/* // drop down to change search mode (recipes or users) */}
                        {isDropdownVisible &&
                            <div className={styles.div_secondary_dropdown}>
                                <p className={styles.p_option_desc} onClick={() => window.location.href = '/Profile'}>
                                    Your Profile
                                </p>
                                <p className={styles.p_option_desc} onClick={signOut}>
                                    Sign Out
                                </p>
                            </div>
                        }
                    </div>
                }
                {!isUserRegistered &&
                    <div className={styles.no_account_div}>
                        <button className={styles.button_text} onClick={() => window.location.href = '/LogIn'}>Log In</button>
                        <button className={styles.button_text} onClick={() => window.location.href = '/SignUp'}>Sign Up</button>
                    </div>
                }
            </div>
        
        
    );
}

export default NavBar;
