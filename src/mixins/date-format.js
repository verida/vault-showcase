export default {
  methods: {
    formatDatetime (str) {
      switch (str) {
        case 'date-time':
          return 'yyyy-LL-dd HH:mm'
        case 'date':
          return 'yyyy-LL-dd'
        default:
          return ''
      }
    }
  }
}
