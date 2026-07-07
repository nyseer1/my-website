"use client";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
export default function HomePage() {
	const [isDesktop, setDesktop] = useState(null);

	const updateMedia = () => {
		setDesktop(window.innerWidth > 600);
	};

	useEffect(() => {
		window.addEventListener("resize", updateMedia);
		return () => window.removeEventListener("resize", updateMedia);
	});
	return (
		<div className="adaptive">
			<div id="home" className="adaptive">
				<Navbar />
				{/* test */}
				{isDesktop ? (
					<br style={{ lineHeight: 3 }} />
				) : (
					<br style={{ lineHeight: 6 }} />
				)}
				<h3>Hi, Im Nyseer Couse, Welcome to my Website!</h3>
				<br style={{ lineHeight: 10 }} />
			</div>
			<div id="projects">
				<h1>Featured Web Applications:</h1>
			</div>
			<div id="about">
				{/* test */}
				<h1>About Me:</h1>
				<p>
					Computer Science graduate with hands-on experience developing
					full-stack web applications using React, JavaScript, Node.js, Express,
					Java, SQL, Java, and Python. Experienced in building responsive user
					interfaces, RESTful applications, and deploying production-ready
					projects.
				</p>
				<h2>Skills:</h2>
				<p id="">
					<b>Soft Skills:</b> Problem-Solving, Teamworking, Organization,
					Communication, Time Management, Critical Thinking<br/>
					<b>Languages:</b> JavaScript (ES6+), TypeScript, Java, Python, SQL, HTML5, CSS3, C++<br/>
					<b>Frontend:</b> React.js, Next.js, Responsive Web Design, HTML5, CSS3, State Management, Web APIs
				</p>
				<br style={{ lineHeight: 1 }} />
			</div>
			<div id="contact">
				{/* test */}
				<h1>Contact</h1>
				<p id="contact-p">
					<b>Phone:</b> <a href="tel:+1-347-579-9610">(347)-579-9610</a>
					<br />
					<b>Email:</b>{" "}
					<a
						href="mailto:nyseer.couse@gmail.com"
						aria-label="nyseer.couse@gmail.com"
					>
						nyseer.couse@gmail.com
					</a>
					<br />
				</p>
				{/* todo add back to top button here */}
				<br style={{ lineHeight: 10 }} />
			</div>
			{/* poo */}
		</div>
	);
}
