import React, { useState, useEffect } from "react";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import SignUp from "./SignUp"; // Componentă pentru înregistrare
import HabitTracker from "./HabitTracker"; // Componenta principală
import "./App.css";

const App = () => {
  const [user, setUser] = useState(null);

  // Ascultă schimbările de autentificare
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Funcție pentru delogare
  const handleLogout = async () => {
    await signOut(auth);
    alert("Delogat cu succes!");
  };

  return (
    <div>
      {/* Dacă utilizatorul NU este autentificat */}
      {!user ? (
        <SignUp /> // Afișează componenta pentru înregistrare/logare
      ) : (
        <>
          <button onClick={handleLogout}>Delogare</button>
          <p>Conectat cu succes, {user.email}!</p>

          {/* Conținutul aplicației Habit Tracker */}
          <div>
            <h1>Bun venit la aplicația Habit Tracker</h1>
            <HabitTracker />
          </div>
        </>
      )}
    </div>
  );
};

export default App;