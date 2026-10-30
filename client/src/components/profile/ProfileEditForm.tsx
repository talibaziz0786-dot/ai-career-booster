import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Save,
  X,
} from "lucide-react";

/* ==========================================================
   Form Data
========================================================== */

export interface ProfileFormData {
  name: string;

  bio: string;

  title: string;

  location: string;

  phone: string;

  github: string;

  linkedin: string;

  portfolio: string;
}

/* ==========================================================
   Props
========================================================== */

interface ProfileEditFormProps {
  user: {
    name: string;

    email: string;

    title?: string;

    location?: string;

    phone?: string;

    bio?: string;

    github?: string;

    linkedin?: string;

    portfolio?: string;
  };

  isUpdating: boolean;

  onSave: (
    data: ProfileFormData
  ) => void | Promise<void>;

  onCancel: () => void;
}

/* ==========================================================
   Constants
========================================================== */

const MAX_BIO_LENGTH =
  500;

/* ==========================================================
   Build Form Data
========================================================== */

function buildFormData(
  user: ProfileEditFormProps["user"]
): ProfileFormData {
  return {
    name:
      user.name ?? "",

    bio:
      user.bio ?? "",

    title:
      user.title ?? "",

    location:
      user.location ?? "",

    phone:
      user.phone ?? "",

    github:
      user.github ?? "",

    linkedin:
      user.linkedin ?? "",

    portfolio:
      user.portfolio ?? "",
  };
}

/* ==========================================================
   Normalize URL
========================================================== */

function normalizeUrl(
  value: string
): string {
  const trimmed =
    value.trim();

  if (!trimmed) {
    return "";
  }

  return /^https?:\/\//i.test(
    trimmed
  )
    ? trimmed
    : `https://${trimmed}`;
}

/* ==========================================================
   Validate URL
========================================================== */

function validateUrl(
  value: string,
  label: string
): string | null {
  const trimmed =
    value.trim();

  if (!trimmed) {
    return null;
  }

  try {
    const parsed =
      new URL(
        normalizeUrl(
          trimmed
        )
      );

    if (
      parsed.protocol !==
        "http:" &&
      parsed.protocol !==
        "https:"
    ) {
      return `${label} URL must use HTTP or HTTPS.`;
    }

    if (!parsed.hostname) {
      return `${label} URL is invalid.`;
    }

    return null;
  } catch {
    return `${label} URL is invalid.`;
  }
}

/* ==========================================================
   Component
========================================================== */

export default function ProfileEditForm({
  user,
  isUpdating,
  onSave,
  onCancel,
}: ProfileEditFormProps) {
  const [
    formData,
    setFormData,
  ] =
    useState<ProfileFormData>(
      () =>
        buildFormData(
          user
        )
    );

  const [
    error,
    setError,
  ] =
    useState<
      string | null
    >(null);

  const [
    success,
    setSuccess,
  ] =
    useState<
      string | null
    >(null);

  /* ========================================================
     Sync User
  ======================================================== */

  useEffect(() => {
    setFormData(
      buildFormData(
        user
      )
    );

    setError(null);

    setSuccess(null);
  }, [user]);

  /* ========================================================
     Change Handler
  ======================================================== */

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement |
        HTMLTextAreaElement
    >
  ) => {
    const {
      name,
      value,
    } =
      event.target;

    setFormData(
      (previous) => ({
        ...previous,

        [name]: value,
      })
    );

    if (error) {
      setError(null);
    }

    if (success) {
      setSuccess(null);
    }
  };

  /* ========================================================
     Validate Form
  ======================================================== */

  const validateForm =
    (): string | null => {
      const name =
        formData.name.trim();

      const title =
        formData.title.trim();

      const bio =
        formData.bio.trim();

      const location =
        formData.location.trim();

      const phone =
        formData.phone.trim();

      /* ======================================================
         Name
      ====================================================== */

      if (
        name.length < 2
      ) {
        return (
          "Full name must contain at least 2 characters."
        );
      }

      if (
        name.length > 100
      ) {
        return (
          "Full name cannot exceed 100 characters."
        );
      }

      /* ======================================================
         Title
      ====================================================== */

      if (
        title.length > 100
      ) {
        return (
          "Professional title cannot exceed 100 characters."
        );
      }

      /* ======================================================
         Location
      ====================================================== */

      if (
        location.length >
        100
      ) {
        return (
          "Location cannot exceed 100 characters."
        );
      }

      /* ======================================================
         Phone
      ====================================================== */

      if (
        phone.length >
        30
      ) {
        return (
          "Phone number cannot exceed 30 characters."
        );
      }

      /* ======================================================
         Bio
      ====================================================== */

      if (
        bio.length >
        MAX_BIO_LENGTH
      ) {
        return (
          `Professional summary cannot exceed ${MAX_BIO_LENGTH} characters.`
        );
      }

      /* ======================================================
         URLs
      ====================================================== */

      const urlFields = [
        {
          label: "GitHub",
          value:
            formData.github,
        },

        {
          label: "LinkedIn",
          value:
            formData.linkedin,
        },

        {
          label: "Portfolio",
          value:
            formData.portfolio,
        },
      ];

      for (
        const field of urlFields
      ) {
        const urlError =
          validateUrl(
            field.value,
            field.label
          );

        if (urlError) {
          return urlError;
        }
      }

      return null;
    };

  /* ========================================================
     Submit
  ======================================================== */

  const handleSubmit =
    async (
      event: FormEvent<HTMLFormElement>
    ) => {
      event.preventDefault();

      if (isUpdating) {
        return;
      }

      setError(null);

      setSuccess(null);

      const validationError =
        validateForm();

      if (
        validationError
      ) {
        setError(
          validationError
        );

        return;
      }

      const payload:
        ProfileFormData = {
        name:
          formData.name.trim(),

        bio:
          formData.bio.trim(),

        title:
          formData.title.trim(),

        location:
          formData.location.trim(),

        phone:
          formData.phone.trim(),

        github:
          formData.github.trim(),

        linkedin:
          formData.linkedin.trim(),

        portfolio:
          formData.portfolio.trim(),
      };

      try {
        await onSave(
          payload
        );

        setSuccess(
          "Profile updated successfully."
        );
      } catch {
        setError(
          "Unable to update your profile. Please try again."
        );
      }
    };

  /* ========================================================
     Render
  ======================================================== */

  return (
    <form
      onSubmit={
        handleSubmit
      }
      noValidate
      aria-labelledby="profile-edit-title"
      className="
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white
        shadow-xl
        shadow-slate-200/30
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
          p-5
          dark:border-slate-800
          sm:p-6
          lg:p-8
        "
      >
        <h2
          id="profile-edit-title"
          className="
            text-xl
            font-black
            text-slate-900
            dark:text-white
            sm:text-2xl
          "
        >
          Edit Professional Profile
        </h2>

        <p
          className="
            mt-2
            max-w-2xl
            text-sm
            leading-6
            text-slate-500
            dark:text-slate-400
          "
        >
          Keep your professional
          information accurate,
          concise and
          recruiter-friendly.
        </p>
      </div>

      {/* ==================================================
          Body
      ================================================== */}

      <div
        className="
          p-5
          sm:p-6
          lg:p-8
        "
      >
        {/* =================================================
            Feedback
        ================================================= */}

        {error && (
          <div
            role="alert"
            aria-live="assertive"
            className="
              mb-6
              flex
              items-start
              gap-3
              rounded-2xl
              border
              border-red-500/20
              bg-red-500/10
              p-4
              text-sm
              leading-6
              text-red-600
              dark:text-red-400
            "
          >
            <AlertCircle
              size={19}
              className="
                mt-0.5
                shrink-0
              "
              aria-hidden="true"
            />

            <span>
              {error}
            </span>
          </div>
        )}

        {success && (
          <div
            role="status"
            aria-live="polite"
            className="
              mb-6
              flex
              items-start
              gap-3
              rounded-2xl
              border
              border-emerald-500/20
              bg-emerald-500/10
              p-4
              text-sm
              leading-6
              text-emerald-600
              dark:text-emerald-400
            "
          >
            <CheckCircle2
              size={19}
              className="
                mt-0.5
                shrink-0
              "
              aria-hidden="true"
            />

            <span>
              {success}
            </span>
          </div>
        )}

        {/* =================================================
            Fields
        ================================================= */}

        <div
          className="
            grid
            grid-cols-1
            gap-6
            md:grid-cols-2
          "
        >
          <Field
            label="Full Name"
            name="name"
            value={
              formData.name
            }
            onChange={
              handleChange
            }
            placeholder="e.g. Talib Aziz"
            required
            maxLength={100}
            autoComplete="name"
          />

          {/* Email */}

          <div>
            <label
              htmlFor="profile-email"
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-slate-700
                dark:text-slate-300
              "
            >
              Email Address
            </label>

            <input
              id="profile-email"
              type="email"
              value={
                user.email
              }
              disabled
              readOnly
              autoComplete="email"
              className="
                w-full
                rounded-2xl
                border
                border-slate-200
                bg-slate-100
                px-4
                py-3.5
                text-sm
                text-slate-500
                outline-none
                dark:border-slate-800
                dark:bg-slate-800/50
                dark:text-slate-400
              "
            />

            <p
              className="
                mt-2
                text-xs
                leading-5
                text-slate-400
              "
            >
              Email changes are managed
              separately for account
              security.
            </p>
          </div>

          <Field
            label="Professional Title"
            name="title"
            value={
              formData.title
            }
            onChange={
              handleChange
            }
            placeholder="e.g. AI Web Developer"
            maxLength={100}
            autoComplete="organization-title"
          />

          <Field
            label="Location"
            name="location"
            value={
              formData.location
            }
            onChange={
              handleChange
            }
            placeholder="e.g. Lucknow, India"
            maxLength={100}
            autoComplete="address-level2"
          />

          <Field
            label="Phone Number"
            name="phone"
            type="tel"
            value={
              formData.phone
            }
            onChange={
              handleChange
            }
            placeholder="e.g. +91 9876543210"
            maxLength={30}
            autoComplete="tel"
          />

          <Field
            label="GitHub Profile"
            name="github"
            type="url"
            value={
              formData.github
            }
            onChange={
              handleChange
            }
            placeholder="https://github.com/username"
            maxLength={200}
            autoComplete="url"
          />

          <Field
            label="LinkedIn Profile"
            name="linkedin"
            type="url"
            value={
              formData.linkedin
            }
            onChange={
              handleChange
            }
            placeholder="https://linkedin.com/in/username"
            maxLength={200}
            autoComplete="url"
          />

          <Field
            label="Portfolio Website"
            name="portfolio"
            type="url"
            value={
              formData.portfolio
            }
            onChange={
              handleChange
            }
            placeholder="https://yourportfolio.com"
            maxLength={200}
            autoComplete="url"
          />

          {/* =================================================
              Bio
          ================================================= */}

          <div
            className="
              md:col-span-2
            "
          >
            <label
              htmlFor="profile-bio"
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-slate-700
                dark:text-slate-300
              "
            >
              Professional Summary
            </label>

            <textarea
              id="profile-bio"
              name="bio"
              value={
                formData.bio
              }
              onChange={
                handleChange
              }
              maxLength={
                MAX_BIO_LENGTH
              }
              rows={6}
              placeholder="Write a concise summary of your experience, skills, achievements and career goals..."
              className="
                w-full
                resize-y
                rounded-2xl
                border
                border-slate-200
                bg-white
                px-4
                py-3.5
                text-sm
                leading-6
                text-slate-900
                outline-none
                transition
                placeholder:text-slate-400
                focus:border-cyan-500
                focus:ring-4
                focus:ring-cyan-500/10
                dark:border-slate-800
                dark:bg-slate-950
                dark:text-white
                dark:placeholder:text-slate-600
              "
            />

            <div
              className="
                mt-2
                flex
                justify-end
              "
            >
              <span
                className={
                  `text-xs ${
                    formData.bio
                      .length >=
                    MAX_BIO_LENGTH
                      ? "font-bold text-red-500"
                      : "text-slate-400"
                  }`
                }
              >
                {formData.bio.length}/
                {MAX_BIO_LENGTH}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ==================================================
          Actions
      ================================================== */}

      <div
        className="
          flex
          flex-col-reverse
          gap-3
          border-t
          border-slate-200
          bg-slate-50/70
          p-5
          dark:border-slate-800
          dark:bg-slate-950/40
          sm:flex-row
          sm:justify-end
          sm:p-6
        "
      >
        <button
          type="button"
          onClick={
            onCancel
          }
          disabled={
            isUpdating
          }
          className="
            inline-flex
            min-h-12
            items-center
            justify-center
            gap-2
            rounded-2xl
            border
            border-slate-300
            px-6
            text-sm
            font-bold
            text-slate-700
            transition-all
            hover:bg-slate-100
            focus-visible:outline-none
            focus-visible:ring-4
            focus-visible:ring-cyan-500/20
            disabled:cursor-not-allowed
            disabled:opacity-50
            dark:border-slate-700
            dark:text-slate-300
            dark:hover:bg-slate-800
          "
        >
          <X
            size={18}
            aria-hidden="true"
          />

          Cancel
        </button>

        <button
          type="submit"
          disabled={
            isUpdating
          }
          className="
            inline-flex
            min-h-12
            items-center
            justify-center
            gap-2
            rounded-2xl
            bg-gradient-to-r
            from-cyan-500
            to-blue-600
            px-6
            text-sm
            font-bold
            text-white
            shadow-lg
            shadow-cyan-500/20
            transition-all
            hover:-translate-y-0.5
            hover:shadow-xl
            focus-visible:outline-none
            focus-visible:ring-4
            focus-visible:ring-cyan-500/20
            disabled:cursor-not-allowed
            disabled:opacity-60
            disabled:hover:translate-y-0
          "
        >
          {isUpdating ? (
            <>
              <Loader2
                size={18}
                className="animate-spin"
                aria-hidden="true"
              />

              Saving...
            </>
          ) : (
            <>
              <Save
                size={18}
                aria-hidden="true"
              />

              Save Changes
            </>
          )}
        </button>
      </div>
    </form>
  );
}

/* ==========================================================
   Field
========================================================== */

interface FieldProps {
  label: string;

  name: keyof ProfileFormData;

  value: string;

  onChange: (
    event: ChangeEvent<HTMLInputElement>
  ) => void;

  type?:
    | "text"
    | "url"
    | "tel";

  placeholder?: string;

  required?: boolean;

  maxLength?: number;

  autoComplete?: string;
}

/* ==========================================================
   Field Component
========================================================== */

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
  maxLength,
  autoComplete = "off",
}: FieldProps) {
  const id =
    `profile-${name}`;

  return (
    <div>
      <label
        htmlFor={id}
        className="
          mb-2
          block
          text-sm
          font-semibold
          text-slate-700
          dark:text-slate-300
        "
      >
        {label}

        {required && (
          <span
            className="
              ml-1
              text-red-500
            "
            aria-hidden="true"
          >
            *
          </span>
        )}
      </label>

      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={
          onChange
        }
        placeholder={
          placeholder
        }
        required={required}
        maxLength={
          maxLength
        }
        autoComplete={
          autoComplete
        }
        spellCheck={
          type === "text"
        }
        className="
          w-full
          rounded-2xl
          border
          border-slate-200
          bg-white
          px-4
          py-3.5
          text-sm
          text-slate-900
          outline-none
          transition
          placeholder:text-slate-400
          focus:border-cyan-500
          focus:ring-4
          focus:ring-cyan-500/10
          dark:border-slate-800
          dark:bg-slate-950
          dark:text-white
          dark:placeholder:text-slate-600
        "
      />
    </div>
  );
}