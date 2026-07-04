import Link from 'next/link'; //<a> but allows for prefetching of specified links
export default function Navbar() {
	return (
		<ul>
			<li>
				<Link href="/" style={{ backgroundColor: "black" }}>
					Nyseer
				</Link>
			</li>
			<li className='navbarItems'>
				<Link href="/">Home</Link>
			</li>
			<li className='navbarItems'>
				<Link href="/about">About Me</Link>
			</li>
			<li className='navbarItems'>
				<Link href="#projects">Projects</Link>
			</li>
			<li className='navbarItems'>
				<Link href="contact.asp">Contact Me</Link>
			</li>
			<li className='icon'>
				<Link href="contact.asp">MenuIcon</Link>
			</li>
			
		</ul>
	);
}
