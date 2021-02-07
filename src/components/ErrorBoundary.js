import React from "react";
import { ThemeProvider } from "styled-components";
import * as Sentry from "@sentry/browser";
import theme from "../jh-ui/theme";
import Heading from "./Heading";

// this component will catch any unhandled error and display a message and report button
export default class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { eventId: null };
	}

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		Sentry.withScope(scope => {
			scope.setExtras(errorInfo);
			const eventId = Sentry.captureException(error);
			this.setState({ eventId });
		});
	}

	handleClick = () => {
		Sentry.showReportDialog({ eventId: this.state.eventId });
	};

	render() {
		if (this.state.hasError) {
			return (
				<ThemeProvider theme={theme}>
					<div>
						<Heading level={1}>Oops! There was an error.</Heading>
						<button onClick={this.handleClick}>Report feedback</button>
					</div>
				</ThemeProvider>
			);
		}

		return this.props.children;
	}
}
