const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

// Path to the SQLite database file (will be created automatically)
const dbPath = path.join(__dirname, '..', '..', 'db', 'coffee.db');
const db = new Database(dbPath);

// Enable foreign key constraints (SQLite has them off by default)
db.pragma('foreign_keys = ON');

// Run the schema.sql file to create tables if they don't exist yet
const schemaPath = path.join(__dirname, '..', '..', 'db', 'schema.sql');
const schema = fs.readFileSync(schemaPath, 'utf8');
db.exec(schema);

console.log('Database connected and schema applied.');

module.exports = db;