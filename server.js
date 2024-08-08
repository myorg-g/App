import express from 'express';
import session from 'express-session';
import connectRedis from 'connect-redis';
import Redis from 'redis';
import dotenv from 'dotenv';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

dotenv.config();

const app = express();
const port = 3000;

// Create and configure Redis client
const redisClient = Redis.createClient({
  url: process.env.REDIS_URL,
  socket: {
    tls: true, // Use TLS for secure connection
  },
  legacyMode: true // This is important for compatibility with `connect-redis`
});
redisClient.connect().catch(console.error);

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User Authentication API',
      version: '1.0.0',
      description: 'API documentation for user registration and login endpoints',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local server',
      },
    ],
  },
  apis: ['./server.js'], // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Configure Redis Store
// const RedisStore = connectRedis(session);
// const sessionStore = new RedisStore({
//   client: redisClient,
//   ttl: 900 // Session expiration time in seconds
// });

// Configure Express session middleware
app.use(session({
  // store: sessionStore,
  secret: process.env.SESSION_SECRET || 'defaultSecret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true if using HTTPS
}));

app.use(express.json());

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: testuser
 *               password:
 *                 type: string
 *                 example: testpassword
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: User testuser registered and session created.
 *       400:
 *         description: Invalid input
 */

app.post('/api/auth/register', (req, res) => {
  // Register user logic
  res.send('User testuser registered and session created.');
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Log in an existing user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: testuser
 *               password:
 *                 type: string
 *                 example: testpassword
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: User testuser logged in and session created.
 *       400:
 *         description: Invalid input
 */

app.post('/api/auth/login', (req, res) => {
  // Login user logic
  res.send('User testuser logged in and session created.');
});

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Check the health of the API
 *     responses:
 *       200:
 *         description: API is up and running
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: UP
 */

app.get('/api/health', (req, res) => {
  res.json({ status: 'UP' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
  console.log(`Swagger documentation available at http://localhost:${port}/api-docs`);
});
