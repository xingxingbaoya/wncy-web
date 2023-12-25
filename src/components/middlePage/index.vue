<template>
  <div class="middle">
    <!-- <img src="@/assets/img/qidai.png" alt="" /> -->
  </div>
</template>

<script>
export default {
  name: 'Meethall',
  created(){
    this.$router.push("/404")
  }

}
</script>

<style scoped lang="scss">
.middle{
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  img{
    width: 850px;
    height: 450px;
  }
}
</style>
