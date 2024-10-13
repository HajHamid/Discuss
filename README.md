# Discuss

Discuss is a simple, Reddit-like social media platform built with Next.js. Users can create topics, add posts under each topic, comment on post details, and search through posts. GitHub is used for user authentication, and Prisma handles the database connection. The app includes form validation using Zod and leverages Next.js server actions for handling form submissions.

## Features

- **User Authentication**: Users sign in with their GitHub accounts.
- **Topic & Post Creation**: Users can create topics and add posts under each topic.
- **Comments**: Users can comment on individual posts.
- **Search**: Search functionality allows users to search through posts.
- **Form Validation**: Zod is used to ensure correct input for forms.
- **Error Handling**: Handled via `useFormState` and `useFormStatus`.
- **Server Actions**: Used for creating forms and handling submissions.
- **Optimized UI**: Built with NextUI and styled with Tailwind CSS for a responsive and clean user experience.
- **Caching**: Next.js cache is used for improved performance and data fetching efficiency.

## Tech Stack

- **Next.js**: Framework for React applications.
- **Prisma**: ORM for database interaction.
- **Zod**: Schema validation for form inputs.
- **NextUI**: UI component library.
- **Tailwind CSS**: Utility-first CSS framework for custom designs.
- **GitHub Authentication**: Users authenticate using their GitHub accounts.
- **Next.js Cache**: Ensures efficient data fetching and caching.
- **useFormState** and **useFormStatus**: Handling form states and validation errors.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm or yarn
- A GitHub account for authentication
- PostgreSQL (or any other database supported by Prisma)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/discuss.git

2. Install dependencies:
    ```bash 
    cd discuss
    npm install
3. Set up the .env file with the following environment variables:
    ```bash 
    GITHUB_CLIENT_ID=your_github_client_id
    GITHUB_CLIENT_SECRET=your_github_client_secret
    NEXTAUTH_SECRET=your_nextauth_secret

4. Set up Prisma:

    ```bash
    npx prisma generate
    npx prisma migrate dev
5. Run the development server:
    ```bash
    npm run dev
## Contributing
Feel free to contribute by submitting pull requests, issues, or feature suggestions.


