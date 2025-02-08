import React, { useState, useEffect } from 'react';


const NewsComponent = () => {
    const [newsData, setNewsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getNews = async () => {

        const url = 'https://www.alphavantage.co/query?function=NEWS_SENTIMENT&financial_markets&apikey='

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();

            // Check for API error messages
            if (data['Error Message']) {
                throw new Error(data['Error Message']);
            }

            // Check if 'feed' exists and is an array
            if (data === null) {
                throw new Error('Invalid data format: missing feed');
            }

            setNewsData(data);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const createNews = (newsData) => {
        if (Array.isArray(newsData) && newsData.length > 0) {
            return newsData.map((item, index) => (
                <div key={index} className="news-item">
                    <h3>{item.title}</h3>
                    <p>{item.summary}</p>
                    <p><strong>Authors:</strong> {item.authors?.join(", ") || 'N/A'}</p>
                    <p><strong>Source:</strong> {item.source}</p>
                    <p><strong>Sentiment:</strong> {item.overall_sentiment_label}</p>
                    <p><strong>Published:</strong> {new Date(item.time_published).toLocaleString()}</p>
                    {item.banner_image && <img src={item.banner_image} alt={item.title} />}
                    <a href={item.url} target="_blank" rel="noopener noreferrer">Read more</a>
                </div>
            ));
        } else {
            return <pre>{JSON.stringify(newsData, null, 2)}</pre>;
        }
    };

    useEffect(() => {
        getNews();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>News Sentiment</h2>
            {/* {createNews(newsData)} */}
            <pre>{JSON.stringify(newsData, null, 2)}</pre>
        </div>
    );
};

export default NewsComponent;