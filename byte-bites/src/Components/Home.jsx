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
    const navigate = useNavigate();

    // hardcoded recipes
    // const recipes = [
    //     {
    //         title: "Spaghetti Carbonara",
    //         author: "SallyJones",
    //         totalTime: "30 minutes",
    //         rating: 2.5,
    //         description: "Classic Italian pasta dish with eggs, pancetta, and Parmesan cheese.",
    //         recipePhoto: "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg",
    //         directions: ["Boil water and cook pasta according to package instructions.", "In a skillet, cook pancetta until crispy.", "In a bowl, whisk together eggs, Parmesan cheese, and black pepper.", "Add cooked pasta to the skillet with pancetta and toss to coat.", "Remove skillet from heat and quickly stir in egg mixture.", "The heat from the pasta will cook the eggs and create a creamy sauce.", "Serve immediately with additional Parmesan cheese and black pepper."],
    //         cookingTime: "15 minutes",
    //         prepTime: "5 minutes",
    //         servings: 2,
    //         tags: ["dinner", "quick-meal"]
    //     },
    //     {
    //         title: "Chicken Tikka Masala",
    //         author: "AwesomeMan18686",
    //         totalTime: "60 minutes",
    //         rating: 4.8,
    //         description: "Creamy Indian chicken curry with aromatic spices and tomato sauce.",
    //         recipePhoto: "https://hips.hearstapps.com/hmg-prod/images/chicken-tikka-masala1-1663341991.jpg?crop=0.9057777777777778xw:1xh;center,top&resize=1200:*",
    //         directions: ["Marinate chicken in yogurt and spices for at least 30 minutes.", "Preheat grill and cook chicken until charred and cooked through.", "In a separate pan, heat oil and sauté onions, garlic, and ginger until softened.", "Add spices and tomato sauce, cooking until fragrant.", "Stir in cream and cooked chicken, simmering until heated through.", "Serve hot with rice and naan bread."],
    //         cookingTime: "35 minutes",
    //         prepTime: "25 minutes",
    //         servings: 4,
    //         tags: ["dinner"]
    //     },
    //     {
    //         title: "Vegetable Stir Fry",
    //         author: "CookingQueen78",
    //         totalTime: "20 minutes",
    //         rating: 3.3,
    //         description: "Quick and healthy stir-fry with colorful vegetables and tofu.",
    //         recipePhoto: "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg",
    //         directions: ["Heat oil in a large skillet or wok over medium-high heat.", "Add tofu and cook until browned on all sides.", "Remove tofu from skillet and set aside.", "Add more oil if needed, then add vegetables to the skillet.", "Stir-fry vegetables until crisp-tender.", "Return tofu to skillet and toss with vegetables.", "Pour in sauce and stir until heated through.", "Serve hot over cooked rice or noodles."],
    //         cookingTime: "10 minutes",
    //         prepTime: "10 minutes",
    //         servings: 4,
    //         tags: ["lunch", "quick-meal"]
    //     },
    //     {
    //         title: "Beef Tacos",
    //         author: "TacoMaster99",
    //         totalTime: "40 minutes",
    //         rating: 3.6,
    //         description: "Mexican street-style tacos with seasoned beef, salsa, and toppings.",
    //         recipePhoto: "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg",
    //         directions: ["In a skillet, cook ground beef until browned.", "Add onions, garlic, and taco seasoning to the skillet, cooking until fragrant.", "Warm taco shells in the oven.", "Assemble tacos with beef, salsa, cheese, lettuce, and other desired toppings."],
    //         cookingTime: "25 minutes",
    //         prepTime: "15 minutes",
    //         servings: 4,
    //         tags: ["dinner"]
    //     },
    //     {
    //         title: "Caprese Salad",
    //         author: "FreshSaladLover",
    //         totalTime: "15 minutes",
    //         rating: 5.0,
    //         description: "Simple Italian salad with fresh tomatoes, mozzarella, basil, and balsamic glaze.",
    //         recipePhoto: "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg",
    //         directions: ["Slice tomatoes and mozzarella cheese into rounds.", "Arrange tomato and mozzarella slices on a platter, alternating and overlapping.", "Sprinkle with fresh basil leaves.", "Drizzle balsamic glaze over the top.", "Season with salt and pepper to taste."],
    //         cookingTime: "0 minutes",
    //         prepTime: "15 minutes",
    //         servings: 4,
    //         tags: ["lunch"]
    //     },
    //     {
    //         title: "Grilled Salmon",
    //         author: "SeafoodEnthusiast",
    //         totalTime: "25 minutes",
    //         rating: 1.7,
    //         description: "Healthy and flavorful salmon fillets grilled to perfection with lemon and herbs.",
    //         recipePhoto: "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg",
    //         directions: ["Preheat grill to medium-high heat.", "Season salmon fillets with salt, pepper, and herbs.", "Grill salmon for 4-5 minutes on each side, or until cooked through.", "Squeeze fresh lemon juice over the top before serving."],
    //         cookingTime: "10 minutes",
    //         prepTime: "15 minutes",
    //         servings: 2,
    //         tags: ["dinner", "quick-meal"]
    //     },
    //     {
    //         title: "Mushroom Risotto",
    //         author: "RisottoFanatic",
    //         totalTime: "45 minutes",
    //         rating: 2.4,
    //         description: "Creamy Italian rice dish cooked with mushrooms, onions, and Parmesan cheese.",
    //         recipePhoto: "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg",
    //         directions: ["In a large skillet, sauté onions and garlic in olive oil until softened.", "Add Arborio rice and cook until translucent.", "Gradually add chicken broth, stirring constantly, until rice is cooked through and creamy.", "Stir in cooked mushrooms and Parmesan cheese.", "Season with salt and pepper to taste.", "Serve hot, garnished with chopped parsley."],
    //         cookingTime: "30 minutes",
    //         prepTime: "15 minutes",
    //         servings: 4,
    //         tags: ["dinner"]
    //     },
    //     {
    //         title: "Shrimp Scampi",
    //         author: "ShrimpLover123",
    //         totalTime: "30 minutes",
    //         rating: 4.6,
    //         description: "Buttery garlic shrimp served over pasta, perfect for a quick weeknight dinner.",
    //         recipePhoto: "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg",
    //         directions: ["Cook pasta according to package instructions.", "In a skillet, melt butter and olive oil over medium heat.", "Add minced garlic and sauté until fragrant.", "Add shrimp to the skillet and cook until pink and opaque.", "Stir in lemon juice, white wine, and red pepper flakes.", "Toss cooked pasta with shrimp and sauce.", "Serve hot, garnished with chopped parsley and grated Parmesan cheese."],
    //         cookingTime: "20 minutes",
    //         prepTime: "10 minutes",
    //         servings: 4,
    //         tags: ["dinner", "quick-meal"]
    //     },
    //     {
    //         title: "Beef Burgers",
    //         author: "BurgerChef87",
    //         totalTime: "35 minutes",
    //         rating: 4.5,
    //         description: "Juicy beef patties grilled to perfection and served with your favorite toppings.",
    //         recipePhoto: "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg",
    //         directions: ["Preheat grill to medium-high heat.", "Season ground beef with salt, pepper, and desired spices.", "Form beef into patties and grill for 4-5 minutes on each side, or until cooked to your liking.", "Toast burger buns on the grill until lightly golden.", "Assemble burgers with toppings and condiments of your choice."],
    //         cookingTime: "20 minutes",
    //         prepTime: "15 minutes",
    //         servings: 4,
    //         tags: ["lunch", "dinner"]
    //     },
    //     {
    //         title: "Chicken Caesar Salad",
    //         author: "SaladCraver55",
    //         totalTime: "20 minutes",
    //         rating: 3.3,
    //         description: "Classic salad with grilled chicken, crisp lettuce, croutons, and Caesar dressing.",
    //         recipePhoto: "https://tastefullygrace.com/wp-content/uploads/2023/03/Blog-Chicken-Caesar-Salad-1-scaled.jpg",
    //         directions: ["Grill chicken until cooked through, then slice into strips.", "In a large bowl, toss together chopped romaine lettuce, croutons, and Parmesan cheese.", "Add grilled chicken strips to the salad.", "Drizzle Caesar dressing over the top and toss until evenly coated.", "Serve immediately, garnished with additional Parmesan cheese and black pepper."],
    //         cookingTime: "15 minutes",
    //         prepTime: "5 minutes",
    //         servings: 4,
    //         tags: ["lunch"]
    //     },
    //     {
    //         title: "Pasta Primavera",
    //         author: "PastaLover22",
    //         totalTime: "25 minutes",
    //         rating: 4.1,
    //         description: "Delicious pasta dish loaded with seasonal vegetables and a light cream sauce.",
    //         recipePhoto: "https://www.twopeasandtheirpod.com/wp-content/uploads/2019/05/Pasta-Primavera-3.jpg",
    //         directions: ["Cook pasta according to package instructions.", "In a large skillet, sauté vegetables in olive oil until crisp-tender.", "Stir in cooked pasta and cream sauce, heating until warmed through.", "Season with salt, pepper, and grated Parmesan cheese to taste.", "Serve hot, garnished with chopped fresh herbs."],
    //         cookingTime: "15 minutes",
    //         prepTime: "10 minutes",
    //         servings: 4,
    //         tags: ["dinner", "quick-meal"]
    //     },
    //     {
    //         title: "Honey Garlic Chicken",
    //         author: "SweetNSavoryCook",
    //         totalTime: "35 minutes",
    //         rating: 4.7,
    //         description: "Sweet and savory chicken thighs cooked in a flavorful honey garlic sauce.",
    //         recipePhoto: "https://hips.hearstapps.com/hmg-prod/images/chicken-tikka-masala1-1663341991.jpg?crop=0.9057777777777778xw:1xh;center,top&resize=1200:*",
    //         directions: ["Season chicken thighs with salt and pepper.", "In a skillet, brown chicken on both sides.", "In a bowl, mix together honey, soy sauce, garlic, ginger, and chili flakes.", "Pour sauce over chicken and simmer until cooked through.", "Serve hot, garnished with chopped green onions and sesame seeds."],
    //         cookingTime: "25 minutes",
    //         prepTime: "10 minutes",
    //         servings: 4,
    //         tags: ["dinner"]
    //     },
    //     {
    //         title: "Beef Stew",
    //         author: "StewMaster5000",
    //         totalTime: "120 minutes",
    //         rating: 2.9,
    //         description: "Hearty and comforting stew made with tender beef, potatoes, carrots, and herbs.",
    //         recipePhoto: "https://sugarspunrun.com/wp-content/uploads/2022/12/Beef-Stew-recipe-1-of-1.jpg",
    //         directions: ["Season beef with salt and pepper, then brown in a large pot.", "Add onions, carrots, potatoes, and herbs to the pot.", "Pour in beef broth and red wine, stirring to combine.", "Simmer stew over low heat for 1-2 hours, or until beef is tender and flavors are blended.", "Serve hot, garnished with chopped parsley."],
    //         cookingTime: "90 minutes",
    //         prepTime: "30 minutes",
    //         servings: 6,
    //         tags: ["dinner"]
    //     },
    //     {
    //         title: "Vegetable Curry",
    //         author: "CurryLover99",
    //         totalTime: "50 minutes",
    //         rating: 3.4,
    //         description: "Flavorful Indian curry loaded with mixed vegetables and served with rice or naan.",
    //         recipePhoto: "https://simply-delicious-food.com/wp-content/uploads/2020/09/Creamy-vegetable-curry-4.jpg",
    //         directions: ["In a large pot, heat oil and sauté onions, garlic, and ginger until softened.", "Add curry paste and cook until fragrant.", "Stir in coconut milk, vegetables, and chickpeas.", "Simmer curry until vegetables are tender and sauce has thickened.", "Serve hot, garnished with chopped cilantro and lime wedges."],
    //         cookingTime: "30 minutes",
    //         prepTime: "20 minutes",
    //         servings: 4,
    //         tags: ["dinner"]
    //     },
    //     {
    //         title: "Lemon Herb Roast Chicken",
    //         author: "RoastChickenChef",
    //         totalTime: "90 minutes",
    //         rating: 1.6,
    //         description: "Whole chicken seasoned with lemon, garlic, and herbs, roasted until golden brown.",
    //         recipePhoto: "https://s23209.pcdn.co/wp-content/uploads/2018/06/211129_DAMN-DELICIOUS_Lemon-Herb-Roasted-Chx_059-760x1140.jpg",
    //         directions: ["Preheat oven to 375°F (190°C).", "Rub chicken with olive oil, lemon zest, minced garlic, and chopped herbs.", "Season chicken generously with salt and pepper.", "Place chicken on a roasting rack in a roasting pan.", "Roast chicken for 1-1.5 hours, or until juices run clear and skin is golden brown.", "Let chicken rest for 10 minutes before carving.", "Serve hot, garnished with fresh herbs and lemon wedges."],
    //         cookingTime: "60 minutes",
    //         prepTime: "30 minutes",
    //         servings: 4,
    //         tags: ["dinner"]
    //     }
    // ];
    const recipes = [
        {
            title: "Spaghetti Carbonara",
            author: "SallyJones",
            totalTime: "30 minutes",
            rating: 2.5,
            description: "Classic Italian pasta dish with eggs, pancetta, and Parmesan cheese.",
            recipePhoto: "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg",
            directions: ["Boil water and cook pasta according to package instructions.", "In a skillet, cook pancetta until crispy.", "In a bowl, whisk together eggs, Parmesan cheese, and black pepper.", "Add cooked pasta to the skillet with pancetta and toss to coat.", "Remove skillet from heat and quickly stir in egg mixture.", "The heat from the pasta will cook the eggs and create a creamy sauce.", "Serve immediately with additional Parmesan cheese and black pepper."],
            cookingTime: "15 minutes",
            prepTime: "5 minutes",
            servings: 2,
            tags: ["dinner", "quick-meal"],
            ingredients: [
                "200g spaghetti",
                "100g pancetta, diced",
                "2 large eggs",
                "50g grated Parmesan cheese",
                "Freshly ground black pepper"
            ]
        },
        {
            title: "Chicken Tikka Masala",
            author: "AwesomeMan18686",
            totalTime: "60 minutes",
            rating: 4.8,
            description: "Creamy Indian chicken curry with aromatic spices and tomato sauce.",
            recipePhoto: "https://hips.hearstapps.com/hmg-prod/images/chicken-tikka-masala1-1663341991.jpg?crop=0.9057777777777778xw:1xh;center,top&resize=1200:*",
            directions: ["Marinate chicken in yogurt and spices for at least 30 minutes.", "Preheat grill and cook chicken until charred and cooked through.", "In a separate pan, heat oil and sauté onions, garlic, and ginger until softened.", "Add spices and tomato sauce, cooking until fragrant.", "Stir in cream and cooked chicken, simmering until heated through.", "Serve hot with rice and naan bread."],
            cookingTime: "35 minutes",
            prepTime: "25 minutes",
            servings: 4,
            tags: ["dinner"],
            ingredients: [
                "500g chicken breast, cut into bite-sized pieces",
                "200g plain yogurt",
                "2 tablespoons tikka masala spice blend",
                "1 onion, finely chopped",
                "2 cloves garlic, minced",
                "1-inch piece ginger, grated",
                "200ml tomato sauce",
                "100ml heavy cream",
                "Salt to taste",
                "Fresh cilantro for garnish"
            ]
        },
        {
            title: "Vegetable Stir Fry",
            author: "CookingQueen78",
            totalTime: "20 minutes",
            rating: 3.3,
            description: "Quick and healthy stir-fry with colorful vegetables and tofu.",
            recipePhoto: "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg",
            directions: ["Heat oil in a large skillet or wok over medium-high heat.", "Add tofu and cook until browned on all sides.", "Remove tofu from skillet and set aside.", "Add more oil if needed, then add vegetables to the skillet.", "Stir-fry vegetables until crisp-tender.", "Return tofu to skillet and toss with vegetables.", "Pour in sauce and stir until heated through.", "Serve hot over cooked rice or noodles."],
            cookingTime: "10 minutes",
            prepTime: "10 minutes",
            servings: 4,
            tags: ["lunch", "quick-meal"],
            ingredients: [
                "200g firm tofu, cubed",
                "2 tablespoons vegetable oil",
                "2 cups mixed vegetables (bell peppers, broccoli, carrots, snow peas, etc.)",
                "1/4 cup soy sauce",
                "2 tablespoons hoisin sauce",
                "1 tablespoon rice vinegar",
                "1 tablespoon honey",
                "1 teaspoon sesame oil",
                "2 cloves garlic, minced",
                "1-inch piece ginger, grated",
                "Cooked rice or noodles for serving"
            ]
        },
        {
            title: "Beef Tacos",
            author: "TacoMaster99",
            totalTime: "40 minutes",
            rating: 3.6,
            description: "Mexican street-style tacos with seasoned beef, salsa, and toppings.",
            recipePhoto: "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg",
            directions: ["In a skillet, cook ground beef until browned.", "Add onions, garlic, and taco seasoning to the skillet, cooking until fragrant.", "Warm taco shells in the oven.", "Assemble tacos with beef, salsa, cheese, lettuce, and other desired toppings."],
            cookingTime: "25 minutes",
            prepTime: "15 minutes",
            servings: 4,
            tags: ["dinner"],
            ingredients: [
                "500g ground beef",
                "1 onion, finely chopped",
                "2 cloves garlic, minced",
                "2 tablespoons taco seasoning",
                "8 taco shells",
                "1 cup salsa",
                "1 cup shredded cheese",
                "1 cup shredded lettuce",
                "Additional toppings as desired (sour cream, avocado, cilantro, etc.)"
            ]
        },
        {
            title: "Caprese Salad",
            author: "FreshSaladLover",
            totalTime: "15 minutes",
            rating: 5.0,
            description: "Simple Italian salad with fresh tomatoes, mozzarella, basil, and balsamic glaze.",
            recipePhoto: "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg",
            directions: ["Slice tomatoes and mozzarella cheese into rounds.", "Arrange tomato and mozzarella slices on a platter, alternating and overlapping.", "Sprinkle with fresh basil leaves.", "Drizzle balsamic glaze over the top.", "Season with salt and pepper to taste."],
            cookingTime: "0 minutes",
            prepTime: "15 minutes",
            servings: 4,
            tags: ["lunch"],
            ingredients: [
                "2 large tomatoes",
                "200g fresh mozzarella cheese",
                "Fresh basil leaves",
                "Balsamic glaze",
                "Salt and pepper to taste"
            ]
        },
        {
            title: "Grilled Salmon",
            author: "SeafoodEnthusiast",
            totalTime: "25 minutes",
            rating: 1.7,
            description: "Healthy and flavorful salmon fillets grilled to perfection with lemon and herbs.",
            recipePhoto: "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg",
            directions: ["Preheat grill to medium-high heat.", "Season salmon fillets with salt, pepper, and herbs.", "Grill salmon for 4-5 minutes on each side, or until cooked through.", "Squeeze fresh lemon juice over the top before serving."],
            cookingTime: "10 minutes",
            prepTime: "15 minutes",
            servings: 2,
            tags: ["dinner", "quick-meal"],
            ingredients: [
                "2 salmon fillets",
                "Salt and pepper to taste",
                "1 tablespoon olive oil",
                "1 tablespoon chopped fresh herbs (such as dill, parsley, or thyme)",
                "1 lemon, sliced"
            ]
        },
        {
            title: "Mushroom Risotto",
            author: "RisottoFanatic",
            totalTime: "45 minutes",
            rating: 2.4,
            description: "Creamy Italian rice dish cooked with mushrooms, onions, and Parmesan cheese.",
            recipePhoto: "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg",
            directions: ["In a large skillet, sauté onions and garlic in olive oil until softened.", "Add Arborio rice and cook until translucent.", "Gradually add chicken broth, stirring constantly, until rice is cooked through and creamy.", "Stir in cooked mushrooms and Parmesan cheese.", "Season with salt and pepper to taste.", "Serve hot, garnished with chopped parsley."],
            cookingTime: "30 minutes",
            prepTime: "15 minutes",
            servings: 4,
            tags: ["dinner"],
            ingredients: [
                "1 tablespoon olive oil",
                "1 onion, finely chopped",
                "2 cloves garlic, minced",
                "1 cup Arborio rice",
                "4 cups chicken broth, warmed",
                "200g mushrooms, sliced",
                "1/2 cup grated Parmesan cheese",
                "Salt and pepper to taste",
                "Chopped parsley for garnish"
            ]
        }];

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

        navigate(`/results`, { state: { searchResults: results, query: searchQuery } });
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
