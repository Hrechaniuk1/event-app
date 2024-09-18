import { setupServer } from "./server.js";
import { innitMongoDBConnection } from "./db/initMDBConnection.js";

async function bootstrap() {
    await innitMongoDBConnection();
    await setupServer();
}

bootstrap()
