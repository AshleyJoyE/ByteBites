import React, { useEffect, useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import styles from "./Styles/ReviewCard.module.css";

const ReviewCard = ({ review }) => {
    const [author, setAuthor] = useState('');

    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const userResponse = await fetch(`http://localhost:3010/api/getUserByObjectId?id=${encodeURIComponent(review.reviewer_id)}`, {
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

        fetchUsername();
    }, [review.reviewer_id]);

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
                <h3 className={styles.reviewTitle}>{review.title}</h3>
                <div className={styles.rating}>
                    {renderStars(review.rating)}
                </div>
            </div>
            <p className={styles.author}><strong>Author:</strong> {author}</p>
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
