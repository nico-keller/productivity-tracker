import http.client
import json
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

api_key = os.getenv("FOOTBALL_API_KEY")
if not api_key:
    raise ValueError("FOOTBALL_API_KEY is not set in the environment variables")

conn = http.client.HTTPSConnection("v3.football.api-sports.io")

headers = {
    'x-rapidapi-host': "v3.football.api-sports.io",
    'x-rapidapi-key': api_key
}

# Dictionary mapping team names to their IDs
teams = {
    "Real Madrid": 541,
    "Bayern Munich": 157
}


def fetch_fixtures(team_name, last=5, next_matches=1):
    """Fetches the last and next matches for a given team."""
    if team_name not in teams:
        raise ValueError(f"Team '{team_name}' not found in the teams dictionary.")

    team_id = teams[team_name]

    # Fetch last matches
    last_matches_endpoint = f"/fixtures?team={team_id}&last={last}"
    conn.request("GET", last_matches_endpoint, headers=headers)
    last_matches_res = conn.getresponse()
    last_matches_data = json.loads(last_matches_res.read().decode("utf-8"))

    # Fetch next matches
    next_matches_endpoint = f"/fixtures?team={team_id}&next={next_matches}"
    conn.request("GET", next_matches_endpoint, headers=headers)
    next_matches_res = conn.getresponse()
    next_matches_data = json.loads(next_matches_res.read().decode("utf-8"))

    return {
        "last_matches": last_matches_data.get('response', []),
        "next_match": next_matches_data.get('response', [])[0] if next_matches_data.get('response') else None
    }
