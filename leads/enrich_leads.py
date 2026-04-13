#!/usr/bin/env python3
"""
Lead Enricher — finds emails, owner names, and city competitors
Outputs a send-ready JSON file for Gmail

Usage:
    python enrich_leads.py                     # uses most recent leads CSV, grabs 15
    python enrich_leads.py leads_foo.csv 20    # specific file, specific limit

Requirements:
    pip install requests beautifulsoup4
"""

import csv
import re
import sys
import time
import json
import glob
import requests
from bs4 import BeautifulSoup

GOOGLE_API_KEY = "AIzaSyBtORloWXW_TnQcjfnjoewS9fRagdmzT5I"
PLACES_SEARCH_URL = "https://places.googleapis.com/v1/places:searchText"

EMAIL_BODY = (
    "Hey {first_name} \u2014\n\n"
    'Typed "roofing contractor {city}" into Google this morning. {competitor} is at #1. You\'re on page two.\n\n'
    "That's roughly 40-50 calls a month going to them instead of you.\n\n"
    "I build sites for NC roofers specifically to get them 2-3 extra jobs a month within 90 days.\n\n"
    "Free to talk Thursday?\n\n"
    "\u2014 Joseph"
)

# ── Helpers ────────────────────────────────────────────────────────────────

SCRAPE_HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/120.0.0.0 Safari/537.36"
    )
}

EMAIL_REGEX = re.compile(
    r'[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}'
)

# Domains/patterns that aren't real contact emails
JUNK_EMAIL_PATTERNS = [
    "example", "domain", "sentry", "google", "schema",
    "w3.org", "jquery", "wix", "wordpress", "squarespace",
    "cloudflare", "placeholder", "email.com", "yourdomain",
    "@2x", ".png", ".jpg", ".svg"
]

NAME_NOISE = {
    "roofing", "roof", "construction", "contracting", "contractor",
    "contractors", "builders", "building", "exteriors", "exterior",
    "restoration", "restorations", "services", "service", "solutions",
    "solution", "company", "co", "llc", "inc", "corp", "and", "the",
    "brothers", "sons", "son", "premier", "pro", "elite", "master",
    "masters", "professional", "professionals", "quality", "best",
    "first", "top", "local", "national", "carolina", "carolinas",
    "north", "south", "east", "west", "nc", "systems", "system",
    "group", "team", "home", "homes", "residential", "commercial",
    # common false positives from website text
    "homeowners", "homeowner", "searching", "get", "performance",
    "click", "call", "contact", "free", "now", "today", "our",
    "your", "their", "this", "that", "with", "about", "more",
    "learn", "read", "view", "see", "find", "help", "trust",
    "licensed", "insured", "certified", "award", "serving",
    "welcome", "located", "based", "family", "owned", "operated",
    "years", "experience", "customers", "clients", "projects",
    "request", "estimate", "quote", "inspection", "repair",
    "replace", "install", "installation", "replacement"
}


def get_city_competitor(city, state):
    """Return the #1 Google Places result for 'roofing contractor [city]'."""
    headers = {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": GOOGLE_API_KEY,
        "X-Goog-FieldMask": "places.displayName"
    }
    body = {
        "textQuery": f"roofing contractor {city} {state}",
        "maxResultCount": 3
    }
    try:
        r = requests.post(PLACES_SEARCH_URL, headers=headers, json=body, timeout=15)
        places = r.json().get("places", [])
        if places:
            return places[0].get("displayName", {}).get("text", "")
    except Exception as e:
        print(f"  Competitor lookup error: {e}")
    return ""


def scrape_contact_info(website_url):
    """
    Scrape a website for a contact email and owner first name.
    Returns (email, first_name) — either may be None.
    """
    base = website_url.rstrip("/")
    pages = [
        base,
        base + "/contact",
        base + "/contact-us",
        base + "/about",
        base + "/about-us",
    ]

    found_email = None
    found_name = None

    for url in pages:
        try:
            r = requests.get(url, headers=SCRAPE_HEADERS, timeout=8, allow_redirects=True)
            if r.status_code != 200:
                continue

            html = r.text
            soup = BeautifulSoup(html, "html.parser")

            # ── Find email ──────────────────────────────────────────
            if not found_email:
                # Check mailto links first — most reliable
                for a in soup.find_all("a", href=True):
                    href = a["href"]
                    if href.startswith("mailto:"):
                        candidate = href[7:].split("?")[0].strip()
                        if candidate and not any(j in candidate.lower() for j in JUNK_EMAIL_PATTERNS):
                            found_email = candidate
                            break

                # Fallback: regex scan the visible text
                if not found_email:
                    text = soup.get_text(" ")
                    for candidate in EMAIL_REGEX.findall(text):
                        if not any(j in candidate.lower() for j in JUNK_EMAIL_PATTERNS):
                            found_email = candidate
                            break

            # ── Find owner name ────────────────────────────────────
            if not found_name:
                text_lower = soup.get_text(" ").lower()

                # Look for "my name is X", "I'm X", "owner X", "founder X", "president X"
                name_patterns = [
                    r"(?:my name is|i['']m|owner[,:]?\s|founder[,:]?\s|president[,:]?\s|by\s)([A-Z][a-z]{2,})",
                    r"[-—]\s*([A-Z][a-z]{2,})\s*,?\s*(?:owner|founder|president|ceo|co-owner)",
                    r"([A-Z][a-z]{2,})\s+(?:started|founded|started|built|runs|owned)",
                ]
                full_text = soup.get_text(" ")
                for pat in name_patterns:
                    m = re.search(pat, full_text)
                    if m:
                        candidate = m.group(1).strip()
                        if candidate.lower() not in NAME_NOISE and len(candidate) > 2:
                            found_name = candidate
                            break

            if found_email and found_name:
                break

        except Exception:
            pass

        time.sleep(0.3)

    return found_email, found_name


def extract_name_from_company(company_name):
    """
    Try to pull a first name from the business name itself.
    e.g. "Dana Dean Roofing" → "Dana", "Bob's Roofing" → "Bob"
    """
    # Strip possessives
    clean = company_name.replace("'s", "").replace("'s", "")
    words = clean.split()

    for word in words:
        w = word.strip("',.-&()")
        if (
            len(w) >= 3
            and w.isalpha()
            and w[0].isupper()
            and w.lower() not in NAME_NOISE
        ):
            return w

    return None


# ── Main ───────────────────────────────────────────────────────────────────

def main(csv_file, limit=15):
    # Load leads
    leads = []
    with open(csv_file, "r", encoding="utf-8") as f:
        for row in csv.DictReader(f):
            leads.append(row)

    print(f"Loaded {len(leads)} leads. Enriching first {limit}...\n")

    # ── Step 1: Competitor per city ──────────────────────────────────
    print("Looking up #1 competitor per city...")
    cities = list({l["city"] for l in leads[:limit]})
    competitors = {}
    for city in cities:
        comp = get_city_competitor(city, "North Carolina")
        competitors[city] = comp or "the top result"
        print(f"  {city}: {competitors[city]}")
        time.sleep(0.5)

    print()

    # ── Step 2: Enrich each lead ─────────────────────────────────────
    enriched = []

    for i, lead in enumerate(leads[:limit]):
        name     = lead["name"]
        city     = lead["city"]
        website  = lead["website"]
        reviews  = lead["review_count"]

        print(f"[{i+1}/{limit}] {name} ({reviews} reviews)")
        print(f"  Scraping {website} ...")

        email, scraped_name = scrape_contact_info(website)

        if not email:
            print("  [skip] No email found\n")
            continue

        print(f"  [ok] Email: {email}")

        # First name priority: scraped > parsed from company > "there"
        first_name = (
            scraped_name
            or extract_name_from_company(name)
            or "there"
        )

        competitor = competitors.get(city, "the top result")

        subject = name
        body    = EMAIL_BODY.format(
            first_name=first_name,
            city=city,
            competitor=competitor
        )

        enriched.append({
            "name":         name,
            "email":        email,
            "first_name":   first_name,
            "phone":        lead.get("phone", ""),
            "website":      website,
            "city":         city,
            "state":        lead.get("state", ""),
            "review_count": reviews,
            "rating":       lead.get("rating", ""),
            "competitor":   competitor,
            "email_subject": subject,
            "email_body":   body
        })

        print(f"  [ok] First name: {first_name}")
        print(f"  [ok] Competitor: {competitor}\n")

    # ── Step 3: Save ─────────────────────────────────────────────────
    if enriched:
        out_json = csv_file.replace(".csv", "_enriched.json")
        with open(out_json, "w", encoding="utf-8") as f:
            json.dump(enriched, f, indent=2)

        print(f"{'='*55}")
        print(f"  {len(enriched)} leads enriched and ready to send")
        print(f"  Saved to: {out_json}")
        print(f"{'='*55}\n")

        # Preview first email
        # Preview first email (ASCII-safe for Windows terminal)
        print("--- Preview of Email #1 ---")
        print(f"To:      {enriched[0]['email']}")
        print(f"Subject: {enriched[0]['email_subject']}")
        print()
        preview = enriched[0]["email_body"].encode("ascii", errors="replace").decode("ascii")
        print(preview)
        print("---------------------------\n")
    else:
        print("No leads enriched — no emails found on any website.")

    return enriched


if __name__ == "__main__":
    if len(sys.argv) >= 2:
        csv_file = sys.argv[1]
    else:
        files = sorted(glob.glob("leads_*.csv"))
        if not files:
            print("No leads CSV found. Run scraper.py first.")
            sys.exit(1)
        csv_file = files[-1]
        print(f"Using: {csv_file}\n")

    limit = int(sys.argv[2]) if len(sys.argv) >= 3 else 15
    main(csv_file, limit)
