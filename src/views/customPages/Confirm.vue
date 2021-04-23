<template>
  <div class="app flex-row align-items-center customRegister">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8" sm="10" lg="8">
          <b-card no-body class="mx-4 customLogin" >
            <b-card-body class="p-4" >
              <b-form @submit.prevent="onSubmit" class="customForm">
                <div class="enter"> Подтверждение телефона</div>
                <div class="smallText">В течении 1 минуты вам на телефон придет сообщение с кодом</div>
                
                <div class="label"
                :class="{'labelWhite':focusCode}">Код</div>
                <b-input-group class="mb-3 customInput" >
                    
                    <b-form-input required
                      type="password" 
                      v-model="userCode" 
                      class="form-control loginPhone" 
                      placeholder="Код из смс" 
                      @focus="focusCode= true" 
                      @blur="focusCode = false"/>
                      <i class="fa fa-eye-slash customIcon"></i>
                </b-input-group>

                <b-button type="submit" class="customButton" block>Подтвердить</b-button>
                <div style="text-align:center; margin-top:10px; ">
                  <router-link
                      to="/register"
                      style="color:rgba(3, 251, 243, 0.3);">
                      Назад
                  </router-link>
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

export default {
  name: 'Confirm',
  data: () => ({
    userCode: '',
    focusCode: false,
  }),

  computed: {},
  methods: {},
};
</script>

<style scoped>
.customRegister {
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
  line-height: 120%;
  /* identical to box height, or 65% */

  text-align: center;

  color: #ffffff;
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
</style>