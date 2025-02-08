import React, { useState, useEffect } from 'react';
import './NewsComponent.css'
import apiKey from './constants';

const NewsComponent = () => {
    const [newsData, setNewsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getNews = async () => {
        const api = apiKey; // Ensure variable name matches

        const url = 'https://api.marketaux.com/v1/news/all?symbols=TSLA,AAPL,SPY,BTC,NVDA&filter_entities=true&language=en&api_token=' + apiKey + "q"; //remove q later

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch data');
            
            const data = await response.json();
            if (data['Error Message']) throw new Error(data['Error Message']);

            setNewsData(data);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };    
    
    useEffect(() => {
        getNews();
    }, []);

    const NewsFeed = ({ data }) => {
        const getSentimentColor = (score) => {
            if (score > 0.3) return '#d4edda';
            if (score < -0.3) return '#f8d7da';
            return '#e2e3e5';
        };

        return (
            <div className="news-container">
                {data.map((item) => (
                    <div key={item.uuid} className="news-card">
                        <div className="news-image">
                            <img src={item.image_url} alt={item.title} />
                        </div>
                        <div className="news-content">
                            <div className="news-source">
                                <span className="source">{item.source}</span>
                                <span className="published-date">
                                    {new Date(item.published_at).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                    })}
                                </span>
                            </div>
                            <h2 className="news-title">{item.title}</h2>
                            <p className="news-description">{item.description}</p>
                            
                            {item.entities?.length > 0 && (
                                <div className="entity-tags">
                                    {item.entities.map((entity, idx) => (
                                        <span 
                                            key={idx}
                                            className="entity-tag"
                                            style={{ backgroundColor: getSentimentColor(entity.sentiment_score) }}
                                        >
                                            {entity.symbol} ({entity.sentiment_score?.toFixed(2)})
                                        </span>
                                    ))}
                                </div>
                            )}

                            <div className="news-highlights">
                                {item.entities?.map((entity, idx) =>
                                    entity.highlights?.map((highlight, hIdx) => (
                                        <details key={`${idx}-${hIdx}`} className="highlight">
                                            <summary>Relevant Excerpt</summary>
                                            <p dangerouslySetInnerHTML={{ __html: highlight.highlight }} />
                                            <small>Sentiment: {highlight.sentiment?.toFixed(2)}</small>
                                        </details>
                                    ))
                                )}
                            </div>

                            <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="read-more"
                            >
                                Read full article →
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="news-wrapper">
            <h2 className="news-sentiment-title">News Sentiment</h2>
            {newsData?.data ? <NewsFeed data={newsData.data} /> : <div>No news available</div>}
        </div>
    );
};

export default NewsComponent;