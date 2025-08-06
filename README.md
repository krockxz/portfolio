
## Technologies Used

The following technologies were used to create this portfolio:

- Next.js
- React
- Typescript
- SCSS
- Framer Motion

## 🛠 Installation & Set Up


1. Install dependencies

   ```sh
   yarn
   ```

2. Start the development server

   ```sh
   yarn dev
   ```

## 🚀 Building and Running for Production

1. Generate a full static production build

   ```sh
   yarn build
   ```

1. Preview the site as it will appear once deployed

   ```sh
   yarn start
   ```

## 🔑 Environment Variables

To enable GitHub API access in the footer, you must provide a GitHub personal access token with public repo access.

1. Create a `.env.local` file in the root of your project.
2. Add the following line:

   ```sh
   NEXT_PUBLIC_GITHUB_TOKEN=your_github_personal_access_token
   ```

Replace `your_github_personal_access_token` with your actual token. You can generate a token at https://github.com/settings/tokens (no scopes required for public data, but 'public_repo' is recommended).

After setting this, restart your development server.

