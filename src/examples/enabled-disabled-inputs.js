import React from 'react'
import Codepen from '../components/Codepen'

export default props => {
	return (
		<Codepen
			{...props}
			title="Enabled & Disabled Inputs"
			height={260}
			smHeight={180}
			html={`
				<div class="wrap">
					<form>
						<div>
							<label for="enabled">Email address (enabled)</label>
							<input type="email" id="enabled" placeholder="email@email.com" class="input" />
						</div>
						<div>
							<label for="disabled">Email address (disabled)</label>
							<input type="email" id="disabled" placeholder="email@email.com" class="input" disabled />
						</div>
					</form>
				</div>
			`}
			styles={`
				form {
					display: grid;
					grid-gap: 24px;
					grid-template-columns: repeat(1, 1fr);
					width: 100%;
					max-width: 40rem;
				}

				@media (min-width: 640px) {
					form {
						grid-template-columns: repeat(2, 1fr);
						grid-gap: 48px;
					}
				}

				.input:enabled {
					border-color: var(--primary-color);
					box-shadow: 0 1px 3px 0 rgba(30, 185, 128, 0.5);
				}
			`}
		/>
	);
};
