# Video Sharing Platform 🎬

A full-stack video sharing platform similar to YouTube, built with React.js, Node.js (Express), MongoDB, and AWS S3. Users can upload, browse, and stream videos with a responsive and modern UI.

## 🚀 Features

- 📹 Upload videos (stored on AWS S3)
- 🔍 Browse and search videos
- 🎥 Stream videos directly from the browser
- 💬 Comment on videos
- 👤 User authentication (Register/Login)
- 📱 Fully responsive design

## 🛠️ Tech Stack

| Frontend      | Backend        | Cloud Storage | Database |
|---------------|----------------|----------------|----------|
| React.js      | Node.js (Express) | AWS S3         | MongoDB  |

## 📁 Project Structure

```
video_share/
├── client/           # React frontend
├── server/           # Express backend
│   ├── routes/       # API routes
│   ├── controllers/  # Route logic
│   ├── models/       # MongoDB models
│   └── config/       # AWS and DB configuration
└── README.md
```

## 🔧 Installation

### Prerequisites
- Node.js
- MongoDB
- AWS account with an S3 bucket

### 1. Clone the repository

```bash
git clone https://github.com/kasif16/video_share.git
cd video_share
```

### 2. Install server dependencies

```bash
cd server
npm install
```

Create a `.env` file in the `server/` folder and add:

```env
MONGODB_URI=your_mongodb_uri
AWS_ACCESS_KEY=your_aws_access_key
AWS_SECRET_KEY=your_aws_secret_key
S3_BUCKET_NAME=your_bucket_name
JWT_SECRET=your_jwt_secret
```

### 3. Install client dependencies

```bash
cd ../client
npm install
```

### 4. Run the app

Start both frontend and backend:

```bash
# In server/
npm start

# In client/
npm start
```

## 📸 Screenshots

> *(You can add screenshots of the app here)*

## 🙌 Acknowledgements

This project was developed as part of the CODEC Internship Program by **Mohd Kasif Khan**.

## 📬 Contact

📧 Email: your-email@example.com  
🔗 GitHub: [@kasif16](https://github.com/kasif16)
