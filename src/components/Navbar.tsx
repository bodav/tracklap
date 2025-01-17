import "@/App.css";
import GithubButton from "./GithubButton";
import { ModeToggle } from "./ModeToggle";
import Logo from "@/assets/app.svg?react";

function Navbar() {
  const appName = import.meta.env.VITE_APP_NAME;
  const ref = import.meta.env.VITE_GIT_REF.split("/").pop() || "v0.0";

  return (
    <div className="bg-secondary text-muted-foreground border-b h-14 px-3 flex justify-between">
      <div>
        <a href="#">
          <div className="inline-flex items-center text-primary">
            <div className="flex mt-2">
              <Logo className="size-10" />
            </div>
            <div className="flex mt-2 pl-2">
              <span className="font-semibold text-2xl">{appName}</span>
            </div>
          </div>
        </a>
      </div>

      <div className="inline-flex items-center">
        <div className="self-end mr-1 pb-3">
          <span className="text-xs">{ref}</span>
        </div>
        <GithubButton />
        <ModeToggle />
      </div>
    </div>
  );
}

export default Navbar;
