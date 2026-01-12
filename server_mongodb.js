
// --- Standard Homes ERP (Cloud Version) ---
// MongoDB Atlas Integrated Backend

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// --- Middleware ---
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));

// --- MongoDB Connection ---
const MONGO_URI = process.env.MONGO_URI || 'your-mongodb-atlas-uri-here';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// --- Define Schemas ---
const propertySchema = new mongoose.Schema({ id: String, name: String });
const shopSchema = new mongoose.Schema({}, { strict: false });
const tenantSchema = new mongoose.Schema({}, { strict: false });
const contractSchema = new mongoose.Schema({}, { strict: false });
const chequeSchema = new mongoose.Schema({}, { strict: false });
const expenseSchema = new mongoose.Schema({}, { strict: false });
const userSchema = new mongoose.Schema({
  id: String,
  username: String,
  fullName: String,
  role: String,
  password: String,
  status: String
});
const backupSchema = new mongoose.Schema({ date: Date, data: Object });

// --- Define Models ---
const Property = mongoose.model('Property', propertySchema);
const Shop = mongoose.model('Shop', shopSchema);
const Tenant = mongoose.model('Tenant', tenantSchema);
const Contract = mongoose.model('Contract', contractSchema);
const Cheque = mongoose.model('Cheque', chequeSchema);
const Expense = mongoose.model('Expense', expenseSchema);
const User = mongoose.model('User', userSchema);
const Backup = mongoose.model('Backup', backupSchema);

// --- Security Middleware ---
const API_KEY = "SH-SECURITY-99";
app.use((req, res, next) => {
  const key = req.headers['x-api-key'];
  if (req.method !== 'GET' && key !== API_KEY) {
    return res.status(403).send('Forbidden: Invalid Security Token');
  }
  next();
});

// --- Health Check ---
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected', timestamp: new Date().toISOString() });
});

// --- CRUD Endpoints ---
app.get('/api/properties', async (req, res) => res.json(await Property.find()));
app.post('/api/properties', async (req, res) => res.json(await Property.create(req.body)));

app.get('/api/tenants', async (req, res) => res.json(await Tenant.find()));
app.post('/api/tenants', async (req, res) => res.json(await Tenant.create(req.body)));

app.get('/api/contracts', async (req, res) => res.json(await Contract.find()));
app.post('/api/contracts', async (req, res) => res.json(await Contract.create(req.body)));

app.get('/api/cheques', async (req, res) => res.json(await Cheque.find()));
app.post('/api/cheques', async (req, res) => res.json(await Cheque.create(req.body)));

app.get('/api/expenses', async (req, res) => res.json(await Expense.find()));
app.post('/api/expenses', async (req, res) => res.json(await Expense.create(req.body)));

app.get('/api/users', async (req, res) => res.json(await User.find()));
app.post('/api/users', async (req, res) => res.json(await User.create(req.body)));

// --- Backup Endpoint ---
app.post('/api/backup', async (req, res) => {
  const backup = new Backup({ date: new Date(), data: req.body });
  await backup.save();
  res.json({ message: 'Backup saved successfully' });
});

// --- Start Server ---
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
