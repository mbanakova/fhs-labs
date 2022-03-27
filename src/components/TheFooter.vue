<template>
	<footer>
		<div class="wrapper footer-wrapper">
			<div class="copyright">© mbanakova, {{ getYear }}</div>
			<ul class="contacts">
				<li>
					<a href="https://t.me/mbanakova"
						><font-awesome icon="paper-plane"
					/></a>
				</li>
				<li>
					<a href="tel:+79268757522"><font-awesome icon="phone" /></a>
				</li>
				<li>
					<a href="mailto:mbanakova@yandex.ru"
						><font-awesome icon="envelope"
					/></a>
				</li>
			</ul>
			<div class="framework">build on Vue.js</div>
		</div>
	</footer>
</template>

<script>
export default {
	data() {
		return {
			year: null,
		};
	},
	computed: {
		getYear() {
			return new Date().getFullYear();
		},
	},
};
</script>

<style lang="scss" scoped>
footer {
	margin-top: auto;
	padding: 30px 20px;
	background-color: #222222;
	color: white;
	font-size: 14px;
}

.footer-wrapper {
	display: flex;
	padding: 0;
	justify-content: space-between;
	flex-direction: row;
	align-items: center;

	@media (max-width: $mobile) {
		flex-direction: column;
	}
}

.contacts {
	display: flex;
	justify-content: space-between;
	gap: 20px;

	& a {
		padding: 15px;
		border: 2px solid $white;
		display: block;
		text-decoration: none;
		color: inherit;
		border-radius: 50%;
		line-height: 16px;
		transition: $tr;

		@media (max-width: $mobile) {
			padding: 10px;
		}

		&:hover {
			color: $light;
			border-color: $light;
		}
	}

	& svg {
		width: 16px;
		height: 16px;
	}
}
</style>
