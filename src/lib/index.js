import Vue from 'vue'
//import ref from 'vue-ref'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import VueContextMenu from 'vue-contextmenu'
import vcolorpicker from 'vcolorpicker'


import vueFlowDesigner from '../components/flow/designer/FlowDesigner.vue'

let flowDesigner = {}
flowDesigner.install = function(Vue,options){
	Vue.config.productionTip = false
	//Vue.use(ref, { name: 'ant-ref' })
	Vue.use(Antd)
	Vue.use(VueContextMenu)
	Vue.use(vcolorpicker)
	Vue.component(vueFlowDesigner.name,vueFlowDesigner);
}
/* 支持使用标签的方式引入 */
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(flowDesigner);
}
export default flowDesigner;