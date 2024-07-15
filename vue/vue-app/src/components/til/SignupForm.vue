<template>
	<form v-on:submit.prevent="submitForm">
		<div>
			<label for="username">id: </label>
			<input type="text" id="username" v-model="username" />
		</div>
		<div>
			<label for="password">pw: </label>
			<input type="text" id="password" v-model="userword" />
		</div>
		<div>
			<label for="nickname">nickname: </label>
			<input type="text" id="nickname" v-model="nickname" />
		</div>
		<button type="submit">Login</button>
	</form>
</template>

<script>
export default {
	data() {
		return {
			username: '',
			userword: '',
			nickname: '',
		};
	},
	methods: {
		submitForm() {
			console.log('폼작성');
		},
	},
};
</script>

<style lang="scss" scoped></style>
