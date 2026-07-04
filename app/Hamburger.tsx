'use client'
import "@/app/components/hamburgers.css";
import { useState } from "react";
export default function Hamburger() {

    const [isActive, setIsActive] = useState(false);


    function handlePointerDown(){
        setIsActive(!isActive);
    }

	return (
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
	);
}
