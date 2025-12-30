const app = require('./app');
const env = require('./config/env');
const pool = require('./config/db');

(async () => {
    try {
        const [rows] = await pool.query('SELECT NOW()');
        console.log('Mysql connected: ', rows);
    } catch (error) {
        console.error('Mysql connection error:', error.message);
        process.exit(1);
    }
})();

app.listen(env.port, () => {
    console.log(`Server running on port ${env.port}`);
});
