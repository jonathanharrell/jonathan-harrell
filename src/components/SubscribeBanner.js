import React, { useRef, useState } from "react";
import Alert from "./Alert";
import { addAlert } from "../helpers";

const SubscribeBanner = () => {
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);
	const inputRef = useRef();

	const handleSubmit = async event => {
		setError(null);
		event.preventDefault();

		const formData = new FormData(event.target);
		const email = formData.get("email");

		try {
			const response = await fetch("/.netlify/functions/subscribe", {
				method: "POST",
				body: JSON.stringify({
					email
				})
			});

			const json = await response.json();

			// if there is an error response, throw an error so catch block is triggered
			if (!response.ok) {
				throw Error(json.detail);
			} else {
				setSuccess(true);
				addAlert("You've been subscribed!");
			}
		} catch (error) {
			setError(error.message);
			addAlert(`There was a problem subscribing: ${error.message}`);
		}
	};

	return (
		<div id="subscribe" aria-labelledby="newsletter-label">
			<div className="md:flex justify-between">
				<div>
					<h3 id="newsletter-label" className="font-semibold">
						Want more front-end tips and tricks?
					</h3>
					<p className="text-lg">Sign up for the newsletter to stay up-to-date.</p>
				</div>
				<form onSubmit={handleSubmit} className="mt-4 md:mt-0">
					<div>
						<div className="flex items-center">
							<div className="flex-1">
								<label htmlFor="email" className="sr-only">
									Enter your email to subscribe to newsletter
								</label>
								<input
									id="email"
									type="email"
									name="email"
									placeholder="Enter your email"
									ref={inputRef}
									className="w-full py-3 px-5 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600"
								/>
							</div>
							<button className="inline-flex items-center justify-center ml-2 py-3 px-5 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 font-medium text-gray-900 dark:text-gray-100">
								Subscribe
							</button>
						</div>
					</div>
					{error && (
						<Alert order="danger" className="mt-3">
							{error}
						</Alert>
					)}
					{success && (
						<Alert order="success" className="mt-3">
							You’ve been subscribed!
						</Alert>
					)}
				</form>
			</div>
		</div>
	);
};

export default SubscribeBanner;
