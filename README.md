# Vacationeer

A fully responsive back-end focused marketplace CRUD application built with the MERN stack (React, MongoDB, Express & Node).

## About The Build

Building this full-stack marketplace application was a great opportunity to further develop some of the core concepts I had been learning up until now including the MERN stack with Redux, advanced CRUD functionality with search, but also:  <br />

- The core concepts of a marketplace application, how to collect money and pay out to sellers <br />
- Integrating Stripe payments to build a marketplace app <br />
- Advanced use case of Stripe to automate entire payment workflow to build a multi-user app <br />
- Building a server / API with filtering functionality <br />
<br />
Some of the features provided in this application are:
<br /><br />

- Allows users to post products/services <br />
- Allows other users to buy these products/services <br />
- Page pagination <br />
- Hotel search feature, filtering by destination, start date, end date and number of beds <br />
- Filter by price & rating functionality <br />
- Star rating system <br />
- Automatic redirection to previous page after typing in login credentials to access private functionality / routes <br />
- System that checks if hotel has already been booked by the user, no duplicate bookings allowed <br />
- Login authentication system with email & password / Google login / Facebook login <br />
- Forgot / reset password functionality, confirmation email on sign up etc... <br />
- User profile for sellers with dashboard showing booking summaries, account balance, stripe payout settings, when the user joined the website and an option for editing / removing / adding a new hotel for booking <br />
- Google Maps API for location suggestions / autocompletes <br />
- View orders in customers dashboard and detailed info via payment modal <br />
- Two different types of users are hosted in this app, a seller and a buyer. The seller can for example be a hotel owner who will post the hotel rooms available for booking. The buyer is the one who can then book this hotel room <br />
- As the platform owner, you will be able to collect money from customers, take a certain commission/fee for being the platform owner, and then pay the rest to the sellers <br />
- Payment flow is automated using stripe. After a customer pays, stripe will allocate a certain percentage to the seller and a certain percentage to the platform owner. Then, every week stripe will automatically pay the balance out to the bank accounts of the account holders <br />
- Mobile responsive

