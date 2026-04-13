#!/usr/bin/env python3
"""
Roofing Lead Scraper — by State
Uses Google Places API (New) to find roofing contractors
Qualifies by review count: 30-200 reviews
Outputs a CSV of ready-to-contact leads

Usage:
    python scraper.py "North Carolina"
    python scraper.py "Texas"
    python scraper.py "Florida"

Requirements:
    pip install requests
"""

import csv
import sys
import time
import requests
from datetime import datetime

# ── Config ─────────────────────────────────────────────────────────────────
GOOGLE_API_KEY = "AIzaSyBtORloWXW_TnQcjfnjoewS9fRagdmzT5I"

MIN_REVIEWS = 30    # Minimum Google reviews
MAX_REVIEWS = 200   # Maximum Google reviews
# ───────────────────────────────────────────────────────────────────────────

PLACES_SEARCH_URL  = "https://places.googleapis.com/v1/places:searchText"
PLACES_DETAILS_URL = "https://places.googleapis.com/v1/places/{place_id}"

# Major cities per state to ensure broad coverage
STATE_CITIES = {
    "Alabama": ["Birmingham", "Montgomery", "Huntsville", "Mobile", "Tuscaloosa"],
    "Arizona": ["Phoenix", "Tucson", "Mesa", "Chandler", "Scottsdale"],
    "Arkansas": ["Little Rock", "Fort Smith", "Fayetteville", "Springdale"],
    "California": ["Los Angeles", "San Diego", "San Jose", "San Francisco", "Fresno", "Sacramento"],
    "Colorado": ["Denver", "Colorado Springs", "Aurora", "Fort Collins"],
    "Connecticut": ["Bridgeport", "New Haven", "Hartford", "Stamford"],
    "Florida": ["Jacksonville", "Miami", "Tampa", "Orlando", "St. Petersburg"],
    "Georgia": ["Atlanta", "Augusta", "Columbus", "Savannah", "Athens"],
    "Idaho": ["Boise", "Meridian", "Nampa", "Idaho Falls"],
    "Illinois": ["Chicago", "Aurora", "Rockford", "Joliet", "Naperville"],
    "Indiana": ["Indianapolis", "Fort Wayne", "Evansville", "South Bend"],
    "Iowa": ["Des Moines", "Cedar Rapids", "Davenport", "Sioux City"],
    "Kansas": ["Wichita", "Overland Park", "Kansas City", "Topeka"],
    "Kentucky": ["Louisville", "Lexington", "Bowling Green", "Owensboro"],
    "Louisiana": ["New Orleans", "Baton Rouge", "Shreveport", "Lafayette"],
    "Maryland": ["Baltimore", "Frederick", "Rockville", "Gaithersburg"],
    "Massachusetts": ["Boston", "Worcester", "Springfield", "Lowell"],
    "Michigan": ["Detroit", "Grand Rapids", "Warren", "Sterling Heights", "Lansing"],
    "Minnesota": ["Minneapolis", "Saint Paul", "Rochester", "Duluth"],
    "Mississippi": ["Jackson", "Gulfport", "Southaven", "Hattiesburg"],
    "Missouri": ["Kansas City", "Saint Louis", "Springfield", "Columbia"],
    "Nevada": ["Las Vegas", "Henderson", "Reno", "North Las Vegas"],
    "New Jersey": ["Newark", "Jersey City", "Paterson", "Elizabeth"],
    "New York": ["New York City", "Buffalo", "Rochester", "Yonkers", "Syracuse"],
    "North Carolina": ["Raleigh", "Charlotte", "Greensboro", "Durham", "Winston-Salem", "Fayetteville", "Cary", "Wilmington"],
    "Ohio": ["Columbus", "Cleveland", "Cincinnati", "Toledo", "Akron"],
    "Oklahoma": ["Oklahoma City", "Tulsa", "Norman", "Broken Arrow"],
    "Oregon": ["Portland", "Salem", "Eugene", "Gresham"],
    "Pennsylvania": ["Philadelphia", "Pittsburgh", "Allentown", "Erie"],
    "South Carolina": ["Columbia", "Charleston", "North Charleston", "Greenville"],
    "Tennessee": ["Nashville", "Memphis", "Knoxville", "Chattanooga"],
    "Texas": ["Houston", "San Antonio", "Dallas", "Austin", "Fort Worth", "El Paso", "Arlington", "Corpus Christi"],
    "Virginia": ["Virginia Beach", "Norfolk", "Chesapeake", "Richmond", "Newport News"],
    "Washington": ["Seattle", "Spokane", "Tacoma", "Vancouver", "Bellevue"],
    "Wisconsin": ["Milwaukee", "Madison", "Green Bay", "Kenosha"],
}


def search_roofing_contractors(city, state):
    """Search Google Places (New API) for roofing contractors in a city."""
    headers = {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": GOOGLE_API_KEY,
        "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress,places.rating,places.userRatingCount,nextPageToken"
    }

    businesses = []
    next_page_token = None

    for _ in range(3):  # Up to 3 pages = 60 results per city
        body = {
            "textQuery": f"roofing contractor {city} {state}",
            "maxResultCount": 20
        }
        if next_page_token:
            body["pageToken"] = next_page_token
            time.sleep(2)  # Required delay for pageToken

        try:
            r = requests.post(PLACES_SEARCH_URL, headers=headers, json=body, timeout=30)
            data = r.json()

            if r.status_code != 200:
                print(f"  Places API error {r.status_code}: {data.get('error', {}).get('message', r.text)}")
                break

            for place in data.get("places", []):
                businesses.append({
                    "place_id":     place.get("id"),
                    "name":         place.get("displayName", {}).get("text", ""),
                    "review_count": place.get("userRatingCount", 0),
                    "rating":       place.get("rating", ""),
                    "address":      place.get("formattedAddress", ""),
                    "city":         city,
                    "state":        state
                })

            next_page_token = data.get("nextPageToken")
            if not next_page_token:
                break

        except Exception as e:
            print(f"  Search error: {e}")
            break

    return businesses


def get_place_details(place_id):
    """Get website and phone from Google Places (New API)."""
    try:
        url = PLACES_DETAILS_URL.format(place_id=place_id)
        headers = {
            "X-Goog-Api-Key": GOOGLE_API_KEY,
            "X-Goog-FieldMask": "websiteUri,nationalPhoneNumber"
        }
        r = requests.get(url, headers=headers, timeout=30)
        result = r.json()
        return {
            "website": result.get("websiteUri", ""),
            "phone":   result.get("nationalPhoneNumber", "")
        }
    except Exception as e:
        print(f"  Details error: {e}")
        return {"website": "", "phone": ""}


def main(state):
    print(f"\n{'='*55}")
    print(f"  Roofing Lead Scraper — {state}")
    print(f"  Criteria: {MIN_REVIEWS}–{MAX_REVIEWS} Google reviews")
    print(f"{'='*55}\n")

    cities = STATE_CITIES.get(state, [state])
    all_businesses = []
    seen_ids = set()

    # ── Step 1: Search each city ──────────────────────────────────────
    for city in cities:
        print(f"Searching {city}, {state}...")
        results = search_roofing_contractors(city, state)

        new = 0
        for biz in results:
            if biz["place_id"] not in seen_ids:
                seen_ids.add(biz["place_id"])
                all_businesses.append(biz)
                new += 1

        print(f"  +{new} unique businesses (total: {len(all_businesses)})")
        time.sleep(1)

    print(f"\nTotal unique businesses: {len(all_businesses)}")

    # ── Step 2: Filter by review count ───────────────────────────────
    qualified = [
        b for b in all_businesses
        if MIN_REVIEWS <= (b.get("review_count") or 0) <= MAX_REVIEWS
    ]
    print(f"With {MIN_REVIEWS}–{MAX_REVIEWS} reviews: {len(qualified)}\n")

    if not qualified:
        print("No businesses passed the review filter.")
        return []

    # ── Step 3: Get website + phone for each ─────────────────────────
    print("Fetching website and phone details...\n")
    leads = []

    for i, biz in enumerate(qualified):
        name    = biz.get("name", "Unknown")
        reviews = biz.get("review_count", 0)

        print(f"[{i+1}/{len(qualified)}] {name} — {reviews} reviews")

        details = get_place_details(biz["place_id"])
        website = details.get("website", "")
        phone   = details.get("phone", "")

        if not website:
            print(f"  No website — skipping\n")
            continue

        print(f"  Website: {website}\n")

        leads.append({
            "name":         name,
            "phone":        phone,
            "website":      website,
            "address":      biz.get("address", ""),
            "city":         biz.get("city", ""),
            "review_count": reviews,
            "rating":       biz.get("rating", ""),
            "state":        state
        })

        time.sleep(0.5)

    # ── Step 4: Save CSV ──────────────────────────────────────────────
    if leads:
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename  = f"leads_{state.replace(' ', '_')}_{timestamp}.csv"

        fieldnames = ["name", "phone", "website", "address", "city", "review_count", "rating", "state"]

        with open(filename, "w", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(leads)

        print(f"\n{'='*55}")
        print(f"  DONE — {len(leads)} qualified leads")
        print(f"  Saved to: {filename}")
        print(f"{'='*55}\n")
    else:
        print("\nNo qualified leads found.\n")

    return leads


if __name__ == "__main__":
    state = " ".join(sys.argv[1:]) if len(sys.argv) > 1 else "North Carolina"
    main(state)
