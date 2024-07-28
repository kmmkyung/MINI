<template>
	<form v-on:submit.prevent="submitForm">
		<div>
			<label for="username">id:</label>
			<input type="text" id="username" v-model="username" />
		</div>
		<div>
			<label for="password">pw:</label>
			<input type="text" id="password" v-model="password" />
		</div>
		<button v-bind:disabled="!isUsernameValid || !password" type="submit">
			로그인
		</button>
		<p>{{ logMessage }}</p>
	</form>
</template>

<script>
import { loginUser } from '@/api/til/index.js';
import { validateEmail } from '@/utils/validation.js';

export default {
	data() {
		return {
			username: '',
			password: '',
			//log
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
				// 비지니스 로직
				const userData = {
					username: this.username,
					password: this.password,
				};
				const { data } = await loginUser(userData);
				console.log(data.user.username);
				this.logMessage = `${data.user.username} 환영합니다`;
			} catch (error) {
				// 에러 핸들링할 코드
				// console.log(error.response.data);
				this.logMessage = error.response.data;
			} finally {
				this.initForm();
			}
		},
		initForm() {
			this.username = '';
			this.password = '';
		},
	},
};
</script>

<style lang="sass" scoped></style>
