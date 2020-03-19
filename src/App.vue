<template>
  <div :id="el" style="height: 99%;">
    <router-view/>
  </div>
</template>

<script>
import { nodeExtraConfig } from './components/flow/designer/config/basic-extra-config.js'
export default {
  name: 'App',
  data () {
		return {
		    nodeExtraConfig:nodeExtraConfig,
			el:nodeExtraConfig.el
		}
  },
  created:function(){
  		let config = JSON.parse(JSON.stringify(this.nodeExtraConfig));
		let el = config.el;
		this.el = el; 
		this.nodeExtraConfig = config;
  }
}
</script>

<style>
</style>
