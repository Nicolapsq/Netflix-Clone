import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout.jsx";
import HomePubblica from "./pages/HomePubblica.jsx";
import HomePrivata from "./pages/HomePrivata.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Registrer.jsx";
import DettaglioFilm from "./pages/DettaglioFilm.jsx";
import DettaglioEpisodio from "./pages/DettaglioEpisodio.jsx";
import Watchlist from "./pages/WatchList.jsx";
import SelezioneProfili from "./pages/SelezioneProfili.jsx";
import GestioneProfili from "./pages/GestioneProfili.jsx";
import Generi from "./pages/Generi.jsx";
import GenereDettaglio from "./pages/GeneriDettaglio.jsx";
import NotFound from "./pages/NotFound.jsx";
import PrivateRoute from "./components/PrivateRouter.jsx";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<HomePubblica />} />
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <HomePrivata />
                </PrivateRoute>
              }
            />
            <Route
              path="/movie/:id"
              element={
                <PrivateRoute>
                  <DettaglioFilm />
                </PrivateRoute>
              }
            />
            <Route
              path="/movie/:movieId/episode/:episodeNumber"
              element={
                <PrivateRoute>
                  <DettaglioEpisodio />
                </PrivateRoute>
              }
            />
            <Route
              path="/watchlist"
              element={
                <PrivateRoute>
                  <Watchlist />
                </PrivateRoute>
              }
            />
            <Route
              path="/profiles"
              element={
                <PrivateRoute>
                  <SelezioneProfili />
                </PrivateRoute>
              }
            />
            <Route
              path="/profiles/manage"
              element={
                <PrivateRoute>
                  <GestioneProfili />
                </PrivateRoute>
              }
            />
            <Route
              path="/genres"
              element={
                <PrivateRoute>
                  <Generi />
                </PrivateRoute>
              }
            />
            <Route
              path="/genres/:id"
              element={
                <PrivateRoute>
                  <GenereDettaglio />
                </PrivateRoute>
              }
            />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
