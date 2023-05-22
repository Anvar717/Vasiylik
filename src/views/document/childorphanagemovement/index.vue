<template>
  <b-card no-body>
    <div class="m-2">
      <b-row>
        <b-col sm="12" md="6">
          <b-tabs pills class="text-center">
            <b-tab @click="ChangeDirectionType">
              <template #title>
                <feather-icon icon="UploadIcon"></feather-icon>
                {{ $t("sendDoc") }}
              </template>
            </b-tab>
            <b-tab @click="ChangeDirectionTypes">
              <template #title>
                <feather-icon icon="DownloadIcon"></feather-icon>
                {{ $t("receivedDoc") }}
              </template>
            </b-tab>
          </b-tabs>
        </b-col>
        <b-col
          md="6"
          sm="12"
          class="d-flex align-items-center justify-content-end mb-1 mb-md-0"
        >
          <b-button
            variant="primary"
            v-if="filter.directionType == 1"
            class="mr-2"
            :to="{ name: 'EditChildOrphanageMovement', params: { id: 0 } }"
          >
            <feather-icon icon="PlusIcon"></feather-icon> {{ $t("create") }}
          </b-button>
          <label>{{ $t("Entries") }}</label>
          <v-select
            v-model="filter.PageLimit"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :options="filter.perPageOptions"
            :clearable="false"
            @input="Refresh"
            class="per-page-selector d-inline-block ml-50 mr-1"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="12" md="9" class="d-flex">
          <custom-date-picker
            v-model="filter.startdate"
            @keyup="Bindstartdate"
            format="DD.MM.YYYY"
            type="date"
            :clearable="false"
            style="width: 30%"
            class="mr-1"
            :placeholder="$t('startdate')"
          >
          </custom-date-picker>
          <custom-date-picker
            v-model="filter.enddate"
            @keyup="Bindenddate"
            format="DD.MM.YYYY"
            type="date"
            style="width: 30%"
            class="mr-1"
            :clearable="false"
            :placeholder="$t('enddate')"
          >
          </custom-date-picker>
          <b-input-group class="text-right">
            <b-form-input
              v-model="filter.personname"
              :placeholder="$t('personname')"
            />
            <b-form-input
              v-model="filter.organizationname"
              :placeholder="$t('organizationname')"
            />
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
      <template #cell(statusname)="{ item }">
        <b-badge
          :variant="
            item.statusid == 36 || item.statusid == 40 || item.statusid == 42
              ? 'light-success'
              : item.statusid == 37
              ? 'light-danger'
              : 'light-primary'
          "
        >
          {{ item.statusname }}
        </b-badge>
      </template>
      <template #cell(actions)="{ item }">
        <div class="text-center">
          <b-link
            :to="{
              name: 'EditChildOrphanageMovement',
              params: { id: item.id },
            }"
            v-b-tooltip.hover.top="$t('Edit')"
            style="margin-right: 5px"
            v-if="
              $can('ChildOrphanageMovementEdit', 'permissions') &&
              item.statusid != 38 &&
              item.statusid != 36 &&
              item.statusid != 40 &&
              item.statusid != 42
            "
          >
            <feather-icon icon="EditIcon"></feather-icon>
          </b-link>
          <!-- <b-link
            @click="$refs['DeleteModal' + item.id].show()"
            v-b-tooltip.hover.top="$t('Delete')"
            style="margin-right: 5px"
            v-if="$can('ChildOrphanageMovementDelete' , 'permissions') && item.statusid != 38 && item.statusid != 36 && item.statusid != 40"
          >
            <feather-icon icon="Trash2Icon"></feather-icon>
          </b-link> -->
          <!-- <b-link
            @click="$refs['AcceptModal' + item.id].show()"
            v-b-tooltip.hover.top="$t('Accept')"
            style="margin-right: 5px"
            v-if="$can('ChildOrphanageMovementAccept' , 'permissions')"
          >
            <feather-icon icon="CheckSquareIcon"></feather-icon>
          </b-link> -->
          <!-- <b-link
            @click="$refs['CancelModal' + item.id].show()"
            v-b-tooltip.hover.top="$t('Cancel')"
            style="margin-right: 5px"
            v-if="$can('ChildOrphanageMovementCancel' , 'permissions')"
          >
            <feather-icon icon="XCircleIcon"></feather-icon>
          </b-link> -->
          <!-- <b-link
            @click="$refs['SendModal' + item.id].show()"
            v-b-tooltip.hover.top="$t('Send')"
            style="margin-right: 5px"
            v-if="$can('ChildOrphanageMovementSend' , 'permissions')"
          >
            <feather-icon icon="SendIcon"></feather-icon>
          </b-link> -->
          <b-link
            :to="{
              name: 'ViewChildOrphanageMovement',
              params: { id: item.id },
            }"
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
        <b-modal
          :ref="'AcceptModal' + item.id"
          :title="$t('Accept')"
          :cancel-title="$t('Cancel')"
          :ok-title="$t('Accept')"
          cancel-variant="danger"
          ok-variant="success"
          @ok="Accept(item)"
        >
          <b-card-text>
            <h5>
              ID : {{ item.id }}
              <b-spinner v-if="AcceptLoading" small></b-spinner>
            </h5>
            <h5>{{ $t("WantAccept") }}</h5>
          </b-card-text>
        </b-modal>
        <b-modal
          :ref="'SendModal' + item.id"
          :title="$t('Send')"
          :cancel-title="$t('Cancel')"
          :ok-title="$t('Accept')"
          cancel-variant="danger"
          ok-variant="success"
          @ok="Send(item)"
        >
          <b-card-text>
            <h5>
              ID : {{ item.id }}
              <b-spinner v-if="SendLoading" small></b-spinner>
            </h5>
            <h5>{{ $t("WantSend") }}</h5>
          </b-card-text>
        </b-modal>
        <b-modal
          :ref="'CancelModal' + item.id"
          :title="$t('Cancel')"
          :cancel-title="$t('Cancel')"
          :ok-title="$t('Accept')"
          cancel-variant="danger"
          ok-variant="success"
          @ok="Cancel(item)"
        >
          <b-card-text>
            <h5>
              ID : {{ item.id }}
              <b-spinner v-if="CancelLoading" small></b-spinner>
            </h5>
            <h5>{{ $t("WantCancel") }}</h5>
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
            v-model="filter.PageNumber"
            :total-rows="filter.totalRows"
            :per-page="filter.PageLimit"
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
import ChildOrphanageMovementService from "@/services/document/childorphanagemovement.service";
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
          key: "id",
          label: this.$t("id"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
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
          key: "expulsiondate",
          label: this.$t("expulsiondate"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "expulsiontypename",
          label: this.$t("expulsiontypename"),
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
          key: "fromorganizationname",
          label: this.$t("OutOrg"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "toorganizationname",
          label: this.$t("InOrg"),
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
        },
      ],
      filter: {
        directionType: 1,
        Search: "",
        SortColumn: "",
        OrderType: "asc",
        PageNumber: 1,
        PageLimit: 20,
        perPageOptions: [10, 20, 50, 100],
        totalRows: 0,
        personname: "",
        organizationname: "",
        startdate: "",
        enddate: "",
      },
      isBusy: false,
      CancelLoading: false,
      AcceptLoading: false,
      SendLoading: false,
    };
  },
  computed: {
    firstNumber() {
      return (this.filter.PageNumber - 1) * this.filter.PageLimit + 1;
    },
    lastNumber() {
      if (this.filter.totalRows < this.filter.PageLimit) {
        return this.filter.totalRows;
      } else {
        if (
          this.filter.PageNumber * this.filter.PageLimit >
          this.filter.totalRows
        ) {
          return this.filter.totalRows;
        } else {
          return this.filter.PageNumber * this.filter.PageLimit;
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
    Refresh() {
      this.isBusy = true;
      ChildOrphanageMovementService.GetList(
        this.filter.directionType,
        this.filter.personname,
        this.filter.organizationname,
        this.filter.startdate,
        this.filter.enddate,
        this.filter.Search,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit
      ).then((res) => {
        this.items = res.data.rows;
        this.filter.totalRows = res.data.total;
        this.isBusy = false;
      });
    },
    ChangeDirectionType() {
      this.isBusy = true;
      this.filter.directionType = 1;
      this.Refresh();
    },
    Bindstartdate(data) {
      this.filter.startdate = data;
    },
    Bindenddate(data) {
      this.filter.enddate = data;
    },
    ChangeDirectionTypes() {
      this.isBusy = true;
      this.filter.directionType = 2;
      this.Refresh();
    },
    Delete(item) {
      this.DeleteLoading = true;
      ChildOrphanageMovementService.Delete(item.id)
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
    Accept(item) {
      this.AcceptLoading = true;
      ChildOrphanageMovementService.Approve(item.id)
        .then((res) => {
          this.AcceptLoading = false;
          this.Refresh();
          this.$makeToast(this.$t("AcceptSuccess"), "success");
        })
        .catch((error) => {
          this.$makeToast(error.response.data.error, "danger");
          this.AcceptLoading = false;
        });
    },
    Cancel(item) {
      this.CancelLoading = true;
      ChildOrphanageMovementService.CancelApproval(item.id)
        .then((res) => {
          this.CancelLoading = false;
          this.Refresh();
          this.$makeToast(this.$t("CancelSuccess"), "success");
        })
        .catch((error) => {
          this.$makeToast(error.response.data.error, "danger");
          this.CancelLoading = false;
        });
    },
    Send(item) {
      this.CancelLoading = true;
      ChildOrphanageMovementService.Send(item.id)
        .then((res) => {
          this.SendLoading = false;
          this.Refresh();
          this.$makeToast(this.$t("CancelSuccess"), "success");
        })
        .catch((error) => {
          this.$makeToast(error.response.data.error, "danger");
          this.SendLoading = false;
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
