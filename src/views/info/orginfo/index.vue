<template>
  <b-card no-body>
    <div class="m-2">
      <b-row>
        <b-col
          cols="12"
          md="6"
          class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
        >
          <label>{{ $t('Entries') }}</label>
          <v-select
            v-model="filter.perPage"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :options="filter.perPageOptions"
            :clearable="false"
            @input="Refresh"
            class="per-page-selector d-inline-block ml-50 mr-1"
          />
          <!-- <b-button
            variant="primary"
            :to="{ name: 'Editorginfo',params : {id : 0}}"
          >
            <feather-icon icon="PlusIcon"></feather-icon> {{ $t('create') }}
          </b-button> -->
        </b-col>
        <b-col md="2"></b-col>
        <b-col cols="12" md="4">
          <b-input-group class="text-right">
            <b-form-input v-model="filter.Search" :placeholder="$t('search')" />
            <b-input-group-append>
              <b-button @click="Refresh" variant="primary">
                <feather-icon icon="SearchIcon" />
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-col>
      </b-row>
    </div>

    <b-table
      ref="refInvoiceListTable"
      :items="items"
      responsive
      :fields="fields"
      primary-key="id"
      sticky-header="65vh"
      striped
      no-border-collapse
      :busy="isBusy"
      show-empty
      :empty-text="$t('NotFound')"
      class="position-relative"
      @sort-changed="SortChange"
    >
      <template #cell(status)="{ item }">
        <b-badge
          :variant="item.status == 'Утвержден' ? 'light-success' : item.status == 'Изменен' ? 'light-info' : item.status == 'Отменено' ? 'light-danger' : 'light-primary'"
        >
          {{ item.status }}
        </b-badge>
      </template>
      <template #cell(electricity)="{ item }">
        <b-badge
          :variant="item.electricity ? 'light-success' : 'light-danger'"
        >
          {{ item.electricity ? item.electricitytype : $t('no') }}
        </b-badge>
      </template>
      <template #cell(internetconnection)="{ item }">
        <b-badge
          :variant="item.internetconnection ? 'light-primary' : 'light-danger'"
        >
          {{ item.internetconnection ? item.internetconnectiontype : $t('no') }}
        </b-badge>
      </template>
      <template #cell(mobilecoverage)="{ item }">
        <b-badge
          :variant="item.mobilecoverage ? 'light-success' : 'light-danger'"
        >
          {{ item.mobilecoverage ? item.mobilecoveragetype : $t('no') }}
        </b-badge>
      </template>
      <template #cell(connectivityspeed)="{ item }">
          {{ item.connectivityspeed == '' ? 0 : item.connectivityspeed }}
      </template>
      <template #cell(coordinates)="{ item }">
        <div style="min-width: 120px">
          lat : {{ item.latitude }} <br>
          lng : {{  item.longitude }}
        </div>
      </template>
      <template #cell(actions)="{ item }">
        <div class="text-center">
          <b-link :to="{ name: 'Editorginfo',params : {id : item.id}}"  v-b-tooltip.hover.top="$t('Edit')" style="margin-right : 5px">
            <feather-icon icon="EditIcon"></feather-icon>
          </b-link>
          <b-link @click="$refs['DeleteModal'+item.id].show()" v-b-tooltip.hover.top="$t('Delete')">
            <feather-icon icon="Trash2Icon"></feather-icon>
          </b-link>
        </div>
        <b-modal
          :ref="'DeleteModal'+item.id"
          :title="$t('Delete')"
          :cancel-title="$t('Cancel')"
          :ok-title="$t('Accept')"
          cancel-variant="danger"
          ok-variant="success"
          @ok="Delete(item)"
        >
          <b-card-text>
            <h5> ID :  {{ item.id }} </h5>
            <h5> {{ $t('WantDelete') }} </h5>
          </b-card-text>
        </b-modal>
      </template>
      <template v-slot:table-busy>
        <div
          class="text-center text-primary my-2"
          style="vertical-align: middle"
        >
          <b-spinner class="align-middle mr-2"></b-spinner>
          <strong>{{$t('Loading')}}</strong>
        </div>
      </template>
    </b-table>
    <div class="mx-2 mb-2">
      <b-row>
        <b-col
          cols="12"
          sm="6"
          class="d-flex align-items-center justify-content-center justify-content-sm-start"
        >
          <span class="text-muted"
            >{{$t('Showing')}} {{ firstNumber }} {{$t('to')}} {{ lastNumber }} {{$t('of')}}
            {{ filter.totalRows }} {{$t('entries')}}</span
          >
        </b-col>
        <!-- Pagination -->
        <b-col
          cols="12"
          sm="6"
          class="d-flex align-items-center justify-content-center justify-content-sm-end"
        >
          <b-pagination
            v-model="filter.currentPage"
            :total-rows="filter.totalRows"
            :per-page="filter.perPage"
            first-number
            last-number
            @input="Refresh"
            class="mb-0 mt-1 mt-sm-0"
            prev-class="prev-item"
            next-class="next-item"
          >
            <template #prev-text>
              <feather-icon icon="ChevronLeftIcon" size="18" />
            </template>
            <template #next-text>
              <feather-icon icon="ChevronRightIcon" size="18" />
            </template>
          </b-pagination>
        </b-col>
      </b-row>
    </div>
  </b-card>
</template>

<script>
import { BButton, BPagination, BTable, BCol, BRow, BSpinner, BCard, BTooltip, BBadge, BInputGroup, BFormInput, BInputGroupAppend,VBTooltip,BModal,VBModal,BCardText, BLink } from 'bootstrap-vue'
import OrgInfoService from '@/services/info/orginfo.service'
export default {
  components : {
    BButton, BPagination, BTable, BCol, BRow, BSpinner, BCard, BTooltip, BBadge, BInputGroup, BFormInput, BInputGroupAppend,BModal,BCardText, BLink
  },
  directives: {
    'b-tooltip': VBTooltip,
    'b-modal': VBModal
  },
  data() {
    return {
      items: [],
      fields: [
        {
          key: "number",
          label: this.$t('number'),
          class: "text-center",
          sortable: true,
        },
        {
          key: "oblastname",
          label: this.$t('Oblast'),
          class: "text-center",
          sortable: true,
        },
        {
          key: "regionname",
          label: this.$t('Region'),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "organizationname",
          label: this.$t('Organization'),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "inn",
          label: this.$t('inn'),
          class: "text-center",
          sortable: true,
        },
        {
          key: "sector",
          label: this.$t('sector'),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "educationlevel",
          label: this.$t('educationlevel'),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "computersrooms",
          label: this.$t('computersrooms'),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "electricity",
          label: this.$t('electricity'),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "internetconnection",
          label: this.$t('internetconnection'),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "mobilecoverage",
          label: this.$t('mobilecoverage'),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "connectivityspeed",
          label: this.$t('connectivityspeed'),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "coordinates",
          label: this.$t('coordinates'),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        // {
        //   key: "actions",
        //   label: this.$t('actions'),
        //   thClass: "text-center",
        //   sortable: true,
        // },
      ],
      filter: {
        Search: "",
        Sort: "",
        Order: "asc",
        perPage: 20,
        currentPage: 1,
        perPageOptions: [10, 20, 50, 100],
        totalRows : 0
      },
      isBusy: false,
    };
  },
  computed : {
    firstNumber() {
      return (this.filter.currentPage - 1) * this.filter.perPage + 1;
    },
    lastNumber() {
      if (this.filter.totalRows < this.filter.perPage) {
        return this.filter.totalRows;
      } else {
        if (this.filter.currentPage * this.filter.perPage > this.filter.totalRows) {
          return this.filter.totalRows;
        } else {
          return this.filter.currentPage * this.filter.perPage;
        }
      }
    },
  },
  created() {
    this.Refresh();
  },
  methods: {
    SortChange(data) {
      this.filter.Sort = data.sortBy;
      this.filter.Order = data.sortDesc ? "desc" : "asc";
      this.Refresh();
    },
    Refresh() {
      this.isBusy = true;
      OrgInfoService.GetList(
        this.filter.Search,
        this.filter.Sort,
        this.filter.Order,
        this.filter.currentPage,
        this.filter.perPage
      ).then((res) => {
        this.items = res.data.rows;
        this.filter.totalRows = res.data.total
        this.isBusy = false;
      });
    },
    Delete(item){
      this.DeleteLoading = true
      OrgInfoService.Delete(item.id).then(res => {
        this.DeleteLoading = false
        this.Refresh()
        this.$makeToast(this.$t('DeleteSuccess'),'success')
      }).catch(error => {
        this.$makeToast(error.response.data.error,'danger')
        this.DeleteLoading = false
      })
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
