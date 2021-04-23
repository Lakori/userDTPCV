<template>
  <div class="app flex-row align-items-center customRegister">
    <div class="container">
      
          <b-card no-body class="mx-4 customLogin" >
            <b-card-body class="p-4" >
              <b-form @submit.prevent="editCustomer" class="customForm">
                <div class="enter"> Изменить данные</div>
                
                

              <div class="label"
                :class="{'labelWhite':focusSurname}">Фамилия пользователя</div>
                <b-input-group class="mb-3 customInput">
                    
                    <b-form-input required
                        type="text" 
                        v-model="surname" 
                        class="form-control loginPhone" 
                        placeholder="Фамилия" 
                        :class="{'is-invalid': !$v.surname.minLength}"
                        @focus="focusSurname = true" 
                      @blur="focusSurname = false"/>
                </b-input-group>

                <div class="label"
                :class="{'labelWhite':focusName}">Имя пользователя</div>
                <b-input-group class="mb-3 customInput" >
                    
                    <b-form-input required
                        type="text" 
                        v-model="userName" 
                        class="form-control loginPhone" 
                        placeholder="Имя" 
                        :class="{'is-invalid': !$v.userName.minLength}"
                        @focus="focusName = true" 
                      @blur="focusName = false"/>
                </b-input-group>

               

                <div class="label"
                :class="{'labelWhite':fosucPatronymic}">Отчество пользователя</div>
                <b-input-group class="mb-3 customInput">
                   
                    <b-form-input required
                        type="text" 
                        v-model="patronymic" 
                        class="form-control loginPhone" 
                        placeholder="Отчество" 
                        :class="{'is-invalid': !$v.patronymic.minLength}"
                        @focus="fosucPatronymic = true" 
                      @blur="fosucPatronymic = false"/>
                </b-input-group>

                

                <b-button type="submit" class="customButton" block>Сохранить</b-button>
                <div style="text-align:center; margin-top:10px; color:rgba(3, 251, 243, 0.3); cursor:pointer;" @click="back">
                  
                      Назад
                 
                </div>
              </b-form>
            </b-card-body>
          </b-card>
        
    </div>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators';

export default {
  name: 'EditCustomer',
  props: {
    userId: {
      type: String,
      default: null,
    },
    customerId: {
      type: String,
      defaul: null,
    },
    fullName: Object,
  },
  data: () => ({
    userName: '',
    surname: '',
    patronymic: '',

    'is-invalid': false,
    check: false,

    focusName: false,
    focusSurname: false,
    fosucPatronymic: false,
  }),
  validations: {
    userName: { required, minLength: minLength(2) },
    surname: { required, minLength: minLength(2) },
    patronymic: { required, minLength: minLength(2) },
  },

  computed: {},
  created() {
    this.getData();
  },
  methods: {
    back() {
      this.$emit('pushEditCustomer');
    },
    getData() {
      this.userName = this.fullName.name;
      this.surname = this.fullName.surname;
      this.patronymic = this.fullName.patronymic;
    },
    async editCustomer() {
      try {
        let customerLink = `${$URL}${this.$BASE_URL}/customers/${
          this.customerId
        }`;
        let customerData = await this.$http.put(customerLink, {
          userId: this.userId,
          fullName: {
            surname: this.surname,
            name: this.userName,
            patronymic: this.patronymic,
          },
        });
        this.$swal.fire({
          icon: 'success',
          title: `Ваши данные успешно изменены`,
        });
        this.$emit('pushEditCustomer');
      } catch (err) {
        if (err.response.status === 404) {
          let link = `${$URL}${this.$BASE_URL}/customers`;
          let responseCustomer = await this.$http.post(link, {
            userId: this.userId,
            fullName: {
              surname: this.surname,
              name: this.userName,
              patronymic: this.patronymic,
            },
          });
          this.$swal.fire({
            icon: 'success',
            title: `Ваши данные успешно добавлены`,
          });
          this.$emit('pushEditCustomer');
        }
      }
    },
  },
};
</script>

<style scoped>
.customRegister {
  background: none;
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