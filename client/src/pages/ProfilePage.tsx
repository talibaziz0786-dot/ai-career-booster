import {
  useAuthStore,
} from "../store/auth-store";

export default function ProfilePage() {

  const user =
    useAuthStore(
      (state) =>
        state.user
    );

  return (

    <div className="p-8">

      <h1
        className="
        text-5xl
        font-black
        dark:text-white
        mb-8
      "
      >
        Profile
      </h1>

      <div
        className="
        rounded-3xl
        border
        p-8
        bg-white
        dark:bg-slate-900
      "
      >

        <p>
          Name:
          {" "}
          {user?.name}
        </p>

        <p>
          Email:
          {" "}
          {user?.email}
        </p>

      </div>

    </div>

  );
}