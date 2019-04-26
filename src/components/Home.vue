<template>
	<div class="footer-bg">
		<my-header></my-header>
		<div id="main">
			<left-nav></left-nav>
			<div id="content">
				<router-view/>
			</div>
		</div>
	</div>
</template>

<script>
import Header from './components/Header'
import LeftNav from './components/LeftNav'
	
export default {
	data(){
		return {
			
		}
	},
	components: {
		'my-header': Header,
		'left-nav': LeftNav
	},
	created(){
		
	}
	
}
	
</script>

<style>
#main{
	position: absolute;
	top: 70px;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
}
#content{
	flex: 1;
	background-color: #edf0f5;
	overflow: hidden;
}



</style>