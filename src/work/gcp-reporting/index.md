---

path: "/work/gcp-reporting"
date: "2026-03-10"
title: "Reporting Automation"
subheader: "Building an automated, data-driven marketing reporting pipeline."
thumbnail: "./thumbnail.png"
tags: [Python, GA4 API, Google Ads API, Snowflake, Google Slides API]
team: {
    engineering: "[Shaun Yap](https://github.com/shaunyap)"
}

---
![Screenshot of Reporting Automation Dashboard](/gcp-reporting-header.png)
[Source Code](https://github.com/shaunyap/gcp-reporting)

##### The goal
## Eliminating weekly reporting toil and delivering accurate, pipeline-connected marketing metrics directly to leadership

In fast-paced marketing teams, weekly performance reporting is critical yet notoriously time-consuming. Data must be gathered from multiple isolated sources, aggregated, formatted, visualized as charts, and pasted into presentation decks. This process is not only tedious but prone to human error.

The goal of this project was to fully automate the weekly reporting cycle—moving from API data extraction to generating clean, styled charts, pulling Salesforce pipeline numbers from Snowflake, and outputting a finalized, presentation-ready Google Slides deck in a shared Drive folder.

##### Discovery
## Disconnected data and fragmented tools

When auditing the manual reporting process, we identified several challenges:
- **API Complexity**: Data lived across different interfaces (Google Analytics 4 for user behavior, Google Ads for paid campaigns, and Salesforce for lead conversion stages).
- **Time Inefficiencies**: Manually copying metrics and recreating weekly charts took hours of engineering and marketing time every single week.
- **Reporting Quarters**: Standard business quarters did not align with calendar months (e.g., Feb-Apr, May-Jul), making custom cohort metrics calculation complex and error-prone.

##### Strategy & Architecture
## A modular, step-by-step reporting pipeline

We designed a decoupled pipeline in Python, allowing us to fetch data, generate visual charts, and publish to Google Drive independently or as a single coordinated run.

#### 1. Data Aggregation (`pull_data.py` & `pull_sf_data.py`)
- **Google Analytics 4**: Fetches engaged sessions, key events, and active users across custom channels, UTM campaigns, and landing pages via the `google-analytics-data` client.
- **Google Ads**: Extracts weekly spend and week-on-week change.
- **Snowflake (Salesforce)**: Pulls leads, MQLs, SALs, SQLs, and SQOs directly from Salesforce tables inside Snowflake, calculating cohort funnel conversion rates and the average days spent between stages.

#### 2. Chart Generation (`generate_charts.py`)
- Processes the raw data using `pandas` and uses `matplotlib` to render styled, clean charts (such as `6_WEEK_SESSIONS_OVERVIEW.png` and `FORM_FILLS_THIS_WEEK.png`) into a local directory.

#### 3. Slides Automation (`push_to_slides.py`)
- Interacts with the Google Slides and Drive APIs to make a new copy of a master Google Slides template, replaces custom variables (like `{{WEEKLY_ENGAGED_SESSIONS}}` or `{{QTD_PIPE}}`), and automatically swaps placeholder shapes (identified by their alt text) with the newly generated matplotlib charts.

##### Impact
## Complete accuracy and hours saved every week

By running the automation pipeline:
- **Zero manual editing**: Reports are generated automatically and uploaded directly to a shared Google Drive folder in a single command.
- **Flawless pipeline metrics**: Salesforce cohort rates are calculated dynamically from raw Snowflake data, ensuring absolute consistency in reports.
- **Interactive validation**: Team members can preview data in their terminal (`python3 pull_data.py`) or inspect charts locally before publishing the final slides to the team.
