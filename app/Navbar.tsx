import Link from 'next/link'; //<a> but allows for prefetching of specified links
export default function Navbar() {
	return (
		<ul>
			<li>
				<Link href="/" style={{ backgroundColor: "black" }}>
					Nyseer
				</Link>
			</li>
			<li>
				<Link href="/">Home</Link>
			</li>
			<li>
				<Link href="/about">About Me</Link>
			</li>
			<li>
				<Link href="#projects">Projects</Link>
			</li>
			<li>
				<Link href="contact.asp">Contact Me</Link>
			</li>
		</ul>
	);
}
