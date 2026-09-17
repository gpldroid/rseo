# Fastseo Website Reviewer

Fastseo Website Reviewer is a free web-based SEO and performance auditing tool. It allows users to enter a website URL and review important search-engine optimization and page-performance signals from a single interface.

## What the website provides

### 🔎 SEO Website Audit
- Analyze a website URL from the browser.
- Review important SEO-related information and recommendations.
- Identify common optimization issues that can affect search visibility.
- Present audit results in an easy-to-understand dashboard.

### ⚡ Google Lighthouse & PageSpeed Analysis
- Run Google PageSpeed Insights/Lighthouse analysis for a submitted URL.
- Support both **Mobile** and **Desktop** strategies.
- Display performance and Lighthouse scores.
- Show Core Web Vitals and other performance metrics.
- Highlight performance bottlenecks and optimization opportunities.

### 📊 Performance Metrics
The results interface can display metrics such as:
- Performance score
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- Total Blocking Time (TBT)
- Speed Index
- Additional Lighthouse/PageSpeed laboratory data
- Chrome UX Report (CrUX) field data when available

### 🛠️ Optimization Opportunities
The audit results provide performance opportunities that can help identify areas such as:
- Image optimization
- JavaScript and CSS optimization
- Render-blocking resources
- Unused resources
- Loading and network performance
- Other Lighthouse recommendations

### 📱 Responsive Interface
- Mobile-friendly interface.
- Responsive layout for desktop and mobile screens.
- Mobile navigation menu.
- Light and dark theme support.
- Dashboard-style presentation of audit results.

### ❓ SEO Guidance & FAQ
The website includes SEO-oriented explanations and an FAQ section covering topics such as Core Web Vitals, Lighthouse performance, SEO optimization, and website auditing.

## Technology Stack

- HTML5
- CSS3
- JavaScript (Vanilla JS)
- Tailwind CSS via CDN
- Google Fonts (Inter)
- Google PageSpeed Insights API
- Google Lighthouse/PageSpeed data
- Chrome UX Report (CrUX) data when supplied by the PageSpeed API

## Project Structure

```text
rseo/
├── index.html
├── README.md
└── assets/
    ├── css/
    │   └── style.css
    └── js/
        └── script.js
```

### Required files

| File | Purpose |
|---|---|
| `index.html` | Main website interface and SEO audit page. |
| `assets/css/style.css` | Custom CSS used by the website. |
| `assets/js/script.js` | Website functionality, PageSpeed requests, UI controls, and results rendering. |
| `README.md` | Project documentation. |

No build process is required for the static front end. The project can be served directly as a static website.

## How it works

1. The user enters a URL.
2. The user selects **Mobile** or **Desktop** analysis.
3. Fastseo sends the request to the Google PageSpeed Insights API.
4. Lighthouse/PageSpeed results are processed in the browser.
5. The interface displays scores, metrics, field data when available, and optimization opportunities.

## Deployment

The project is suitable for static hosting, including **GitHub Pages**.

For GitHub Pages:

1. Open the repository **Settings → Pages**.
2. Select the `main` branch as the publishing source.
3. Select the repository root (`/`) as the folder when requested.
4. Save the configuration.
5. GitHub Pages will publish `index.html` as the website entry point.

## Important

- This project is a client-side static website.
- The Google PageSpeed Insights API is used by the JavaScript application to obtain audit data.
- API availability, quotas, and Google service responses can affect audit results.
- Lighthouse and CrUX results can vary depending on the tested URL, device strategy, network conditions, and available field data.

## License

No license has been specified for this repository. Unless a license is added, the repository remains subject to the default copyright rules applicable to its contents.
