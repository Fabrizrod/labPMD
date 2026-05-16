import AuthService from "../services/auth.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  if (!currentUser) {
    return <div className="container mt-5 text-center"><h3>Ups! Debes iniciar sesión para ver esto.</h3></div>;
  }

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow">
        <h3>Perfil de <strong>{currentUser.username}</strong></h3>
        <hr />
        <p><strong>Tu ID:</strong> {currentUser.id}</p>
        <p><strong>Tu Email:</strong> {currentUser.email}</p>
        <p><strong>Tus Roles:</strong></p>
        <ul>
          {currentUser.roles.map((role, index) => <li key={index} className="badge bg-info text-dark me-2">{role}</li>)}
        </ul>
        <p className="mt-3 text-muted" style={{ fontSize: "12px", wordWrap: "break-word" }}>
          <strong>Token VIP:</strong> {currentUser.accessToken}
        </p>
      </div>
    </div>
  );
};

export default Profile;