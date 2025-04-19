/* thursday 4.17 end class   
import db from '../config/connection.js';
import { User } from '../models/index.js';
import profileSeeds from './profileData.json' assert { type: "json" };
import cleanDB from './cleanDB.js';

const seedDatabase = async (): Promise<void> => {
  try {
    await db();
    await cleanDB();

    await User.insertMany(profileSeeds);

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error seeding database:', error.message);
    } else {
      console.error('Unknown error seeding database');
    }
    process.exit(1);
  }
};

seedDatabase();
*/

import db from '../config/connection.js';
import { User } from '../models/index.js';

const seedUsers = async () => {
  await db();

  await User.deleteMany();

  await User.create({
    username: 'SlapHappy',
    password: 'password', // will be hashed via pre-save middleware
    budget: [
      {
        name: 'Housing',
        subcategories: [
          { name: 'Rent', amount: 1200 },
          { name: 'Utilities', amount: 200 }
        ]
      },
      {
        name: 'Food',
        subcategories: [
          { name: 'Groceries', amount: 300 },
          { name: 'Dining Out', amount: 150 }
        ]
      }
    ]
  });

  console.log('✅ Seed complete');
  process.exit(0);
};

seedUsers();
