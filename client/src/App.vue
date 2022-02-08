<template>
	<div id="app">
		<!-- 여기서부터 코드를 시작합니다! -->
		<nav-bar/>
		<router-view></router-view>
	</div>
</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
	name: 'app',
	components: { NavBar, },
	data () {
		return {
		}
	}
}
</script>

<style lang="scss">
</style>
