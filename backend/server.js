require('dotenv').config();
const app = require('./src/app');
require('./src/config/db'); // initializes the database connection + schema

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});