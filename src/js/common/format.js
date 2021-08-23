var format = {
    /**
     * format date theo định dạng dd/mm/yyyy
     * @param {Date} value 
     * @returns 
     */
    formatDate(value) {
    
      if(value == null) return "";
          var date = new Date(value);
          date.setDate(date.getDate()+ 1);
          return date.toLocaleDateString("en-GB");
      },
      /**
       * format tiền theo định dạng z.zzz.zzz
       * @param {*} value 
       * @returns 
       */
    formatMoney(value){
      if(value == null|| value == "") return "";
      
      return new Intl.NumberFormat('de-DE').format(value);
    }
  }
  export default format