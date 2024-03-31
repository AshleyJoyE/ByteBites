import { useEffect, useState } from "react";
import styles from "./Styles/ViewRecipe.module.css";
import { useNavigate } from 'react-router-dom';

function ViewRecipe() {
    return (
        <div className={styles.heading}>
            <div className={styles.orangebox}>
                <p className={styles.header}>
                    Chocolate Chip Cookies
                </p>
                <img className={styles.img_cookies} src="https://handletheheat.com/wp-content/uploads/2020/10/BAKERY-STYLE-CHOCOLATE-CHIP-COOKIES-9-637x637-1.jpg">
                </img>
                <img className={styles.img_star1} src="https://upload.wikimedia.org/wikipedia/commons/6/61/Black_bordered_yellow_star.svg">
                </img>
                <img className={styles.img_star2} src="https://upload.wikimedia.org/wikipedia/commons/6/61/Black_bordered_yellow_star.svg">
                </img>
                <img className={styles.img_star3} src="https://upload.wikimedia.org/wikipedia/commons/6/61/Black_bordered_yellow_star.svg">
                </img>
                <img className={styles.img_star4} src="https://upload.wikimedia.org/wikipedia/commons/6/61/Black_bordered_yellow_star.svg">
                </img>
                <img className={styles.img_star5} src="https://upload.wikimedia.org/wikipedia/commons/8/82/Black_bordered_white_star.svg">
                </img>
                <img className={styles.img_bookmark} src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Bookmark-solid.svg">
                </img>
                <p className={styles.rating}>
                    4/5
                </p>
                <div className={styles.username}>
                        <p> @HELLOPPL </p>
                </div>
                <div className={styles.time_desc}>
                        <p> <br />PREP TIME: <strong>15 mins</strong> | COOK TIME: <strong>15 mins</strong> | TOTAL TIME: <strong>30 mins</strong></p>
                        <hr />
                        <p><strong>Taste:</strong> Full of sweet butterscotch & chocolate flavors, exactly how a chocolate chip <br /> cookie should taste! <br /> 
                        <strong>Texture:</strong> Thick and chock full of gooey chocolate with slightly crisp edges. <br />
                        <strong>Ease:</strong> No special ingredients, equipment, or skills needed! <br />
                        <strong>Pros:</strong> Easy everyday delightful chocolate chip cookie recipe. I think you’ll love this one. <br />
                        <strong>Cons:</strong> None. <br />
                        <strong>Would I make this again?</strong> I’ve already made this recipe many times and have the dough <br /> in my freezer for when the craving strikes.</p>
                        <hr />
                        <p>TYPE: Dessert</p>
                        <hr />
                </div>
                <div className={styles.serving_ct}>
                <p>SERVINGS: Makes 26 cookies</p>
                </div>
                <div className={styles.ingredients}>
                <p> <center><strong>INGREDIENTS</strong></center> <br />
                - 3 cups (380 grams) all-purpose flour <br />
                - 1 teaspoon baking soda <br />
                - 1 teaspoon fine sea salt <br />
                - 2 sticks (227 grams) unsalted butter, at cool room temperature (67°F) <br />
                - 1/2 cup (100 grams) granulated sugar <br />
                - 1 1/4 cups (247 grams) lightly packed light brown sugar <br />
                - 2 teaspoons vanilla <br />
                - 2 large eggs, at room temperature <br />
                - 2 cups (340 grams) semisweet chocolate chips </p>
                </div>

                <div className={styles.instructions}>
                <p> <center><strong>INSTRUCTIONS</strong></center> <br />
                1. Preheat oven to 350ºF. Line baking sheets with parchment paper. <br />
                2. In a medium bowl, combine the flour, baking soda, and salt. <br />
                3. In the bowl of an electric mixer, beat the butter, granulated sugar, and brown sugar until creamy, about 2 minutes. Add the vanilla and eggs. Gradually beat in the flour mixture. Stir in the chocolate chips. <br />
                4. If time permits, wrap dough in plastic wrap and refrigerate for at least 24 hours but no more than 72 hours. This allows the dough to “marinate” and makes the cookies thicker, chewier, and more flavorful. Let dough sit at room temperature just until it is soft enough to scoop. <br />
                5. Divide the dough into 3-tablespoon sized balls using a large cookie scoop and drop onto prepared baking sheets. <br />
                6. Bake for 11-13 minutes, or until golden brown. Cool for 5 minutes before removing to wire racks to cool completely. <br />
                7. Although I prefer cookies fresh from the oven, these can be stored in an airtight container for up to 3 days.</p>
                </div>
            </div>
        </div>
    );
}

export default ViewRecipe;
