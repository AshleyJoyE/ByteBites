import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./Styles/Home.module.css";
import { GiSaucepan } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import NavBar from './NavBar';

function Home() {

    const [searchQuery, setSearchQuery] = useState('');
    const [placeholder, setPlaceHolder] = useState('Search Recipes...');
    // if isSearchRecipe is true, then recipe search is on
    // if isSearchRecipe is false, then user search is on
    const [isSearchRecipe, setIsSearchRecipe] = useState(true);
    const [isSearchModeDropdownVisible, setIsSearchModeDropdownVisible] = useState(false);
    

    const changeSearchMode = (option) => {
        setIsSearchRecipe(option)
        setIsSearchModeDropdownVisible(false);
        if (option)
            setPlaceHolder("Search Recipes...");
        else
            setPlaceHolder("Search Users...");

       
    }

    const search = () => {
        
    }
    return (
        <div className={styles.main_div}>
           <div className={styles.div_nav_bar}>
                <NavBar>   </NavBar>
           </div>
           <div className={styles.div_heading}>
                <p className={styles.header}> BYTE-BYTES</p>
                <div className={styles.div_scrolling}>
                    <p className={styles.subheaderAnimation}>  Find, Collect, & Share Recipes&nbsp;&nbsp;&nbsp; </p>
                    <p className={styles.subheaderAnimation}>  Find, Collect, & Share Recipes&nbsp;&nbsp;&nbsp; </p>
                    <p className={styles.subheaderAnimation}>  Find, Collect, & Share Recipes&nbsp;&nbsp;&nbsp; </p>
                    <p className={styles.subheaderAnimation}>  Find, Collect, & Share Recipes&nbsp;&nbsp;&nbsp; </p>
                    <p className={styles.subheaderAnimation}>  Find, Collect, & Share Recipes&nbsp;&nbsp;&nbsp; </p>
                    <p className={styles.subheaderAnimation}>  Find, Collect, & Share Recipes&nbsp;&nbsp;&nbsp; </p>
                </div>
           </div>
           <div className={styles.div_search}>
                <form className={styles.form_search} onSubmit={search}>
                    {isSearchRecipe && 
                         <GiSaucepan className={styles.icon_mode_recipe} onClick={() => setIsSearchModeDropdownVisible(x => !x)}/>
                    }
                    {!isSearchRecipe && 
                         <FaUserCircle className={styles.icon_mode_user} onClick={() => setIsSearchModeDropdownVisible(x => !x)}/>
                    }
                    {isSearchModeDropdownVisible && 
                        <div className={styles.div_dropdown}>
                            <div className={styles.div_dropdown_option} onClick={() => changeSearchMode(true)}>
                                <GiSaucepan className={styles.dropdown_option_icon_recipe}/>
                                <p className={styles.p_search_mode}>
                                    Recipe Search
                                </p>
                            </div>
                            <div className={styles.div_dropdown_option} onClick={() => changeSearchMode(false)}>
                                <FaUserCircle className={styles.dropdown_option_icon_user}/>
                                <p className={styles.p_search_mode}>
                                    User Search
                                </p>
                            </div>
                        </div>
                    }
                    <input type="text" value={searchQuery} className={styles.form_input}
                            name="SearchQuery"
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={placeholder}>
                    </input>
                </form>
           </div>
           <div className={styles.div_recommended_recipes}>

           </div>

        </div>
    );
}

export default Home;
