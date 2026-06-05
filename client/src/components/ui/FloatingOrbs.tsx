export default function FloatingOrbs() {
  return (
    <>
      <div className="pointer-events-none fixed left-[-150px] top-[200px] h-[350px] w-[350px] rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="pointer-events-none fixed right-[-150px] top-[400px] h-[350px] w-[350px] rounded-full bg-violet-500/10 blur-[120px]" />
    </>
  );
}