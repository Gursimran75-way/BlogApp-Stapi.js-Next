

# Blog Publishing Site

A blog publishing platform built with Next.js and Strapi, allowing creators to write blogs, admins to approve them, and guest users to comment and like posts. The site supports blog versioning, SEO-friendly metadata, and a streamlined approval process for comments.

## Features
- **Blog Creation**: Authenticated creators can create blogs with a title, description, and user association.
- **Admin Approval**: Admins approve blogs before they’re published (status changes from `Draft` to `Approved`).
- **Guest Interaction**: Guest users (unauthenticated) can comment and like blogs.
- **Comment Moderation**: Comments require admin approval (`Pending` to `Approved`).
- **Responsive Design**: Uses Material-UI for a modern, responsive UI.

## Tech Stack
- **Frontend**: Next.js 13.5.6 (React framework with App Router)
- **Backend**: Strapi.js (Headless CMS)
- **Styling**: Material-UI (MUI) + CSS modules
- **Animation**: Framer Motion
- **HTTP Client**: Axios
- **Database**: Strapi’s default (assumed SQLite or MongoDB; adjust as needed)

## Project Structure
```
frontend/
├── src/
│   ├── app/
│   │   ├── [slug]/page.tsx         # Blog detail page
│   │   ├── create-blog/page.tsx    # Blog creation page
│   │   ├── page.tsx               # Home page (blog list)
│   │   └── layout.tsx             # Root layout with AuthProvider
│   ├── components/
│   │   ├── blog/
│   │   │   ├── BlogCard.tsx       # Blog preview card
│   │   │   ├── BlogContent.tsx    # Blog content with like button
│   │   │   ├── CommentForm.tsx    # Comment submission form
│   │   │   └── CommentList.tsx    # Comment list
│   │   └── layout/Navbar.tsx      # Navigation bar (optional)
│   ├── context/
│   │   └── AuthContext.tsx        # Authentication context
│   ├── lib/
│   │   ├── api.ts                # API client for Strapi
│   │   └── types.ts              # TypeScript types
│   ├── theme.ts                  # MUI theme configuration
│   └── styles/
│       └── page.module.css        # CSS module for styling
├── .env                          # Environment variables
├── next.config.js                # Next.js configuration
└── package.json                  # Dependencies and scripts
```

## Prerequisites
- **Node.js**: v18.14.1 (compatible with Next.js 13.5.6)
- **npm**: v8.x or later
- **Strapi**: v4.x (configured with MongoDB or SQLite)

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-repo/blog-publishing-site.git
cd blog-publishing-site
```

### 2. Install Frontend Dependencies
```bash
cd frontend
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the `frontend` directory:
```
NEXT_PUBLIC_STRAPI_URL=http://127.0.0.1:1337
STRAPI_API_TOKEN=your-strapi-api-token-here
```
- Generate an API token in Strapi admin (`Settings > API Tokens`) with `find`, `create`, and `update` permissions for `blogs` and `comments`.

### 4. Set Up Strapi Backend
1. **Clone or Create Strapi Project**:
   ```bash
   npx create-strapi-app strapi-backend --quickstart
   cd strapi-backend
   npm run develop
   ```
2. **Configure Content Types**:
   - **Blog**: Fields: `title` (string), `content` (text), `slug` (uid), `blogStatus` (enum: `Draft`, `Pending`, `Approved`), `user` (relation to `users-permissions`), `metadata` (component).
   - **Comment**: Fields: `content` (text), `blog` (relation to `Blog`), `commentStatus` (enum: `Pending`, `Approved`, `Rejected`), `guest_name` (string), `guest_email` (string).
   - **Like**: Fields: `blog` (relation to `Blog`), `author` (string).
   - **Metadata Component**: Fields: `meta_title` (string), `meta_description` (text), `keywords` (string).
3. **Set Permissions**:
   - **Public**: `find`/`findOne` for `Blog` (approved only), `create` for `Comment` and `Like`.
   - **Authenticated**: `create`/`update` for `Blog`.

### 5. Run the Application
- **Start Strapi**:
  ```bash
  cd strapi-backend
  npm run develop
  ```
- **Start Next.js**:
  ```bash
  cd frontend
  npm run dev
  ```
- Open `http://localhost:3000` in your browser.

## Usage
- **Home Page**: View approved blogs at `/`.
- **Blog Detail**: View a blog at `/[slug]` (e.g., `/my-blog`).
- **Create Blog**: Authenticated users can create blogs at `/create-blog`.
- **Comments/Likes**: Guests can comment and like on blog pages; comments await admin approval.

## Notes
- **Authentication**: Assumes a JWT-based `AuthContext` (not fully implemented here; extend as needed).
- **Next.js Version**: 13.5.6 is outdated; consider upgrading to 14.x for better Server Actions support.
- **Strapi Config**: Adjust field names (e.g., `content` vs `description`) to match your Strapi schema.

## Contributing
- Fork the repo, make changes, and submit a pull request.

## License
MIT License

---

### Customization
- Replace `https://github.com/your-repo/blog-publishing-site.git` with your actual repository URL.
- Adjust paths (e.g., `C:\path\to\your\strapi\project`) to your local setup.
- Extend the `AuthContext` section if you have a specific login flow.

This README provides a clear setup guide and aligns with your task requirements. Let me know if you need refinements!