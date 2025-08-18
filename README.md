# Chatbot-Nhost

This project is a **chatbot application** built with **Vite + React**, powered by **Nhost (Auth + Hasura)** and **n8n** for chatbot automation.  
It is deployed on **Netlify**.

---

## 🚀 Features
- Email-based **Sign Up / Sign In** using Nhost Auth.
- **Chats & Messages** stored in Hasura Postgres with Row-Level Security (RLS).
- Real-time chat updates using **GraphQL subscriptions**.
- Chatbot powered by **Hasura Actions → n8n → OpenRouter**.
- Secure permissions — users can only access their own data.
- Frontend communicates **only via GraphQL** (no REST calls).

---

## 🛠️ Tech Stack
- **Frontend:** Vite + React + Apollo Client
- **Auth & Database:** Nhost (Auth, Hasura, Postgres)
- **Realtime Subscriptions:** Hasura GraphQL
- **Chatbot Automation:** n8n (connected with OpenRouter)
- **Hosting:** Netlify

---

## 📂 Project Setup  

### 1️⃣ Clone the Repository
git clone https://github.com/someswar177/Chatbot-Nhost.git
cd Chatbot-Nhost/frontend

### 2️⃣ Install Dependencies
npm install

### 3️⃣ Environment Variables
echo "VITE_NHOST_SUBDOMAIN=ctvvnpalxppmbnqswokp" >> .env
echo "VITE_NHOST_REGION=ap-south-1" >> .env
echo "VITE_HASURA_HTTP=https://ctvvnpalxppmbnqswokp.hasura.ap-south-1.nhost.run/v1/graphql" >> .env
echo "VITE_HASURA_WS=wss://ctvvnpalxppmbnqswokp.hasura.ap-south-1.nhost.run/v1/graphql" >> .env

### 4️⃣ Run Development Server
npm run dev

### 5️⃣ Build for Production
npm run build

---

## 🔐 Authentication & Permissions
- Users must **sign up / log in** via email to access the app.
- Hasura **RLS policies** applied on `chats` and `messages`:
  - Users can only **insert/select/update/delete** their own data.
- `user` role is enforced for all queries, mutations, and subscriptions.

---

## ⚡ Chatbot Flow
1. User sends a message → stored in DB.
2. Hasura Action (`sendMessage`) calls **n8n webhook**.
3. n8n validates the request → sends query to **OpenRouter API**.
4. Response stored back in Hasura (`messages` table).
5. User sees chatbot reply in real-time via **GraphQL subscription**.

---

## 🌐 Deployment
- **Frontend:** Hosted on Netlify → [Your Netlify Link]  
- **Backend:** Nhost project (Auth + Hasura + DB)  
- **Automation:** n8n workflow running webhook + OpenRouter integration  
