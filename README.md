# Meghna Bansod — Angular Portfolio

A fresh Angular standalone portfolio starter with an editorial ivory/navy visual system, interactive technology constellation, expandable career timeline, featured projects, recognition cards, and a floating portfolio assistant panel.

## Requirements
- Node.js 18.19+ (or the version required by your Angular CLI)
- Angular CLI installed, or an existing Angular workspace

## Run this project from scratch
```bash
npm install
npm start
```
Then open the local URL shown by Angular CLI.

## Use in an existing Angular project
1. Copy `src/app/app.ts`, `src/app/app.html`, `src/app/app.css`, `src/styles.css`, and `src/main.ts` into the matching locations.
2. Make sure your `angular.json` includes `src/styles.css` in the build `styles` array.
3. Ensure your app component is configured as a standalone component.
4. If your project uses `app.component.ts` naming, either rename `app.ts` to `app.component.ts` and update the `main.ts` import, or keep the provided filenames consistently.
5. Replace the resume file at `public/assets/Meghna-Bansod-Resume.pdf` (or update the link in the HTML to match your real file).

## Create a new workspace
```bash
npm install -g @angular/cli
ng new meghna-portfolio --standalone --routing=false --style=css
cd meghna-portfolio
```
Then copy the provided files into the generated workspace. The default `index.html` from Angular CLI is sufficient.

## Customize before publishing
- Verify the resume path.
- Replace project repository URLs with your actual public repositories.
- FoodieHub live demo currently points to `https://foodiehub-meghna.vercel.app/`.
- TweetBuddy demo link is intentionally omitted because a verified live demo URL was not provided.
- Contact email is `meghnabansod26@gmail.com`.
