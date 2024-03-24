import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [hashedData, setHashedData] = useState(null);

    useEffect(() => {
        const data = 'Hello, world!';

        // Convert the data to a Uint8Array
        const dataBuffer = new TextEncoder().encode(data);

        // Hash the data using SHA-256 algorithm
        crypto.subtle.digest('SHA-256', dataBuffer)
            .then(hashBuffer => {
                // Convert the hash buffer to a hexadecimal string
                const hashedData = Array.from(new Uint8Array(hashBuffer))
                    .map(byte => byte.toString(16).padStart(2, '0'))
                    .join('');

                setHashedData(hashedData);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    return (
        <div>
            <p>Original Data: Hello, world!</p>
            <p>Hashed Data: {hashedData}</p>
        </div>
    );
}

export default Home;
