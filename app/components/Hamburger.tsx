"use client";
import Link from "next/link";
import "@/app/components/hamburgers.css";
import "@/app/components/Modal.css";
import { useState, useEffect, useRef } from "react";
export default function Hamburger() {
	const [isActive, setIsActive] = useState(false);

	function handleOpenHamburger() {
		setIsActive(true);
		//open modal
		modal.current.style.display = "block";
	}
		function handleCloseModal() {
		modal.current.style.display = "none";
		setIsActive(false);
	}
	function handleClickOutside(e) {
		if (e.target === modal.current) {
			handleCloseModal();
		}
	}

	const modal = useRef(null);

	useEffect(() => {
		modal.current = document.getElementById("navbarModal");
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
						? "hamburger hamburger--emphatic is-active"
						: "hamburger hamburger--emphatic"
				}
				type="button"
				onPointerDown={handleOpenHamburger}
			>
				<span className="hamburger-box">
					<span className="hamburger-inner"></span>
				</span>
			</button>

			<div id="navbarModal" className="modal">
				<div className="modal-content">
					<p>Where do you want to go?!</p>
					<ul>
						<li className="hamburgerItems">
							<Link href="/">Home</Link>
						</li>
						<li className="hamburgerItems">
							<Link href="/about">About Me</Link>
						</li>
						<li className="hamburgerItems">
							<Link href="#projects">Projects</Link>
						</li>
						<li className="hamburgerItems">
							<Link href="contact.asp">Contact Me</Link>
						</li>
						<li className="hamburgerItems">
							<button
								type="button"
								className="close"
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
