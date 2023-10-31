# Fullstack Chat app

You can check it [here](https://chat-app-nu-navy.vercel.app/)

## What is it for ?
You can use my app for chatting with other people in realtime. The chat has no registration, so you can simply login using only your username !  

## To run the app you have to set up .env for each folder (client and server)

## Frontend .env
```bash
VITE_SERVER_URL - Server url for fetching the server. Default is http://localhost:8080.
VITE_PORT - Port for your client. Default is 4000.
```

## Backend .env
```bash
DATABASE_URL - The url to your Mongodb databsase. It can be either local db or you can use Mongodb Atlas.
SECRET_KEY - A generated key for jwt to encode/decode tokets. You can generate one in node js with the following code: require('crypto').randomBytes(48).toString('hex')
PORT - Port for the server. Default is 5000.
CLIENT_URL - Client url for including it in the cors whitelist. Default is http://localhost:3000.
```

## How to run the app on the frontend
```bash
> npm i
> npm run dev
```

## How to build the app on the frontend
```bash
> npm i
> npm run build
> npm run preview
```

## How to run the app on the backend
```bash
> npm start
```

Technologies I've used:

Frontend
- Vite
- React
- JavaScript
- Tailwind.css

Backend
- Node
- MongoDB
