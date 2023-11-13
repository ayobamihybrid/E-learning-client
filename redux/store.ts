'use client';
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './features/api/apiSlice';
import authSlice from './features/auth/authSlice';
import { useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
  },
  devTools: false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// call the load user on every page load
function App() {
  const { user } = useSelector((state: any) => state.auth);

  async function RefreshApp() {
    if (user !== '') {
      await store.dispatch(
        apiSlice.endpoints.loadUser.initiate({}, { forceRefetch: true })
      );
    }
  }

  RefreshApp();
}

// const refreshApp = async () => {
//   await store.dispatch(
//     apiSlice.endpoints.refreshToken?.initiate({}, { forceRefetch: true })
//   );
//   await store.dispatch(
//     apiSlice.endpoints.loadUser?.initiate({}, { forceRefetch: true })
//   );
// };

// refreshApp();

// const RefreshApp = async () => {
//   const { user } = useSelector((state: any) => state.auth);

//   if (user !== '') {
//     await store.dispatch(
//       apiSlice.endpoints.refreshToken.initiate({}, { forceRefetch: true })
//     );
//     await store.dispatch(
//       apiSlice.endpoints.loadUser.initiate({}, { forceRefetch: true })
//     );
//   }
// };

// async function main() {
//   await RefreshApp();
// }

// main();
