export default {
	methods: {
		formatDateTime(value) {
			const date = new Date(value);
			console.log(date);
			const day = date.getDate();
			const month = date.getMonth() + 1;
			const year = date.getFullYear();

			return `Selected date is ${day}/${month}/${year}`;
		},
	},
};
