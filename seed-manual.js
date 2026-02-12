const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
require('dotenv').config();

async function main() {
    const connection = await mysql.createConnection(process.env.DATABASE_URL);

    const email = 'admin@gym.com';
    const password = 'adminpassword';
    const hashedPassword = await bcrypt.hash(password, 10);

    // Try to insert admin user
    try {
        const [rows] = await connection.execute(
            'SELECT id FROM User WHERE email = ?',
            [email]
        );

        if (rows.length === 0) {
            await connection.execute(
                'INSERT INTO User (email, password, name, role, createdAt, updatedAt) VALUES (?, ?, ?, ?, NOW(), NOW())',
                [email, hashedPassword, 'Admin User', 'ADMIN']
            );
            console.log('Admin user created successfully.');
        } else {
            console.log('Admin user already exists.');
        }
    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        await connection.end();
    }
}

main();
