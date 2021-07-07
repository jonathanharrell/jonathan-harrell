import React from "react";
import * as Sentry from "@sentry/browser";

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
				<div>
					<h1>Oops! There was an error.</h1>
					<button onClick={this.handleClick}>Report feedback</button>
				</div>
			);
		}

		return this.props.children;
	}
}
