<template>
  <div class="app customContainerDefault">
    <div class="customContainerRouter ">
        
          <router-view></router-view>
        
    </div>
    <nav class="navbar fixed-bottom navbar-light bg-faded customFooterDefault ">
      
        <router-link
          to="/subscribes"
        >
          <IconVector class="iconNav" :iconColor="activeSubscribes"/>
        
        </router-link>
        <router-link
          to="/home"
        >
        
        <IconHome class="iconNav" :iconColor="activeHome"/>
        
        </router-link>
        <router-link
          to="/profile"
        >
        
          <IconUser class="iconNav" :iconColor="activeProfile"/>
        
      </router-link>
      
    </nav>
  </div>
</template>

<script>
import nav from '@/_nav';
import { Footer as TheFooter } from '@coreui/vue';
import IconHome from '../views/components/icons/IconHome';
import IconVector from '../views/components/icons/IconVector';
import IconUser from '../views/components/icons/IconUser';

export default {
  name: 'DefaultContainer',
  components: {
    TheFooter,
    IconHome,
    IconVector,
    IconUser,
  },
  data() {
    return {
      activeHome: '#0bcfc9',
      activeSubscribes: '#FFFFFF',
      activeProfile: '#FFFFFF',
    };
  },

  methods: {
    checkActive() {
      switch (this.$route.path) {
        case '/home':
          this.activeHome = '#03FBF3';
          this.activeSubscribes = '#FFFFFF';
          this.activeProfile = '#FFFFFF';
          break;
        case '/profile':
          this.activeProfile = '#03FBF3';
          this.activeSubscribes = '#FFFFFF';
          this.activeHome = '#FFFFFF';
          break;
        case '/subscribes':
          this.activeProfile = '#FFFFFF';
          this.activeSubscribes = '#03FBF3';
          this.activeHome = '#FFFFFF';
          break;
      }
    },
  },
  async beforeCreate() {
    try {
      // let link = `${$URL}${this.$BASE_URL}/auth/profile`;
      // let response = await this.$http.get(link);
      console.log('cont');
    } catch (err) {
      console.log(err);
      this.$router.push('/login');
    }
  },
  created() {
    this.checkActive();
    let preloaderEl = document.getElementById('preloader');
    preloaderEl.classList.add('hidden');
    preloaderEl.classList.remove('visible');
  },
  updated() {
    this.checkActive();
  },
  computed: {
    name() {
      return this.$route.name;
    },
    list() {
      return this.$route.matched.filter(
        route => route.name || route.meta.label
      );
    },
  },
};
</script>

<style>
.iconNav {
  opacity: 0.8;
}
.customContainerDefault {
  background: linear-gradient(
    180deg,
    #16101f 0%,
    #2b1f3c 44.91%,
    #2b1f3d 44.92%,
    #110c18 100%
  );
}

.customContainerRouter {
  display: flex;
  flex-direction: column;
  height: 85%;
}

.customFooterDefault {
  color: #0bcfc9;
  height: 15%;
  background: linear-gradient(180deg, #341f3d 0%, #110c18 100%);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 16px 16px 0px 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.VueTables .table-responsive {
  touch-action: pan-y;
}
.VueTables th,
.VueTables td,
.VueTables tr {
  touch-action: pan-y;
}
</style>