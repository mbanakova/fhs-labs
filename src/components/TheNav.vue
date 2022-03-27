<template>
	<nav class="nav">
		<router-link to="/" class="link">Показания</router-link>
		<router-link to="/add" class="link">Добавить запись</router-link>
	</nav>
</template>

<script>
export default {};
</script>
<style lang="scss" scoped>
.nav {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 20px;
}

.link {
	padding: 10px 25px;
	color: $white;
	border: 2px solid $accent;
	background-color: transparent;
	text-decoration: none;
	transition: $tr;
}
.router-link-active {
	background-color: $accent;
	color: $white;
}
</style>
