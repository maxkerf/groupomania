<template>
	<div>
		{{ message }}
	</div>
</template>

<script>
import { mapState } from "vuex";

export default {
	data() {
		return {
			message: "",
		};
	},
	computed: {
		...mapState(["apiRoot"]),
	},
	async created() {
		const res = await fetch(this.apiRoot);
		const data = await res.json();

		this.message = data.message;
	},
};
</script>
