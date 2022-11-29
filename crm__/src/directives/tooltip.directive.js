import M from 'materialize-css'

export default {
  beforeMount(el, {value}){
    M.Tooltip.init(el, {html: value})
  },
  unmounted(el){
    let tooltip = M.Tooltip.getInstance(el);
    
    if (tooltip && tooltip.destroy) {
      tooltip.destroy()
    }
  }
}
