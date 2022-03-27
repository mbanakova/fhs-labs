<template>
	<main class="wrapper">
		<h1>Список показаний:</h1>
		<TempList />
	</main>
</template>

<script>
import TempList from "@/components/TempList";
export default {
	name: "Home",
	components: {
		TempList,
	},
	data() {
		return {};
	},

	methods: {},
	mounted() {},
};
</script>

<style lang="scss" scoped></style>
