# Mini Lead Tracker - Backend

This is the NestJS backend for the Mini Lead Tracker CRM.

## Documentation
- Full project documentation is available in the [root README](../README.md).
- API Swagger documentation: [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

## Project Setup

> [!NOTE]  
> This project uses **Prisma 7**. Database configuration is managed via `prisma.config.ts` in the root of the backend folder. Ensure `DATABASE_URL` is set in your `.env` file.

To run locally:
```bash
npm install
npx prisma generate
npx prisma db push # Recommended for development
npm run start:dev
```
