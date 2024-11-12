import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import './NewsFeed.css'; // Import custom CSS for styling
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function NewsFeed() {
  const [news, setNews] = useState({});

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/news');
        setNews(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    fetchNews();
  }, []);

  const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4, // Show 4 articles at a time
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2, // Show 2 articles on small screens
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3, // Show 3 articles on medium screens
      },
    },
  ],
};


  return (
    <div className="news-feed">
      <h1>News Feed</h1>
      {Object.keys(news).map((category) => (
        <div key={category} className="news-category">
          <h2>{category}</h2>
          <Slider {...sliderSettings}>
            {news[category].map((article, index) => (
              <div key={index} className="news-article">
                <div className="news-image">
                  <img
                    src={article.urlToImage || "placeholder-image-url.jpg"}
                    alt={article.title}
                  />
                </div>
                <div className="news-content">
                  <h3>{article.title}</h3>
                  <p>{article.description}</p>
                  <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      ))}
    </div>
  );
}

export default NewsFeed;
