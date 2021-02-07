import React from "react";
import { select, withKnobs } from "@storybook/addon-knobs";
import ThemeWrap from "../../jh-ui/ThemeWrap";
import ThemeContext from "../../context/theme";
import Alert from "./index";

export default {
	title: "Alert",
	decorators: [renderStory => <ThemeWrap>{renderStory()}</ThemeWrap>, withKnobs]
};

export const Basic = () => {
	const order = select("Order", ["info", "warning", "danger"], "danger");

	return (
		<ThemeContext.Consumer>
			{({ theme }) => (
				<Alert theme={theme} order={order}>
					Alert
				</Alert>
			)}
		</ThemeContext.Consumer>
	);
};
