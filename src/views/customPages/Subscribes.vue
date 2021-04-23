<template>
   <div class="customHome">
    <loading :active.sync="isLoading" 
            :can-cancel="false" 
            
            color="#03FBF3"
            background-color="linear-gradient(180deg, #341f3d 0%, #110c18 100%)">
          </loading>
        <div class="chooseText">Выбор подписки</div>
        <div class="small">Купленная подписка автоматически активируется на следующий день после оплаты</div>
            <b-button-group v-for="(item, key) in data" :key="item.index" v-bind:style="{}" class="mx-1 subscBtnGroup">
              <b-btn class="subscrBtn" :style="{border:`1px solid rgba(11, 207, 201, ${0.4 + (key/4)})`}" @click="subscInfo(item)">{{item.days}} {{checkDays(item.days)}} </b-btn>
              <b-btn class="priceBtn" :style="{background:`rgba(11, 207, 201, ${0.4 + (key/4)})`, border:`rgba(11, 207, 201, ${0.4 + (key/3)})`}"  @click="subscInfo(item)">{{item.paymentAmount}} {{item.currency}}</b-btn>
            </b-button-group>

        <b-modal title="Подписка" class="subscModal" hide-footer v-model="modalShowSubsc" @ok="modalShowSubsc = false">
            <b-form>

              <div class="showSubscModal">
                <div class="subscDaysContainer">
                  <div class="subscDays">{{days}} {{daysText}}</div>
                  <div class="subscPayment">{{paymentAmount}} {{paymentValue}}</div>
                  
                </div>
                <div style="text-align:center;">
                  <div class="subscTitle">{{title}}</div>
                  <div class="subscDescription">{{description}}</div>
                </div>
                <b-btn class="buySubscBtn" @click.prevent="payForSubs">Оплатить</b-btn>
              </div>
             </b-form>
        </b-modal>


        </div>

  
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: 'Subscribes',
  components: {
    Loading,
  },
  data() {
    return {
      data: [],
      daysText: 'дней',
      modalShowSubsc: false,
      days: null,
      paymentAmount: null,
      paymentValue: null,
      description: null,
      title: null,
      subscriptionId: null,
      customerId: null,
      isLoading: true,
      noCustomer: true,
    };
  },
  created() {
    this.addSubscriptions();
  },
  methods: {
    async addSubscriptions() {
      try {
        let subscLink = `${$URL}${this.$BASE_URL}/subscriptions`;
        let responseSubsc = await this.$http.get(subscLink);

        let subscData = responseSubsc.data.page.data;
        this.data = subscData;
        this.isLoading = false;
      } catch (err) {
        this.isLoading = false;
      }
    },

    async subscInfo(item) {
      try {
        this.modalShowSubsc = true;
        this.days = item.days;
        this.paymentAmount = item.paymentAmount;
        this.paymentValue = item.currency;
        this.title = item.title;
        this.description = item.description;
        this.daysText = this.checkDays(item.days);
        this.subscriptionId = item.subscriptionId;
      } catch (err) {}
    },

    async getData() {
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

        this.customerId = responseUsers.data.page.data[0].customerId;
        this.noCustomer = false;
      } catch (err) {
        if (err.response.status === 404) {
          this.noCustomer = true;
          this.$swal.fire({
            icon: 'error',
            title: `Перед оплатой подписки необходимо заполнить профиль`,
          });
          this.modalShowSubsc = false;
        }
      }
    },

    async payForSubs() {
      try {
        await this.getData();
        if (!this.noCustomer) {
          let linkPayment = `${$URL}${this.$BASE_URL}/payments/alfaBank`;
          let response = await this.$http.post(linkPayment, {
            subscriptionId: this.subscriptionId,
            customerId: this.customerId,
            responseUrl: `${$URL}/#/home?status=ok`,
          });

          let urlPayment = response.data.checkoutUrl;
          window.open(urlPayment, '_self');
        }
      } catch (err) {}
    },
    checkDays: function(digit) {
      if (digit >= 5 && digit <= 20) {
        return 'дней';
      } else {
        let lastDigit = parseInt(
          digit.toString().substr(digit.toString().length - 1, 1)
        );
        if (lastDigit == 0) return 'дней';
        if (lastDigit == 1) return 'день';
        if (lastDigit > 1 && lastDigit < 5) return 'дня';
        if (lastDigit >= 5) return 'дней';
      }
    },
  },
};
</script>

<style>
.customHome {
  display: flex;
  flex-direction: column;

  align-items: center;
  width: 100%;
  height: 500px;
}
.chooseText {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  font-size: 34px;
  line-height: 22px;
  /* identical to box height, or 65% */
  margin-top: 30px;
  text-align: center;

  color: #ffffff;
}
.subscBtnGroup {
  width: 80%;
  margin-top: 40px;
}
.subscrBtn {
  border: 1px solid rgba(3, 251, 243, 0.4);
  box-sizing: border-box;
  border-radius: 8px 0px 0px 8px;
  background: none;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 120%;
  /* identical to box height, or 29px */
  width: 50%;
  height: 62px;
  text-align: center;

  color: #ffffff;
}
.priceBtn {
  /* background: rgba(11, 207, 201, 0.75); */
  border-radius: 0px 8px 8px 0px;
  border-color: rgba(11, 207, 201, 0.75);
  width: 50%;
  height: 62px;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 120%;
  /* identical to box height, or 29px */

  text-align: center;

  color: #ffffff;
}

.priceBtn:hover {
  color: #ffffff;
}

.subscrBtn:hover {
  color: white;
  background: #0bcfc9;
  box-shadow: 0px 0px 16px rgba(3, 251, 243, 0.3);
}

.small {
  margin-bottom: 40px;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 15px;
  /* identical to box height */
  margin-top: 20px;
  text-align: center;
  color: #ffffff;
  /* color: rgba(255, 255, 255, 0.3); */
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
  margin-bottom: 5px;
  padding: 5px;
  color: #0bcfc9;
}

.showSubscModal {
  display: flex;
  flex-direction: column;
  color: white;
  padding: 20px;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 120%;

  justify-content: center;
}
.subscDaysContainer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 20px;
  margin: 10px;
}

.buySubscBtn {
  background: linear-gradient(180deg, #03fbf3 0%, #00afaa 100%);
  box-shadow: none;
  height: 50px;
  border-radius: 8px;
  border-color: none !important;
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;
  color: white;
}

.subscTitle {
  margin-bottom: 20px;
  text-align: center;
}

.modal-body .btn-secondary {
  border-color: black;
}

.btn-secondary:focus {
  box-shadow: none;
}
.subscDescription {
  margin-bottom: 20px;
  text-align: justify;
}

@media screen and (max-width: 300px) {
  .subscBtnGroup {
    width: 100%;
  }
}
</style>