<template>
	<h1>Home</h1>
</template>

<script>
import { mapState } from "vuex";

export default {
	computed: {
		...mapState(["apiRoot"]),
	},
	async created() {
		const res = await fetch(this.apiRoot, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		});
		const data = await res.json();

		console.log(data);

		if (!res.ok) window.location = "/login";
	},
};
</script>
