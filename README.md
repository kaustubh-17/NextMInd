# React Portfolio App (Assignment)

Two pages:
- **Home**: dummy blog posts
- **Portfolio**: reads the Excel in `/public/data/Front end Assignment Historical NAV Report.xlsx` and renders:
  - Trading Returns table (month-on-month for each year)
  - Equity curve (normalized to 100) + Drawdown area chart

## Run locally

1) Install Node.js LTS from https://nodejs.org/
2) Open a terminal in this folder and run:

```bash
npm install
npm start
```

The app will open on http://localhost:3000

> If styles don't appear initially, also run in a second terminal:
> ```bash
> npm run tailwind:build
> ```

## Replace data
Swap the Excel file in `public/data/` with your own keeping the same file name, or update the path in `src/utils/excel.js`.
