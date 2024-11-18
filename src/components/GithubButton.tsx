import { Button } from "./ui/button";
import githubLogo from '@/assets/github.svg'

const GithubButton = () => {
    const repo = import.meta.env.VITE_GITHUB_REPOSITORY;
    const url = `https://github.com/${repo}`;

    return (
        <Button asChild
            size="icon"
            variant="ghost"
            className='mr-1 [&_svg]:size-5'>
            <a href={url} target="_blank">
                <svg className='fill-current'>
                    <use xlinkHref={`${githubLogo}#ghicon`}>
                    </use>
                </svg>
            </a>
        </Button>
    );
}

export default GithubButton;