<template>
   <div class="customHome">
     <div class="container"> 
       <div class="phone"> 048 7722773</div>
       
          <loading :active.sync="isLoading" 
            :can-cancel="false" 
            
            :is-full-page="fullPage"
            color="#03FBF3"
            background-color="linear-gradient(180deg, #341f3d 0%, #110c18 100%)">
          </loading>
        <div :class="[checkedCustomer ? 'around' : 'loading']">
          <AroundEllipse />
          <b-button :class="[noPayment ? 'ellipseBtn':'ellipseBtnActive' ]" @click.prevent="addUserId" :disabled="noPayment || check" block><div style="margin:-15px auto 0px">ДТП </div><div class="smallBtn">Вызов помощи</div></b-button>
       <!-- <b-button class="ellipseBtnActive" @click.prevent="addUserId" :disabled="noPayment || check" block><div style="margin:-15px auto 10px auto">ДТП </div><div class="smallBtn">Вызов помощи</div></b-button> -->
        
       <!-- <button :class="[noPayment ? 'ellipseBtn':'ellipseBtnActive' ]" @click.prevent="addUserId" :disabled="noPayment">ДТП <div class="smallBtn">Вызов о помощи</div></button> -->

         <div v-if="noPayment" class="wheelContainer">
           <div>
             <Wheel iconColor="#FF3939" v-if="!createdCustomer"/>
              <router-link
              to="/createCustomer"
               :class="[createdCustomer ? 'noCreate' : 'null']"
             >
              <div class="wheelText">
                Заполните данные
              </div>
              </router-link>
            </div>
            <div>
              <Wheel iconColor="#FFDF39"/>

                <router-link
                  to="/subscribes">
                  <div class="wheelText">
                  Оплатите подписку
                  </div>
                  </router-link>
            </div>
            <div >
              <Wheel iconColor="#03FBF3"/>
              
                <div class="wheelText">
                Наслаждайтесь спокойствием 
                <div style="display:inline; margin-left:35px">во время вождения</div>
                </div>
              
            </div>
      </div>
        </div>
     </div>
     
   </div>
</template>

<script>
import IconEllipse from '../components/icons/IconEllipse';
import AroundEllipse from '../components/icons/AroundEllipse';
import Wheel from '../components/icons/Wheel';
import IconPhone from '../components/icons/IconPhone';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: 'Home',
  components: {
    IconEllipse,
    AroundEllipse,
    Wheel,
    IconPhone,
    Loading,
  },
  data() {
    return {
      noPayment: true,
      userId: null,
      customerId: null,
      isLoading: true,
      fullPage: false,
      checkedCustomer: null,
      check: false,
      createdCustomer: null,
    };
  },
  created() {
    let status = this.$route.query.status;
    status === 'ok'
      ? this.$swal.fire({
          icon: 'success',
          title: `Оплата прошла успешно`,
        })
      : null;
    this.checkCustomer();
  },
  methods: {
    async checkCustomer() {
      try {
        let linkProfile = `${$URL}${this.$BASE_URL}/auth/profile`;
        let response = await this.$http.get(linkProfile);
        this.userId = response.data.userId;

        let conditions = encodeURIComponent(
          JSON.stringify({
            userId: this.userId,
          })
        );
        let usersLink = `${$URL}${
          this.$BASE_URL
        }/customers?conditions=${conditions}`;
        let responseUsers = await this.$http.get(usersLink);
        this.createdCustomer = true;
        this.customerId = responseUsers.data.page.data[0].customerId;

        let paymentHistory = responseUsers.data.page.data[0].paymentHistory;

        if (paymentHistory.length == 0) {
          this.noPayment = true;
          this.isLoading = false;
          this.checkedCustomer = true;
        }

        for (let index = paymentHistory.length - 1; index >= 0; index--) {
          if (paymentHistory[index].state === 'Активная') {
            this.noPayment = false;
            index = -1;
          } else {
            this.noPayment = true;
          }
        }

        this.checkedCustomer = true;
        this.isLoading = false;
      } catch (err) {
        this.noPayment = true;
        this.isLoading = false;
        this.checkedCustomer = true;
      }
    },
    async addUserId() {
      try {
        this.check = true;
        setTimeout(() => (this.check = false), 6000);
        let conditions = encodeURIComponent(
          JSON.stringify({
            userId: this.userId,
          })
        );
        let usersLink = `${$URL}${
          this.$BASE_URL
        }/customers?conditions=${conditions}`;
        let responseUsers = await this.$http.get(usersLink);
        let customerId = responseUsers.data.page.data[0].customerId;
        this.noPayment ? null : this.newCall(customerId);
      } catch (err) {
        console.log(err);
      }
    },
    async newCall(id) {
      try {
        let linkCall = `${$URL}${this.$BASE_URL}/calls`;
        let responseCall = await this.$http.post(linkCall, {
          customerId: id,
          reason: 'ДТП',
        });
        this.$swal.fire({
          icon: 'success',
          title: `Вызов успешно создан`,
        });
      } catch (err) {
        this.$swal.fire({
          icon: 'error',
          title: `Вызов не отправлен`,
        });
      }
    },
  },
};
</script>

<style scoped>
.customHome {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.phone {
  margin: 30px auto;
  width: 150px;
}
.loading {
  display: none;
}
.wheelContainer {
  display: flex;
  flex-direction: column;
  width: 250px;
  /* height: 200px; */
  height: 120px;
  margin: 30px auto;
  z-index: 100;
  touch-action: pan-y;
}

.noCreate {
  display: none;
}

.wheelText {
  display: inline;
  color: white;
}
.around {
  position: relative;
  top: 10px;
  height: 90%;
  margin-bottom: 20px;
}

.ellipseBtn {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  left: 50%;
  top: 25px;
  transform: translate(-50%, 25%);
  text-align: center;
  width: 160px;
  height: 160px;
  background: linear-gradient(
      145.7deg,
      rgba(193, 193, 193, 0.6) 8.9%,
      rgba(75, 75, 75, 0.6) 90.3%
    ),
    radial-gradient(
      50% 50% at 50% 50%,
      #5a5a5a 33.33%,
      #acacac 85.42%,
      #e3e3e3 100%
    );
  opacity: 0.9;
  box-shadow: 0px 0px 20px rgba(20, 14, 28, 0.5);
  border-radius: 50%;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: bold;
  font-size: 37px;
  /* line-height: 45px; */

  text-align: center;

  color: rgba(255, 255, 255, 0.3);
}

.ellipseBtnActive {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  left: 50%;
  top: 25px;
  transform: translate(-50%, 25%);
  text-align: center;
  width: 160px;
  height: 160px;
  background: linear-gradient(
      145.7deg,
      rgba(37, 255, 248, 0.6) 8.9%,
      rgba(0, 134, 130, 0.6) 90.3%
    ),
    radial-gradient(
      50% 50% at 50% 50%,
      #00b0ab 33.33%,
      #04dad3 85.42%,
      #03fbf3 100%
    );
  box-shadow: 0px 0px 20px rgba(3, 251, 243, 0.5);
  box-shadow: 0px 0px 20px rgba(3, 251, 243, 0.5);
  border-radius: 50%;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: bold;
  font-size: 37px;
  line-height: 45px;
  color: white;
}

.ellipseBtn:focus,
.ellipseBtnActive:focus {
  outline: none !important;
}
.smallBtn {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 15px;
  /* identical to box height */
  text-align: center;

  /* color: rgba(255, 255, 255, 0.3); */
}

.iconPhone {
  position: absolute;
  background: none;
  border: none;
  right: 3%;
  top: 0;
}
</style>