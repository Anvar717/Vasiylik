<template>
  <b-card no-body>
    <div class="m-2">
      <b-row>
        <b-col
          cols="12"
          md="6"
          class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
        >
          <label>{{ $t("Entries") }}</label>
          <v-select
            v-if="tabIndex == 0"
            v-model="filter.perPage"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :options="filter.perPageOptions"
            :clearable="false"
            @input="Refresh"
            class="per-page-selector d-inline-block ml-50 mr-1"
          />
          <v-select
            v-if="tabIndex == 1"
            v-model="filter2.perPage"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :options="filter2.perPageOptions"
            :clearable="false"
            @input="ChangeChildUnderGuardianShip"
            class="per-page-selector d-inline-block ml-50 mr-1"
          />
          <!-- <b-button
            variant="primary"
            v-if="tabIndex == 0"
            :to="{ name: 'EditChildMonitoring', params: { id: 0 } }"
          >
            <feather-icon icon="PlusIcon"></feather-icon> {{ $t("create") }}
          </b-button> -->
        </b-col>
        <b-col md="2"> </b-col>
        <b-col cols="12" md="4">
          <b-input-group class="text-right">
            <b-form-input
              v-if="tabIndex == 0"
              v-model="filter.Search"
              :placeholder="$t('search')"
            />
            <b-form-input
              v-if="tabIndex == 1"
              v-model="filter2.search"
              :placeholder="$t('search')"
            />
            <b-input-group-append>
              <b-button v-if="tabIndex == 0" @click="Refresh" variant="primary">
                <feather-icon icon="SearchIcon" />
              </b-button>
              <b-button
                v-if="tabIndex == 1"
                @click="ChangeChildUnderGuardianShip"
                variant="primary"
              >
                <feather-icon icon="SearchIcon" />
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="mt-2">
          <b-tabs pills v-model="tabIndex">
            <b-tab @click="Refresh" :title="$t('ThoseMonitoring')"></b-tab>
            <b-tab @click="ChangeChildUnderGuardianShip" :title="$t('All')">
            </b-tab>
          </b-tabs>
        </b-col>
      </b-row>
    </div>

    <b-table
      ref="refInvoiceListTable"
      :items="items"
      responsive
      :fields="tabIndex == 0 ? fields1 : fields2"
      primary-key="id"
      sticky-header="65vh"
      no-border-collapse
      :busy="isBusy"
      show-empty
      :empty-text="$t('NotFound')"
      class="position-relative"
      @sort-changed="tabIndex == 0 ? SortChange : SortChange2"
    >
      <template #cell(statusname)="{ item }">
        <b-badge
          :variant="
            item.statusid == 2
              ? 'light-success'
              : item.statusid == 1
              ? 'light-primary'
              : item.statusid == 3
              ? 'light-danger'
              : 'light-success'
          "
        >
          {{ item.statusname }}
        </b-badge>
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
      <template #cell(actions)="{ item }">
        <div class="text-center">
          <b-link
            :to="{
              name: 'EditChildMonitoring',
              params: { id: 0 },
              query: { childUnderGuardianshipId: item.id },
            }"
            v-b-tooltip.hover.top="$t('create')"
            @click="ChangeCreate"
            v-if="tabIndex == 1 && item.statusid == 2"
            style="margin-right: 5px"
          >
            <feather-icon icon="PlusIcon"></feather-icon>
          </b-link>
          <b-link
            :to="{ name: 'EditChildMonitoring', params: { id: item.id } }"
            v-b-tooltip.hover.top="$t('Edit')"
            style="margin-right: 5px"
            v-if="
              $can('ChildMonitoringEdit', 'permissions') && item.statusid !== 2
            "
          >
            <feather-icon icon="EditIcon"></feather-icon>
          </b-link>
          <!-- <b-link
            @click="$refs['CancelModal' + item.id].show()"
            v-b-tooltip.hover.top="$t('CancelApproval')"
            v-if="$can('ChildMonitoringCancelApproval', 'permissions')"
            style="margin-right: 5px"
          >
            <feather-icon icon="XCircleIcon"></feather-icon>
          </b-link> -->
          <b-link
            :to="{
              name:
                tabIndex == 0
                  ? 'ViewChildMonitoring'
                  : 'ChildUnderGuardianshipView',
              params: { id: item.id },
            }"
            v-b-tooltip.hover.top="$t('View')"
            style="margin-right: 5px"
          >
            <feather-icon icon="EyeIcon"></feather-icon>
          </b-link>
          <b-link
            @click="$refs['DeleteModal' + item.id].show()"
            v-b-tooltip.hover.top="$t('Delete')"
            v-if="
              $can('ChildMonitoringDelete', 'permissions') &&
              item.statusid !== 2
            "
          >
            <feather-icon icon="Trash2Icon"></feather-icon>
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
        <b-modal
          :ref="'ApproveModal' + item.id"
          :title="$t('Approve')"
          :cancel-title="$t('Cancel')"
          :ok-title="$t('Accept')"
          cancel-variant="danger"
          ok-variant="success"
          @ok="Approve(item)"
        >
          <b-card-text>
            <!-- <h5> {{ $t('admissiontype') }} :  {{ item.admissiontypename }} </h5> -->
            <h5>{{ $t("WantApprove") }}</h5>
          </b-card-text>
        </b-modal>
        <b-modal
          :ref="'CancelModal' + item.id"
          :title="$t('Approve')"
          :cancel-title="$t('Cancel')"
          :ok-title="$t('Accept')"
          cancel-variant="danger"
          ok-variant="success"
          @ok="CancelApprove(item)"
        >
          <b-card-text>
            <!-- <h5> {{ $t('admissiontype') }} :  {{ item.admissiontypename }} </h5> -->
            <h5>{{ $t("WantCancel") }}</h5>
          </b-card-text>
        </b-modal>
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
          <span v-if="tabIndex == 0" class="text-muted"
            >{{ $t("Showing") }} {{ firstNumber }} {{ $t("to") }}
            {{ lastNumber }} {{ $t("of") }} {{ filter.totalRows }}
            {{ $t("entries") }}</span
          >
          <span v-if="tabIndex == 1" class="text-muted"
            >{{ $t("Showing") }} {{ firstNumber2 }} {{ $t("to") }}
            {{ lastNumber2 }} {{ $t("of") }} {{ filter2.totalRows }}
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
            v-if="tabIndex == 0"
          >
            <template #prev-text>
              <feather-icon icon="ChevronLeftIcon" size="18" />
            </template>
            <template #next-text>
              <feather-icon icon="ChevronRightIcon" size="18" />
            </template>
          </b-pagination>
          <b-pagination
            v-model="filter2.currentPage"
            :total-rows="filter2.totalRows"
            :per-page="filter2.perPage"
            first-number
            last-number
            @input="ChangeChildUnderGuardianShip"
            class="mb-0 mt-1 mt-sm-0"
            prev-class="prev-item"
            next-class="next-item"
            v-if="tabIndex == 1"
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
  BLink,
  BRow,
  BSpinner,
  BCard,
  BTooltip,
  BModal,
  BBadge,
  BInputGroup,
  BCardText,
  BFormInput,
  BInputGroupAppend,
  VBTooltip,
  BTabs,
  BTab,
} from "bootstrap-vue";
import ChildMonitoringService from "@/services/document/childmonitoring.service";
import ChildUnderGuardianshipService from "@/services/document/childunderguardianship.service";
export default {
  components: {
    BButton,
    BPagination,
    BTable,
    BCol,
    BCardText,
    BRow,
    BSpinner,
    BCard,
    BModal,
    BTooltip,
    BLink,
    BBadge,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BTabs,
    BTab,
  },
  directives: {
    "b-tooltip": VBTooltip,
  },
  data() {
    return {
      items: [],
      fields1: [
        {
          key: "id",
          label: this.$t("id"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "oblastname",
          label: this.$t("Oblast"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "regionname",
          label: this.$t("regionname"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "docdate",
          label: this.$t("MonitoringDate"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "personname",
          label: this.$t("personname"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "livingconditionname",
          label: this.$t("livingcondition"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "monitoringpersonname",
          label: this.$t("monitoringpersonname"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "pensionamount",
          label: this.$t("pensionamount"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "upcomingmonitoringdate",
          label: this.$t("upcomingmonitoringdate"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "statusname",
          label: this.$t("statusname"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "actions",
          label: this.$t("actions"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
      ],
      fields2: [
        {
          key: "id",
          label: this.$t("id"),
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
          key: "guardianname",
          label: this.$t("guardianname"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "childrenname",
          label: this.$t("childrenname"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "decisionsdate",
          label: this.$t("decisionsdate"),
          tdClass: "text-center",
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "lastmonitoringdate",
          label: this.$t("lastmonitoringdate"),
          tdClass: "text-center",
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "nextmonitoringdate",
          label: this.$t("nextmonitoringdate"),
          tdClass: "text-center",
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "decisionsorgname",
          label: this.$t("decisionsorg"),
          tdClass: "text-center",
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "decisiontext",
          label: this.$t("decisiontext"),
          tdClass: "text-center",
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "guardianshiptypename",
          label: this.$t("guardianshiptype"),
          tdClass: "text-center",
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "invalidtypename",
          label: this.$t("invalidtype"),
          tdClass: "text-center",
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "statusname",
          label: this.$t("statusname"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "actions",
          label: this.$t("actions"),
          thClass: "text-center",
          sortable: true,
        },
      ],
      filter: {
        StartDate: "",
        EndDate: "",
        Search: "",
        SortColumn: "",
        OrderType: "asc",
        perPage: 20,
        currentPage: 1,
        statusid: 0,
        perPageOptions: [10, 20, 50, 100],
        totalRows: 0,
      },
      filter2: {
        statusId: 0,
        childName: "",
        guardianName: "",
        search: "",
        SortColumn: "",
        OrderType: "asc",
        perPage: 20,
        currentPage: 1,
        perPageOptions: [10, 20, 50, 100],
        totalRows: 0,
      },
      isBusy: false,
      tabIndex: 0,
    };
  },
  computed: {
    firstNumber() {
      return (this.filter.currentPage - 1) * this.filter.perPage + 1;
    },
    firstNumber2() {
      return (this.filter2.currentPage - 1) * this.filter2.perPage + 1;
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
    lastNumber2() {
      if (this.filter2.totalRows < this.filter2.perPage) {
        return this.filter2.totalRows;
      } else {
        if (
          this.filter2.currentPage * this.filter2.perPage >
          this.filter2.totalRows
        ) {
          return this.filter2.totalRows;
        } else {
          return this.filter2.currentPage * this.filter2.perPage;
        }
      }
    },
  },
  created() {
    this.Refresh();
  },
  methods: {
    SortChange(data) {
      this.filter.SortColumn = data.sortBy;
      this.filter.OrderType = data.sortDesc ? "desc" : "asc";
      this.Refresh();
    },
    SortChange2(data) {
      this.filter2.SortColumn = data.sortBy;
      this.filter2.OrderType = data.sortDesc ? "desc" : "asc";
      this.ChangeChildUnderGuardianShip();
    },
    Refresh() {
      this.isBusy = true;
      ChildMonitoringService.GetList(
        this.filter.StartDate,
        this.filter.EndDate,
        this.filter.Search,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.currentPage,
        this.filter.perPage
      ).then((res) => {
        this.items = res.data.rows;
        this.filter.totalRows = res.data.total;
        this.isBusy = false;
      });
    },
    ChangeChildUnderGuardianShip() {
      this.isBusy = true;
      ChildUnderGuardianshipService.GetList(
        this.filter2.statusId,
        this.filter2.childName,
        this.filter2.guardianName,
        this.filter2.search,
        this.filter2.SortColumn,
        this.filter2.OrderType,
        this.filter2.currentPage,
        this.filter2.perPage
      ).then((res) => {
        this.items = res.data.resutl.rows;
        this.filter.totalRows = res.data.resutl.total;
        this.isBusy = false;
      });
    },
    // ChangeCreate() {
    //   this.isBusy = true;
    //   ChildMonitoringService.Get(
    //     this.$route.params.id,
    //     this.childUnderGuardianshipId
    //   ).then((res) => {
    //     this.items = res.data.resutl.rows;
    //     this.filter.totalRows = res.data.resutl.total;
    //     this.isBusy = false;
    //   });
    // },
    Approve(item) {
      this.ApproveLoading = true;
      ChildMonitoringService.Approve(item.id)
        .then((res) => {
          this.ApproveLoading = false;
          this.Refresh();
          this.$makeToast(this.$t("ApproveSuccess"), "success");
        })
        .catch((error) => {
          this.ApproveLoading = false;
          this.$makeToast(error.response.data.error, "danger");
        });
    },
    CancelApprove(item) {
      this.CancelApproveLoading = true;
      ChildMonitoringService.CancelApproval(item.id)
        .then((res) => {
          this.CancelLoading = false;
          this.Refresh();
          this.$makeToast(this.$t("CancelApprovalSuccess"), "success");
        })
        .catch((error) => {
          this.CancelLoading = false;
          this.$makeToast(error.response.data.error, "danger");
        });
    },
    Delete(item) {
      this.DeleteLoading = true;
      ChildMonitoringService.Delete(item.id)
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
@import "@core/scss/vue/libs/vue-select.scss";
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
