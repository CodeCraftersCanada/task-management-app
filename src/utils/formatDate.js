function formatDate(dateStr) {
	const date = new Date(dateStr);
	const isoString = date.toISOString().split("T")[0];
	return formatDateFromISOString(isoString);
}

function formatDateTime(timestamp) {
	const months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];

	const date = new Date(timestamp);

	const month = months[date.getMonth()];
	const day = date.getUTCDate();
	const year = date.getUTCFullYear();

	let hours = date.getUTCHours();
	const minutes = date.getUTCMinutes();
	const ampm = hours >= 12 ? "PM" : "AM";

	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'

	return `${month} ${day}, ${year} at ${hours}:${minutes
		.toString()
		.padStart(2, "0")}${ampm}`;
}

function formatDateFromISOString(isoString) {
	const months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];

	const parts = isoString.split("-");
	const year = parts[0];
	const month = months[parseInt(parts[1]) - 1]; // Months are 0-indexed
	const day = parseInt(parts[2]);

	return `${month} ${day}, ${year}`;
}

export { formatDate, formatDateTime, formatDateFromISOString };
