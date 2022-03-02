<template>
	<div>{{ message }}</div>
</template>

<script>
export default {
	data() {
		return {
			message: "",
		};
	},
	async created() {
		try {
			const res = await fetch("http://localhost:3000");
			const data = await res.json();

			this.message = data.message;
		} catch (err) {
			console.error(err);
		}
	},
};
</script>
