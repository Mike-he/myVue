<template>
  <div class="hello">
		<div v-text="msg"></div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Hello Vicky!'
    }
  }
}
</script>

<style scoped>
.hello {
	color:blue;
}
</style>
