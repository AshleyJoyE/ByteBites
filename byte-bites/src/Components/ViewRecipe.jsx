import { useEffect, useState } from "react";
import styles from "./Styles/ViewRecipe.module.css";
import { useNavigate } from 'react-router-dom';
import NavBar from "./NavBar";

function ViewRecipe() {
    return (
        <div className={styles.div_view_recipe}>
            <div className={styles.nav_bar}>
                <NavBar></NavBar>
            </div>
            <div className={styles.div_gen_info}>
                <div className={styles.div_name_bkmk}>

                </div>
                <p className={styles.p_author}></p>
                <div className={styles.div_times}>

                </div>
                <div className={styles.div_serve_cal}>

                </div>
                <p className={styles.p_description}> </p>


            </div>
            <div className={styles.div_tags_stars}>
                <div className={styles.div_tags}>

                </div>
                <div className={styles.div_stars}>

                </div>

            </div>
          
            <div className={styles.div_ingredients}>

            </div>
            <div className={styles.div_directions}>

            </div>
            <div className={styles.div_review}>
                <div className={styles.div_rev_title_stars}>
                    <div className={styles.div_review_header_subject}>

                    </div>
                    <div className={styles.div_review_stars}>

                    </div>

                </div>
                <div className={styles.div_comment_post}>

                </div>
            </div>

        </div>
    );
}

export default ViewRecipe;
