# Teampicker — Random Team Selector for FIFA 25

Teampicker is a simple web application for randomly selecting football teams from top European leagues. It is perfect for quick FIFA 25 matches with friends, and also includes a special tournament mode.

## Features

* 🎮 Random team selector for:

  * Premier League
  * La Liga
  * Bundesliga
  * Serie A
  * Ligue 1
* ⭐ Ability to filter teams by star rating
* ⚔️ Tournament mode for competitive play
* ⚡ Fast and mobile-friendly UI

## Demo

[https://teampicker.me](https://teampicker.me) 

## Tech Stack

* **Frontend & Backend**: [Next.js](https://nextjs.org/) with built-in API routes
* **Database**: MySQL
* **Hosting**: [Vercel](https://vercel.com/)

## Getting Started

```bash
# 1. Clone the repository
$ git clone https://github.com/your-username/teampicker.git

# 2. Go into the project directory
$ cd teampicker

# 3. Install dependencies
$ npm install

# 4. Create a `.env.local` file and configure your DB credentials
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=fifa_teams

# 5. Run the development server
$ npm run dev

# Open http://localhost:3000 in your browser
```

## Folder Structure

```
/ (root)
├── /public            # Static assets (e.g. screenshot.png)
├── /src
│   ├── /app           # Pages and components (Next.js 13+ App Router)
│   └── /lib           # Database logic and helpers
├── /styles            # CSS files
└── .env.local         # Environment variables
```

## License

MIT License — free to use and modify.

---

Made with ❤️ for FIFA fans.
