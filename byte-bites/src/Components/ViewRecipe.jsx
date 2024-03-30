import { useEffect, useState } from "react";
import styles from "./Styles/ViewRecipe.module.css";
import { useNavigate } from 'react-router-dom';

function ViewRecipe() {
    return (
        <div>
            <p className={styles.header}>
                Chocolate Chip Cookies
            </p>
        </div>
    );
}

export default ViewRecipe;
