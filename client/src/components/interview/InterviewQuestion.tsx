interface Props {
  question: string;
  options?: string[];
  selectedAnswer?: string;
  onOptionSelect?: (option: string) => void;
}

export default function InterviewQuestion({
  question,
  options,
  selectedAnswer,
  onOptionSelect,
}: Props) {
  const renderOptions = Boolean(options && options.length > 0);

  return (
    <div
      className="
      rounded-3xl
      bg-white
      p-8
      shadow-lg

      dark:bg-slate-900
      "
    >
      <h2
        className="
        mb-6
        text-2xl
        font-bold
        "
      >
        {question}
      </h2>

      {renderOptions && options && (
        <div className="space-y-4">
          {options.map((option, index) => (
            <label
              key={index}
              className="
              flex
              items-center
              gap-3
              rounded-xl
              border
              border-slate-200
              p-4
              text-lg
              cursor-pointer
              transition-all
              hover:bg-slate-50

              dark:border-white/10
              dark:hover:bg-slate-800

              "
            >
              <input
                type="radio"
                name="interview-option"
                value={option}
                checked={selectedAnswer === option}
                onChange={() => onOptionSelect?.(option)}
                className="
                h-5
                w-5
                text-cyan-600
                focus:ring-cyan-500
                "
              />
              <span className="font-medium text-slate-700 dark:text-slate-300">
                {String.fromCharCode(65 + index)}. {option}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}