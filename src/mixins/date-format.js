export default {
	methods: {
		// formatDateTime (str) {
		//   switch (str) {
		//     case 'date-time':
		//       return 'yyyy-LL-dd HH:mm'
		//     case 'date':
		//       return 'yyyy-LL-dd'
		//     default:
		//       return ''
		//   }
		// }
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
