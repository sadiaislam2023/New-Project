import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Auth from "./pages/Auth";
import AdminDashboard from "./pages/AdminDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import StudentDashboard from "./pages/StudentDashboard";

import RoomManagement from "./pages/RoomManagement";
import RoomDetails from "./pages/RoomDetails";
import RoomEdit from "./pages/RoomEdit";

function App() {
  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <Routes>

          {/* ================= AUTH ================= */}

          <Route
            path="/"
            element={<Auth />}
          />

          <Route
            path="/auth"
            element={<Auth />}
          />

          {/* ================= STUDENT ================= */}

          <Route
            path="/student"
            element={
              <ProtectedRoute role="student">
                <StudentDashboard />
              </ProtectedRoute>
            }
          />

          {/* ================= MANAGER ================= */}

          <Route
            path="/manager"
            element={
              <ProtectedRoute role="manager">
                <ManagerDashboard />
              </ProtectedRoute>
            }
          />

          {/* ================= ADMIN ================= */}

          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* ================= ROOM MANAGEMENT ================= */}

          <Route
            path="/rooms"
            element={
              <ProtectedRoute role="manager">
                <RoomManagement />
              </ProtectedRoute>
            }
          />

          {/* ================= ROOM DETAILS ================= */}

          <Route
            path="/rooms/:id"
            element={<RoomDetails />}
          />

          {/* ================= ROOM EDIT ================= */}

          <Route
            path="/rooms/edit/:id"
            element={
              <ProtectedRoute role="manager">
                <RoomEdit />
              </ProtectedRoute>
            }
          />

        </Routes>
      </div>
    </>
  );
}

export default App;