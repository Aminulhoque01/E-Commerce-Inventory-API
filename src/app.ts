import swaggerUi from 'swagger-ui-express';
import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import globalErrorHandler from './app/middlewares/globalErrorHandler'; 
import router from './routes'; 
import { Morgan } from './shared/morgen';
import notFound from './app/middlewares/notFount';
import { swaggerSpec } from './swagger';

const app = express();

// morgan logging
app.use(Morgan.successHandler);
app.use(Morgan.errorHandler);

// CORS middleware
app.use(cors({
  origin: '*',
  credentials: true
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser
app.use(cookieParser());

// Static file serving (uploads)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Health check or any test route
app.get('/test', (req: Request, res: Response) => {
  res.status(201).json({ message: 'Welcome to Backend Template Server' });
});

// Routes (before Swagger to prevent potential conflicts)
 

// Set up Swagger UI at /api-docs route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 404 handler (if no route matches)
app.use(notFound); // Custom handler for 404 (optional)

// Global error handler should be last
app.use(globalErrorHandler);  // This catches all errors passed to next()

export default app;
