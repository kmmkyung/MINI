<template>
	<div>
		<header>
			<router-link :to="{ params: { id: 'login' } }">로그인</router-link>
			<router-link :to="{ params: { id: 'singUp' } }">회원가입</router-link>
		</header>
		<router-view></router-view>
	</div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
