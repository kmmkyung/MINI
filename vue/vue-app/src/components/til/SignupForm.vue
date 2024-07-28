<template>
	<form v-on:submit.prevent="submitForm">
		<div>
			<label for="username">id: </label>
			<input type="text" id="username" v-model="username" />
		</div>
		<div>
			<label for="password">pw: </label>
			<input type="text" id="password" v-model="password" />
		</div>
		<div>
			<label for="nickname">nickname: </label>
			<input type="text" id="nickname" v-model="nickname" />
		</div>
		<button v-bind:disabled="!isUsernameValid || !password" type="submit">
			회원가입
		</button>
		<p>{{ logMessage }}</p>
	</form>
</template>

<script>
import { registerUser } from '@/api/til/index.js';
import { validateEmail } from '@/utils/validation.js';

export default {
	data() {
		return {
			username: '',
			password: '',
			nickname: '',
			// log
			logMessage: '',
		};
	},
	computed: {
		isUsernameValid() {
			return validateEmail(this.username);
		},
	},
	methods: {
		async submitForm() {
			try {
				console.log('폼작성');
				const userData = {
					username: this.username,
					password: this.password,
					nickname: this.nickname,
				};
				const { data } = await registerUser(userData);
				console.log(data.username);
				this.logMessage = `${data.username}님이 가입되었습니다.`;
			} catch (error) {
				this.logMessage = error.response.data;
			} finally {
				this.initForm();
			}
		},
		initForm() {
			this.username = '';
			this.password = '';
			this.nickname = '';
		},
	},
};
</script>

<style lang="scss" scoped></style>
