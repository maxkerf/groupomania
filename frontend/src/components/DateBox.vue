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
			const msDiff = currentDate - creationDate;

			let s = msDiff / 1000;
			let mn = s / 60;
			let h = mn / 60;
			let d = h / 24;
			const monthDiff = this.getMonthDifference(creationDate, currentDate);
			const m =
				this.getNbSecondsSinceMonthBeginning(currentDate) >=
				this.getNbSecondsSinceMonthBeginning(creationDate)
					? monthDiff
					: monthDiff - 1;
			let y = m / 12;

			// trunc for displaying (ex: 0.1 day becomes 0 => display nb hours instead)
			s = Math.trunc(s);
			mn = Math.trunc(mn);
			h = Math.trunc(h);
			d = Math.trunc(d);
			y = Math.trunc(y);

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

		getNbSecondsSinceMonthBeginning(date) {
			return (
				date.getDate() * 3600 * 24 +
				date.getHours() * 3600 +
				date.getMinutes() * 60 +
				date.getSeconds()
			);
		},
	},
};
</script>

<style lang="scss" scoped>
.date-box {
	font-size: 0.75rem;
	color: $txt-color-2;
	margin-bottom: 0.25rem;
}
</style>
