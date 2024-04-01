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

    // hardcoded recipes
    const recipes = [
        {
          title: "Spaghetti Carbonara",
          author: "SallyJones",
          totalTime: "30 minutes",
          rating: 4.5,
          description: "Classic Italian pasta dish with eggs, pancetta, and Parmesan cheese."
        },
        {
          title: "Chicken Tikka Masala",
          author: "AwesomeMan18686",
          totalTime: "60 minutes",
          rating: 4.8,
          description: "Creamy Indian chicken curry with aromatic spices and tomato sauce."
        },
        {
          title: "Vegetable Stir Fry",
          author: "CookingQueen78",
          totalTime: "20 minutes",
          rating: 4.3,
          description: "Quick and healthy stir-fry with colorful vegetables and tofu."
        },
        {
          title: "Beef Tacos",
          author: "TacoMaster99",
          totalTime: "40 minutes",
          rating: 4.6,
          description: "Mexican street-style tacos with seasoned beef, salsa, and toppings."
        },
        {
          title: "Caprese Salad",
          author: "FreshSaladLover",
          totalTime: "15 minutes",
          rating: 4.2,
          description: "Simple Italian salad with fresh tomatoes, mozzarella, basil, and balsamic glaze."
        },
        {
          title: "Grilled Salmon",
          author: "SeafoodEnthusiast",
          totalTime: "25 minutes",
          rating: 4.7,
          description: "Healthy and flavorful salmon fillets grilled to perfection with lemon and herbs."
        },
        {
          title: "Mushroom Risotto",
          author: "RisottoFanatic",
          totalTime: "45 minutes",
          rating: 4.4,
          description: "Creamy Italian rice dish cooked with mushrooms, onions, and Parmesan cheese."
        },
        {
          title: "Shrimp Scampi",
          author: "ShrimpLover123",
          totalTime: "30 minutes",
          rating: 4.6,
          description: "Buttery garlic shrimp served over pasta, perfect for a quick weeknight dinner."
        },
        {
          title: "Beef Burgers",
          author: "BurgerChef87",
          totalTime: "35 minutes",
          rating: 4.5,
          description: "Juicy beef patties grilled to perfection and served with your favorite toppings."
        },
        {
          title: "Chicken Caesar Salad",
          author: "SaladCraver55",
          totalTime: "20 minutes",
          rating: 4.3,
          description: "Classic salad with grilled chicken, crisp lettuce, croutons, and Caesar dressing."
        },
        {
          title: "Pasta Primavera",
          author: "PastaLover22",
          totalTime: "25 minutes",
          rating: 4.1,
          description: "Delicious pasta dish loaded with seasonal vegetables and a light cream sauce."
        },
        {
          title: "Honey Garlic Chicken",
          author: "SweetNSavoryCook",
          totalTime: "35 minutes",
          rating: 4.7,
          description: "Sweet and savory chicken thighs cooked in a flavorful honey garlic sauce."
        },
        {
          title: "Beef Stew",
          author: "StewMaster5000",
          totalTime: "120 minutes",
          rating: 4.9,
          description: "Hearty and comforting stew made with tender beef, potatoes, carrots, and herbs."
        },
        {
          title: "Vegetable Curry",
          author: "CurryLover99",
          totalTime: "50 minutes",
          rating: 4.4,
          description: "Flavorful Indian curry loaded with mixed vegetables and served with rice or naan."
        },
        {
          title: "Lemon Herb Roast Chicken",
          author: "RoastChickenChef",
          totalTime: "90 minutes",
          rating: 4.6,
          description: "Whole chicken seasoned with lemon, garlic, and herbs, roasted until golden brown."
        }
      ];
    

    const changeSearchMode = (option) => {
        setIsSearchRecipe(option)
        setIsSearchModeDropdownVisible(false);
        if (option)
            setPlaceHolder("Search Recipes...");
        else
            setPlaceHolder("Search Users...");
    }

    const search = (e) => {
        e.preventDefault()
        // hardcoded for now, but in future will use an API call
        var results = recipes.filter(recipe => {
            return recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) || recipe.description.toLowerCase().includes(searchQuery.toLowerCase())
        });
       
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
