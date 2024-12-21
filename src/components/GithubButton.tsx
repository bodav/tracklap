import { Button } from "@/components/ui/button";
import GithubLogo from "@/assets/github.svg?react";

const GithubButton = () => {
  const repo = import.meta.env.VITE_GITHUB_REPOSITORY;
  const url = `https://github.com/${repo}`;

  return (
    <Button asChild size="icon" variant="ghost" className="mr-1 [&_svg]:size-5">
      <a href={url} target="_blank">
        <GithubLogo />
      </a>
    </Button>
  );
};

export default GithubButton;
