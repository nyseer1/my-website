// import { db } from './db';

// // Example: Exported function to get a user by ID
// export async function getUsers() {
//   try {
//     // query returns [rows, fields]
//     const [rows] = await db.query('SELECT * FROM denormalized_orders');
//     return rows;
//   } catch (error) {
//     console.error('Database error:', error);
//     throw error;
//   }
// }


// // export async function getUserById(id: number) {
//   try {
//     // query returns [rows, fields]
//     const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
//     return rows;
//   } catch (error) {
//     console.error('Database error:', error);
//     throw error;
//   }
// }