<template>
  <b-card no-body>
    <div class="m-2">
      <b-row>
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
      <b-row class="mt-2">
        <b-col sm="12" md="2" lg="3">
          <label>{{ $t("oblast") }}</label>
          <div>
            <v-select
              :options="OblastList"
              :reduce="(item) => item.id"
              :placeholder="$t('ChooseBelow')"
              label="name"
              v-model="filter.oblastid"
              @input="ChangeOblast"
            ></v-select>
          </div>
        </b-col>
        <b-col sm="12" md="2" lg="3">
          <label>{{ $t("region") }}</label>
          <div>
            <v-select
              :options="RegionList"
              :reduce="(item) => item.id"
              :placeholder="$t('ChooseBelow')"
              label="name"
              v-model="filter.regionid"
              @input="ChangeRegion"
            ></v-select>
          </div>
        </b-col>
        <b-col sm="12" md="2" lg="3">
          <label>{{ $t("organization") }}</label>
          <div>
            <v-select
              :options="OrganizationList"
              :reduce="(item) => item.id"
              :placeholder="$t('ChooseBelow')"
              label="name"
              v-model="filter.organizationid"
            ></v-select>
          </div>
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
          :variant="item.status == 'Пассив' ? 'light-danger' : 'light-success'"
        >
          {{ item.status }}
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
          <!-- <b-link
            :to="{ name: 'ViewPerson', params: { id: item.id } }"
            v-b-tooltip.hover.top="$t('View')"
            style="margin-right: 5px"
          >
            <feather-icon icon="EyeIcon"></feather-icon>
          </b-link> -->
          <b-link
            :to="{ name: 'EditPerson', params: { id: item.id } }"
            v-b-tooltip.hover.top="$t('Edit')"
            style="margin-right: 5px"
            v-if="$can('ChildrenEdit', 'permissions')"
          >
            <feather-icon icon="EditIcon"></feather-icon>
          </b-link>
          <b-link
            @click="$refs['DeleteModal' + item.id].show()"
            v-b-tooltip.hover.top="$t('Delete')"
            v-if="$can('ChildrenDelete', 'permissions')"
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
  BTooltip,
  BBadge,
  BCardText,
  BInputGroup,
  BFormInput,
  BModal,
  BInputGroupAppend,
  BLink,
  VBTooltip,
  BFormCheckbox,
} from "bootstrap-vue";
import PersonService from "@/services/info/person.service";
import OblastService from "@/services/info/oblast.service";
import RegionService from "@/services/info/region.service";
import OrganizationService from "@/services/managment/organization.service";
import IdentityDocumentService from "@/services/info/identitydocument.service";
import HelperService from "@/services/others/helper.service";
export default {
  components: {
    BButton,
    BPagination,
    BTable,
    BCol,
    BRow,
    BSpinner,
    BCardText,
    BModal,
    BCard,
    BTooltip,
    BBadge,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BLink,
    BFormCheckbox,
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
          key: "fullname",
          label: this.$t("fullname"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "gender",
          label: this.$t("gender"),
          thClass: "text-center",
          sortable: true,
        },
        // {
        //   key: "nationality",
        //   label: this.$t("nationality"),
        //   thClass: "text-center",
        //   sortable: true,
        // },
        // {
        //   key: "citizenship",
        //   label: this.$t("citizenship"),
        //   thClass: "text-center",
        //   sortable: true,
        // },
        {
          key: "pinfl",
          label: this.$t("pinfl"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "documentseries",
          label: this.$t("documentseries"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "documentnumber",
          label: this.$t("documentnumber"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "dateofbirth",
          label: this.$t("dateofbirth"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "contactinfo",
          label: this.$t("contactinfo"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        // {
        //   key: "issueorganization",
        //   label: this.$t("issueorganization"),
        //   thClass: "text-center",
        //   tdClass: "text-center",
        //   sortable: true,
        // },
        {
          key: "actions",
          label: this.$t("actions"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
      ],
      OblastList: [],
      RegionList: [],
      identityDocumentList: [],
      DocumentSeriesList: [],
      OrganizationList: [],
      SearchTypeList: [
        { id: 1, name: this.$t("ID") },
        { id: 2, name: this.$t("fio") },
        { id: 3, name: this.$t("pinfl") },
      ],
      filter: {
        ID: 0,
        Search: "",
        SortColumn: "",
        OrderType: "asc",
        currentPage: 1,
        perPage: 20,
        documentSeries: "",
        documentNumber: "",
        perPageOptions: [10, 20, 50, 100],
        isstudent: true,
        identityDocumentId: 1,
        organizationid: 0,
        oblastid: 0,
        regionid: 0,
        inn: "",
        pinfl: "",
        searchtype: 2,
        fakeSearch: "",
        totalRows: 0,
      },
      isBusy: false,
      // TypeList: [
      //   //{ id: 1, name: this.$t("inn") },
      //   { id: 2, name: this.$t("pinfl") },
      //   { id: 1, name: this.$t("Search") },
      // ],
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
    if (
      this.$route.query.docseries ||
      this.$route.query.docnumber ||
      this.$route.query.search ||
      this.$route.query.pagelimit
    ) {
      this.filter.Search = this.$route.query.search;
      this.filter.DocumentSeries = this.$route.query.docseries;
      this.filter.DocumentNumber = this.$route.query.docnumber;
      this.filter.perPage = this.$route.query.pagelimit;
    }
    OblastService.GetAll(this.lang).then((res) => {
      this.OblastList = res.data;
    });
    IdentityDocumentService.GetAll(this.lang, true).then((res) => {
      this.identityDocumentList = res.data.result;
    });
    HelperService.GetAllIdentityDocSeries(1).then((res) => {
      this.DocumentSeriesList = res.data;
    });
    // this.Search();
  },
  methods: {
    ChangeSearchType() {
      this.filter.inn = "";
      this.filter.pinfl = "";
      this.filter.ID = "";
      this.filter.Search = "";
      this.filter.fakeSearch = "";
    },
    SortChange(data) {
      this.filter.Sort = data.sortBy;
      this.filter.Order = data.sortDesc ? "desc" : "asc";
      this.Refresh();
    },
    // changesearchtype() {
    //   this.filter.fakeSearch = "";
    //   this.filter.pinfl = "";
    //   this.filter.Search = "";
    // },
    Refresh() {
      if (this.filter.typeid == 1) {
        this.filter.Search = this.filter.fakeSearch;
      }
      if (this.filter.typeid == 2) {
        this.filter.pinfl = this.filter.fakeSearch;
      }
      if (this.filter.typeid != 1 && this.filter.typeid != 2) {
        this.filter.Search = this.filter.fakeSearch;
      }
      this.isBusy = true;
      PersonService.GetList(
        this.filter.ID,
        this.filter.Search,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.currentPage,
        this.filter.perPage,
        this.filter.documentSeries,
        this.filter.documentNumber,
        this.filter.isstudent,
        this.filter.identityDocumentId,
        this.filter.organizationid,
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.inn,
        this.filter.pinfl
      ).then((res) => {
        this.items = res.data.rows;
        this.filter.totalRows = res.data.total;
        this.isBusy = false;
      });
    },
    ChangeOblast() {
      this.filter.regionid = 0;
      if (!!this.filter.oblastid) {
        RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
          this.RegionList = res.data;
        });
      }
    },
    Search() {
      if (this.filter.searchtype === 1) {
        this.filter.ID = this.filter.fakeSearch;
        this.filter.fakeSearch = "";
        this.Refresh();
      }
      if (this.filter.searchtype === 3) {
        this.filter.pinfl = this.filter.fakeSearch;
        this.filter.fakeSearch = "";
        this.Refresh();
      }
      if (this.filter.searchtype === 2) {
        this.filter.Search = this.filter.fakeSearch;
        // this.filter.fakeSearch = ""
        this.Refresh();
      }
      if (this.filter.PageNumber !== 1) {
        this.filter.PageNumber = 1;
      } else {
        this.Refresh();
      }
    },
    ChangeRegion() {
      this.filter.organizationid = "";
      if (!!this.filter.regionid) {
        OrganizationService.GetAll(0, this.filter.regionid).then((res) => {
          this.OrganizationList = res.data;
        });
      }
    },
    Delete(item) {
      this.DeleteLoading = true;
      PersonService.Delete(item.id)
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
