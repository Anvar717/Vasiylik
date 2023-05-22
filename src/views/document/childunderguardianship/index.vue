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
            v-model="filter.perPage"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :options="filter.perPageOptions"
            :clearable="false"
            @input="Refresh"
            class="per-page-selector d-inline-block ml-50 mr-1"
          />
          <b-button
            variant="primary"
            v-if="$can('ChildUnderGuardianshipEdit', 'permissions')"
            :to="{ name: 'CreateChildUnderGuardianship' }"
          >
            <feather-icon icon="PlusIcon"></feather-icon>{{ $t("create") }}
          </b-button>
        </b-col>
      </b-row>
      <b-row class="mt-2">
        <b-col lg="3" md="6" sm="12">
          <div>
            <v-select
              :options="identityDocumentList"
              :reduce="(item) => item.id"
              :placeholder="$t('ChooseBelow')"
              label="name"
              v-model="filter.identityDocumentId"
            ></v-select>
          </div>
        </b-col>
        <b-col lg="3" md="6" sm="12" class="text-left">
          <div class="d-flex">
            <v-select
              class="mr-2 w-50"
              v-if="filter.identityDocumentId == 1"
              :options="DocumentSeriesList"
              :reduce="(item) => item.name"
              label="name"
              :placeholder="$t('documentseries')"
              v-model="filter.documentSeries"
            >
            </v-select>
            <b-form-input
              class="text-upper mr-2 w-50"
              v-if="filter.identityDocumentId != 1"
              :placeholder="$t('AA')"
              v-model="filter.documentSeries"
              v-mask="'AA'"
            />
            <b-form-input
              class="mr-2 w-50"
              :placeholder="$t('documentnumber')"
              v-model="filter.documentNumber"
              v-mask="'#######'"
            />
          </div>
        </b-col>
        <b-col md="2">
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
        <b-col cols="12" md="4">
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
            item.statusid == 3
              ? 'light-danger'
              : item.statusid == 4
              ? 'light-primary'
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
              name: 'EditChildUnderGuardianship',
              params: { id: item.id },
            }"
            v-b-tooltip.hover.top="$t('Edit')"
            style="margin-right: 5px"
            v-if="item.statusid !== 2"
          >
            <feather-icon icon="EditIcon"></feather-icon>
          </b-link>
          <!-- <b-link
            @click="$refs['ApproveModal' + item.id].show()"
            v-b-tooltip.hover.top="$t('Approve')"
            v-if="$can('ChildRegistrationActApprove', 'permissions')"
            style="margin-right: 5px"
          >
            <feather-icon icon="CheckCircleIcon"></feather-icon>
          </b-link> -->
          <!-- <b-link
            @click="$refs['CancelModal' + item.id].show()"
            v-b-tooltip.hover.top="$t('CancelApproval')"
            v-if="$can('ChildRegistrationActCancelApproval', 'permissions')"
            style="margin-right: 5px"
          >
            <feather-icon icon="XCircleIcon"></feather-icon>
          </b-link> -->
          <b-link
            :to="{
              name: 'ChildUnderGuardianshipView',
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
              $can('ChildUnderGuardianshipDelete', 'permissions') &&
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
} from "bootstrap-vue";
import ChildUnderGuardianshipService from "@/services/document/childunderguardianship.service";
import IdentityDocumentService from "@/services/info/identitydocument.service";
import HelperService from "@/services/others/helper.service";
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
  },
  directives: {
    "b-tooltip": VBTooltip,
  },
  data() {
    return {
      items: [],
      identityDocumentList: [],
      DocumentSeriesList: [],
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
        statusId: 0,
        childName: "",
        guardianName: "",
        search: "",
        SortColumn: "",
        OrderType: "asc",
        perPage: 20,
        currentPage: 1,
        inn: "",
        pinfl: "",
        identityDocumentId: "",
        documentSeries: "",
        documentNumber: "",
        perPageOptions: [10, 20, 50, 100],
        searchtype: 2,
        fakeSearch: "",
        totalRows: 0,
      },
      SearchTypeList: [
        { id: 1, name: this.$t("childrenname") },
        { id: 2, name: this.$t("guardianname") },
        // { id: 3, name: this.$t("ID") },
      ],
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
    this.Refresh();
    IdentityDocumentService.GetAll(this.lang, true).then((res) => {
      this.identityDocumentList = res.data.result;
    });
    HelperService.GetAllIdentityDocSeries(1).then((res) => {
      this.DocumentSeriesList = res.data;
    });
  },
  methods: {
    ChangeSearchType() {
      this.filter.childName = "";
      this.filter.guardianName = "";
      // this.filter.ID = "";
      this.filter.Search = "";
      this.filter.fakeSearch = "";
    },
    // rowClass(item, type) {
    //   if (item.Status === 3) return "d-none";
    // },
    SortChange(data) {
      this.filter.SortColumn = data.sortBy;
      this.filter.OrderType = data.sortDesc ? "desc" : "asc";
      this.Refresh();
    },
    Refresh() {
      if (this.filter.typeid == 1) {
        this.filter.childName = this.filter.fakeSearch;
      }
      if (this.filter.typeid == 2) {
        this.filter.guardianName = this.filter.fakeSearch;
      }
      // if (this.filter.typeid != 1 && this.filter.typeid != 2) {
      //   this.filter.ID = this.filter.fakeSearch;
      // }
      this.isBusy = true;
      ChildUnderGuardianshipService.GetList(
        this.filter.statusId,
        this.filter.childName,
        this.filter.guardianName,
        this.filter.search,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.currentPage,
        this.filter.perPage,
        this.filter.inn,
        this.filter.pinfl,
        this.filter.identityDocumentId,
        this.filter.documentSeries,
        this.filter.documentNumber
      ).then((res) => {
        this.items = res.data.resutl.rows;
        this.filter.totalRows = res.data.resutl.total;
        this.isBusy = false;
      });
    },
    Approve(item) {
      this.ApproveLoading = true;
      ChildUnderGuardianshipService.Approve(item.id)
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
      ChildUnderGuardianshipService.CancelApproval(item.id)
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
    Search() {
      if (this.filter.searchtype === 1) {
        this.filter.childName = this.filter.fakeSearch;
        this.Refresh();
      }
      if (this.filter.searchtype === 2) {
        this.filter.guardianName = this.filter.fakeSearch;
        this.Refresh();
      }
      if (this.filter.PageNumber !== 1) {
        this.filter.PageNumber = 1;
      } else {
        this.Refresh();
      }
    },
    Delete(item) {
      this.DeleteLoading = true;
      ChildUnderGuardianshipService.Delete(item.id)
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
