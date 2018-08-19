<template>
  <v-footer height="auto">
    <v-layout justify-center row wrap>
      <v-btn v-for="link in links" :key="link" color="black" flat round>
        {{ link }}
      </v-btn>
      <v-flex lighten-2 py-3 text-xs-center black--text xs12>
        &copy;2018 —
        <strong>Ulife</strong>
      </v-flex>
    </v-layout>
  </v-footer>
</template>

<script>
  export default {
    data: () => ({
      links: [
        '关于我们',
        '技术支持',
        '合作伙伴',
        'Ulife指南',
        '联系我们',
        '更新日志'
      ]
    })
  }

</script>

<style scoped>
  .v-footer {
    position: absolute;
    bottom: 0;
    width: 100%;
  }

</style>
