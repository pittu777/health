
export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center text-center px-6">
      <div>
        <span className="px-4 py-1 bg-black/40 rounded-full text-sm">
          New · A calmer way to build habits
        </span>
        <h1 className="text-5xl md:text-7xl font-bold mt-6">
          Build habits that actually stick
        </h1>
        <p className="mt-6 text-lg max-w-xl mx-auto text-gray-200">
          You see the right habits at the right time so your day never feels
          crowded.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <button className="bg-white text-black px-6 py-3 rounded-full">
            Start tracking for free
          </button>
          <button className="border border-white/40 px-6 py-3 rounded-full">
            ▶ Watch demo
          </button>
        </div>
      </div>
    </section>
  );
}
