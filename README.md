# tuniform

Welcome to the tuniform project! This is a Next.js application with React, shadcn/ui components, and MySQL integration for managing orders. Follow the steps below to set up and run the project locally.

## Prerequisites

- **Node.js**: Version 18.x or 20.x (recommended for Next.js 14).
- **npm**: Included with Node.js, or install pnpm for better performance (`npm install -g pnpm`).
- **Git**: To clone the repository.
- **MySQL**: Ensure a local MySQL server is installed and running (e.g., via Homebrew on macOS: `brew install mysql`).
- **Terminal**: For executing commands.

## Installation Steps

1. **Clone the Repository**
   - Clone this repository to your local machine:
     ```bash
     git clone https://github.com/Ilyeschrif22/tuniform.git
     cd tuniform
     ```

2. **Install Dependencies**
   - Install the required Node.js packages:
     ```bash
     npm install
     ```
   - Alternatively, use pnpm for faster installation:
     ```bash
     pnpm install
     ```

3. **Initialize shadcn/ui**
   - Set up shadcn/ui for custom components (e.g., breadcrumb, table):
     ```bash
     npx shadcn-ui@latest init
     ```

4. **Create Environment File**
   - Create a `.env` file in the project root folder with the following content:
     ```env
     MYSQL_HOST=localhost
     MYSQL_USER=root
     MYSQL_PASSWORD=
     MYSQL_PORT=3306
     ```
   - Update `MYSQL_PASSWORD` with your MySQL root password if required (leave blank if no password is set).

5. **Import Database**
   - Import the database schema from `tuniform.sql` into your MySQL server:

6. **Run the Development Server**
   - Start the Next.js development server:
     ```bash
     npm run dev
     ```
   - Open your browser and visit `http://localhost:3000` to see the application.

Happy coding! 🚀

![Image](https://github.com/user-attachments/assets/ce37026f-f079-4842-a4ca-477f020bb5a5)

![Image](https://github.com/user-attachments/assets/7f588d8b-472a-433f-b93c-bf46c9e4c2d5)

![Image](https://github.com/user-attachments/assets/529c873e-e519-4501-b054-59cdcfd67c4e)

![Image](https://github.com/user-attachments/assets/6824e352-4ce7-4067-bf34-4b4ecf8ec804)
