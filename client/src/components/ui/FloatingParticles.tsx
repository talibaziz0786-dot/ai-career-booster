import GradientOrb from "./GradientOrb";

export default function FloatingParticles() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <GradientOrb
        color="cyan"
        size="md"
        blur="strong"
        opacity="low"
        animated
        className="left-10 top-20"
      />

      <GradientOrb
        color="violet"
        size="md"
        blur="strong"
        opacity="low"
        animated
        delay={3}
        className="right-10 top-60"
      />

      <GradientOrb
        color="blue"
        size="md"
        blur="strong"
        opacity="low"
        animated
        delay={6}
        className="bottom-10 left-1/2"
      />
    </div>
  );
}