<template>
    <div style="touch-action: pan-y;">
        <div class="callsStory">Последние вызовы</div>
        
        <DataTable :data="items" :options="tableOptions" :columns="columns"/>
    </div>
</template>

<script>
import DataTable from '../tables/DataTable.vue';

export default {
  name: 'customerCalls',
  components: { DataTable },
  props: {
    items: Array,
  },
  data: () => {
    return {
      // items: [],
      columns: ['createdAt', 'reason', 'state.current'],
      tableOptions: {
        headings: {
          reason: 'Причина вызова',
          createdAt: 'Дата создания вызова',
          'state.current': 'Текущее состояние',
        },
        sortable: ['createdAt'],
        filterable: false,
        perPageValues: [],
        perPage: 5,
        pagination: {
          chunk: 5,
          edge: false,
          nav: 'scroll',
        },
        texts: {
          noResults: 'Нет записей',
        },
      },
    };
  },
};
</script>

<style scoped>
.callsStory {
  width: 100%;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 22px;
  /* identical to box height, or 137% */
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;

  color: #ffffff;
}

table .customTable {
  border: none !important;
  touch-action: pan-y;
}
</style>