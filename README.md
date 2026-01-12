# Standard Homes ERP (Cloud Backend)

This is the Node.js + MongoDB backend for Standard Homes ERP.

## 🚀 Local Setup
1. Create a `.env.local` file with:
   ```
   PORT=3000
   MONGO_URI=mongodb+srv://standerd:<db_password>@cluster0.2dvlsrg.mongodb.net/standardhomes
   ```
2. Run:
   ```
   npm install
   npm start
   ```
3. Visit: http://localhost:3000/api/health

## 🌐 Cloud Deployment
- Deploy easily to [Render.com](https://render.com)
- Set your environment variables in the Render dashboard
