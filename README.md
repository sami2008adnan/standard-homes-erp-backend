# Standard Homes ERP – Cloud Backend

This is a clean Node.js + Express + MongoDB backend for Standard Homes ERP.

## Features
- Health check API
- MongoDB Atlas connection
- Ready for Render deployment

## Environment Variables (Render)
- MONGO_URI = mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/standarderp
- PORT = 10000
- NODE_ENV = production

## Start Command (Render)
node server_mongodb.js

## Test Endpoint
GET /api/health
