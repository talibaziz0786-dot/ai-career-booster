export default function FloatingParticles() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute left-10 top-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="absolute right-10 top-60 h-72 w-72 rounded-full bg-violet-500/10 blur-[120px]" />

      <div className="absolute bottom-10 left-1/2 h-72 w-72 rounded-full bg-blue-500/10 blur-[120px]" />
    </div>
  );
}