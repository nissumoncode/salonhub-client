# SalonHub Client

## Project Name and Description

**SalonHub** is a salon appointment booking platform. Customers can explore salon services, book appointments, manage their bookings, and pay for confirmed appointments. Administrators can manage appointments and transactions through the dashboard.

## Important Features

- Customer registration and login
- Google authentication
- Browse available salon services
- Book salon appointments
- View and manage personal appointments
- Pay for confirmed appointments using Stripe Checkout
- Payment success and cancellation pages
- Customer and Admin dashboards
- Admin appointment management
- Admin transaction management
- Light and Dark theme support

## Technology Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Better Auth
- Axios
- Stripe Checkout

## Installation Instructions

1. Install Node.js.
2. Clone the client repository:

   ```bash
   git clone https://github.com/nissumoncode/salonhub-client.git
   ```

3. Navigate to the project folder:

   ```bash
   cd salonhub-client
   ```

4. Install dependencies:

   ```bash
   npm install
   ```

5. Create a `.env.local` file in the root directory and configure the required environment variables.

## How to Run the Project Locally

1. Make sure the backend server is running locally on port 5000.
2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open your browser and visit:

   http://localhost:3000

Other available commands:

```bash
npm run build
npm run start
npm run lint
```

## Required Environment Variables

Add the following variables to `.env.local`:

- `NEXT_PUBLIC_BETTER_AUTH_URL`
- `NEXT_PUBLIC_API_URL`

For local development, set the API URL to:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

For production, set `NEXT_PUBLIC_API_URL` to your deployed backend URL.

## Live Website Link

https://salonhub-client.vercel.app

## Client and Server Repository Links

- **Client Repository:** https://github.com/nissumoncode/salonhub-client
- **Server Repository:** https://github.com/nissumoncode/salonhub-server
