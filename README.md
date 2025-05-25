# Express API with Prisma and TypeScript

A Node.js REST API built with:
- Express.js (Node.js backend framework)
- TypeScript for type safety
- Prisma ORM with PostgreSQL
- JWT for authentication

This API provides endpoints for managing:
- User authentication
- Products
- Product updates
- Update points

## Tech Stack
```
- Node.js (>= 18.0.0)
- TypeScript
- Express.js
- Prisma
- PostgreSQL (via Prisma Accelerate)
```

## Getting Started

1. Clone the repository
```bash
git clone <repository-url>
cd my-express-api
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```

Update the `.env` file with your credentials:
```bash
DATABASE_URL="your-prisma-accelerate-url"
JWT_SECRET="your-jwt-secret"
```

4. Generate Prisma Client
```bash
npx prisma generate
```

5. Run the development server
```bash
npm run dev
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (runs Prisma generate and TypeScript compilation)
- `npm start` - Start production server

## API Endpoints

### Authentication
- `POST /signup` - Register a new user
- `POST /signin` - Login user

### Products
- `GET /api/product` - Get all products
- `GET /api/product/:id` - Get product by ID
- `POST /api/product` - Create new product
- `PUT /api/product/:id` - Update product
- `DELETE /api/product/:id` - Delete product

### Updates
- `GET /api/update` - Get all updates
- `GET /api/update/:id` - Get update by ID
- `POST /api/update` - Create new update
- `PUT /api/update/:id` - Update update
- `DELETE /api/update/:id` - Delete update

### Update Points
- `GET /api/updatepoint` - Get all update points
- `GET /api/updatepoint/:id` - Get update point by ID
- `POST /api/updatepoint` - Create new update point
- `PUT /api/updatepoint/:id` - Update update point
- `DELETE /api/updatepoint/:id` - Delete update point

## Project Structure
```
src/
├── config/     - Environment configurations
├── handlers/   - Route handlers
├── lib/        - Database client
├── modules/    - Auth and middleware
├── utils/      - Helper functions
└── index.ts    - Entry point
```

## Deployment

This project is configured for deployment on Render.com. The `render.yaml` file contains the necessary deployment configuration.

Required environment variables for production:
- `NODE_ENV`: production
- `STAGE`: production
- `DATABASE_URL`: Prisma Accelerate URL
- `JWT_SECRET`: JWT signing key
