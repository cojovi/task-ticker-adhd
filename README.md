# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/4a02b0b8-d69a-4624-bed1-c2b10adf1f5e

## Notion Integration Setup

This project integrates with Notion to fetch task data. **Important**: Due to CORS restrictions, the Notion API cannot be called directly from the browser in production.

## Development vs Production

### Development Mode (Current)
- Uses mock data when Notion API fails due to CORS
- Shows sample tasks for development and testing
- Allows you to see the interface working correctly

### Production Setup Required
To use real Notion data in production, you need one of these approaches:

1. **Backend Proxy Server**
   - Create a Node.js/Express server that calls Notion API
   - Deploy it separately and have your frontend call your backend

2. **Serverless Functions**
   - Use Vercel Functions, Netlify Functions, or AWS Lambda
   - Create an API endpoint that handles Notion calls

3. **Next.js API Routes**
   - Convert to Next.js project for built-in API routes
   - Handle Notion API calls server-side

## Current Setup (Development)

1. **Environment Variables:**
   ```
   VITE_NOTION_TOKEN=your_notion_token_here
   ```

2. **Database Structure:**
   Your Notion database should have these properties:
   - **Task** or **Name** (Title) - The task name
   - **Priority** (Select) - Options: Low, Medium, High, Code Red
   - **Owner** or **Assignee** (Rich Text) - Person responsible
   - **Status** (Select) - Options: Not started, In progress, Completed, Blocked
   - **Due Date** or **Start Date** (Date) - When the task is due
   - **Notes** (Rich Text) - Additional information
   - **Category** or **Type** (Select) - Options: Work, Life, Personal (optional)

3. **Sharing Database:**
   - Go to your Notion database
   - Click "Share" → "Manage access"
   - Add your integration and give it access

## Example Backend Proxy (Node.js/Express)

```javascript
const express = require('express');
const cors = require('cors');
const { Client } = require('@notionhq/client');

const app = express();
app.use(cors());
app.use(express.json());

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

app.get('/api/tasks', async (req, res) => {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
    });
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => {
  console.log('Proxy server running on port 3001');
});
```

## Technologies Used

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Notion API (with CORS limitations)

## How to Run

```sh
npm install
npm run dev
```

## Deployment

For production deployment with real Notion data:

1. Set up a backend proxy server
2. Update the API calls to use your proxy instead of direct Notion API
3. Deploy both frontend and backend
4. Configure CORS properly

Currently, the app will work in development mode with mock data to demonstrate the interface and functionality.