// islands/IslaProfile.tsx
import { FunctionalComponent } from "preact";

type Props = {
  data: { username: string };
};

const IslaProfile: FunctionalComponent<Props> = ({ data }) => {
  const logout = async () => {
    const res = await fetch("/api/logout", { method: "POST" });
    if (res.ok) globalThis.location.href = "/login";
  };

  return (
    <div class="profile">
      <p>Usuario: <strong>{data.username}</strong></p>
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
};

export default IslaProfile;
