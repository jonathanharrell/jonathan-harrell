import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Heading from "../Heading";
import Text from "../Text";
import Alert from "../Alert";
import { addAlert, shouldAnimate } from "../../helpers";
import { SubscribeButton, SubscribeForm, SubscribeFormContent, SubscribeInput } from "./styles";

const SubscribeBanner = () => {
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);
	const [dismissed, setDismissed] = useState(true);
	const inputRef = useRef();

	useEffect(() => {
		try {
			const subscribeBannerDismissed = localStorage.getItem("subscribe-banner-dismissed");
			setDismissed(!!subscribeBannerDismissed);
		} catch (error) {
			setDismissed(false);
		}

		// when the showSubscribe event has been dispatched (for example, from clicking
		// the subscribe button in the header), show the subscribe section
		const handleShowSubscribe = () => {
			setDismissed(false);
		};

		window.addEventListener("showSubscribe", handleShowSubscribe);

		return () => {
			window.removeEventListener("showSubscribe", handleShowSubscribe);
		};
	}, []);

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
		<aside id="subscribe" aria-labelledby="newsletter-label">
			<div className="container">
				<div className="max-w-3xl mx-auto">
					<div>
						<Heading id="newsletter-label" level={4} element="h2" color="textInverse">
							Want more front-end tips and tricks?
						</Heading>
						<Text color="textLighter">Sign up for the newsletter to stay up-to-date.</Text>
					</div>
					<SubscribeForm onSubmit={handleSubmit}>
						<div>
							<SubscribeFormContent>
								<div>
									<label htmlFor="email" className="visually-hidden">
										Enter your email address to subscribe to newsletter
									</label>
									<SubscribeInput
										id="email"
										type="email"
										name="email"
										placeholder="Enter your email address"
										ref={inputRef}
									/>
								</div>
								<SubscribeButton order="accent" size="large">
									Subscribe
								</SubscribeButton>
							</SubscribeFormContent>
							<AnimatePresence>
								{error && (
									<motion.div
										initial={shouldAnimate() ? { opacity: 0, y: 50 } : false}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: 50 }}
										transition={{
											type: "spring",
											stiffness: 50,
											mass: 0.1,
											delay: 0.1
										}}
									>
										<Alert>{error}</Alert>
									</motion.div>
								)}
							</AnimatePresence>
							<AnimatePresence>
								{success && (
									<motion.div
										initial={shouldAnimate() ? { opacity: 0, y: 50 } : false}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: 50 }}
										transition={{
											type: "spring",
											stiffness: 50,
											mass: 0.1,
											delay: 0.1
										}}
									>
										<Alert order="info">You’ve been subscribed!</Alert>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					</SubscribeForm>
				</div>
			</div>
		</aside>
	);
};

export default SubscribeBanner;
