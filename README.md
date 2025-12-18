# BMS![](https://i.imgur.com/Logo Real-Estat.png): Real Estate Hub
<br />

## **Live Website**  <img src="https://i.imgur.com/QsX6030.png" style="height: 50px; width: 50px; margin-bottom: 20px;">
You can check the website here [**Real Estate Hub**](https://-.com/).

## **The Problem** :no_entry_sign: 

- Managing properties for sale, purchase, and rent is often handled through fragmented and manual processes, causing poor organization, wasted time, and lack of transparency.

- Buyers and renters face difficulties in accessing accurate property information, as well as booking viewing appointments and completing payments through reliable channels.

- Property owners and agents struggle with professional marketing, lead management, and payment handling, relying on unstructured platforms and offline transactions.

## **The solution** :bulb: 

- Real Estate Hub provides a centralized digital platform to manage and discover properties for sale and rent efficiently.

- The platform enables users to search, filter, compare properties, book viewing appointments, and make secure online payments in one seamless experience.

- Property owners and agents can list, manage, and market properties professionally, while the system enhances transparency, communication, and transaction efficiency.


## **User Stories** :books: 

### **Guest User (Public Visitor)** :eyes:
- As a guest user, I can browse all available properties without creating an account.
- As a guest user, I can search, filter, and sort properties by location, price, and category.
- As a guest user, I can view property details including images and descriptions.
- As an apartment owner, I can all view all advertisements.
- As a guest user, I can access contact information and navigate to the registration or login page to create an account.



### **Buyer (Registered User)** :house_with_garden:

- As a buyer, I can view all properties and use advanced search and filtering options.
- As a buyer, I can contact the property owner directly through the platform.
- As a buyer, I can book an appointment to view a property.
- As a buyer, I can complete secure online payments when proceeding with a purchase or rental.
- As a buyer, I can add properties to my favorites, remove them, and view my favorites list.
- As a buyer, I can view and edit my profile information, including personal details, profile image, and password.


### **Owner (Property Owner)** :office:

- As a property owner, I can manage my properties from a dedicated dashboard.
- As a property owner, I can add new properties with full details and images.
- As a property owner, I can edit or delete my listed properties.
- As a property owner, I can view the status of each property (pending, approved, rejected, sold, rented).
- As a property owner, I can view dashboard statistics including:
    - Total number of properties
    - Approved properties
    - Rejected properties
    - Number of incoming requests
- As a property owner, I can view notifications.
- As a property owner, I can manage my profile information.



### **Admin (System Administrator)** :shield:

- As an admin, I can manage all system users.
- As an admin, I can view, search, filter, add, edit, and delete users.
- As an admin, I can view detailed user profiles.
- As an admin, I can manage all properties on the platform.
- As an admin, I can search, filter, edit, delete, approve, or reject property listings.
- As an admin, I can manage property categories.
- As an admin, I can access an admin dashboard with statistics and charts, including:
    - Total number of users
    - Approved properties
    - Rejected properties
    - System analytics and visual reports


## **User Journey**  :pencil2:

### **Guest User (Public Visitor)** :eyes:

- As a guest user, I land on the homepage where I can view featured properties for sale and rent.
- I can browse all properties, use search, filtering, and sorting options by location, price, and category.
- I can open a property details page to view images, descriptions, and basic information.
- If I want to book a viewing, save a property, or proceed further, I am redirected to the login or registration page to create an account.


### **Buyer (Registered User)** :house_with_garden:

- As a buyer, I log into my account and access the main dashboard.
- I browse available properties using advanced search and filtering tools.
- When interested in a property, I view its details, contact the owner, and book a viewing appointment.
- I can add properties to my favorites list and manage them at any time.
- After agreeing on a deal, I complete the payment securely through the platform.
- I can access my profile to view and edit personal information, update my profile image, or change my password.
- I can review all my saved properties, bookings, and transactions from my account.


### **Owner (Property Owner)** :office:

- As a property owner, I log into my dashboard where I can view statistics about my properties.
- I add a new property with full details, images, price, and category.
- I track the status of each property (pending, approved, rejected, sold, rented).
- I edit or delete properties when needed.
- I receive notifications for new requests, bookings, or updates.
- I manage my profile information directly from the dashboard.


### **Admin (System Administrator)** :shield:
- As an admin, I log into the admin panel and view overall system statistics and charts.
- I manage users by viewing, searching, filtering, editing, or deleting accounts.
- I review property listings submitted by owners and approve or reject them.
- I manage all properties, categories, and system content.
- I monitor platform performance through dashboards and reports.


## :pushpin: **How to Launch App Locally** :computer: 

*  clone this repo by typing this command in the terminal:  
`git clone https://github.com/Osama-Alghoul/real-estate-hub.git`

*  Run `npm i` to install the packages for the app as general.

### Run JSON Server (Mock Backend) :gear: 

We use JSON Server to simulate a backend. Start the mock API server:

`npm run server`

* This command runs  
`json-server --watch db.json --port 3001`
and makes the API available at 
`http://localhost:3001`


### Start the Frontend Application :rocket: 

Run the Next.js frontend:

`npm run dev`


### Test Accounts (Optional) :bust_in_silhouette: 

You can use these mock credentials to test user Admin :arrow_down:
``` 
:email: Email: `admin` 

:lock: Password: `admin@123`
```

### Environment Variables :lock:

Even with JSON Server, you can define environment variables in `.env.local` if needed:

`NEXT_PUBLIC_API_URL=http://localhost:3001`

## **Technologies** :computer:

- FrontEnd: **Vite, React, Next.js, TypeScript**
- BackEnd(Mock): **JSON Server**
- Styling: **Tailwind CSS**
- State Management: **React Context / Redux**
- HTTP Requests: **Axios or Fetch API**
- Version Control: **Git & GitHub**


## **Resources** :-

- [React.js](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [JSON Server](https://github.com/typicode/json-server)
- [TailwindCSS](https://tailwindcss.com/)
- [Axios HTTP](https://axios-http.com/)
- [Git&GitHub](https://github.com/)


## **Lead Mentor** :sunglasses::-

:round_pushpin:[Sawsan Almasri](https://github.com/almasrisawsan)


## **Team Members** 👥 :- 
1. [Alaa' Eliwa](https://github.com/alaaeliwa)
2. [Anan Abu Tawahina](https://github.com/Ananjamal)
3. [Mai Elhajeen](https://github.com/Mai-Elhajeen)
4. [Osama Alghoul](https://github.com/Osama-Alghoul)
