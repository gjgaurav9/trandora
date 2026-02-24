import { buildApp } from './app.js';
import { connectDatabase, disconnectDatabase, env } from './config/index.js';

async function start() {
  const app = await buildApp();

  await connectDatabase();

  try {
    await app.listen({ port: env.API_PORT, host: '0.0.0.0' });
    console.log(`Trandora API running on http://localhost:${env.API_PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }

  // Graceful shutdown
  const signals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM'];
  for (const signal of signals) {
    process.on(signal, async () => {
      console.log(`\n${signal} received. Shutting down gracefully...`);
      await app.close();
      await disconnectDatabase();
      process.exit(0);
    });
  }
}

start();
