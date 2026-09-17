# Fastseo Website Reviewer

**Fastseo Website Reviewer** is a free web-based tool for auditing websites for SEO and page-performance signals. It lets users submit a website URL and review important SEO, Lighthouse, PageSpeed, Core Web Vitals, and performance information from one interface.

## 🌐 What the website provides

### 🔎 SEO Website Audit

Fastseo helps website owners, developers, bloggers, and SEO professionals review common website optimization signals, including:

- SEO-related page information
- Website performance signals
- Common optimization issues
- Search-engine optimization recommendations
- Technical and on-page signals presented in an easy-to-understand dashboard

### ⚡ Google PageSpeed & Lighthouse Analysis

The website uses the Google PageSpeed Insights API to analyze a submitted URL and display available Lighthouse/PageSpeed data.

The audit supports:

- **Mobile** analysis
- **Desktop** analysis
- Performance scoring
- Lighthouse metrics
- Page-loading information
- Optimization opportunities

### 📊 Core Web Vitals & Performance Metrics

Depending on the data returned by Google PageSpeed Insights, the results can include:

- Performance score
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- Total Blocking Time (TBT)
- Speed Index
- Other Lighthouse laboratory metrics
- Chrome UX Report (CrUX) field data when available

### 🛠️ Optimization Opportunities

The results can highlight areas that may require optimization, such as:

- Image delivery and optimization
- JavaScript optimization
- CSS optimization
- Render-blocking resources
- Unused resources
- Loading performance
- Network-related performance issues
- Other Lighthouse recommendations

### 📱 Modern Responsive Interface

Fastseo is designed to work across different screen sizes and includes:

- Responsive desktop and mobile layout
- Mobile navigation
- Light and dark theme
- Audit dashboard
- Mobile/Desktop analysis tabs
- Clear presentation of performance results

### ❓ SEO Education & FAQ

The website also provides SEO-oriented explanations and frequently asked questions related to website performance, Core Web Vitals, Lighthouse, PageSpeed, and SEO optimization.

## 🧩 How the service works

1. Enter the URL of the website you want to analyze.
2. Select the desired analysis strategy: **Mobile** or **Desktop**.
3. Start the audit.
4. Fastseo requests audit data from the Google PageSpeed Insights API.
5. The returned Lighthouse/PageSpeed information is processed and presented in the interface.
6. Review scores, metrics, available CrUX data, and optimization opportunities.

## 🛠️ Technology Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Tailwind CSS via CDN
- Google Fonts – Inter
- Google PageSpeed Insights API
- Google Lighthouse/PageSpeed data
- Chrome UX Report (CrUX) data when available

## 📁 Project Structure

```text
rseo/
├── index.html
├── README.md
├── LICENSE
├── .gitignore
├── CONTRIBUTING.md
├── SECURITY.md
└── assets/
    ├── css/
    │   └── style.css
    └── js/
        └── script.js
```

### Main files

| File | Description |
|---|---|
| `index.html` | Main Fastseo Website Reviewer interface. |
| `assets/css/style.css` | Custom CSS used by the website. |
| `assets/js/script.js` | Application logic, PageSpeed requests, UI controls, and results rendering. |
| `README.md` | Project documentation. |
| `LICENSE` | Copyright and usage terms. |
| `.gitignore` | Git files and local development exclusions. |
| `CONTRIBUTING.md` | Contribution guidelines. |
| `SECURITY.md` | Security issue reporting guidance. |

## 🚀 Deployment

Fastseo is a static front-end project and can be deployed on services that support static websites, including GitHub Pages.

### GitHub Pages

1. Open the repository on GitHub.
2. Go to **Settings → Pages**.
3. Select the `main` branch as the deployment source.
4. Select the repository root (`/`) when prompted.
5. Save the configuration.
6. GitHub Pages will publish `index.html` as the entry point.

No Node.js build step is required for the static front end.

## 🔐 API & Privacy Notes

The application uses the Google PageSpeed Insights API to obtain website audit information. API availability, quotas, and Google service responses may affect the availability or completeness of results.

Audit results can vary according to the tested website, device strategy, network conditions, Lighthouse version, and availability of field data.

Users should avoid submitting private or sensitive URLs that they do not want processed by third-party services.

## 👨‍💻 Owner & Developer

**IMAD LIMRANI**

- Website: https://larache.xyz
- Email: info@larache.xyz

## 📬 Contact

For questions, feedback, technical matters, or website-related inquiries:

**Email:** info@larache.xyz  
**Website:** https://larache.xyz

## 🤝 Contributing

Contributions, bug reports, suggestions, and improvements are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting changes.

## 🔒 Security

If you discover a security vulnerability, please follow the instructions in [SECURITY.md](SECURITY.md) and avoid publishing sensitive vulnerability details in a public issue.

## © Copyright

Copyright © IMAD LIMRANI. All rights reserved unless otherwise stated in the repository.

No open-source license is granted by default. See `LICENSE` for the applicable terms.
