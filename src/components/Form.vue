<template>
	<form @submit.prevent="addTemperature">
		<div class="input-wrap">
			<input
				:class="{ invalid: !isValid }"
				type="number"
				name="temp"
				id="temp"
				placeholder="температура °С"
				v-model.trim="value"
				@change="validateData"
				@blur="clearValidity('temperature')"
			/>
			<button @click="validateData" class="icon-button">
				<font-awesome icon="floppy-disk" />
			</button>
		</div>
		<transition name="slide" appear>
			<div class="info info--warning" v-if="!isValid">
				диапазон температур — от {{ min }}°С до {{ max }}°С
			</div></transition
		>
		<transition name="slide" appear>
			<div class="info" v-if="showModal">Данные добавлены!</div></transition
		>
	</form>
</template>

<script>
export default {
	data() {
		return {
			min: -273,
			max: 5499999999727,
			value: "",
			isValid: true,
			id: "",
			showModal: false,
			showDel: false,
		};
	},
	methods: {
		clearValidity() {
			this.isValid = true;
		},
		validateData() {
			this.isValid = true;
			if (this.value === 0) {
				this.isValid = true;
			} else if (
				this.value < this.min ||
				this.value > this.max ||
				!this.value
			) {
				this.isValid = false;
			}
			return this.isValid;
		},
		generateId() {
			this.id = Math.random().toString(16).slice(2);
		},
		async addTemperature() {
			this.validateData();
			if (!this.isValid) {
				return;
			}

			this.generateId();

			const formData = {
				id: this.id,
				temperature: this.value,
			};

			await this.$store.dispatch("addTemperature", formData);
			this.value = null;
			this.showModal = true;
			setTimeout(() => {
				this.showModal = false;
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
