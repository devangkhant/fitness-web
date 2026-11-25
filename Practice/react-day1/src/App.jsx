import { useState } from "react";
import ProfileBadge from "./ProfileBadge";

function App() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("Frontend Trainee");
  const [profiles, setProfiles] = useState([
    { id: 1, name: "Devang", role: "Frontend Trainee" }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault(); // ફોર્મ સબમિટ થતાં પેજ રિલોડ થતું અટકાવે છે

    if (!name.trim()) return; // ખાલી નામ હોય તો ઉમેરશે નહીં

    const newProfile = {
      id: Date.now(),
      name: name.trim(),
      role: role.trim() || "Frontend Trainee"
    };

    setProfiles((prevProfiles) => [...prevProfiles, newProfile]);
    setName(""); // સબમિટ કર્યા પછી ઇનપુટ ખાલી કરે છે
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <form onSubmit={handleSubmit} style={{ marginBottom: "24px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label
            htmlFor="profileName"
            style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}
          >
            Name:
          </label>
          <input
            id="profileName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name..."
            style={{ padding: "8px 12px", border: "1px solid #334155" }}
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label
            htmlFor="profileRole"
            style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}
          >
            Role:
          </label>
          <input
            id="profileRole"
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Enter role..."
            style={{ padding: "8px 12px", border: "1px solid #334155" }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 16px",
            backgroundColor: "#0f172a",
            color: "#ffffff",
            border: "none",
            cursor: "pointer"
          }}
        >
          Add Profile Card
        </button>
      </form>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
        {profiles.map((item) => (
          <ProfileBadge key={item.id} name={item.name} role={item.role} />
        ))}
      </div>
    </div>
  );
}

export default App;