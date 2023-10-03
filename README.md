<img src="./readme/title1.svg"/>

<br><br>
<img src="./readme/title0.svg"/>

- [Project Description](#project-description)
- [User Types](#user-types)
- [Features of the App](#features-of-the-app)
- [Tech Stack](#tech-stack)
  - [Frontend](#end)
  - [Backend](#Backend)
- [Prototyping](#prototyping)
- [Demo](#Demo)
- [OpenAi](#OpenAi)
- [Performance](#Performance)
- [How to Run](#how-to-run)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)

<br><br>

<!-- project philosophy -->

<a name="project-description"></a>

<img src="./readme/title2.svg"/>

> Your go-to Arduino/mobile app for remote plant care while offering plant recognition, AI ChatBot, and market updates

<br>

### Project Description
Plantuino's primary goal is to help Plant Owners nurture their House Plants in a hybrid way by collecting vital data such as light,and moisture percentages and thus notifying the user about the plant's state. This data is gathered through sensors connected to an Arduino and sent to the mobile app that, after AI analysis of the plant type, compares it to its favorabile light and moisture percentages. If a deficiency or excess of light or moisture is detected, the app sends real-time notifications to the Plant Owner.Moreover, the arduino is responsible of supplying water to the plant if needed.The average moisture and light percentages are presented in charts that dynamically inform the user of the plant's moisture and light present percentages.Also, The app offers the feature of chatting with a ChatBot that can answer any of users' questions.
<br><br>
On a secondary level, the app connects Plant Owners to Plant Sellers and vice-versa through embeded markets; Plant Owners have the access to view Sellers products uploaded.
<br><br>
In addition, An Admin Dashboard is implemented to be able to view, edit, and delete users.
<br><br>

### User Types 

1. Plant Owner 
2. Seller
3. Admin



<br>

### Features of the App 
As a Plant Owner:
- View daily graphical analysis about my houseplant so I can review it’s progress.
- Chat with a bot, so I can know more about my houseplant.
- Identify type of a plant so that I can have information about it.
- Buy other houseplants so that I can engrow my lovely garden.
- Recieve push notifications so that I can be informed about my hosseplant status.

As a Seller:
- Upload new products on my store so I can sell them to clients.
- Edit products details so that I can change them whenever I want.
- Delete a product so that it won't show to clients.

As an Admin:
- View All and specific type of users so that I can check for app activity.
- Create a new users so that I can add them to the community.
- Have access to edit actions so that I change user details 
- Have access to delete actions so that I can remove users

<br><br>

<!-- Prototyping -->
<a name="prototyping"></a>

<img src="./readme/title3.svg"/>

> I designed Plantuino using mockups, iterating on the design until I reached the ideal layout for easy navigation and an unforgettable user experience.

### Mockups

#### Authentication Screens

| Signin screen                              | Register Screen                            |
| ----------------------------------------- | ---------------------------------------- |
| ![Landing](./readme/demo/LoginScreen.png) | ![fsdaf](./readme/demo/SignupScreen.png) |

<br><br>

#### Owners Screens

| Home Screen                              | AI Recognition Screen          | Loading Screen                      |
| ---------------------------------------- | ------------------------------ | ----------------------------------- |
| ![Landing](./readme/demo/PlantOwner.png) | ![fsdaf](./readme/demo/Ai.png) | ![fsdaf](./readme/demo/Loading.png) |

| Result Screen                        | Owner Home Screen (Updated)                       | Market                             |
| ------------------------------------ | ------------------------------------------------- | ---------------------------------- |
| ![Landing](./readme/demo/Result.png) | ![fsdaf](./readme/demo/homeScreen(updated).png) | ![fsdaf](./readme/demo/Market.png) |

| Contact Modal                              | ChatScreen (Empty)                    | Chat                             |
| ------------------------------------------ | ------------------------------------- | -------------------------------- |
| ![Landing](./readme/demo/ContactModal.png) | ![fsdaf](./readme/demo/emptychat.png) | ![fsdaf](./readme/demo/Chat.png) |

| Notifications                               | Analytics (Empty)                          | Analytics                              |
| ------------------------------------------- | ------------------------------------------ | -------------------------------------- |
| ![Landing](./readme/demo/Notifications.png) | ![fsdaf](./readme/demo/analyticsempty.png) | ![fsdaf](./readme/demo/Analytics.jpeg) |

#### Sellers Screens

| My Market                              | EditModal                             | Editing                             |
| -------------------------------------- | ------------------------------------- | ----------------------------------- |
| ![Landing](./readme/demo/mymarket.png) | ![fsdaf](./readme/demo/EditModal.png) | ![fsdaf](./readme/demo/Editing.png) |

<br><br>

#### Profile Screen

| My Market                              |                            |                           |
| -------------------------------------- | ------------------------------------- | ----------------------------------- |
| ![Landing](./readme/demo/profile.png) | 

<br><br>

<!-- Implementation -->

<a name="Demo" ></a>
<img src="./readme/title4.svg"/>

> Using the mockups as a guide, I implemented the Plantuino app with the following features:

### User Screens (Mobile)

| Login screen                              | Register screen                         | Recognition Screen                         | Loading screen                          |
| ----------------------------------------- | --------------------------------------- | --------------------------------------- | --------------------------------------- |
| ![Landing](./readme/demo/Gifs/signin.gif) | ![fsdaf](./readme/demo/Gifs/register.gif) | ![fsdaf](./readme/demo/Gifs/recognition.gif) | ![fsdaf](./readme/demo/Gifs/savingplant.gif) |
| Public Market                               | Contact Modal                             | Chat Screen                            | Chart Screen                         |
| ![Landing](./readme/demo/Gifs/publicmarket.gif) | ![fsdaf](./readme/demo/Gifs/contact.gif) | ![fsdaf](./readme/demo/Gifs/chat.gif) | ![fsdaf](./readme/demo/Gifs/notifications.gif) | |
| Charts                              | Dynamic Charts                              | Add product Screen                            | Edit Product                         |
| ![Landing](./readme/demo/Gifs/chart.gif) | ![fsdaf](./readme/demo/Gifs/dynamichart.gif) | ![fsdaf](./readme/demo/Gifs/addproduct.gif) | ![fsdaf](./readme/demo/Gifs/editproduct.gif) 
| Delete Product                              | Profile                         
| ![Landing](./readme/demo/Gifs/delete.gif) | ![fsdaf](./readme/demo/Gifs/profile.gif) 

#### Admin Screens (Web)

| Login screen                            | Register screen                       | Landing screen                        |
| --------------------------------------- | ------------------------------------- | ------------------------------------- |
| ![Landing](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) |
| Home screen                             | Menu Screen                           | Order Screen                          |
| ![Landing](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) |

<br><br>

<!-- Tech stack -->
<a name="tech-stack" ></a>
<img src="./readme/title5.svg"/>
>The application utilizes React Native (Expo) for the mobile app, Node.js with Express for the backend, MongoDB Atlas for database storage, AWS server for cloud infrastructure, Arduino for sensor data collection, OpenAI for ChatBot and Analysis,plant.id API for plant Recognition, and Native Notify for real-time notifications.
<br>
Plantuino is built using the following technologies:
## Frontend
<a name="Frontend" ></a>
- **[React Native (Expo)](https://expo.dev/):** Used for cross-platform mobile app development.
- **[Expo Packages](https://docs.expo.dev/workflow/using-libraries/):** Various Expo packages for accessing device features and UI components.
- **[Redux Toolkit](https://redux-toolkit.js.org/):** Manages app data and state effectively.development.
- **[Native Notify](https://nativenotify.com/):** Handles push notifications.development.
- **React Navigation:** Handles navigation within the app.
- **Axios:** Enables network requests to the backend.
  <br>

## Backend
<a name="Backend" ></a>

- **[Node.js](https://expo.dev/) with Express:**  Powers the backend server for API requests and logic.
- **Mongoose:** Object Data Modeling (ODM) library for MongoDB.
- **[MongoDB Atlas ](https://www.mongodb.com/):**  Cloud-based database service for data storage.
- **AWS (Amazon Web Services):** Cloud infrastructure for hosting the server and application.
- **Arduino:** Utilized for sensor data collection in the field.
- **OpenAI API:** Empowers ChatBot and Analysis.
- **Native Notify:** Used for real-time notifications.
EcoTech utilizes these technologies to provide a seamless and comprehensive wildfire prevention and community engagement experience.



<!-- How to run -->
<img src="./readme/title6.svg"/>

> To set up Coffee Express locally, follow these steps:

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Get a free API Key at [https://example.com](https://example.com)
2. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API in `config.js`
   ```js
   const API_KEY = "ENTER YOUR API";
   ```

Now, you should be able to run Coffee Express locally and explore its features.
