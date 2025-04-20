
# WriterHub

WriterHub is a React web application that connects students with professional writers. It also includes an IT product shop where users can browse and purchase tech products.

## Features

- Writer profiles with bios, contact information, and ratings
- IT product e-commerce functionality with shopping cart
- User authentication (login/register/Google sign-in)
- Writer rating system
- MySQL database integration (configured)

## Project info

**URL**: https://lovable.dev/projects/3561a1e4-571a-4bb3-9d3b-2c18c102462a

## Getting Started

### Prerequisites

- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- MySQL server (for production use)

### Installation

1. Clone the repository
```sh
git clone <REPOSITORY_URL>
cd writer-hub
```

2. Install dependencies
```sh
npm install
```

3. Start the development server
```sh
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

### Database Setup

The application is configured to connect to a MySQL database. The database schema is provided in `database.sql`.

1. Create a MySQL database and user
2. Import the schema using the provided SQL file:
```sh
mysql -u username -p database_name < database.sql
```

3. Update the database configuration in `src/utils/database.js` with your credentials:

```js
const dbConfig = {
  host: "your_host",
  port: 3306,
  user: "your_username",
  password: "your_password", 
  database: "your_database"
};
```

Note: In a production environment, you should store these credentials as environment variables.

## Connecting to a Real Backend

This project is currently configured with mock data. To connect it to a real backend:

1. Create a server-side application using Node.js/Express
2. Implement the API endpoints for users, writers, products, etc.
3. Update the API calls in the front-end to use your real endpoints

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- shadcn/ui components
- React Router for navigation
- MySQL (database configuration)

## Project Structure

- `src/components` - Reusable UI components
- `src/pages` - Page components for each route
- `src/utils` - Utility functions including database connection
- `src/context` - React context for state management
- `public` - Static assets

## Features to Add

- Implement real database connection with a backend API
- Add writer messaging system
- Implement payment processing for the shop
- Add more product categories and filtering options
- Create admin dashboard for managing writers and products

## License

This project is licensed under the MIT License.

## Acknowledgements

- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [React Router](https://reactrouter.com/)
- [Unsplash](https://unsplash.com/) for demo images
