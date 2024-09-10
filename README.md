# totask

[![Issues](https://img.shields.io/github/issues/khalednadam/totask-app)](https://github.com/khalednadam/totask-app/issues)  
[![Forks](https://img.shields.io/github/forks/khalednadam/totask-app)](https://github.com/khalednadam/totask-app/network/members)  
[![Stars](https://img.shields.io/github/stars/khalednadam/totask-app)](https://github.com/khalednadam/totask-app/stargazers)

## Introduction

**totask** is a collaborative task management application designed for teams to easily manage and track their tasks. Built with **Vue 3** and **TailwindCSS** on the frontend, and **Express.js** and **MongoDB** on the backend, totask simplifies task management with real-time updates, team collaboration, and customizable task boards.

Explore the project live: [totask.app](https://totask.app)

---

## Features

- Real-time task tracking using **Socket.IO**.
- Intuitive drag-and-drop task boards.
- Role-based access control using **JWT** and session management.
- Team collaboration with shared task lists and notifications.
- Responsive design powered by **TailwindCSS** and **Vuetify**.
- **MongoDB** integration for seamless data storage.

## Tech Stack

- **Frontend**: Vue 3, Vuetify, TailwindCSS
- **Backend**: Node.js, Express.js, Socket.IO
- **Database**: MongoDB
- **Real-time Features**: Socket.IO

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js** (v16 or higher)
- **MongoDB** (local or cloud instance)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/khalednadam/totask.git
cd totask
```

2. Install the necessary dependencies:

```bash
npm run setup-project
```

3. Set up environment variables:

You can use the provided `.env.example` file as a template. Copy the `.env.example` to a new `.env` file and update the required fields with your own values:

```bash
cp .env.example .env
```

Here’s an example of the `.env` file structure:

```bash
# Server settings
PORT=3001
NODE_ENV='development'
CLIENT_URL='http://localhost:5173'

# MongoDB connection
MONGODB_URL=mongodb://localhost:27017/totask

# Session secret
SESSION_SECRET=your-session-secret

# Base URL for the server
BASE_URL='http://localhost:3000'

## JWT configuration
JWT_SECRET=your-jwt-secret
JWT_ACCESS_EXPIRATION_MINUTES=30
JWT_REFRESH_EXPIRATION_DAYS=30
JWT_RESET_PASSWORD_EXPIRATION_MINUTES=10
JWT_VERIFY_EMAIL_EXPIRATION_MINUTES=10

# SMTP configuration for email services
SMTP_HOST=smtp.host.net # your smtp host
SMTP_PORT=111 #add your port
SMTP_USERNAME=username
SMTP_PASSWORD=your-smtp-password
EMAIL_FROM=your-email@example.com

# Google Cloud Storage
PROJECT_ID=your-google-cloud-project-id
BUCKET_NAME=your-google-cloud-bucket-name
KEYFILENAME=path-to-your-google-cloud-key-file.json

# App settings
POSITION_GAP=1024

# CSRF token secret
CSRF_SECRET=your-csrf-token-secret
```

4. Start the development server:

```bash
npm run dev
```

This will start the **Express.js** backend on `http://localhost:3001` and the **Vue** frontend on `http://localhost:5173`.

## Usage

Once installed, you can:

- Create new tasks and assign them to team members.
- Manage tasks with drag-and-drop functionality.
- Track task progress in real-time.
- Collaborate with your team in a shared workspace.

## Contributing

Contributions are welcome and appreciated! Please follow these guidelines to ensure a smooth contribution process:

### Commit Messages

Use the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification for commit messages. This will help keep the commit history organized and readable. Here’s a brief overview:

- **`feat:`** A new feature for the user.
  - Example: `feat: add real-time notifications for task updates`
- **`fix:`** A bug fix for the user.
  - Example: `fix: resolve drag-and-drop issue with card cloning`
- **`docs:`** Documentation only changes.
  - Example: `docs: update README with contribution guidelines`
- **`style:`** Changes that do not affect the meaning of the code (e.g., formatting, missing semi-colons).
  - Example: `style: format code according to ESLint rules`
- **`refactor:`** A code change that neither fixes a bug nor adds a feature.
  - Example: `refactor: simplify task controller logic`
- **`test:`** Adding missing tests or correcting existing tests.
  - Example: `test: add unit tests for authentication middleware`
- **`chore:`** Changes to the build process or auxiliary tools and libraries.
  - Example: `chore: update dependency versions`

### How to Contribute

1. **Fork the repository**: Create your own fork of the repository to make changes.
2. **Create a new branch**: Create a branch for your feature or fix.
   ```bash
   git checkout -b feature/your-feature
   ```
3. **Make your changes**: Implement your feature or fix.
4. **Commit your changes**: Write clear and descriptive commit messages following the Conventional Commits guidelines.
   ```bash
   git add .
   git commit -m 'feat: add new user authentication feature'
   ```
5. **Push to your fork**: Push your changes to your fork on GitHub.
   ```bash
   git push origin feature/your-feature
   ```
6. **Create a pull request**: Open a pull request from your branch to the main branch of the original repository.

## Contact

If you have any questions or want to connect, feel free to reach out:

- **Website**: [khalednadam.com](https://khalednadam.com)
- **Email**: [hello@khalednadam.com](mailto:hello@khalednadam.com)
- **Instagram**: [@software_journey1](https://instagram.com/software_journey1)
- **Twitter / X**: [@kn_swe](https://twitter.com/kn_swe)
- **LinkedIn**: [Khaled Nadam](https://linkedin.com/in/khalednadam)
