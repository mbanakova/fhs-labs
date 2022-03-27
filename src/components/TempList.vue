<template>
	<div class="list-container">
		<div class="temp-list-top">
			<div class="temp-list-filter">Температура в °С:</div>
			<div class="temp-list-filter">id:</div>
		</div>
		<transition-group
			tag="ul"
			name="temp-list"
			class="grid"
			v-if="getTemperatureList.length > 0"
		>
			<li
				class="temp-item temp-list-item"
				v-for="(item, key) in getTemperatureList"
				:key="key"
			>
				<input
					type="number"
					name="temp"
					:id="item.id"
					v-model="item.temperature"
					@change="setNewValue"
				/>
				<div>{{ item.id }}</div>
				<button class="edit icon-button" @click="editItem(item.id)">
					<font-awesome icon="floppy-disk" />
				</button>
				<button class="delete icon-button" @click="deleteItem(item.id)">
					<font-awesome icon="trash" />
				</button>
			</li>
		</transition-group>
		<router-link to="/add" v-else class="icon-button"
			><font-awesome icon="plus"
		/></router-link>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
	data() {
		return { sorting: "key", list: [], listItem: {}, newTemp: null };
	},
	created() {
		this.fetchTemperatureList();
	},
	computed: {
		...mapGetters(["getTemperatureList"]),
	},
	methods: {
		async fetchTemperatureList() {
			try {
				await this.$store.dispatch("fetchTemperatureList");
			} catch (error) {
				throw new Error(error);
			}
		},
		deleteItem(id) {
			this.list = this.getTemperatureList.filter(item => item.id != id);
			this.updateList();
		},
		async updateList() {
			await this.$store.dispatch("updateList", this.list);
		},
		async editItem(id) {
			this.editedItem = this.getTemperatureList.filter(item => item.id === id);
			this.editedItem[0]["temperature"] = +this.newTemp;

			this.getTemperatureList.filter(item => item.id === id);
			this.item = this.editedItem[0];
			await this.$store.dispatch("updateList", this.getTemperatureList);
		},
		setNewValue(e) {
			this.newTemp = e.target.value;
		},
		sort(mode) {
			this.sorting = mode;
		},
	},
};
</script>

<style lang="scss" scoped>
.temp-list-top {
	display: grid;
	grid-template-columns: 2fr 1fr 50px 50px;
	gap: 10px;
	margin-bottom: 10px;
	text-align: center;
	padding: 10px;
	background-color: $navy;
	color: $white;
}

.grid {
	display: grid;
	gap: 10px;
}

.temp-item {
	display: grid;
	grid-template-columns: 2fr 1fr 50px 50px;
	gap: 10px;
	align-items: center;
	text-align: center;
	padding-left: 10px;
}

.delete {
	@include color(#8c0a20);
	&:hover {
		@include color(#a50e27);
	}

	&:active {
		@include color(#6a101f);
	}
}

.temp-item {
	width: 100%;
	margin: 0 auto;
	border: 1px solid #f5f5f5;

	@media (max-width: $mobile) {
		padding: 5px;
	}
}

.selected {
	background-color: $accent;
	color: $white;
}

.temp-list {
	&-enter-from {
		opacity: 0;
		transform: translateY(0);
	}

	&-enter-active {
		transition: all 1s ease-out;
	}
	&-enter-to,
	&-leave-from {
		opacity: 1;
		transform: translateY(0);
	}

	&-leave-active {
		transition: all 1s ease-in;
	}

	&-leave-to {
		opacity: 0;
		transform: translateY(-30px);
	}

	&-move {
		transition: transform 1s ease;
	}
}

.list-container {
	display: flex;
	flex-direction: column;
}

.icon-button {
	align-self: flex-end;
	line-height: 20px;
	display: flex;
	align-items: center;
}
</style>
