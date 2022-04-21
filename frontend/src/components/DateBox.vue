<template>
	<div class="date-box">
		<span :title="new Date(creationDate).toLocaleString()">{{
			formatDate
		}}</span>
		<span v-if="lastUpdate" :title="new Date(lastUpdate).toLocaleString()">
			- Updated
		</span>
	</div>
</template>

<script>
export default {
	props: ["creationDate", "lastUpdate"],
	computed: {
		formatDate() {
			const currentDate = new Date(Date.now());
			const creationDate = new Date(this.creationDate);
			const diff = currentDate - creationDate;

			const s = Math.trunc(diff / 1000);
			const mn = Math.trunc(s / 60);
			const h = Math.trunc(mn / 60);
			const d = Math.trunc(h / 24);
			const m = this.getMonthDifference(creationDate, currentDate);
			const y = Math.trunc(m / 12);

			const result = y
				? `${y}y`
				: m
				? `${m}m`
				: d
				? `${d}d`
				: h
				? `${h}h`
				: mn
				? `${mn}mn`
				: s
				? `${s}s`
				: "0s";

			return `${result} ago`;
		},
	},
	methods: {
		getMonthDifference(startDate, endDate) {
			return (
				endDate.getMonth() -
				startDate.getMonth() +
				12 * (endDate.getFullYear() - startDate.getFullYear())
			);
		},
	},
};
</script>

<style lang="scss" scoped>
.date-box {
	font-size: 0.75rem;
	color: #b0b3b8;
}
</style>
