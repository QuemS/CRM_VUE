// export default {
//   state:{
//     date: new Date(),
//     options:{},
//     dateFormat:''
//   },
//   mutations:{
//     newDate(state,date){
//       state.date = date
      
//     },
//     dateFilters(state,formats ='date'){
      
//       if (formats.includes('date')) {
//         state.options.day = '2-digit'
//         state.options.month = 'long'
//         state.options.year = 'numeric'
//       }

//       if (formats.includes('time')) {
//         state.options.hour = '2-digit'
//         state.options.minute ='2-digit'
//         state.options.second ='2-digit'
//       }
      
//       return Intl.DateTimeFormat('ru-Ru',state.options).format(state.date);
      
//     },
//   },
//   getters:{
//     dateFormat(state){
//       return state.dateFormat
//     }
//   }
// }
