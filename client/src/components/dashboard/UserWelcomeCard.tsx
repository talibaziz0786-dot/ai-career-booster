import { useAuthStore }
from "../../store/auth-store";

export default function UserWelcomeCard() {

  const user =
    useAuthStore(
      (state) => state.user
    );

  return (

    <div
      className="
      rounded-3xl
      bg-gradient-to-r
      from-cyan-500
      to-blue-600
      p-8
      text-white
      "
    >

      <h2
        className="
        text-4xl
        font-black
        "
      >
        Welcome Back,
      </h2>

      <p
        className="
        mt-2
        text-xl
        "
      >
        {user?.name}
      </p>

    </div>

  );
}