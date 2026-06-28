import {
  useInterviewStore,
}
from "../../store/interview-store";

export default function LanguageSelector() {

  const {
    language,
    setLanguage,
  } =
    useInterviewStore();

  return (

    <select
    aria-label="Select-Language"
      value={language}
      onChange={(e) =>
        setLanguage(
          e.target.value as any
        )
      }
      className="
      rounded-xl
      border
      p-3
      "
    >

      <option value="english">
        English
      </option>

      <option value="hindi">
        Hindi
      </option>

      <option value="hinglish">
        Hinglish
      </option>

      <option value="urdu">
        Urdu
      </option>

    </select>

  );
}