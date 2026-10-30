import GradientOrb from "./GradientOrb";

export default function FloatingOrbs() {
  return (
    <>
      <GradientOrb
        color="cyan"
        size="lg"
        blur="strong"
        opacity="low"
        animated
        className="fixed -left-40 top-48"
      />

      <GradientOrb
        color="violet"
        size="lg"
        blur="strong"
        opacity="low"
        animated
        delay={2}
        className="fixed -right-40 top-[400px]"
      />
    </>
  );
}