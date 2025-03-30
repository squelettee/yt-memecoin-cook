import localFont from "next/font/local";

const dynapuff = localFont({
  src: "../../public/fonts/DynaPuff/DynaPuff-VariableFont_wdth,wght.ttf",
  weight: "800",
});

export function HomeTitle() {
  return (
    <div className="w-full flex flex-col items-center gap-8 pb-10 pt-16 sm:pt-28 sm:pb-16">
      <h1
        className={`text-balance text-center text-4xl font-semibold leading-none tracking-wide sm:text-5xl md:text-6xl lg:text-7xl ${dynapuff.className}`}
      >
        Cook beautiful memesites <br /> in{" "}
        <span className="text-violet-500">no</span> time
      </h1>
      <p className="max-w-[64rem] text-center text-balance text-sm tracking-tight text-muted-foreground md:text-xl">
        Create your <strong>memecoin website</strong> in{" "}
        <strong>minutes</strong> with quick and easy payment in{" "}
        <strong>$SOL</strong>.
      </p>
    </div>
  );
}
