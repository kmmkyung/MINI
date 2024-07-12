<template>
	<header class="header">
		<h2>Weather Application</h2>
		<p>{{ username }}님 반갑습니다.</p>
	</header>
</template>

<script>
export default {
	name: 'HeaderDisplay',
};
</script>

<style lang="scss" scoped>
.header {
	background: linear-gradient(15deg, #833ab4, #fd1d1d, #fcb045);
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1rem;

	h2 {
		color: #fff;
	}
	p {
		font-size: 12px;
		color: #fff;
	}
}
</style>
