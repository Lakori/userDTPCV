<template>
     <v-client-table 
            :columns="columns" 
            :data="data" 
            :options="options" 
            :theme="theme" 
            id="dataTable"
        >
     </v-client-table>
</template>


<script>
import Vue from 'vue';
import { ClientTable, Event } from 'vue-tables-2';

Vue.use(ClientTable);
export default {
  name: 'DataTable',
  components: {
    ClientTable,
    Event,
  },
  props: {
    headerText: String,
    data: Array,
    options: {
      headings: Object,
      sortable: Array,
      filterable: Array,
      sortIcon: Object,
      pagination: Object,
      columns: Array,
    },
    columns: Array,
  },
  data: function() {
    return {
      useVuex: false,
      theme: 'bootstrap4',
      template: 'default',
    };
  },
};
</script>

<style>
.VuePagination {
  justify-content: center;
  margin: 0;
}

.page-link {
  color: #0bcfc9;
}

.page-item.active .page-link {
  background-color: #0bcfc9;
  border-color: #0bcfc9;
}

.table-hover tbody tr:hover {
  color: white;
  background-color: none;
}

.table {
  color: white;
}

.table-bordered th,
.table-bordered td {
  border: none !important;
}

.table th,
.table td {
  border: none !important;
  text-align: center;
}
</style>