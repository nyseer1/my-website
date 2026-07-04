"use client";
import "@/app/components/hamburgers.css";
import '@/app/components/Modal.css';
import { useState } from "react";
export default function Hamburger() {
	const [isActive, setIsActive] = useState(false);

	function handlePointerDown() {
		setIsActive(!isActive);
	}
	function handleCloseModal() {
		document.getElementById("id01").style.display = "none";
	}

	return (
		<>
			<button
				className={
					isActive
						? "hamburger hamburger--emphatic is-active"
						: "hamburger hamburger--emphatic"
				}
				type="button"
				onPointerDown={handlePointerDown}
			>
				<span className="hamburger-box">
					<span className="hamburger-inner"></span>
				</span>
			</button>

			<div id="id01" className="modal">
				<button
					type="button"
					onPointerDown={handleCloseModal}
					className="close"
					title="Close Modal"
				></button>
				<form className="modal-content" action="/action_page.php">
					<div className="container">
						<h1>Delete Account</h1>
						<p>Are you sure you want to delete your account?</p>

						<div className="clearfix">
							<button type="button" className="cancelbtn">
								Cancel
							</button>
							<button type="button" className="deletebtn">
								Delete
							</button>
						</div>
					</div>
				</form>
			</div>
		</>
	);
}
