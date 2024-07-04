<template>
	<div>
		<router-link to="/login">로그인</router-link>
		<router-link to="/singUp">회원가입</router-link>
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	name: 'App',
	components: {},
};
</script>

<style></style>
