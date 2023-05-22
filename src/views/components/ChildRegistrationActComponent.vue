<template>
  <b-overlay>
    <b-row>
      <b-col sm="12" md="6" lg="3">
        <label>{{ $t("identitydocument") }}</label>
        <div>
          <v-select
            :options="IdentityDocumentList"
            :reduce="(item) => item.id"
            :placeholder="$t('ChooseBelow')"
            label="name"
            v-model="filter.identityDocumentId"
          ></v-select>
        </div>
      </b-col>
      <b-col sm="12" md="6" lg="3" class="text-left">
        <label>{{ $t("documentseries") }}</label>
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
      <b-col
        sm="12"
        md="2"
        lg="2"
        v-if="filter.identityDocumentId != 3 && filter.identityDocumentId != 4"
      >
        <label>{{ $t("dateofbirth") }}</label>
        <div>
          <custom-date-picker
            v-model="filter.dateofbirth"
            @keyup="BindValue"
            format="DD.MM.YYYY"
            type="date"
            :clearable="false"
            :placeholder="$t('dateofbirth')"
          >
          </custom-date-picker>
        </div>
      </b-col>
      <b-col md="2" lg="2">
        <div>
          <label></label>
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
        <label></label>
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
    <b-row>
      <b-col sm="12" md="12">
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
          class="position-relative mt-1"
          @sort-changed="SortChange"
          @row-dblclicked="ChildRegistrationActChange"
          @row-selected="onRowSelected"
          select-mode="single"
          selectable
        >
          <template v-slot:head(selected)>
            <div style="cursor: pointer"></div>
          </template>
          <template #cell(selected)="{ rowSelected }">
            <template v-if="rowSelected">
              <!-- <feather-icon icon="CheckIcon"> </feather-icon> -->
              <span aria-hidden="true">&check;</span>
            </template>
            <template v-else>
              <span aria-hidden="true">&nbsp;</span>
              <span class="sr-only">Not selected</span>
            </template>
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
      </b-col>
      <div class="mx-2 mb-2 w-100">
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
    </b-row>
  </b-overlay>
</template>

<script>
import IdentityDocumentService from "@/services/info/identitydocument.service";
import {
  BOverlay,
  BRow,
  BCol,
  BPagination,
  BFormInput,
  BButton,
  BTable,
  BSpinner,
  BInputGroupAppend,
  BInputGroup,
} from "bootstrap-vue";
import CustomDatePicker from "@/views/components/customDatePicker.vue";
import HelperService from "@/services/others/helper.service";
import ReportService from "@/services/report";
export default {
  components: {
    BOverlay,
    BRow,
    BCol,
    BPagination,
    BFormInput,
    CustomDatePicker,
    BButton,
    BTable,
    BSpinner,
    BInputGroup,
    BInputGroupAppend,
  },
  props: {},
  data() {
    return {
      filter: {
        Search: "",
        SortColumn: "",
        OrderType: "",
        PageNumber: 1,
        PageLimit: 20,
        pinfl: "",
        identityDocumentId: 0,
        documentSeries: "",
        documentNumber: "",
        dateofbirth: "",
        perPageOptions: [10, 20, 50, 100],
        totalRows: 0,
        searchtype: 2,
        fakeSearch: "",
      },
      SearchTypeList: [
        { id: 2, name: this.$t("fio") },
        { id: 3, name: this.$t("pinfl") },
      ],
      IdentityDocumentList: [],
      lang: "",
      DocumentSeriesList: [],
      items: [],
      fields: [
        {
          key: "selected",
        },
        {
          key: "childregistrationactdocdate",
          label: this.$t("childregistrationactdocdate"),
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
          key: "pinfl",
          label: this.$t("pinfl"),
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
          key: "gendername",
          label: this.$t("gender"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "nationalityname",
          label: this.$t("nationality"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "citizenship",
          label: this.$t("citizenship"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "identitydocumentname",
          label: this.$t("identitydocument"),
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
      ],
      isBusy: false,
    };
  },
  created() {
    this.lang = localStorage.getItem("locale") || "ru";
    IdentityDocumentService.GetAll(this.lang, true).then((res) => {
      this.IdentityDocumentList = res.data.result;
    });
    HelperService.GetAllIdentityDocSeries(1).then((res) => {
      this.DocumentSeriesList = res.data;
    });
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
  methods: {
    ChangeSearchType() {
      this.filter.pinfl = "";
      this.filter.Search = "";
      this.filter.fakeSearch = "";
    },
    SortChange(data) {
      this.filter.SortColumn = data.sortBy;
      this.filter.OrderType = data.sortDesc ? "desc" : "asc";
      this.Refresh();
    },
    BindValue(data) {
      this.filter.dateofbirth = data;
    },
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
      if (this.filter.identityDocumentId != 1) {
        this.filter.documentSeries = this.filter.documentSeries.toUpperCase();
      }
      ReportService.ChildRegistrationActListForSelect(
        this.filter.Search,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit,
        this.filter.pinfl,
        this.filter.identityDocumentId,
        this.filter.documentSeries,
        this.filter.documentNumber,
        this.filter.dateofbirth
      ).then((res) => {
        this.isBusy = false;
        this.items = res.data.rows;
        this.filter.totalRows = res.data.total;
      });
    },
    Search() {
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
    ChildRegistrationActChange(data) {
      this.$emit("row-dblclick", data);
    },
    onRowSelected(item) {
      this.$emit("row-selected", item[0]);
    },
  },
};
</script>

<style>
</style>