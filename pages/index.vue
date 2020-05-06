<template>
	<div class="uk-grid">
		
	</div>
</template>
<script>
export default {
	middleware: 'auth',
	mounted() {
		if(this.$auth.loggedIn)
			this.$router.push('/admin');
	}
}
</script>
