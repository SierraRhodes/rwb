
## Reading While Black/Brown (RWB - ruby)

```
Project's Purpose or Goal:

Empower users to discover a diverse range of books, with a focus on literature containing black
and brown people, while also enabling CRUD (Create, Read, Update, Delete) functionality for
users to post their own original works. 

List the absolute minimum features the project requires to meet this purpose or goal:

X Full CRUD functionality when creating their own book 
X Register Account 
X Login/Logout 
X Search Functionality 

What tools, frameworks, libraries, APIs, modules and/or other resources (whatever is
specific to your track, and your language) will you use to create this MVP? List them
all here. Be specific.

React 
Node.js
Three.js
Blender
Firebase
Custom API

If you finish developing the minimum viable product (MVP) with time to spare, what will
you work on next? Describe these features here: Be specific.

Forums 
Rate/Review books 
Leave comments
Message other users 
Livestreams
```

# Log 

```
Sep 3rd
07:40: Begin creating possible files for project
07:55: Analyze how I want the data to flow from the components
08:13: Watch a video on how to use Blender
08:52: Watch video on how to make crystals in Blender
09:23: Try to make something using Blender 
10:00: Watch videos on how to use Three.Js
11:25: Watch videos how how to import 3D models from Blender and use it with Three.Js 
11:52 Look up wireframes and try to create one

Sept 7th
10:00: Work on Login/Logout funcntionality 
11:15: Use Authentication from Firestore 
12:30: Create basic splash page
01:02: Create a database 
01:34: Read documentation on how I should structure my database
02:14: Troubleshoot adding new story to the user's list of stories 

Sep 14th
11:00am: Work on CRUD functionality
1:50pm: Incorporated CRUD functionality into stories and chapters
1:51pm: Troubleshoot chapters length not displaying correctly in story list component
1:53pm: Begin thinking on how I want the UI/UX to look like

```

# Set Up
```
1. Git clone the repository in your terminal. ex: git clone https://github.com/SierraRhodes/rwb.git

2. Create your own database through Firebase
https://www.learnhowtoprogram.com/react-part-time/react-with-nosql/setting-up-a-firebase-project-firestore-database-and-web-app

3. Create your .env file in your root directory
Within that file it should contain information about your database

 firebaseConfig = {
  apiKey: "YOUR-UNIQUE-CREDENTIALS",
  authDomain: "YOUR-PROJECT-NAME.firebaseapp.com",
  projectId: "YOUR-UNIQUE-PROJECT-NAME",
  storageBucket: "YOUR-UNIQUE-URL",
  messagingSenderId: "YOUR-UNIQUE-CREDENTIALS",
  appId: "YOUR-UNIQUE-APPID"
};

4. Enjoy! 

```


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
