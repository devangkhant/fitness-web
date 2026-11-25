export default function ProfileBadge({ name, role }) {
  return (
    <div style={{ padding: "16px", border: "1px solid #ccc" }}>
      <h2>{name}</h2>
      <p>Role: {role}</p>
    </div>
  );
}

