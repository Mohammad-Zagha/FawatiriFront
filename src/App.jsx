import { Routes, Route, Navigate } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import AddItem from "./Pages/AddItem";

import { QueryClient, QueryClientProvider } from "react-query";
import { RequireAuth } from "react-auth-kit";
import LayoutOne from "./components/LayoutOne";
import NavBar from "./components/NavBar";
import Pos from "./Pages/Pos";
import PosNavBar from "./components/PosNavBar";
import { SelectedDataProvider } from "./context/SelectedDataContext";
import SelectAccount from "./Pages/SelectAccount";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
function App() {
  return (
    <SelectedDataProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route element={<LayoutOne />}>
              <Route path="/login" element={<Login />} />
            </Route>
            <Route>
              <Route
                path="/selectAccount"
                element={
                  <RequireAuth loginPath="/login">
                    <SelectAccount />
                  </RequireAuth>
                }
              />
            </Route>
            <Route element={<NavBar />}>
              <Route
                path="/"
                element={
                  <RequireAuth loginPath="/login">
                    <Home />
                  </RequireAuth>
                }
              />
              <Route
                path="/addItem"
                element={
                  <RequireAuth loginPath="/login">
                    <AddItem />
                  </RequireAuth>
                }
              />
            </Route>

            <Route element={<PosNavBar />}>
              <Route
                path="/pos"
                element={
                  <RequireAuth loginPath="/login">
                    <Pos />
                  </RequireAuth>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </SelectedDataProvider>
  );
}

export default App;
