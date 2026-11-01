// import { Routes, Route } from "react-router-dom";

// import Home from "./pages/Home";
// import Booking from "./pages/Booking";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import Signup from "./pages/Signup";

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/booking" element={<Booking />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/dashboard" element={<Dashboard />} />
//       <Route path="/signup" element={<Signup />} />
//     </Routes>
//   );
// }

// export default App;



import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Customer Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRole="customer">
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Admin Dashboard */}
      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
