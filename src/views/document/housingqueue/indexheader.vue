<template>
  <b-card no-body>
    <div class="m-2">
      <b-row>
        <b-col cols="12" lg="6" md="9">
          <div>
            <b-button-group @click="Refresh" size="sm">
              <b-button
                @click="filter.statusId = 0"
                :variant="filter.statusId == 0 ? 'primary' : 'outline-primary'"
                >{{ $t("All") }}</b-button
              >
              <b-button
                @click="filter.statusId = 47"
                :variant="filter.statusId == 47 ? 'primary' : 'outline-primary'"
                >{{ $t("Sent") }}</b-button
              >
              <b-button
                @click="filter.statusId = 50"
                :variant="filter.statusId == 50 ? 'primary' : 'outline-primary'"
                >{{ $t("Rejected") }}</b-button
              >
              <b-button
                @click="filter.statusId = 49"
                :variant="filter.statusId == 49 ? 'primary' : 'outline-primary'"
                >{{ $t("Permitted") }}</b-button
              >
              <b-button
                @click="filter.statusId = 51"
                :variant="filter.statusId == 51 ? 'primary' : 'outline-primary'"
                >{{ $t("Decision") }}</b-button
              >
              <b-button
                @click="filter.statusId = 52"
                :variant="filter.statusId == 52 ? 'primary' : 'outline-primary'"
                >{{ $t("Order") }}</b-button
              >
              <b-button
                @click="filter.statusId = 53"
                :variant="filter.statusId == 53 ? 'primary' : 'outline-primary'"
                >{{ $t("Registration") }}</b-button
              >
            </b-button-group>
          </div>
        </b-col>
        <!-- <b-col sm="12" md="9" class="d-flex">
          <b-input-group>
            <b-form-input v-model="filter.personname" :placeholder="$t('personname')" />
            <b-form-input v-model="filter.organizationname" :placeholder="$t('organizationname')" />
            <b-form-input v-model="filter.Search" :placeholder="$t('search')" />
            <b-input-group-append>
              <b-button @click="Refresh" variant="primary">
                <feather-icon icon="SearchIcon" />
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-col> -->
        <b-col
          md="3"
          sm="12"
          lg="2"
          class="d-flex align-items-center justify-content-end mb-1 mb-md-0"
        >
          <label>{{ $t("Entries") }}</label>
          <v-select
            v-model="filter.pageLimit"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :options="filter.perPageOptions"
            :clearable="false"
            @input="Refresh"
            class="per-page-selector d-inline-block ml-50 mr-1"
          />
        </b-col>
        <b-col md="2" lg="2">
          <div>
            <v-select
              :options="SearchTypeList"
              :reduce="(item) => item.id"
              :placeholder="$t('SearchType')"
              label="name"
              style="width: 100%"
              v-model="filter.searchtype"
              @input="ChangeSearchType"
            ></v-select>
          </div>
        </b-col>
        <b-col cols="12" md="4" lg="2">
          <b-input-group class="text-right">
            <b-form-input
              v-model="filter.fakeSearch"
              :placeholder="$t('search')"
            />
            <b-input-group-append>
              <b-button @click="Search" variant="primary">
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
            item.statusid == 53
              ? 'light-success'
              : item.statusid == 52
              ? 'light-primary'
              : 'light-primary'
          "
        >
          {{ item.statusname }}
        </b-badge>
      </template>
      <template #cell(actions)="{ item }">
        <div class="text-center">
          <!-- <b-link
            :to="{ name: 'EditChildOrphanageMovement', params: { id: item.id } }"
            v-b-tooltip.hover.top="$t('Edit')"
            style="margin-right: 5px"
            v-if="$can('ChildOrphanageMovementEdit' , 'permissions') && item.statusid != 38 && item.statusid != 36 && item.statusid != 40"
          >
            <feather-icon icon="EditIcon"></feather-icon>
          </b-link>
          <b-link
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
              name: 'ViewHousingQueue',
              params: { id: item.id },
              query: { tabIndex: 0 },
            }"
              v-if="
              $can('HousingQueueHeaderView', 'permissions')
            "
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
            v-model="filter.pageNumber"
            :total-rows="filter.totalRows"
            :per-page="filter.pageLimit"
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
  BButtonGroup,
} from "bootstrap-vue";
import HousingQueueService from "@/services/document/housingqueue.service";
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
    BButtonGroup,
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
          key: "docnumber",
          label: this.$t("docnumber"),
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
          key: "personname",
          label: this.$t("personname"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "dateofbirth",
          label: this.$t("dateofbirth"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "pinfl",
          label: this.$t("pinfl"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "housingoblastname",
          label: this.$t("housingoblastname"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "housingregionname",
          label: this.$t("housingregionname"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "organizationname",
          label: this.$t("organizationname"),
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
      SearchTypeList: [
        { id: 1, name: this.$t("organizationname") },
        { id: 2, name: this.$t("fio") },
        { id: 3, name: this.$t("pinfl") },
      ],
      filter: {
        statusId: 0,
        organizationName: "",
        pinfl: "",
        search: "",
        SortColumn: "",
        OrderType: "asc",
        pageNumber: 1,
        pageLimit: 20,
        perPageOptions: [10, 20, 50, 100],
        fakeSearch: "",
        searchtype: 2,
        totalRows: 0,
        personname: "",
      },
      isBusy: false,
      CancelLoading: false,
      AcceptLoading: false,
      SendLoading: false,
    };
  },
  computed: {
    firstNumber() {
      return (this.filter.pageNumber - 1) * this.filter.pageLimit + 1;
    },
    lastNumber() {
      if (this.filter.totalRows < this.filter.pageLimit) {
        return this.filter.totalRows;
      } else {
        if (
          this.filter.pageNumber * this.filter.pageLimit >
          this.filter.totalRows
        ) {
          return this.filter.totalRows;
        } else {
          return this.filter.pageNumber * this.filter.pageLimit;
        }
      }
    },
  },
  created() {
    this.Refresh();
  },
  methods: {
    ChangeSearchType() {
      this.filter.pinfl = "";
      this.filter.organizationName = "";
      this.filter.search = "";
      this.filter.fakeSearch = "";
    },
    SortChange(data) {
      this.filter.SortColumn = data.sortBy;
      this.filter.OrderType = data.sortDesc ? "desc" : "asc";
      this.Refresh();
    },
    Refresh() {
      this.isBusy = true;
      HousingQueueService.GetListForHeader(
        this.filter.statusId,
        this.filter.organizationName,
        this.filter.pinfl,
        this.filter.search,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.pageNumber,
        this.filter.pageLimit
      ).then((res) => {
        this.items = res.data.rows;
        this.filter.totalRows = res.data.total;
        this.isBusy = false;
      });
    },
    Delete(item) {
      this.DeleteLoading = true;
      HousingQueueService.Delete(item.id)
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
      HousingQueueService.Approve(item.id)
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
    Bindstartdate(data) {
      this.filter.startdate = data;
    },
    Bindenddate(data) {
      this.filter.enddate = data;
    },
    Search() {
      if (this.filter.searchtype === 1) {
        this.filter.organizationName = this.filter.fakeSearch;
        this.filter.fakeSearch = "";
        this.Refresh();
      }
      if (this.filter.searchtype === 2) {
        this.filter.search = this.filter.fakeSearch;
        // this.filter.fakeSearch = ""
        this.Refresh();
      }
      if (this.filter.searchtype === 3) {
        this.filter.pinfl = this.filter.fakeSearch;
        this.filter.fakeSearch = "";
        this.Refresh();
      }
      if (this.filter.PageNumber !== 1) {
        this.filter.PageNumber = 1;
      } else {
        this.Refresh();
      }
    },
    Cancel(item) {
      this.CancelLoading = true;
      HousingQueueService.CancelApproval(item.id)
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
