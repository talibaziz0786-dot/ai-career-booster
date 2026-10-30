import {
  CheckCircle2,
  CircleUserRound,
  ExternalLink,
  Globe,
  Mail,
  MapPin,
  Phone,
  
} from "lucide-react";

import {
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

import type {
  ReactNode,
} from "react";

/* ==========================================================
   User
========================================================== */

interface ProfileCardUser {
  name: string;

  email: string;

  isProUser?: boolean;

  title?: string;

  location?: string;

  phone?: string;

  bio?: string;

  github?: string;

  linkedin?: string;

  portfolio?: string;

  avatar?: string;
}

/* ==========================================================
   Props
========================================================== */

interface ProfileCardProps {
  user: ProfileCardUser;
}

/* ==========================================================
   Profile Fields
========================================================== */

const PROFILE_FIELDS = [
  "name",
  "bio",
  "title",
  "location",
  "phone",
  "github",
  "linkedin",
  "portfolio",
] as const;

/* ==========================================================
   Normalize URL
========================================================== */

function normalizeUrl(
  value?: string
): string | null {
  if (
    !value?.trim()
  ) {
    return null;
  }

  const trimmed =
    value.trim();

  try {
    const url =
      /^https?:\/\//i.test(
        trimmed
      )
        ? trimmed
        : `https://${trimmed}`;

    const parsed =
      new URL(url);

    if (
      parsed.protocol !==
        "http:" &&
      parsed.protocol !==
        "https:"
    ) {
      return null;
    }

    return parsed.toString();
  } catch {
    return null;
  }
}

/* ==========================================================
   Display URL
========================================================== */

function getDisplayUrl(
  value?: string
): string {
  if (
    !value?.trim()
  ) {
    return "Not provided";
  }

  return value
    .trim()
    .replace(
      /^https?:\/\//i,
      ""
    )
    .replace(
      /\/$/,
      ""
    );
}

/* ==========================================================
   Completion
========================================================== */

function calculateCompletion(
  user: ProfileCardUser
): number {
  const completedFields =
    PROFILE_FIELDS.filter(
      (field) => {
        const value =
          user[field];

        return (
          typeof value ===
            "string" &&
          value.trim()
            .length > 0
        );
      }
    ).length;

  return Math.round(
    (
      completedFields /
      PROFILE_FIELDS.length
    ) * 100
  );
}

/* ==========================================================
   Profile Card
========================================================== */

export default function ProfileCard({
  user,
}: ProfileCardProps) {
  const completion =
    calculateCompletion(
      user
    );

  const githubUrl =
    normalizeUrl(
      user.github
    );

  const linkedinUrl =
    normalizeUrl(
      user.linkedin
    );

  const portfolioUrl =
    normalizeUrl(
      user.portfolio
    );

  const initials =
    user.name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map(
        (part) =>
          part
            .charAt(0)
            .toUpperCase()
      )
      .join("");

  return (
    <section
      aria-labelledby="profile-card-title"
      className="
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white
        shadow-xl
        shadow-slate-200/40
        transition-shadow
        duration-300
        hover:shadow-2xl
        dark:border-white/10
        dark:bg-slate-900
        dark:shadow-none
      "
    >
      {/* ==================================================
          Header
      ================================================== */}

      <div
        className="
          border-b
          border-slate-200
          bg-gradient-to-br
          from-slate-50
          via-white
          to-cyan-50/40
          p-5
          dark:border-slate-800
          dark:from-slate-900
          dark:via-slate-900
          dark:to-cyan-950/20
          sm:p-7
          lg:p-8
        "
      >
        <div
          className="
            flex
            flex-col
            gap-6
            sm:flex-row
            sm:items-center
          "
        >
          {/* Avatar */}

          <div
            className="
              flex
              h-24
              w-24
              shrink-0
              items-center
              justify-center
              overflow-hidden
              rounded-3xl
              bg-gradient-to-br
              from-cyan-500
              to-blue-600
              text-3xl
              font-black
              text-white
              shadow-xl
              shadow-cyan-500/20
              ring-4
              ring-white
              dark:ring-slate-900
              sm:h-28
              sm:w-28
              sm:text-4xl
            "
          >
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={`${user.name} profile`}
                className="
                  h-full
                  w-full
                  object-cover
                "
                loading="lazy"
                onError={(
                  event
                ) => {
                  event.currentTarget.style.display =
                    "none";
                }}
              />
            ) : initials ? (
              initials
            ) : (
              <CircleUserRound
                size={48}
                aria-hidden="true"
              />
            )}
          </div>

          {/* Identity */}

          <div
            className="
              min-w-0
              flex-1
            "
          >
            <div
              className="
                flex
                flex-wrap
                items-center
                gap-3
              "
            >
              <h2
                id="profile-card-title"
                className="
                  break-words
                  text-2xl
                  font-black
                  tracking-tight
                  text-slate-900
                  dark:text-white
                  sm:text-3xl
                "
              >
                {user.name}
              </h2>

              {user.isProUser && (
                <span
                  className="
                    inline-flex
                    items-center
                    gap-1.5
                    rounded-full
                    border
                    border-cyan-500/20
                    bg-cyan-500/10
                    px-3
                    py-1
                    text-xs
                    font-bold
                    text-cyan-700
                    dark:text-cyan-400
                  "
                >
                  <CheckCircle2
                    size={14}
                    aria-hidden="true"
                  />

                  Pro Member
                </span>
              )}
            </div>

            <p
              className="
                mt-2
                text-base
                font-bold
                text-cyan-600
                dark:text-cyan-400
                sm:text-lg
              "
            >
              {user.title ||
                "Career Professional"}
            </p>

            <div
              className="
                mt-4
                flex
                flex-col
                gap-2
                text-sm
                text-slate-500
                dark:text-slate-400
                sm:flex-row
                sm:flex-wrap
                sm:gap-x-5
              "
            >
              <span
                className="
                  inline-flex
                  min-w-0
                  items-center
                  gap-2
                "
              >
                <Mail
                  size={16}
                  className="shrink-0"
                  aria-hidden="true"
                />

                <span
                  className="break-all"
                >
                  {user.email}
                </span>
              </span>

              {user.location && (
                <span
                  className="
                    inline-flex
                    items-center
                    gap-2
                  "
                >
                  <MapPin
                    size={16}
                    className="shrink-0"
                    aria-hidden="true"
                  />

                  <span>
                    {user.location}
                  </span>
                </span>
              )}

              {user.phone && (
                <span
                  className="
                    inline-flex
                    items-center
                    gap-2
                  "
                >
                  <Phone
                    size={16}
                    className="shrink-0"
                    aria-hidden="true"
                  />

                  <span>
                    {user.phone}
                  </span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ==================================================
          Profile Strength
      ================================================== */}

      <div
        className="
          border-b
          border-slate-200
          p-5
          dark:border-slate-800
          sm:p-7
          lg:p-8
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
            gap-4
          "
        >
          <div>
            <h3
              className="
                font-bold
                text-slate-900
                dark:text-white
              "
            >
              Profile Strength
            </h3>

            <p
              className="
                mt-1
                text-xs
                leading-5
                text-slate-500
                dark:text-slate-400
              "
            >
              Complete your profile to
              improve recruiter visibility.
            </p>
          </div>

          <span
            className="
              shrink-0
              rounded-full
              bg-cyan-500/10
              px-3
              py-1
              text-sm
              font-black
              text-cyan-600
              dark:text-cyan-400
            "
          >
            {completion}%
          </span>
        </div>

        <div
          className="
            mt-4
            h-2.5
            overflow-hidden
            rounded-full
            bg-slate-200
            dark:bg-slate-800
          "
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={completion}
          aria-label={`Profile completion ${completion}%`}
        >
          <div
            className="
              h-full
              rounded-full
              bg-gradient-to-r
              from-cyan-500
              to-blue-600
              transition-[width]
              duration-700
              ease-out
            "
            style={{
              width: `${completion}%`,
            }}
          />
        </div>
      </div>

      {/* ==================================================
          Professional Summary
      ================================================== */}

      <div
        className="
          p-5
          sm:p-7
          lg:p-8
        "
      >
        <div>
          <h3
            className="
              text-xs
              font-black
              uppercase
              tracking-[0.16em]
              text-slate-400
            "
          >
            Professional Summary
          </h3>

          <p
            className="
              mt-3
              whitespace-pre-line
              text-sm
              leading-7
              text-slate-700
              dark:text-slate-300
              sm:text-base
            "
          >
            {user.bio ||
              "No professional summary has been added yet. Add a concise summary of your experience, skills, achievements and career goals."}
          </p>
        </div>

        {/* ==================================================
            Professional Links
        ================================================== */}

        <div className="mt-8">
          <h3
            className="
              text-xs
              font-black
              uppercase
              tracking-[0.16em]
              text-slate-400
            "
          >
            Professional Links
          </h3>

          <div
            className="
              mt-4
              grid
              grid-cols-1
              gap-3
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >
            <ProfileLink
              label="GitHub"
              value={user.github}
              href={githubUrl}
              icon={
                <FaGithub
                  size={21}
                  aria-hidden="true"
                />
              }
            />

            <ProfileLink
              label="LinkedIn"
              value={
                user.linkedin
              }
              href={
                linkedinUrl
              }
              icon={
                <FaLinkedin
                  size={21}
                  aria-hidden="true"
                />
              }
            />

            <ProfileLink
              label="Portfolio"
              value={
                user.portfolio
              }
              href={
                portfolioUrl
              }
              icon={
                <Globe
                  size={21}
                  aria-hidden="true"
                />
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================
   Profile Link
========================================================== */

interface ProfileLinkProps {
  label: string;

  value?: string;

  href: string | null;

  icon: ReactNode;
}

function ProfileLink({
  label,
  value,
  href,
  icon,
}: ProfileLinkProps) {
  const hasLink =
    Boolean(href);

  const content = (
    <>
      <div
        className="
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-slate-100
          text-slate-700
          dark:bg-slate-800
          dark:text-slate-200
        "
      >
        {icon}
      </div>

      <div
        className="
          min-w-0
          flex-1
        "
      >
        <p
          className="
            text-xs
            font-bold
            uppercase
            tracking-wide
            text-slate-400
          "
        >
          {label}
        </p>

        <p
          className="
            mt-1
            truncate
            text-sm
            font-semibold
            text-slate-900
            dark:text-white
          "
        >
          {value
            ? getDisplayUrl(
                value
              )
            : "Not provided"}
        </p>
      </div>

      {hasLink && (
        <ExternalLink
          size={16}
          className="
            shrink-0
            text-slate-400
          "
          aria-hidden="true"
        />
      )}
    </>
  );

  if (!href) {
    return (
      <div
        className="
          flex
          min-w-0
          items-center
          gap-3
          rounded-2xl
          border
          border-slate-200
          bg-slate-50/70
          p-4
          opacity-60
          dark:border-slate-800
          dark:bg-slate-950/40
        "
      >
        {content}
      </div>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      referrerPolicy="no-referrer"
      aria-label={`Open ${label} profile`}
      className="
        flex
        min-w-0
        items-center
        gap-3
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-4
        outline-none
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:border-cyan-400
        hover:bg-cyan-50/50
        hover:shadow-lg
        hover:shadow-cyan-500/10
        focus-visible:ring-4
        focus-visible:ring-cyan-500/20
        dark:border-slate-800
        dark:bg-slate-950
        dark:hover:border-cyan-500
        dark:hover:bg-cyan-500/5
      "
    >
      {content}
    </a>
  );
}