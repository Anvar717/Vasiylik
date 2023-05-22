<template>
  <b-card no-body>
    <div class="m-2">
      <b-row>
        <b-col
          cols="12"
          md="4"
          class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
        >
          <label>{{ $t("Entries") }}</label>
          <v-select
            v-model="filter.perPage"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :options="filter.perPageOptions"
            :clearable="false"
            @input="Refresh"
            class="per-page-selector d-inline-block ml-50 mr-1"
          />
          <b-button
            variant="primary"
            :to="{ name: 'EditHrRecallLeave', params: { id: 0 } }"
          >
            <feather-icon icon="PlusIcon"></feather-icon> {{ $t("create") }}
          </b-button>
        </b-col>
        <b-col md="2">
          <!-- <div>
            <custom-date-picker
              v-model="filter.StartDate"
              @keyup="StartDateValue"
              format="DD.MM.YYYY"
              type="date"
              :clearable="false"
              :placeholder="$t('StartDate')"
            >
            </custom-date-picker>
          </div> -->
        </b-col>
        <b-col md="2">
          <!-- <div>
            <custom-date-picker
              v-model="filter.EndDate"
              @keyup="EndDateValue"
              format="DD.MM.YYYY"
              type="date"
              :clearable="false"
              :placeholder="$t('EndDate')"
            >
            </custom-date-picker>
          </div> -->
        </b-col>
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
      no-border-collapse
      :busy="isBusy"
      show-empty
      :empty-text="$t('NotFound')"
      class="position-relative"
      @sort-changed="SortChange"
    >
      <template #cell(status)="{ item }">
        <b-badge
          :variant="
            item.statusid == 2
              ? 'light-success'
              : item.statusid == 3
              ? 'light-danger'
              : item.statusid == 48
              ? 'light-danger'
              : item.statusid == 49
              ? 'light-success'
              : 'light-primary'
          "
        >
          {{ item.status }}
        </b-badge>
      </template>
      <template #cell(actions)="{ item }">
        <div class="text-center">
          <b-link
            :to="{ name: 'EditHrRecallLeave', params: { id: item.id } }"
            v-b-tooltip.hover.top="$t('Edit')"
            v-if="$can('HrRecallLeaveEdit', 'permissions') && item.statusid !== 2"
            style="margin-right: 5px"
          >
            <feather-icon icon="EditIcon"></feather-icon>
          </b-link>
          <b-link
            @click="$refs['DeleteModal' + item.id].show()"
            v-b-tooltip.hover.top="$t('Delete')"
            v-if="$can('HrRecallLeaveDelete', 'permissions') && item.statusid !== 2"
            style="margin-right: 5px"
          >
            <feather-icon icon="Trash2Icon"></feather-icon>
          </b-link>
          <b-link
            :to="{ name: 'ViewHrRecallLeave', params: { id: item.id } }"
            v-b-tooltip.hover.top="$t('View')"
          >
            <feather-icon icon="EyeIcon"></feather-icon>
          </b-link>
        </div>
        <b-modal
          :ref="'DeleteModal' + item.id"
          :title="$t('Delete')"
          :cancel-title="$t('Cancel')"
          :ok-title="$t('Accept')"
          cancel-variant="danger"
          ok-variant="success"
          @ok="Delete(item)"
        >
          <b-card-text>
            <h5>ID : {{ item.id }}</h5>
            <h5>{{ $t("WantDelete") }}</h5>
          </b-card-text>
        </b-modal>
      </template>
      <template v-slot:table-busy>
        <div
          class="text-center text-primary my-2"
          style="vertical-align: middle"
        >
          <b-spinner class="align-middle mr-2"></b-spinner>
          <strong>{{ $t("Loading") }}</strong>
        </div>
      </template>
    </b-table>
    <div class="mx-2 mb-2">
      <b-row>
        <b-col
          cols="12"
          sm="6"
          class="
            d-flex
            align-items-center
            justify-content-center justify-content-sm-start
          "
        >
          <span class="text-muted"
            >{{ $t("Showing") }} {{ firstNumber }} {{ $t("to") }}
            {{ lastNumber }} {{ $t("of") }} {{ filter.totalRows }}
            {{ $t("entries") }}</span
          >
        </b-col>
        <!-- Pagination -->
        <b-col
          cols="12"
          sm="6"
          class="
            d-flex
            align-items-center
            justify-content-center justify-content-sm-end
          "
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
import {
  BButton,
  BPagination,
  BTable,
  BCol,
  BRow,
  BSpinner,
  BCard,
  BCardText,
  BModal,
  BLink,
  VBTooltip,
  BBadge,
  BInputGroup,
  BFormInput,
  BInputGroupAppend,
  BTabs,
  BTab,
} from "bootstrap-vue";
import HrRecallLeaveService from "@/services/document/hrrecallleave.service";
import CustomDatePicker from "@/views/components/customDatePicker.vue";
export default {
  components: {
    BButton,
    BPagination,
    BTable,
    BCol,
    BRow,
    BSpinner,
    BCard,
    BCardText,
    BModal,
    BLink,
    VBTooltip,
    BBadge,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BTabs,
    BTab,
    CustomDatePicker,
  },
  directives: {
    "b-tooltip": VBTooltip,
  },
  data() {
    return {
      items: [],
      fields: [
        {
          key: "docdate",
          label: this.$t("docdate"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "docnumber",
          label: this.$t("docnumber"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "detailinfo",
          label: this.$t("detailinfo"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "status",
          label: this.$t("status"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "actions",
          label: this.$t("actions"),
          thClass: "text-center",
          tdClass: "text-center",
        },
      ],
      filter: {
        Search: "",
        SortColumn: "",
        OrderType: "asc",
        PageNumber: 1,
        PageLimit: 20,
        perPage: 20,
        currentPage: 1,
        perPageOptions: [10, 20, 50, 100],
        totalRows: 0,
      },
      isBusy: false,
    };
  },
  computed: {
    firstNumber() {
      return (this.filter.currentPage - 1) * this.filter.perPage + 1;
    },
    lastNumber() {
      if (this.filter.totalRows < this.filter.perPage) {
        return this.filter.totalRows;
      } else {
        if (
          this.filter.currentPage * this.filter.perPage >
          this.filter.totalRows
        ) {
          return this.filter.totalRows;
        } else {
          return this.filter.currentPage * this.filter.perPage;
        }
      }
    },
  },
  created() {
    // if (
    //   !!this.$route.query.StartDate ||
    //   !!this.$route.query.EndDate ||
    //   !!this.$route.query.Search ||
    //   !!this.$route.query.pagelimit
    // ) {
    //   this.filter.StartDate = this.$route.query.StartDate;
    //   this.filter.EndDate = this.$route.query.EndDate;
    //   this.filter.Search = this.$route.query.Search;
    //   this.filter.PageLimit = this.$route.query.pagelimit;
    // }
    // this.createDate();
    this.Refresh();
  },
  methods: {
    // createDate() {
    //   var todaydate = new Date();
    //   var dd = String(todaydate.getDate()).padStart(2, "0");
    //   var mm = String(todaydate.getMonth() + 1).padStart(2, "0");
    //   var yyyy = todaydate.getFullYear();
    //   this.filter.StartDate = "01.01.2020";
    //   this.filter.EndDate = dd + "." + mm + "." + yyyy;
    // },
    // StartDateValue(value) {
    //   this.filter.StartDate = value;
    // },
    EndDateValue(value) {
      this.filter.EndDate = value;
    },
    SortChange(data) {
      this.filter.SortColumn = data.sortBy;
      this.filter.OrderType = data.sortDesc ? "desc" : "asc";
      this.Refresh();
    },
    Refresh() {
      this.isBusy = true;
      HrRecallLeaveService.GetList(
        this.filter.Search,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit,
        this.filter.currentPage,
        this.filter.perPage
      ).then((res) => {
        this.items = res.data.rows;
        this.filter.totalRows = res.data.total;
        this.isBusy = false;
      });
    },
    Delete(item) {
      this.DeleteLoading = true;
      HrRecallLeaveService.Delete(item.id)
        .then((res) => {
          this.DeleteLoading = false;
          this.Refresh();
          this.$makeToast(this.$t("DeleteSuccess"), "success");
        })
        .catch((error) => {
          this.$makeToast(error.response.data.error, "danger");
          this.DeleteLoading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}

.invoice-filter-select {
  min-width: 190px;

  ::v-deep .vs__selected-options {
    flex-wrap: nowrap;
  }

  ::v-deep .vs__selected {
    width: 100px;
  }
}
</style>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>
 