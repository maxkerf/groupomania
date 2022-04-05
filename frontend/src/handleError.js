export default function handleError(
	err,
	that,
	requestName = "accomplish request"
) {
	console.error(`Failed to ${requestName} ✖\n`, err);
	if (err.status === 401) {
		that.$store.dispatch("logout");
		that.$router.push("/login");
	}
}
