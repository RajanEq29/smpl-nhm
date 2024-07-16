import reducer from "./reducer";
// import thunk from "redux-thunk";
// import {  configureStore } from "@reduxjs/toolkit";
// import { Middleware } from "redux"; // Import Middleware type

import { configureStore } from "@reduxjs/toolkit";
import { Admin } from "./Admin";
import thunk from "redux-thunk";

// const middleware: Middleware[] = [thunk]; // Define an array of middleware

// const store = configureStore({
//   reducer: reducer,
//   middleware: middleware, // Pass the middleware array
// });

// export default store;
const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [Admin.reducerPath]: Admin.reducer,
    // Your other reducers here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk, Admin.middleware),
});
export default store;
