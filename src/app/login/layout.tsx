import OnboardingHeader from "@/components/main/OnboardingHeader";

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col">
      <OnboardingHeader hideProgress={true}/>
      <div className="flex flex-1 flex-col sm:items-center sm:justify-center">
        <div className="w-full">
          {children}
        </div>
      </div>
    </main>
  );
}
