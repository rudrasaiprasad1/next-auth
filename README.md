# 🚀 Project Setup Guide

Welcome to this repository! Follow the guidelines below to set up and run the project locally.

---

## 📦 Installation

1. Clone the repository:

   ```bash
   git clone <your-repo-url>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

---

## ▶️ Start the Development Server

To run the project locally, use the following command:

```bash
npm run dev
```

This will start the development server at **[http://localhost:3000](http://localhost:3000)**.

---

## 🔧 Environment Variables Setup

Create a `.env` file in the root directory and add the following environment variables.

### 🗄️ MongoDB Configuration

Create your own MongoDB cluster and place the URI like this:

```env
MONGO_URI=mongodb+srv://db_user:eadasdEfdasaasdf2asdI@cluster0.we35asd.mongodb.net/nextauth
```

### 🔐 Token Secret

Generate your own token secret and add it here:

```env
TOKEN_SECRET="asdfasdfasdfasdfasdfasdfasdfasdfasdf"
```

### 📧 Google App Password (For Email Services)

Generate your own Google App password and add these entries:

```env
GOOGLE_APP_PASSWORD="asd asd asd asd"
GOOGLE_APP_EMAIL="example123@gmail.com"
GOOGLE_APP_SERVICE="gmail"
GOOGLE_APP_PORT=465
```

### 🌐 Domain

This remains the same for local development:

```env
DOMAIN="http://localhost:3000"
```

---

## 📁 Folder Structure (Optional Example)

```
/src
  ├── app/
  ├──├── login/
  ├──├── profile/
  ├──├── signup/
  ├──├── verifyemail/
  ├──├── layout.tsx/
  ├──├── .env
  ├──├── .env
  ├──├── README.md
  ├──└── README.md
  ├── db/
  ├── helpers/
  ├── models/
  ├── proxy/ (new version for middleware in Nextjs 16+ i am using 16.0.1 )
  ├── .env
  ├──
  ├──
  ├──
  └──
```

---

## 🙌 Contributions

Feel free to fork this repo and submit a pull request to suggest improvements or fix issues.

---

## ⭐ Support

If you like this project, consider giving it a star!
