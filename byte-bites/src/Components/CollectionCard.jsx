import { useEffect, useState } from "react";
import styles from "./Styles/CollectionCard.module.css";
import { useNavigate } from 'react-router-dom';



export default function Collection({collection}){

    const navigate = useNavigate();
    const handleNavigateCollection = () => {
        navigate(`/Collection/${collection._id}`, { state: { collection: collection } });
    }
    return (
        <div className={styles.collection_card}>
            <label className={styles.collection_title}>{collection.collectionName}</label>
            <p className={styles.collection_author}>@{collection.author}</p>
            <a className={styles.view_btn} onClick={handleNavigateCollection}><center>View Collection</center></a>
        </div>
    )
}