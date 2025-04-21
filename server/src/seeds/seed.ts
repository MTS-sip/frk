import db from '../config/connection.js';
import { User } from '../models/index.js';
import users from './profileData.json' with { type: 'json' };

const seedUsers = async () => {
  await db();
  await User.deleteMany();

  
for (const user of users) {
  const newUser = new User(user);
  await newUser.save();   
 
}
  console.log('Seed complete!');
  process.exit(0);
};

seedUsers();


