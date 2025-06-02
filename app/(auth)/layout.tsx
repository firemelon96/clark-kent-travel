import { Logo } from "../components/logo";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <Logo />
          Clark Kent Travel and Tours
        </a>
        {children}
      </div>
    </div>
  );
};

export default Layout;
