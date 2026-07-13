export default function EditPageSkeleton() {
  return (
    <div className="animate-pulse font-poppins flex flex-col">

      {/* ── EditCoverSection skeleton ── */}
      <div className="w-full max-[500px]:px-2 px-4 sm:px-6 md:px-10 lg:px-22">
        {/* Page title */}
        <div className="mt-5 mb-4 mx-auto h-7 min-[500px]:h-9 w-48 min-[500px]:w-64 rounded-full bg-[#E0E0E0]" />

        <div className="relative">
          {/* Cover photo */}
          <div className="max-w-[1040px] mx-auto aspect-video w-full rounded-[32px] min-[500px]:rounded-[64px] bg-[#E0E0E0]" />
          {/* Logo circle */}
          <div className="absolute min-[500px]:-bottom-11.5 -bottom-6.5 max-[500px]:left-2 min-[500px]:right-0 min-[500px]:left-0 min-[500px]:mx-auto h-13 min-[500px]:h-23 w-13 min-[500px]:w-23 rounded-full border-[4px] border-white bg-[#E0E0E0]" />
        </div>
      </div>

      {/* ── EditIntroSection skeleton ── */}
      <div className="px-4 max-[500px]:mt-[66px] mt-[124px]">
        <div className="max-w-[640px] mx-auto">
          {/* Section heading */}
          <div className="h-5 w-12 rounded-full bg-[#E0E0E0]" />
          {/* 6 intro rows */}
          <div className="mt-3 flex flex-col gap-3">
            {[60, 80, 55, 70, 65, 75].map((w, i) => (
              <div key={i} className="flex items-center justify-between rounded-[12px] bg-[#F2F2F2] px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded bg-[#E0E0E0] shrink-0" />
                  <div className="flex flex-col gap-1.5">
                    <div className="h-3 w-20 rounded-full bg-[#E0E0E0]" />
                    <div className="h-3.5 rounded-full bg-[#E0E0E0]" style={{ width: `${w * 1.4}px` }} />
                  </div>
                </div>
                <div className="w-4 h-4 rounded bg-[#E0E0E0] shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── EditServicesSection skeleton ── */}
      <div className="px-4">
        <div className="max-w-[640px] mx-auto">
          <div className="max-[500px]:mt-5 mt-10 mb-5 border-t border-[#EAEAEA]" />
          <div className="h-5 w-20 rounded-full bg-[#E0E0E0]" />

          <div className="mt-4 flex flex-col max-[500px]:gap-4 gap-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex w-full items-center gap-4 max-[500px]:rounded-[16px] rounded-[32px] max-[500px]:p-2 p-4 shadow-[0_0_8px_0_rgba(0,0,0,0.08)]">
                <div className="max-[500px]:h-20 h-39 max-[500px]:w-20 w-39 shrink-0 max-[500px]:rounded-[12px] rounded-[20px] bg-[#E0E0E0]" />
                <div className="flex-1 flex flex-col gap-2">
                  <div className="h-4 min-[500px]:h-5 w-3/4 rounded-full bg-[#E0E0E0]" />
                  <div className="h-3.5 w-full rounded-full bg-[#E0E0E0]" />
                  <div className="h-3.5 w-2/3 rounded-full bg-[#E0E0E0]" />
                  <div className="max-[500px]:mt-1 mt-4 h-6 w-16 rounded-full bg-[#E0E0E0]" />
                </div>
              </div>
            ))}
            {/* Add service button shape */}
            <div className="flex items-center gap-4 rounded-[16px] border border-[#F4F4F4] p-4 shadow-[0_0_8px_0_rgba(0,0,0,0.06)]">
              <div className="rounded-[11.2px] bg-[#F2F2F2] p-3 h-14 w-14" />
              <div className="h-4 w-36 rounded-full bg-[#E0E0E0]" />
            </div>
          </div>
        </div>
      </div>

      {/* ── EditLocationSection skeleton ── */}
      <div className="px-4">
        <div className="max-w-[640px] mx-auto">
          <div className="max-[500px]:mt-5 mt-10 mb-5 border-t border-[#EAEAEA]" />
          <div className="flex items-center justify-between">
            <div className="h-5 w-20 rounded-full bg-[#E0E0E0]" />
            <div className="w-3.5 h-3.5 rounded bg-[#E0E0E0]" />
          </div>
          <div className="mt-3 flex flex-col gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3 rounded-[8px] min-[500px]:py-3 min-[500px]:px-4 min-[500px]:bg-[#F2F2F2]">
                <div className="w-6 h-6 min-[500px]:w-8 min-[500px]:h-8 rounded bg-[#E0E0E0] shrink-0" />
                <div className="flex flex-col gap-1.5">
                  <div className="h-3.5 w-24 rounded-full bg-[#E0E0E0]" />
                  <div className="h-3.5 w-32 rounded-full bg-[#E0E0E0]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── EditServiceAreasSection skeleton ── */}
      <div className="px-4 pb-10">
        <div className="max-w-[640px] mx-auto">
          <div className="max-[500px]:mt-5 mt-10 mb-5 border-t border-[#EAEAEA]" />
          <div className="h-5 w-28 rounded-full bg-[#E0E0E0]" />
          <div className="mt-3 flex items-center justify-between rounded-[8px] min-[500px]:py-3 min-[500px]:px-4 min-[500px]:bg-[#F2F2F2]">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 min-[500px]:w-8 min-[500px]:h-8 rounded bg-[#E0E0E0] shrink-0" />
              <div className="flex flex-col gap-1.5">
                <div className="h-3.5 w-24 rounded-full bg-[#E0E0E0]" />
                <div className="h-3.5 w-40 rounded-full bg-[#E0E0E0]" />
              </div>
            </div>
            <div className="w-3.5 h-3.5 rounded bg-[#E0E0E0]" />
          </div>
        </div>
      </div>

    </div>
  );
}
