const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
  .then(() => console.info(`Successfully connected to the database ${MONGODB_URI}`))
  .catch((error) => {
    console.error(`An error occurred trying to connect to the database ${MONGODB_URI}`, error);
    process.exit(0);
  });

process.on('SIGINT', () => {
  mongoose.connection.close()
    .finally(() => {
      console.log(`Database connection closed`);
      process.exit(0);
    })
});
 