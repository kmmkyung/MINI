<template>
	<div>
		<AppHeader></AppHeader>
		<router-view></router-view>
	</div>
</template>

<script>
import AppHeader from '@/components/til/AppHeader.vue';
export default {
	name: 'TilApp',
	components: {
		AppHeader,
	},
};
</script>

<style lang="scss" scoped></style>
