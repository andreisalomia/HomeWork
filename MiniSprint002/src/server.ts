import express from 'express';
import { sequelize, Hotel } from './models';
import { seed } from './seed';
import hotelRoutes from './routes/hotelRoutes';

const app = express();
const port = process.env.PORT_SERVER || 3000;

async function start() {
  await sequelize.sync({ force: false });

  const count = await Hotel.count();
  if (count === 0) {
    console.log('Database empty, seeding...');
    await seed();
  } else {
    console.log(`Database already has ${count} hotels, skipping seed`);
  }

  app.use(express.json());

  app.use('/hotels', hotelRoutes);

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

start().catch(err => {
  console.error('Startup failed:', err);
  process.exit(1);
});