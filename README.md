# Ride Booking System - Backend

`This is the complete backend server for a Ride Booking platform supporting three user roles: Rider, Driver, and Admin. The backend is built with Node.js, Express, TypeScript, MongoDB, and Mongoose, with support for JWT-based authentication and role-based access control.`



##  Tech Stack

- `Node.js + Express`
- `MongoDB + **Mongoose`
- `TypeScript**`
- `JWT Authentication`
- `RESTful API Design`
- `Role-based Authorization (Rider, Driver, Admin)`

---

## 📁 Project Structure

`src/
├── config/
├── middlewares/ 
├── modules/
│ ├── auth/ 
│ ├── user/
│ ├── driver/ 
│ ├── ride/
├── utils/ 
├── app.ts 
├── server.ts `

---

## 🔐 User Roles & Features

###  Rider

- `Register & Login`
- `Book Ride (pickup → destination)`
- `View ride history`
-

###  Driver

- `Register & Login (pending approval)`
- `Accept ride`
- `Update ride status: ``accepted`, `on-going`, ``completed``
- `View ride earnings`


### 🛡️ Admin

- `Approve/suspend drivers `
- `View system analytics`
- `Monitor all rides`
- `Manage users`

---



##  API Routes Overview

### Auth Routes

`POST http://localhost:5000/api/v1/auth/register # Register user (rider/driver)`
`POST http://localhost:5000/api/v1/auth/login # Login with role`
`GET http://localhost:5000/api/v1/users/me # Get profile (requires token)`


### Rider Routes

`POST /api/v1/rides # Create new ride`
`GET /api/v1/rides/me # View own ride history`
`Cancel Ride (Rider)`
`Method: PATCH`
`URL: http://localhost:5000/api/v1/rides/cancel/:id`
`Update Ride Status (Driver Accept/Complete)`
`Method: PATCH`
`URL: http://localhost:5000/api/v1/rides/:id/status`



### Driver Routes

`GET http://localhost:5000/api/v1/driver/rides # View available rides`
`POST http://localhost:5000/api/v1/driver/accept/:id # Accept ride by ID`
`PATCH http://localhost:5000/api/v1/driver/update-status/:id # Update ride status`
`GET http://localhost:5000/api/v1/driver/earnings # View total earnings`


### Admin Routes

`PATCH   http://localhost:5000/api/v1/admin/approve-driver/:id # Approve driver`
 `PATCH  http://localhost:5000/api/v1/admin/suspend-driver/:driverId # Suspend Driver`
`GET http://localhost:5000/api/v1/admin/system-stats # View System Stats`
 `GET http://localhost:5000/api/v1/users # Admin Get All Users`





