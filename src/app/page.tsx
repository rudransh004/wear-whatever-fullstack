export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm lg:flex flex-col text-center">
        <h1 className="text-6xl font-bold tracking-tighter mb-4">
          WEAR <span className="text-gray-500">WHATEVER</span>
        </h1>
        <p className="text-xl text-gray-400">
          The Full-Stack Venture Redefined.
        </p>
        <div className="mt-10 px-6 py-2 border border-white hover:bg-white hover:text-black transition-all cursor-pointer">
          Building in Progress
        </div>
      </div>
    </main>
  );
}
