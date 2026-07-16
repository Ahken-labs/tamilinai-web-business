export default function DashboardSkeleton() {
  return (
    <div className="animate-pulse font-poppins flex flex-col">

      {/* ── Cover + Intro skeleton ── */}
      <div className="w-full max-[500px]:px-2 px-4 sm:px-6 md:px-10 lg:px-22">
        <div className="relative">
          {/* Cover photo */}
          <div className="max-w-[1040px] mx-auto aspect-video w-full rounded-[32px] min-[500px]:rounded-[64px] bg-[#E0E0E0]" />

          {/* Logo circle — left on mobile, center on 500px+ */}
          <div className="absolute min-[500px]:-bottom-11.5 -bottom-6.5 max-[500px]:left-2 min-[500px]:right-0 min-[500px]:left-0 min-[500px]:mx-auto h-13 min-[500px]:h-23 w-13 min-[500px]:w-23 rounded-full border-[4px] border-white bg-[#E0E0E0]" />
        </div>

        <div className="flex flex-col items-center px-4 max-[500px]:mt-12 mt-21">
          {/* Business name */}
          <div className="h-7 min-[500px]:h-9 w-48 min-[500px]:w-64 rounded-full bg-[#E0E0E0]" />
          {/* Bio lines */}
          <div className="mt-3 w-full max-w-[480px] flex flex-col items-center gap-2">
            <div className="h-4 w-4/5 rounded-full bg-[#E0E0E0]" />
            <div className="h-4 w-3/5 rounded-full bg-[#E0E0E0]" />
          </div>
          {/* WhatsApp button */}
          <div className="max-[500px]:mt-4 mt-6 h-10 w-36 rounded-full bg-[#E0E0E0]" />
        </div>
      </div>

      {/* Qualification card */}
      <div className="px-4 sm:px-6 max-[500px]:mt-6 mt-10">
        <div className="max-w-[640px] mx-auto rounded-[20px] bg-white px-4 min-[500px]:px-5 py-5 min-[500px]:py-6 shadow-[0_0_8px_0_rgba(0,0,0,0.10)] flex flex-col gap-3">
          {[44, 56, 72].map((w, i) => (
            <div key={i} className="flex items-center gap-3 min-[500px]:gap-5">
              <div className="w-3.5 h-3.5 min-[500px]:w-5 min-[500px]:h-5 rounded bg-[#E0E0E0] shrink-0" />
              <div className="h-3.5 min-[500px]:h-4 rounded-full bg-[#E0E0E0]" style={{ width: `${w}%` }} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Performance section skeleton ── */}
      <div className="max-w-[640px] mx-auto w-full px-4 mt-6">
        <div className="h-14 rounded-[20px] bg-[#F2F2F2] px-4 flex items-center justify-between">
          <div className="h-3.5 w-40 rounded-full bg-[#E0E0E0]" />
          <div className="h-4 w-4 rounded bg-[#E0E0E0]" />
        </div>
      </div>

      {/* ── Services section skeleton ── */}
      <section className="w-full max-[500px]:mt-12 mt-20 md:max-w-[1040px] min-[500px]:px-2 sm:px-4 md:mx-auto">
        {/* Horizontal scroll strip */}
        <div className="overflow-hidden">
          <div className="flex max-[500px]:px-4 min-[500px]:px-4 gap-2 min-[500px]:gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="shrink-0 min-w-[200px] min-[500px]:min-w-[248px] aspect-square rounded-[20.645px] bg-[#E0E0E0]"
              />
            ))}
          </div>
        </div>

        {/* Service list items */}
        <div className="max-[500px]:mt-12 mt-20 flex flex-col max-[500px]:gap-4 gap-5 px-2 sm:px-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex max-w-[640px] mx-auto w-full items-center max-[500px]:gap-3 gap-5 max-[500px]:rounded-[16px] rounded-[32px] max-[500px]:p-2 p-4 shadow-[0_0_8px_0_rgba(0,0,0,0.08)]"
            >
              {/* Thumbnail */}
              <div className="max-[500px]:h-20 h-39 max-[500px]:w-20 w-39 shrink-0 max-[500px]:rounded-[12px] rounded-[20px] bg-[#E0E0E0]" />
              {/* Text lines */}
              <div className="flex-1 flex flex-col max-[500px]:gap-1.5 gap-2.5">
                <div className="h-4 min-[500px]:h-5 w-3/4 rounded-full bg-[#E0E0E0]" />
                <div className="h-3.5 w-full rounded-full bg-[#E0E0E0]" />
                <div className="h-3.5 w-2/3 rounded-full bg-[#E0E0E0]" />
                <div className="max-[500px]:mt-1 mt-4 h-6 w-24 rounded-full bg-[#E0E0E0]" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Location section skeleton ── */}
      <div className="flex flex-col items-center px-4 max-[500px]:mt-5 mt-6 pb-12">
        {/* WhatsApp button */}
        <div className="h-10 w-36 rounded-full bg-[#E0E0E0]" />
        {/* Location */}
        <div className="max-[500px]:mt-6 mt-12 flex flex-col items-center gap-2">
          <div className="h-5 w-24 rounded-full bg-[#E0E0E0]" />
          <div className="h-4 w-40 rounded-full bg-[#E0E0E0]" />
        </div>
        {/* Service areas */}
        <div className="max-[500px]:mt-4 mt-6 flex flex-col items-center gap-2">
          <div className="h-5 w-32 rounded-full bg-[#E0E0E0]" />
          <div className="h-4 w-48 rounded-full bg-[#E0E0E0]" />
        </div>
      </div>

    </div>
  );
}
