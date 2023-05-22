<template>
  <div>
    <b-row>
      <b-col sm="12" md="3">
        <v-select
          :options="IdentityDocumentList"
          :reduce="(item) => item.id"
          label="name"
          :placeholder="$t('identitydocument')"
          v-model="filter.identitydocumentid"
        >
        </v-select>
      </b-col>
      <b-col sm="12" md="2">
        <v-select
          v-if="filter.identitydocumentid == 1"
          :options="DocumentSeriesList"
          :reduce="(item) => item.name"
          label="name"
          :placeholder="$t('documentseries')"
          v-model="filter.documentseries"
        >
        </v-select>
        <b-form-input
          v-if="filter.identitydocumentid != 1"
          :placeholder="$t('documentseries')"
          v-model="filter.documentseries"
        ></b-form-input>
      </b-col>
      <b-col sm="12" md="2">
        <b-form-input
          :placeholder="$t('documentnumber')"
          v-model="filter.documentnumber"
        ></b-form-input>
      </b-col>
      <b-col sm="12" md="2">
        <b-input-group>
          <b-form-input
            :placeholder="$t('search')"
            v-model="filter.search"
          ></b-form-input>
          <b-input-group-append>
            <b-button variant="primary" @click="Refresh">
              <feather-icon icon="SearchIcon"></feather-icon>
            </b-button>
          </b-input-group-append>
        </b-input-group>
      </b-col>
      <!-- <b-col sm="12" md="3" class="text-right">
        <b-button @click="OpenEditPersonModal" variant="primary">
          <feather-icon icon="PlusIcon"></feather-icon> {{ $t("Add") }}
        </b-button>
      </b-col> -->
    </b-row>
    <b-row class="mt-2">
      <b-col>
        <b-table
          :fields="fields"
          :items="items"
          selectable
          responsive
          @row-selected="onRowSelected"
          select-mode="single"
          show-empty
          :empty-text="$t('NotFound')"
          @row-dblclicked="dblclickitem"
        >
        </b-table>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-pagination
          v-model="filter.pagenumber"
          :total-rows="total"
          align="right"
          first-number
          last-number
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
    <b-modal
      v-model="EditPersonModal"
      no-close-on-backdrop
      hide-footer
      size="xl"
    >
      <b-row>
        <b-col>
          <edit-person-component @success-save="Close"></edit-person-component>
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
import {
  BTable,
  BRow,
  BCol,
  BFormInput,
  BInputGroup,
  BInputGroupAppend,
  BButton,
  BPagination,
  BModal,
} from "bootstrap-vue";
import PersonService from "@/services/info/person.service";
import IdentityDocumentService from "@/services/info/identitydocument.service";
import HelperService from "@/services/others/helper.service";
import EditPersonComponent from "../info/person/edit.vue";
export default {
  components: {
    BTable,
    BRow,
    BCol,
    BFormInput,
    BInputGroup,
    BInputGroupAppend,
    BButton,
    BPagination,
    BModal,
    EditPersonComponent,
  },
  data() {
    return {
      isLoading: false,
      filter: {
        documentseries: "",
        documentnumber: "",
        search: "",
        sortcolumn: "",
        ordertype: "asc",
        pagenumber: 1,
        pagelimit: 20,
        isallstudent: false,
        identitydocumentid: 0,
      },
      fields: [
        { key: "fullname", label: this.$t("fullname") },
        { key: "gender", label: this.$t("gender") },
        { key: "identitydocument", label: this.$t("identitydocument") },
        { key: "documentseries", label: this.$t("documentseries") },
        { key: "documentnumber", label: this.$t("documentnumber") },
        { key: "dateofbirth", label: this.$t("dateofbirth") },
        { key: "pinfl", label: this.$t("pinfl") },
        { key: "contactinfo", label: this.$t("contactinfo") },
      ],
      IdentityDocumentList: [],
      DocumentSeriesList: [],
      lang: localStorage.getItem("locale") || "ru",
      selected: [],
      items: [],
      total: 0,
      EditPersonModal: false,
    };
  },
  created() {
    IdentityDocumentService.GetAll(this.lang, true).then((res) => {
      this.IdentityDocumentList = res.data.result;
    });
    HelperService.GetAllIdentityDocSeries(1).then((res) => {
      this.DocumentSeriesList = res.data;
    });
    this.Refresh();
  },
  methods: {
    OpenEditPersonModal() {
      this.EditPersonModal = true;
    },
    Close() {
      this.EditPersonModal = false;
    },
    Refresh() {
      this.isLoading = true;
      PersonService.GetChildrenList(
        this.filter.documentseries,
        this.filter.documentnumber,
        this.filter.search,
        this.filter.sortcolumn,
        this.filter.ordertype,
        this.filter.pagenumber,
        this.filter.pagelimit,
        this.filter.isallstudent
      )
        .then((res) => {
          this.items = res.data.rows;
          this.total = res.data.total;
        })
        .catch((error) => {
          this.$makeToast(error.response.data.error, "danger");
        });
    },
    onRowSelected(items) {
      this.selected = items;
      this.$emit("selectitem", items[0]);
    },
    dblclickitem(data) {
      this.$emit("DblClicked", data);
    },
  },
};
</script>

<style></style>
