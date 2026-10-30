import {
  useState,
} from "react";

import {
  Edit2,
  UserRound,
} from "lucide-react";

import {
  useUserProfile,
} from "../hooks/useUserProfile";

import ProfileCard from "../components/profile/ProfileCard";

import ProfileEditForm from "../components/profile/ProfileEditForm";

export default function ProfilePage() {
  const {
    user,
    updateProfile,
    isUpdating,
  } =
    useUserProfile();

  const [
    isEditing,
    setIsEditing,
  ] = useState(false);

  /* ========================================================
     Loading State
  ======================================================== */

  if (!user) {
    return (
      <main
        className="
          flex
          min-h-[60vh]
          items-center
          justify-center
          bg-slate-50
          p-5
          dark:bg-slate-950
          sm:p-8
        "
      >
        <div
          className="
            flex
            w-full
            max-w-md
            flex-col
            items-center
            rounded-3xl
            border
            border-slate-200
            bg-white
            p-8
            text-center
            shadow-lg
            dark:border-white/10
            dark:bg-slate-900
          "
        >
          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-cyan-500/10
              text-cyan-500
            "
          >
            <UserRound
              size={26}
              aria-hidden="true"
            />
          </div>

          <h2
            className="
              mt-4
              text-lg
              font-bold
              text-slate-900
              dark:text-white
            "
          >
            Loading profile
          </h2>

          <p
            className="
              mt-2
              text-sm
              leading-6
              text-slate-500
              dark:text-slate-400
            "
          >
            Please wait while we load your
            professional profile.
          </p>
        </div>
      </main>
    );
  }

  /* ========================================================
     Save
  ======================================================== */

  const handleSave =
    async (
      data: Parameters<
        typeof updateProfile
      >[0]
    ) => {
      await updateProfile(
        data
      );

      setIsEditing(
        false
      );
    };

  /* ========================================================
     Render
  ======================================================== */

  return (
    <main
      className="
        min-h-full
        bg-slate-50
        px-4
        py-6
        dark:bg-slate-950
        sm:px-6
        lg:px-8
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-5xl
          space-y-6
          sm:space-y-8
        "
      >
        {/* ==================================================
            Header
        ================================================== */}

        <header
          className="
            flex
            flex-col
            gap-4
            sm:flex-row
            sm:items-end
            sm:justify-between
          "
        >
          <div
            className="
              min-w-0
            "
          >
            <div
              className="
                mb-2
                flex
                items-center
                gap-2
              "
            >
              <span
                className="
                  h-2
                  w-2
                  shrink-0
                  rounded-full
                  bg-cyan-500
                  shadow-[0_0_12px_rgba(6,182,212,0.7)]
                "
                aria-hidden="true"
              />

              <span
                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-cyan-600
                  dark:text-cyan-400
                "
              >
                Professional Profile
              </span>
            </div>

            <h1
              className="
                text-3xl
                font-black
                tracking-tight
                text-slate-900
                dark:text-white
                sm:text-4xl
              "
            >
              Your Profile
            </h1>

            <p
              className="
                mt-2
                max-w-2xl
                text-sm
                leading-6
                text-slate-500
                dark:text-slate-400
                sm:text-base
              "
            >
              Build a recruiter-ready
              professional identity with
              your experience, skills and
              career links.
            </p>
          </div>

          {!isEditing && (
            <button
              type="button"
              onClick={() =>
                setIsEditing(true)
              }
              className="
                inline-flex
                min-h-12
                w-full
                shrink-0
                items-center
                justify-center
                gap-2
                rounded-2xl
                bg-gradient-to-r
                from-cyan-500
                to-blue-600
                px-5
                text-sm
                font-bold
                text-white
                shadow-lg
                shadow-cyan-500/20
                transition
                hover:-translate-y-0.5
                hover:shadow-xl
                focus:outline-none
                focus:ring-2
                focus:ring-cyan-500
                focus:ring-offset-2
                dark:focus:ring-offset-slate-950
                sm:w-auto
              "
            >
              <Edit2
                size={17}
                aria-hidden="true"
              />

              Edit Profile
            </button>
          )}
        </header>

        {/* ==================================================
            Content
        ================================================== */}

        {isEditing ? (
          <ProfileEditForm
            user={user}
            isUpdating={
              isUpdating
            }
            onSave={handleSave}
            onCancel={() =>
              setIsEditing(
                false
              )
            }
          />
        ) : (
          <ProfileCard
            user={user}
          />
        )}
      </div>
    </main>
  );
}