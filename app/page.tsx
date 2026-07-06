import Navbar from "./components/Navbar";
export default function HomePage() {
	return (
		<>
			<div id="home">
				<Navbar />
				{/* test */}
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
				<br style={{ lineHeight: 1 }} />
			</div>
			<div id="contact">
				{/* test */}
				<h1>Contact</h1>
				<p id="contact">
					<b>Phone:</b> (347)-579-9610<br/>
					<b>Email:</b> nyseeer.couse@gmail.com<br/>
				</p>
				<br style={{ lineHeight: 10 }} />
			</div>
			{/* poo */}
		</>
	);
}
