<template>
    <div class="containerProfile">
      <EditCustomer v-if="editCustomer" :userId="userId" :customerId="customerId" :fullName="fullName" v-on:pushEditCustomer="editedCustomer"/>
      <div v-if="!editCustomer" style="width:90%">
        <div class="navIcons">
         <div @click="editCustomer = true" style="display:inline; cursor:pointer;" >
            <IconEdit style="margin-right:8px;"/>
         </div>
          
            <div style="display:inline; cursor:pointer;" @click="logout">
              <IconExit />
            </div>
            
        </div>
        <div class="mainText">Профиль</div>
        <div class="profileAvatar">
            <Avatar />
            <div class="profileText">{{fullName.surname}} {{fullName.name}} {{fullName.patronymic}}
                <div class="profileTel">
                    
                </div>
            </div>
        </div>
        <div class="mainButtonsContainer">
          <b-button-group class="mx-1 mainButtons" >
            <b-btn class="calls" :class="[activeCalls ? activeClass : '']" @click="checkCustomer">Вызовы</b-btn>
            <b-btn class="subscribes" :class="[activeSubscr ? activeClass : '']" @click="checkCustomersPayment">Подписки</b-btn>
          </b-button-group>
        </div>
        <div class="tablesContainer">
          <CustomerCalls class="callTable" v-if="activeCalls" :items="calls"/>
          <CustomerSubscribes v-if="activeSubscr"  class="callTable" :items="subscribes"/>
        </div>
        
      </div>
    </div>
</template>

<script>
import IconExit from '../components/icons/IconExit';
import IconEdit from '../components/icons/IconEdit';
import Avatar from '../components/icons/Avatar';
import CustomerSubscribes from '../components/CustomerSubscribes';
import CustomerCalls from '../components/CustomerCalls';
import EditCustomer from '../components/EditCustomer';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: 'UserProfile',
  components: {
    IconExit,
    IconEdit,
    Avatar,
    CustomerSubscribes,
    CustomerCalls,
    EditCustomer,
    Loading,
  },
  data() {
    return {
      fullName: {},
      activeCalls: false,
      activeSubscr: false,
      activeClass: 'activeClass',
      editCustomer: false,
      userId: null,
      customerId: null,
      calls: [],
      subscribes: [],
      createdDone: false,
      isLoading: true,
    };
  },
  watch: {
    createdDone() {
      this.addCalls();
    },
  },
  created() {
    this.getData();
  },
  methods: {
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
        let dataUsers = responseUsers.data.page.data[0].fullName;
        this.customerId = responseUsers.data.page.data[0].customerId;

        this.fullName = dataUsers;
        this.createdDone = true;
      } catch (err) {
        console.log(err);
        this.isLoading = false;
      }
    },
    editedCustomer() {
      this.editCustomer = false;
      this.getData();
    },
    checkCustomer() {
      this.createdDone ? this.addCalls() : null;
    },
    checkCustomersPayment() {
      this.createdDone ? this.showSubscribes() : null;
    },
    async addCalls() {
      try {
        this.activeCalls = true;
        this.calls = [];
        this.activeSubscr = false;
        this.activeCalls = true;
        let conditions = encodeURIComponent(
          JSON.stringify({
            customerId: this.customerId,
          })
        );
        let link = `${$URL}${this.$BASE_URL}/calls?conditions=${conditions}`;
        let response = await this.$http.get(link);
        let respCalls = response.data.page.data;
        respCalls.map(item => {
          item.createdAt = new Date(item.createdAt).toLocaleString();
        });

        this.calls = respCalls;
        this.isLoading = false;
      } catch (err) {
        this.calls = [];
        this.isLoading = false;
      }
    },
    async logout() {
      try {
        let link = `${$URL}${this.$BASE_URL}/auth/signout`;
        let response = await this.$http.get(link);
        this.$router.push('/landing');
      } catch (err) {
        console.log(err);
      }
    },
    async showSubscribes() {
      try {
        this.subscribes = [];
        this.activeCalls = false;
        this.activeSubscr = true;
        let conditions = encodeURIComponent(
          JSON.stringify({
            userId: this.userId,
          })
        );
        let usersLink = `${$URL}${
          this.$BASE_URL
        }/customers?conditions=${conditions}`;

        let responseUsers = await this.$http.get(usersLink);
        let usersPayments = responseUsers.data.page.data[0].paymentHistory;
        let subscArr = [];
        for (let payment in usersPayments) {
          if (usersPayments[payment].status === 'approved') {
            await this.addData(usersPayments[payment], subscArr);
          }
        }
        this.subscribes = subscArr;
      } catch (err) {
        this.subscribes = [];
      }
    },
    async addData(item, subscArr) {
      try {
        let subscriptionId = item.subscriptionId;
        let subscLink = `${$URL}${
          this.$BASE_URL
        }/subscriptions/${subscriptionId}`;
        let responseSubscription = await this.$http.get(subscLink);
        let subscriptionInfo = responseSubscription.data;
        let title = subscriptionInfo.title;
        let expDate = new Date(item.expiredAt).toLocaleString();
        let subscInf = {
          title: title,
          state: item.state,

          expDate: expDate,
        };
        subscArr.unshift(subscInf);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style>
.containerProfile {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.navIcons {
  position: absolute;
  right: 5%;
  top: 3%;
}

.mainText {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  font-size: 34px;
  line-height: 22px;
  /* identical to box height, or 65% */

  text-align: center;
  margin-top: 100px;
  color: #ffffff;
}

.profileAvatar {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  margin-top: 40px;
}

.profileText {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 120%;
  /* or 24px */
  width: 60%;

  color: #ffffff;
}

.profileTel {
  margin-top: 10px;
  font-size: 16px;
}

.calls {
  /* background: #0bcfc9; */

  background: none;
  border-color: #0bcfc9;
  box-shadow: 0px 0px 8px rgba(3, 251, 243, 0.35);
  border-radius: 8px 0px 0px 8px;
  /* width: 172px; */
  height: 34px;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  /* identical to box height, or 137% */

  text-align: center;

  color: #ffffff;
}

.subscribes {
  background: none;
  border: 1px solid #0bcfc9;
  box-sizing: border-box;
  box-shadow: 0px 0px 8px rgba(3, 251, 243, 0.35);
  border-radius: 0px 8px 8px 0px;
  /* width: 172px; */
  height: 34px;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  /* identical to box height, or 137% */

  text-align: center;

  color: #ffffff;
}

.tablesContainer {
  display: flex;
  height: 100%;
  margin-bottom: 25%;
  touch-action: pan-y;
}
.calls:hover,
.subscribes:hover,
.activeClass,
.calls:active,
.subscribes:active {
  background: #0bcfc9 !important;
  color: #ffffff !important;
  border-color: #0bcfc9 !important;
}

.btn-secondary:focus {
  box-shadow: none !important;
}
.mainButtonsContainer {
  width: 100%;
  display: flex;
}
.mainButtons {
  margin-top: 30px;
  width: 100%;
}

.callTable {
  width: 100%;
}

.text-center .pagination {
  margin: 0 auto;
  justify-content: center;
}
@media screen and (max-width: 600px) {
  .mainButtonsContainer {
    width: 100%;
    margin: 10px auto;
  }

  .mainButtons {
    width: 100%;
    justify-content: center;
  }

  .callTable {
    width: 100%;
    margin: 10px auto;
  }

  .profileAvatar {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .profileText {
    margin-top: 10px;
  }
}
</style>
