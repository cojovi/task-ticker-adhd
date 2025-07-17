# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/4a02b0b8-d69a-4624-bed1-c2b10adf1f5e

## How can I edit this code?

## Notion Integration Setup

This project integrates with Notion to fetch task data. To set this up:

1. **Create a Notion Integration:**
   - Go to [Notion Integrations](https://www.notion.so/my-integrations)
   - Create a new integration for your workspace
   - Copy the "Internal Integration Token"

2. **Share your Database with the Integration:**
   - Open your Notion database
   - Click the "Share" button in the top right
   - Find your integration in the list and give it access

3. **Configure Environment Variables:**
   - Copy `.env.example` to `.env`
   - Fill in your Notion integration token
   - The database ID is already configured in the code

4. **Database Structure:**
   The application expects your Notion database to have these properties:
   - **Task** or **Name** (Title) - The task name
   - **Priority** (Select) - Options: Low, Medium, High, Code Red
   - **Owner** or **Assignee** (Rich Text) - Person responsible
   - **Status** (Select) - Options: Not started, In progress, Completed, Blocked
   - **Due Date** or **Start Date** (Date) - When the task is due
   - **Notes** (Rich Text) - Additional information
   - **Category** or **Type** (Select) - Options: Work, Life, Personal (optional)

5. **How it works:**
   - The app fetches all tasks from your Notion database
   - Tasks are automatically split into Work and Life categories
   - If no category is specified, tasks are divided evenly
   - The ticker displays tasks in real-time with smooth scrolling

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/4a02b0b8-d69a-4624-bed1-c2b10adf1f5e) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Notion API

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/4a02b0b8-d69a-4624-bed1-c2b10adf1f5e) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)