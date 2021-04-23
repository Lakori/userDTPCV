<template>
  <div class="app flex-row align-items-center customRegister">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6" sm="8">
          <b-card no-body class="mx-4 customLogin" >
            <b-card-body class="p-4" >
              <b-form v-if="registerForm" @submit.prevent="createUser" class="customForm">
                <div class="enter"> Регистрация</div>
                
                <div class="label"
                :class="{'labelWhite':focusTel}">Номер телефона</div>
                <b-input-group class="mb-3 customInput" >
                 
                  <b-form-input required
                      type="tel" 
                      v-mask="'?###################'" 
                      v-model="phoneNumber" 
                      class="form-control loginPhone" 
                      :class="{'is-invalid': !$v.phoneNumber.minLength}"
                      placeholder="Телефон" 
                      ref="phoneNumber"
                      @focus="focusTel = true" 
                      @blur="focusTel = false"/>
                </b-input-group>

                <div class="label"
                :class="{'labelWhite':focusPassword}">Пароль</div>
               <b-input-group class="mb-3 customInput">
                
                  <b-form-input required
                    :type="passType" 
                    v-model.trim="password" 
                    class="form-control loginPhone" 
                    placeholder="Пароль" 
                    :class="{'is-invalid': !$v.password.minLength}" 
                    @focus="focusPassword = true" 
                    @blur="focusPassword = false"/>
                    <div style="display:inline; cursor:pointer; z-index:1000;" @click.prevent="showPass">
                        <i v-bind:class="eye" class="customIcon fa"></i>
                    </div>
                </b-input-group>

                <div class="label"
                :class="{'labelWhite':focusRepeat}">Повторите пароль</div>
                <b-input-group class="mb-4 customInput">
                  
                  <b-form-input 
                  :type="passRepeat" 
                  v-model.trim="repeatedPassword" 
                  class="form-control loginPhone" 
                  placeholder="Повторите пароль" 
                  ref="repeatedPasswordEl"
                  @focus="focusRepeat = true" 
                  @blur="focusRepeat = false"/>
                  <div style="display:inline; cursor:pointer; z-index:1000;" @click.prevent="showPassRepeat">
                  <i v-bind:class="eyeRepeat" class="customIcon fa"></i>
                  </div>
                </b-input-group>
                
                <div style="text-align:center; margin-top:40px; ">
                <input type="checkbox" class="customCheckBox " v-model="check">
                  <div
                      @click="termsModal = true"
                      style="display:inline; color:rgba(255, 255, 255, 0.5); cursor:pointer">
                      Я прочитал и согласен с условиями соглашения
                  </div>
                </div>
                <b-modal size="lg" title="Условия" class="modal-success" v-model="termsModal" @ok="termsModal = false" hide-footer>
                  <TermsAndCond/>
                </b-modal>

                <b-button :disabled="!check" type="submit" class="customButton" block>Создать аккаунт</b-button>
                <b-button  class="registerButton" block @click="showVerConf">Верификация номера</b-button>

                <div style="text-align:center; margin-top:10px; ">
                  <router-link
                      to="/login"
                      style="color:rgba(3, 251, 243, 0.3);">
                      Назад
                  </router-link>
                </div>
              </b-form>
              
              <b-form v-if="verificationConfirm" class="customForm">
                <div class="validationText"> Повторная верификация</div>
                
                <div class="label"
                :class="{'labelWhite':focusCode}">Мобильный номер</div>
                <b-input-group class="mb-3 customInput" >
                    
                    <b-form-input required
                      type="text" 
                      v-model="phoneNumber" 
                      class="form-control loginPhone" 
                      placeholder="Введите номер" 
                      @focus="focusCode= true" 
                      @blur="focusCode = false"/>
                </b-input-group>

                <b-button @click.prevent="repeatConfirm" class="customButton" block>Отправить cмс с кодом</b-button>
                <div style="text-align:center; margin-top:10px; color:rgba(3, 251, 243, 0.3); cursor:pointer;" @click="back">
                  Назад
                </div>
              </b-form>

              <b-form v-if="verificationForm" class="customForm">
                <div class="validationText"> Подтверждение телефона</div>
                <div class="smallText">В течении 1 минуты вам на телефон придет сообщение с кодом</div>
                
                <div class="label"
                :class="{'labelWhite':focusCode}">Код</div>
                <div style="color:red">{{error}}</div>
                <b-input-group class="mb-3 customInput" >
                    
                    <b-form-input required
                      type="text" 
                      v-model="smsCode" 
                      class="form-control loginPhone" 
                      placeholder="Код из смс" 
                      @focus="focusCode= true" 
                      @blur="focusCode = false"/>
                      
                </b-input-group>

                <b-button type="submit" class="customButton" block @click.prevent="sendCode">Подтвердить</b-button>
                <div style="text-align:center; margin-top:10px; color:rgba(3, 251, 243, 0.3); cursor:pointer;" @click="back">
                  Назад
                </div>
              </b-form>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators';
import TermsAndCond from '../components/TermsAndCond';

export default {
  name: 'Register',
  components: { TermsAndCond },
  data: () => ({
    error: null,
    registerForm: true,
    phoneNumber: '',
    password: '',
    repeatedPassword: '',
    'is-invalid': false,
    check: false,
    invalidPhone: null,
    invalidPassword: null,
    focusTel: false,
    focusPassword: false,
    focusRepeat: false,
    smsCode: null,
    focusCode: false,
    verificationConfirm: false,
    verificationForm: false,
    passType: `password`,
    eye: `fa-eye-slash`,
    passRepeat: `password`,
    eyeRepeat: `fa-eye-slash`,
    termsModal: false,
  }),
  validations: {
    phoneNumber: { required, minLength: minLength(10) },
    password: { required, minLength: minLength(6) },
  },
  watch: {
    repeatedPassword: 'checkPasswordsEquality',
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
    showPassRepeat() {
      this.passRepeat === 'password'
        ? (this.eyeRepeat = `fa-eye`)
        : (this.eyeRepeat = `fa-eye-slash`);
      this.passRepeat === 'password'
        ? (this.passRepeat = 'text')
        : (this.passRepeat = 'password');
    },
    async createUser() {
      try {
        if (this.checkFields()) {
          let linkRegister = `${$URL}${this.$BASE_URL}/auth/signup`;
          let response = await this.$http.post(linkRegister, {
            phoneNumber: this.phoneNumber,
            password: this.password,
          });

          this.registerForm = false;
          this.verificationForm = true;
          this.sendSms();
        }
      } catch (err) {
        console.log(err);
        this.error = 'Не удалось создать пользователя';
      }
    },

    showVerConf() {
      this.verificationForm = false;
      this.registerForm = false;
      this.verificationConfirm = true;
    },
    repeatConfirm() {
      this.registerForm = false;
      this.verificationConfirm = false;
      this.verificationForm = true;
      this.sendSms();
    },

    back() {
      this.verificationConfirm = false;
      this.verificationForm = false;
      this.registerForm = true;
    },
    async sendSms() {
      try {
        let linkPhone = `${$URL}${
          this.$BASE_URL
        }/auth/signup/verification/phoneNumber`; //FIXME URL AND OBJECT
        let validationData = await this.$http.post(linkPhone, {
          phoneNumber: this.phoneNumber,
        });
      } catch (err) {
        this.error = 'Произошла ошибка при отправке смс';
      }
    },
    async sendCode() {
      try {
        let validationLink = `${$URL}${
          this.$BASE_URL
        }/auth/signup/verification/code`;
        let validationData = await this.$http.post(validationLink, {
          verificationCode: this.smsCode,
        });
        this.$swal.fire({
          icon: 'success',
          title: `Регистрация успешна`,
        });

        // let dataLink = `${$URL}${this.$BASE_URL}/auth/profile`;
        // let data = await this.$http.get(dataLink);
        // let userId = data.data.userId;

        // alert('Номер телефона подтвержден' + userId);
        this.$router.push('/login');
      } catch (err) {
        this.error = 'Неверный код';
      }
    },
    checkTelephone() {
      const { phoneNumber } = this.$refs;
      if (!this.$v.phoneNumber.minLength) {
        phoneNumber.setCustomValidity('Введите валидный телефон');
      } else {
        phoneNumber.setCustomValidity('');
      }
    },
    checkPasswordsEquality() {
      const { password, repeatedPassword } = this;
      const { repeatedPasswordEl } = this.$refs;

      if (password !== repeatedPassword) {
        repeatedPasswordEl.setCustomValidity('Пароли должны совпадать');
      } else {
        repeatedPasswordEl.setCustomValidity('');
      }
    },
    checkFields() {
      this.invalidPhone = !this.$v.phoneNumber.minLength;
      this.invalidPassword = this.$v.password.minLength;

      if (this.invalidPassword && !this.invalidPhone) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style>
.customRegister {
  background: linear-gradient(180deg, #110c18 40.05%, #2b1f3d 100%);
}

.customLogin {
  background: none !important;
  border: none !important;
}

.enter,
.validationText {
  display: flex;
  justify-content: center;
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

.validationText {
  line-height: 120%;
  margin-bottom: 25px;
}

.smallText {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 120%;
  /* or 17px */

  text-align: center;

  color: #ffffff;
  margin-bottom: 50px;
}

.input-group .form-control {
  border-radius: 8px !important;
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

.customCheckBox {
  color: rgba(255, 255, 255, 0.5);
  margin-right: 5px;
}
.customButton {
  margin-top: 10px;
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

.registerButton:hover {
  background: linear-gradient(180deg, #03fbf3 0%, #00afaa 100%);
}
.modal-open .modal-content {
  background: linear-gradient(
    180deg,
    #16101f 0%,
    #2b1f3c 44.91%,
    #2b1f3d 44.92%,
    #110c18 100%
  ) !important;
  border: 1px solid #0bcfc9;
}

.modal-open .modal-header {
  /* text-align: center; */
  border-bottom: 0px;
  align-items: center;
  justify-content: center;
}

.modal-open .modal-title {
  margin-top: 5px;
  /* margin-right: 160px; */
  color: white;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 15px;
  text-transform: uppercase;
}
.modal-open .close {
  position: absolute;
  right: 3%;
  top: 10px;
  /* margin-top: 0px;
  margin-left: 0px;
  margin-right: -190px;
  margin-bottom: 5px; */
  padding: 5px;
  color: #0bcfc9;
}

.modal-body .btn-secondary {
  border-color: black;
}

.btn-secondary:focus {
  box-shadow: none;
}
</style>