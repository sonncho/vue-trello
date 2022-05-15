<template>
  <div class="login mt-5">
    <h2>Log in to Trello</h2>
    <form class="mb-3" @submit.prevent="onSubmit">
      <div class="mb-3">
        <label for="email">Email</label>
        <input
          type="text"
          class="form-control"
          name="email"
          v-model="email"
          autofocus
          placeholder="e.g., test@test.com"
        />
      </div>
      <div class="mb-3">
        <label for="password">Password</label>
        <input
          class="form-control"
          type="password"
          v-model="password"
          placeholder="123123"
        />
      </div>
      <button
        class="btn w-100"
        :class="[invalidForm ? 'btn-light' : 'btn-success']"
        type="submit"
        :disabled="invalidForm"
      >
        Log In
      </button>
    </form>
    <p class="error text-danger" v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import { auth, setAuthInHeader } from "../api";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: "",
      rPath: "",
    };
  },
  computed: {
    //email 또는  password가 둘중 하나라도 존재하지 않으면 false => 로그인버튼 disabled
    invalidForm() {
      return !this.email || !this.password;
    },
  },
  created() {
    this.rPath = this.$route.query.rPath || "/";
  },
  methods: {
    ...mapActions(["LOGIN"]),
    //form submit되면 onSubmit이벤트 호출
    //우선은 콜솔에 입력한 이메일과 password를 출력
    onSubmit() {
      this.LOGIN({ email: this.email, password: this.password });
      // console.log(this.email, this.password)

      auth
        .login(this.email, this.password)
        .then((data) => {
          this.$router.push(this.rPath);
        })
        .catch((err) => {
          this.error = err.data.error;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  width: 400px;
  margin: 0 auto;
  background: #fff;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);
  padding: 3rem;
  border-radius: 4px;
  label {
    font-size: 0.875rem;
    margin-bottom: 10px;
  }
  h2 {
    font: {
      size: 1rem;
    }
    text-align: center;
    margin-bottom: 3rem;
  }
}
</style>