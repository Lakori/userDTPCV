<template>
  
    <b-table :dark="dark" :hover="hover" :striped="striped" :bordered="bordered" :small="small" :fixed="fixed" responsive="lg" :items="items" :fields="captions" :current-page="currentPage" :per-page="perPage">
     
    </b-table>
   
 
</template>

<script>
export default {
  name: 'c-table',
  inheritAttrs: false,
  props: {
    caption: {
      type: String,
      default: 'Table',
    },
    hover: {
      type: Boolean,
      default: false,
    },
    striped: {
      type: Boolean,
      default: false,
    },
    bordered: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
      default: false,
    },
    fixed: {
      type: Boolean,
      default: false,
    },
    tableData: {
      type: [Array, Function],
      default: () => [],
    },
    fields: {
      type: [Array, Object],
      default: () => [],
    },
    perPage: {
      type: Number,
      default: 5,
    },
    dark: {
      type: Boolean,
      default: false,
    },
  },
  data: () => {
    return {
      currentPage: 1,
    };
  },
  computed: {
    items: function() {
      const items = this.tableData;
      return Array.isArray(items) ? items : items();
    },
    totalRows: function() {
      return this.getRowCount();
    },
    captions: function() {
      return this.fields;
    },
  },
  methods: {
    getBadge(status) {
      return status === 'Active'
        ? 'success'
        : status === 'Inactive'
          ? 'secondary'
          : status === 'Pending'
            ? 'warning'
            : status === 'Banned' ? 'danger' : 'primary';
    },
    getRowCount: function() {
      return this.items.length;
    },
  },
};
</script>

<style>
table,
thead,
tr {
  border: none !important;
  color: white;
}
</style>