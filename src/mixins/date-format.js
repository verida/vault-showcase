export default {
  methods: {
    format (str) {
      switch (str) {
        case 'date-time':
          return 'dd-LL-yyyy HH:mm'
        case 'date':
          return 'dd-LL-yyyy'
        default:
          return ''
      }
    }
  }
}
