<template>
	<main class="wrapper">
		<h1>Добавить данные:</h1>
		<Form />
		<transition name="slide" appear>
			<div class="clear" v-if="showDel">Список очищен!</div></transition
		>
		<button class="delete button" @click="clearAll">Удалить все записи</button>
	</main>
</template>

<script>
import Form from "@/components/Form";
export default {
	components: {
		Form,
	},
	data() {
		return {
			showModal: false,
			showDel: false,
		};
	},
	methods: {
		async clearAll() {
			await this.$store.dispatch("clearAll", {});
			this.showDel = true;
			setTimeout(() => {
				this.showDel = false;
			}, 1000);
		},
	},
};
</script>

<style lang="scss" scoped>
.input-wrap {
	margin-bottom: 20px;
}
input.invalid {
	border: 1px solid $warning;
}

.info {
	padding: 20px;
	text-align: center;
	border: 1px solid #82fdd2;
	box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
	width: 300px;
	margin: 0 auto;

	&--warning {
		border: 1px solid $warning;
		background-color: lighten($warning, 50%);
	}
}
.slide-enter-active,
.slide-leave-active {
	transition: transform 0.5s;
}

.slide-enter-from {
	transform: translateX(-100vw);
}
.slide-enter,
.slide-leave-to {
	transform: translateX(100vw);
}

.clear {
	border: 1px solid $warning;
	align-self: center;
	margin-top: auto;
	padding: 20px;
}

.delete {
	@include color($warning);
	align-self: center;
	margin-top: auto;
	padding: 20px;
}
</style>
