import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home";
import Playlists from "./pages/Playlists";
import Song from "./features/songs/Song";
import User from "./pages/User";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import { SongsPlayerProvider } from "./context/SongsPlayerContext";
import { DarkModeProvider } from "./context/DarkModeContext";
import Playlist from "./features/playlists/Playlist";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <SongsPlayerProvider>
          <ReactQueryDevtools initialIsOpen={false} />
          <GlobalStyles />
          <BrowserRouter>
            <Routes>
              <Route element={<AppLayout />}>
                <Route index element={<Navigate replace to="/home" />} />
                <Route path="/home" element={<Home />} />
                <Route path="/playlists" element={<Playlists />} />
                <Route path="/playlists/:playlistId" element={<Playlist />} />
                <Route path="/user" element={<User />} />
              </Route>

              <Route path="/login" element={<Login />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
        </SongsPlayerProvider>

        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "0.8rem" }}
          toastOptions={{
            success: { duration: 3000 },
            error: { duration: 5000 },
            style: {
              fontSize: "1.6rem",
              maxWidth: "50rem",
              padding: "1.6rem 2.4rem",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
