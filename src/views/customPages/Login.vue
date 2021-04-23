<template>
  <div class="app flex-row align-items-center customContainer">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6">
          <b-card-group >
            <b-card no-body class="customLogin">
              <b-card-body >
                <b-form @submit.prevent="onLogin" class="customForm">
                  <div class="enter"><h1>Вход</h1></div>
                  <p v-if="invalid" style="color:red;"> Неверный Телефон или Пароль</p>
                  
                  <div class="label"
                  :class="{'labelWhite':focusTel}">Номер телефона</div>
                  <b-input-group class="mb-3 customInput">
                    <b-form-input required 
                      type="tel" 
                      v-mask="'?#############################'" 
                      v-model="userPhoneNumber" 
                      class="form-control loginPhone" 
                      placeholder="Телефон" 
                      :class="{'is-invalid': !$v.userPhoneNumber.minLength}"
                      @focus="focusTel = true" 
                      @blur="focusTel = false"/>
                  </b-input-group>
                  <div class="label"
                  :class="{'labelWhite':focusPassword}">Пароль</div>
                  <b-input-group class="mb-3 customInput">
                    
                  <b-form-input required 
                    v-bind:type="passType" 
                    v-model="password" 
                    class="form-control loginPhone" 
                    placeholder="Пароль" 
                      @focus="focusPassword = true" 
                      @blur="focusPassword = false"/><div style="display:inline; cursor:pointer; z-index:1000;" @click.prevent="showPass"><i  v-bind:class="eye" class="customIcon fa"></i></div>
                  </b-input-group>
                  <div class="fixedButtons">
                      <b-button type="submit" class="px-4 customButton">Вход</b-button>
                      <b-button class="px-4 registerButton" @click.prevent="toRegister">Зарегистрироваться</b-button>
                  </div>
                  <div style="text-align:center; margin-top:10px;">
                    <router-link
                to="/landing"
                style="color:rgba(3, 251, 243, 0.3);"
              >Назад
               </router-link>

                </div>
                </b-form>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators';

export default {
  name: 'Login',
  data: () => ({
    eye: `fa-eye-slash`,
    userPhoneNumber: '',
    password: '',
    'is-invalid': false,
    invalid: false,
    focusTel: false,
    focusPassword: false,
    passType: 'password',
  }),
  validations: {
    userPhoneNumber: { required, minLength: minLength(18) },
    password: { required, minLength: minLength(6) },
  },
  computed: {
    phoneNumber: function() {
      let newPhone = this.userPhoneNumber;
      return `${newPhone}`;
    },
  },
  created() {
    let preloaderEl = document.getElementById('preloader');
    preloaderEl.classList.add('hidden');
    preloaderEl.classList.remove('visible');
  },
  methods: {
    showPass() {
      this.passType === 'password'
        ? (this.eye = `fa-eye`)
        : (this.eye = `fa-eye-slash`);
      this.passType === 'password'
        ? (this.passType = 'text')
        : (this.passType = 'password');
    },
    toRegister() {
      this.$router.push('/register');
    },
    async onLogin() {
      try {
        this.invalid = false;
        // let link = `${$URL}${this.$BASE_URL}/auth/signin`;
        // let response = await this.$http.post(link, {
        //   phoneNumber: this.phoneNumber,
        //   password: this.password,
        // });
        this.$router.push('/home');
      } catch (err) {
        this.invalid = true;
      }
    },
  },
};
</script>

<style scoped>
.customContainer {
  background: linear-gradient(180deg, #110c18 40.05%, #2b1f3d 100%);
}

.customLogin {
  background: none !important;
  border: none !important;
}

.enter {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  font-size: 34px;
  line-height: 22px;
  /* identical to box height, or 65% */

  text-align: center;

  color: #ffffff;
  margin-bottom: 64px;
}

.input-group .form-control {
  border-radius: 8px !important;
}

.customInput {
  display: flex;
  flex-direction: column;
}
.loginPhone {
  background: none;
  border: 1px solid #03fbf3;
  box-sizing: border-box;
  box-shadow: 0px 0px 8px rgba(3, 251, 243, 0.35);
  border-radius: 8px;
  width: 100%;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 150%;
  padding: 12px;
  color: #ffffff;

  opacity: 0.8;
}

.label {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 8px;
  color: rgba(255, 255, 255, 0.3);
}

.labelWhite {
  color: white;
}

.customIcon {
  position: absolute;
  right: 10px;
  bottom: 7px;
  font-size: 18px;
  line-height: 150%;
  color: rgba(3, 251, 243, 0.3);
  border: none !important;
}

.fixedButtons {
  position: relative;
  bottom: 0;
}
.customButton {
  margin-top: 80px;
  background: linear-gradient(180deg, #03fbf3 0%, #00afaa 100%);
  box-shadow: 0px 0px 20px rgba(53, 206, 205, 0.35);
  border-radius: 8px;
  width: 100%;
  border: none !important;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;
  /* identical to box height, or 122% */
  padding: 14px;
  text-align: center;

  color: #ffffff;
}

.registerButton {
  margin-top: 10px;
  width: 100%;
  opacity: 0.9;
  background: none;
  border: 2px solid #03fbf3;
  box-sizing: border-box;
  box-shadow: 0px 0px 20px rgba(53, 206, 205, 0.35);
  border-radius: 8px;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 22px;
  /* identical to box height, or 122% */
  padding: 14px;
  text-align: center;

  color: #ffffff;
}
</style>


