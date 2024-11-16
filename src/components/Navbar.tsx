import '../App.css';
import logo from '/stopwatch-pause.svg'

function Navbar() {
  return (
    <div className='bg-secondary text-muted-foreground border-b h-14 px-3 flex justify-between'>
      <div>
        <a href='#'>
          <div className='flex inline-flex items-center text-foreground'>
            <div className="flex mt-1">
              <img src={logo} alt="logo" className="h-12 w-12" />
            </div>
            <div className="flex mt-2 pl-2">
              <span className="font-semibold text-2xl">RunLap</span>
            </div>
          </div>
        </a>
      </div>

      {/* <div className='flex inline-flex items-center'>
        <div className='self-end mr-1 pb-3'>
          <span className="text-xs">{repo}/{ref}/{sha}</span>
        </div>
        <GithubButton />
        <ThemeToggle />
      </div> */}
    </div>
  );
}

export default Navbar;