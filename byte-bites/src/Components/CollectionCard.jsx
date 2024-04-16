import { useEffect, useState } from "react";
import styles from "./Styles/CollectionCard.module.css";
import { useNavigate } from 'react-router-dom';



export default function Collection({collection}){

    const navigate = useNavigate();
    const handleNavigateCollection = () => {
        //navigate(`/Recipe/${recipe.title}`, { state: { recipe: recipe } });
    }
    return (
        <div className={styles.collection_card}>
            <p className={styles.collection_title}>{collection.collectionName}</p>
            <p className={styles.collection_author}>@{collection.author}</p>
            <a className={styles.view_btn} onClick={handleNavigateCollection}>View collection</a>
        </div>
    )
}