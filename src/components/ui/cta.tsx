"use client";

export const Cta = () => {
  return (
    <div className="py-20">
      <div className="container mx-auto">
        <div className="relative overflow-hidden rounded-2xl bg-slate-800 p-10">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-800 to-slate-900/50" />
          <div className="relative z-10 flex flex-col items-center gap-6 text-center">
            <h2 className="text-4xl font-bold tracking-tight text-white">
              Get started with Clyrox today
            </h2>
            <p className="max-w-2xl text-lg text-white/70">
              Sign up for a free account and see how Clyrox can help you build
              better products, faster.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="rounded-md bg-white px-4 py-2 text-slate-900"
              >
                Get started
              </a>
              <a href="#" className="text-sm font-semibold leading-6 text-white">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};