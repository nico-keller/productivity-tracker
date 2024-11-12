from newsapi import NewsApiClient
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Initialize the News API client
api_key = os.getenv("NEWS_API_KEY")
if not api_key:
    raise ValueError("NEWS_API_KEY is not set in the environment variables")

newsapi = NewsApiClient(api_key=api_key)

def fetch_news():
    """Fetches news articles for specific queries."""
    try:
        sivar_articles = newsapi.get_everything(q='El Salvador, Central America', language='en', sort_by='relevancy', page=1)
        madrid_articles = newsapi.get_everything(q='Real Madrid', language='en', sort_by='relevancy', page=1)
        munich_articles = newsapi.get_everything(q='Bayern Munich', language='en', sort_by='relevancy', page=1)

        # Structure the data for easy access in the frontend
        news_data = {
            "El Salvador": sivar_articles['articles'],
            "Bayern München": munich_articles['articles'],
            "Real Madrid": madrid_articles['articles']

        }
        return news_data
    except Exception as e:
        print("Error fetching news:", str(e))
        return None
