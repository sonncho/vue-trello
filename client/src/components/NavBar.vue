<template>
  <div>
    <!-- <router-link to="/">Home</router-link>
        <router-link to="/login">Login</router-link> -->
    <nav class="header navbar">
      <div class="container-fluid px-3">
        <div class="header-logo">
          <router-link to="/">Trello</router-link>
        </div>
        <div class="header-auth">
          <a
            v-if="isAuth"
            href=""
            @click.prevent="logout"
            class="btn btn-sm btn-light"
          >
            <b-icon icon="power" aria-hidden="true"></b-icon> Logout
          </a>
          <router-link v-else to="/login" class="btn btn-sm btn-light">
            <b-icon icon="box-arrow-in-left" aria-hidden="true"></b-icon> Login
          </router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  computed: {
    ...mapGetters(["isAuth"]),
    ...mapState({
      navbarColor : 'navbarColor',
      bodyColor: 'bodyColor'
    })
  },
  watch: {
    'bodyColor' : 'updateTheme'
  },
  mounted() {
    this.updateTheme()
  },
  methods: {
    ...mapMutations(["LOGOUT"]),
    logout() {
      this.LOGOUT();
      this.$router.push("/login");
    },
    updateTheme() {
      this.$el.style.backgroundColor = this.navbarColor

      const body = document.querySelector('body')
      const container = document.querySelector('.container')
      if(body) body.style.backgroundColor = this.bodyColor
      if (container) container.style.backgroundColor = this.bodyColor
    }
  },
};
</script>

<style lang="scss" scoped>
.header {
  /* background-color: #026aa7; */
  .header-logo a {
    font-size: 1.25rem;
    font-weight: bold;
    color: #eee !important;
    text-decoration: none;
  }
}
</style>