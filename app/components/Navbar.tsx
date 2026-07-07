import Link from "next/link"; //<a> but allows for prefetching of specified links
import Hamburger from "./Hamburger";
export default function Navbar() {

	//hide on screen drag (optional)
		// var prevScrollpos = window.pageYOffset;
	// window.onscroll = () => {
	// 	var currentScrollPos = window.pageYOffset;
	// 	if (prevScrollpos > currentScrollPos) {
	// 		document.getElementById("navbar").style.top = "0";
	// 	} else {
	// 		document.getElementById("navbar").style.top = "-50px";
	// 	}
	// 	prevScrollpos = currentScrollPos;
	// };

	return (
		<ul id="navbar">
			<li>
				<Link href="/" style={{ backgroundColor: "black" }}>
					Nyseer
				</Link>
			</li>
			<li className="navbarItems">
				<Link href="/">Home</Link>
			</li>
			<li className="navbarItems">
				<Link href="/#about">About Me</Link>
			</li>
			<li className="navbarItems">
				<Link href="/#projects">Projects</Link>
			</li>
			<li className="navbarItems">
				<Link href="/#contact">Contact Me</Link>
			</li>
			<li className="icon">
				<Hamburger />
			</li>
		</ul>
	);
}
