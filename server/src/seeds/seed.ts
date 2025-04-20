import db from '../config/connection.js';
import { User } from '../models/index.js';

const seedUsers = async () => {
  await db();
  await User.deleteMany();

  const users = [
    {
      username: 'SlapHappy',
      password: 'password',
      budget: [
        {
          name: 'Income',
          subcategories: [{ name: 'Job', amount: 3000 }],
        },
        {
          name: 'Housing',
          subcategories: [
            { name: 'Rent', amount: 1200 },
            { name: 'Utilities', amount: 150 },
          ],
        },
        {
          name: 'Healthcare',
          subcategories: [
            { name: 'Insurance', amount: 200 },
            { name: 'Pharmacy', amount: 60 },
          ],
        },
        {
          name: 'Rnr',
          subcategories: [
            { name: 'Gym', amount: 45 },
            { name: 'Streaming', amount: 15 },
          ],
        },
        {
          name: 'Food',
          subcategories: [
            { name: 'Groceries', amount: 300 },
            { name: 'Dining Out', amount: 100 },
          ],
        },
        {
          name: 'Transpo',
          subcategories: [
            { name: 'Gas', amount: 100 },
            { name: 'Insurance', amount: 90 },
          ],
        },
      ],
    },
    {
      username: 'ScarletKnight',
      password: 'April23',
      budget: [
        {
          name: 'Income',
          subcategories: [{ name: 'Freelance', amount: 4000 }],
        },
        {
          name: 'Housing',
          subcategories: [
            { name: 'Mortgage', amount: 1300 },
            { name: 'Utilities', amount: 180 },
          ],
        },
        {
          name: 'Healthcare',
          subcategories: [
            { name: 'Dental', amount: 80 },
            { name: 'Vision', amount: 30 },
          ],
        },
        {
          name: 'Rnr',
          subcategories: [
            { name: 'Travel', amount: 150 },
            { name: 'Hobbies', amount: 50 },
          ],
        },
        {
          name: 'Food',
          subcategories: [
            { name: 'Groceries', amount: 250 },
            { name: 'Restaurants', amount: 120 },
          ],
        },
        {
          name: 'Transpo',
          subcategories: [
            { name: 'Car Payment', amount: 300 },
            { name: 'Parking', amount: 50 },
          ],
        },
      ],
    },
  ];

  await User.insertMany(users);
  console.log('Seed complete!');
  process.exit(0);
};

seedUsers();


