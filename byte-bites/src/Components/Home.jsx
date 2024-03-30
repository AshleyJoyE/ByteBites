import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./Styles/Home.module.css";
import NavBar from './NavBar';

function Home() {
    const recipe_image_src = "";
    const user_image_src = "";

    const [searchQuery, setSearchQuery] = useState('');
    const [searchModeImage, setSearchModeImage] = useState('');
    // if isSearchRecipe is true, then recipe search is on
    // if isSearchRecipe is false, then user search is on
    const [isSearchRecipe, setIsSearchRecipe] = useState(true);
    const [currentModeImg, setCurrentModeImg] = useState("");
    const [isSearchModeDropdownVisible, setIsSearchModeDropdownVisible] = useState(false);
    

    const changeSearchMode = (option) => {
        setIsSearchRecipe(option)
        if (option)
            setCurrentModeImg(recipe_image_src);
        else
            currentModeImg = user_image_src;

       setIsSearchModeDropdownVisible(false);
       
    }

    const search = () => {
        
    }
    return (
        <div className={styles.main_div}>
           <div className={styles.div_nav_bar}>
                <NavBar>   </NavBar>
           </div>
           <div className={styles.div_search}>
                <form className={styles.form_search} onSubmit={search}>
                    <img className={styles.img_search_option} src={currentModeImg} onClick={() => setIsSearchModeDropdownVisible(x => !x)}></img>

                    {/* // drop down to change search mode (recipes or users) */}
                    {isSearchModeDropdownVisible && 
                        <div className={styles.div_dropdown}>
                            <div className={styles.div_dropdown_option} onClick={() => changeSearchMode(true)}>
                                <img className={styles.img_mode} src={recipe_image_src}></img>
                                <p className={styles.p_search_mode}>
                                    Recipe Search
                                </p>
                            </div>
                            <div className={styles.div_dropdown_option} onClick={() => changeSearchMode(false)}>
                                <img className={styles.img_smode} src={user_image_src}></img>
                                <p className={styles.p_search_mode}>
                                    User Search
                                </p>
                            </div>
                        </div>
                    }

                    <input type="text" value={searchQuery} className={styles.form_input}
                            name="SearchQuery"
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search Recipe Here">
                    </input>
                </form>
           </div>
           <div className={styles.div_recommended_recipes}>

           </div>

        </div>
    );
}

export default Home;
