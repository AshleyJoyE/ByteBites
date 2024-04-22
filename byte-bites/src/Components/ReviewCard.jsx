import React, { useEffect, useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import styles from "./Styles/ReviewCard.module.css";
import { useNavigate } from 'react-router-dom';
import { AiFillDelete } from "react-icons/ai";

const ReviewCard = ({ review }) => {
    const [author, setAuthor] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAuthor, setIsAuthor] = useState(false);
    const [yourId, setYourId] = useState();
    const navigate = useNavigate();
    const [refreshTimestamp, setRefreshTimestamp] = useState(Date.now());
    const handleRecipeNav = () => navigate(`/Recipe/${review.recipe_id}`);

    const handleDeleteReview = async () => {
        const confirmDelete = window.confirm(`Are you sure you want to delete "${review.title}"?`);
        if (confirmDelete) {
            try {
                const deleteResponse = await fetch(`https://bytebites-bzpd.onrender.com/api/deleteReview/${review._id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (deleteResponse.ok) {
                    handleRecipeNav();
                } else {
                    console.error('Failed to delete review');
                }
            } catch (error) {
                console.error('Error deleting review:', error);
            }
        }
    };

    

    useEffect(() => {
        const fetchUsername = async () => {
            try {
                setIsAuthor(review.reviewer_id === yourId);
                console.log(isAuthor);
                const userResponse = await fetch(`https://bytebites-bzpd.onrender.com/api/getUserByObjectId?id=${encodeURIComponent(review.reviewer_id)}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!userResponse.ok) {
                    console.error(`Failed to fetch user with ObjectId: ${review.reviewer_id}`);
                    return;
                }

                const userData = await userResponse.json();
                setAuthor(userData.username);
            } catch (error) {
                console.error('Error fetching username:', error);
            }
        };
        const currentUser = localStorage.getItem("user");
        const userId = localStorage.getItem("id");
        const admin = localStorage.getItem("isAdmin");
        if (currentUser && userId && admin) {
            setYourId(userId);
            setIsAdmin(admin === "true");
        }
        fetchUsername();
    }, [review.reviewer_id, refreshTimestamp]);

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const emptyStars = 5 - fullStars;

        const starElements = [];
        for (let i = 0; i < fullStars; i++) {
            starElements.push(<FaStar key={i} className={styles.star} />);
        }
        for (let i = 0; i < emptyStars; i++) {
            starElements.push(<FaRegStar key={`empty-${i}`} className={styles.star} />);
        }

        return starElements;
    };

    return (
        <div className={styles.reviewCard}>
            <div className={styles.titleAndStars}>
                <div className={styles.div_trash_reviewTitle}>
                    {(isAuthor || isAdmin) && <AiFillDelete className={styles.trashCan} onClick={handleDeleteReview} />}
                    <h3 className={styles.reviewTitle}>{review.title}</h3>
                </div>
                <div className={styles.rating}>
                    {renderStars(review.rating)}
                </div>
            </div>
            <p className={styles.author}><strong>Author:</strong> <a href={`/Profile/${review.reviewer_id}`}>@{author}</a></p>
            {isAdmin && <label className={styles.author}>Review Object Id: {review._id}</label>}
            {
                review.description && (
                    <div>
                        <p className={styles.description}><strong>Description:</strong></p>
                        <p className={styles.description}>{review.description}</p>
                    </div>
                )
            }
           
        </div>
    );
};

export default ReviewCard;
