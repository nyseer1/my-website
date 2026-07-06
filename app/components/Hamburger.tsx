"use client";
import Link from "next/link";
import "@/app/components/hamburgers.css";
import "@/app/components/Modal.css";
import { useState, useEffect, useRef } from "react";
export default function Hamburger() {
	// states
	const [isActive, setIsActive] = useState(false);
	// funcs
	function handleOpenHamburger() {
		setIsActive(true);
		//open modal
		modalRef.current.style.display = "block";
	}
	function handleCloseModal() {
		modalRef.current.style.display = "none";
		setIsActive(false);
	}

	function handleClickOutside(e) {
		if (e.target.className === "link") {
			handleCloseModal();
		}
	}
	// refs
	const modalRef = useRef(null);

	useEffect(() => {
		modalRef.current = document.getElementById("navbarModal");
		window.addEventListener("click", handleClickOutside);

		return () => {
			window.removeEventListener("click", handleClickOutside);
		};
	});

	return (
		<>
			<button
				className={
					isActive
						? "hamburger hamburger--minus is-active"
						: "hamburger hamburger--minus"
				}
				type="button"
				onPointerDown={handleOpenHamburger}
				id="hamburgerButton"
			>
				<span className="hamburger-box">
					<span className="hamburger-inner"></span>
				</span>
			</button>

			<div id="navbarModal" className="modal">
				<div className="modal-content">
					<p>Where do you want to go..</p>
					<ul>
						<li className="hamburgerItems">
							<Link href="/" className="link">
								Home
							</Link>
						</li>
						<li className="hamburgerItems">
							<Link href="#about" className="link">
								About Me
							</Link>
						</li>
						<li className="hamburgerItems">
							{/* todo this isnt doing both */}
							<Link href="#projects" className="link">
								Projects
							</Link>
						</li>
						<li className="hamburgerItems">
							<Link href="#contact" className="link">
								Contact Me
							</Link>
						</li>
						<li className="hamburgerItems">
							<button
								type="button"
								className="button"
								onPointerDown={handleCloseModal}
							>
								Back
							</button>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
}
