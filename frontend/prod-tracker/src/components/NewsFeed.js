import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import './NewsFeed.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function NewsFeed() {
  const [news, setNews] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://127.0.0.1:5000/news');
        setNews(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching news:", error);
        setError("Failed to load news. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    swipeToSlide: true,
    draggable: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  if (loading) {
    return (
      <div className="news-feed-loading">
        <div className="loading-spinner"></div>
        <p>Loading latest news...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="news-feed-error">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="news-feed-container">
      <div className="news-feed-header">

        <h1>Latest News</h1>
      </div>
      <div className="news-categories-wrapper">
        {Object.keys(news).map((category) => (
          <div key={category} className="news-category">
            <div className="category-header">
              <h2>{category}</h2>
              <div className="category-divider"></div>
            </div>
            <div className="slider-container">
              <Slider {...sliderSettings}>
                {news[category].map((article, index) => (
                  <div key={index} className="news-article-wrapper">
                    <div className="news-article">
                      <div className="news-image">
                        <img
                          src={article.urlToImage || "https://via.placeholder.com/400x200"}
                          alt={article.title}
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/400x200";
                          }}
                        />
                      </div>
                      <div className="news-content">
                        <h3>{article.title}</h3>
                        <p className="news-description">{article.description}</p>
                        <div className="news-footer">

                          <a
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="read-more-btn"
                          >
                            Read More →
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsFeed;
