
<template>
  <b-card no-body>
    <b-card>
      <b-tabs pills v-if="changeid != 2">
        <b-tab @click="ChangeNull" :title="$t('null')"> </b-tab>
        <b-tab @click="ChangeTrue" :title="$t('false')"> </b-tab>
        <b-tab @click="ChangeFalse" :title="$t('true')"> </b-tab>
      </b-tabs>
      <!-- <b-row class="mt-2">
        <b-col class="mt-1 d-flex">
          <div class="col-sm-2" v-if="changeid == 0">
            <v-select
              @input="ChangeOblast"
              :options="OblastList"
              :reduce="(item) => item.id"
              :placeholder="$t('ChooseBelow')"
              label="name"
              v-model="Data.oblastid"
              :disabled="Data.oblastid != 0"
            >
            </v-select>
          </div>
          <div class="col-sm-2" v-if="changeid == 0">
            <v-select
              :options="RegionList"
              :reduce="(item) => item.id"
              :placeholder="$t('ChooseBelow')"
              label="name"
              v-model="Data.regionid"
              :disabled="Data.regionid != 0"
            >
            </v-select>
          </div>
          <b-button class="mr-1" @click="Refresh" variant="outline-primary">
            <feather-icon icon="RefreshCcwIcon"> </feather-icon>
            {{ $t("Refresh") }}
          </b-button>
        </b-col>
      </b-row> -->
      <b-row class="mt-2">
        <b-col class="mt-1 d-flex">
          <!-- <div class="col-sm-4">
                <custom-date-picker
                  v-model="data.ondate"
                  @keyup="BindValue"
                  format="DD.MM.YYYY"
                  type="date"
                  :clearable="false"
                  :placeholder="$t('ondate')"
                >
                </custom-date-picker>
              </div> -->
          <div class="col-sm-4" v-if="changeid == 0">
            <v-select
              @input="ChangeOblast"
              :options="OblastList"
              :reduce="(item) => item.id"
              :placeholder="$t('ChooseBelow')"
              label="name"
              v-model="filter.oblastid"
              :disabled="filter.oblastid != 0"
            >
            </v-select>
          </div>
          <div class="col-sm-4" v-if="changeid == 0">
            <v-select
              :options="RegionList"
              :reduce="(item) => item.id"
              :placeholder="$t('ChooseBelow')"
              label="name"
              v-model="filter.regionid"
              :disabled="filter.regionid != 0"
            >
            </v-select>
          </div>
          <!-- <div class="col-sm-4">
            <v-select
              @input="Refresh"
              :options="guardianshiptypeList"
              :reduce="(item) => item.id"
              :placeholder="$t('ChooseBelow')"
              label="shortname"
              v-model="data.guardianshiptypeid"
            >
              <template #search="{ attributes, events }">
                <input
                  class="vs__search"
                  :required="!data.guardianshiptypeid"
                  v-bind="attributes"
                  v-on="events"
                />
              </template>
            </v-select>
          </div> -->
        </b-col>
        <b-col class="text-right">
          <b-button class="mr-1" @click="Refresh" variant="outline-primary">
            <feather-icon icon="RefreshCcwIcon"> </feather-icon>
            {{ $t("Refresh") }}
          </b-button>
          <b-button @click="Printer" variant="outline-primary">
            <b-spinner v-if="PrintLoading" small></b-spinner>
            <feather-icon v-if="!PrintLoading" icon="PrinterIcon">
            </feather-icon>
            {{ $t("Print") }}
          </b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div class="my-2">
            <b-row>
              <b-col class="text-right">
                <!-- <b-button
                  class="mr-1"
                  @click="Refresh"
                  variant="outline-primary"
                >
                  <feather-icon icon="RefreshCcwIcon"> </feather-icon>
                  {{ $t("Refresh") }}
                </b-button> -->
              </b-col>
            </b-row>
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
              no-footer-sorting
              :empty-text="$t('NotFound')"
              class="position-relative mt-2"
              small
              bordered
            >
              <template #cell(housingoblastname)="{ item }">
                <!-- <span class="text-nowrap">{{item.housingoblastname}}</span> -->
                <a class="text-nowrap" href="javascript:void(0)">{{
                  item.housingoblastname
                }}</a>
              </template>
              <template #cell(housingregionname)="{ item }">
                <!-- <span class="text-nowrap">{{item.housingregionname}}</span> -->
                <a class="text-nowrap" href="javascript:void(0)">{{
                  item.housingregionname
                }}</a>
              </template>
              <template #cell(personname)="{ item }">
                <span> {{ item.personname }}</span>
              </template>
              <template #cell(dateofbirth)="{ item }">
                <span> {{ item.dateofbirth }}</span>
              </template>
              <template #cell(docdate)="{ item }">
                <span> {{ item.docdate }}</span>
              </template>
              <template #cell(docnumber)="{ item }">
                <span class="text-nowrap"> {{ item.docnumber }}</span>
              </template>
              <template #cell(actions)="{ item }">
                <b-link
                  :to="{ name: 'ViewHousingQueue', params: { id: item.id } }"
                  v-b-tooltip.hover.top="$t('View')"
                >
                  <feather-icon icon="EyeIcon"></feather-icon>
                </b-link>
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
          </div>
        </b-col>
      </b-row>
    </b-card>
  </b-card>
</template>


<script>
import {
  BButton,
  BTable,
  BCol,
  BRow,
  BSpinner,
  BCard,
  BTr,
  BTh,
  BFormCheckbox,
  BTableSimple,
  BThead,
  BTbody,
  BTd,
  BTabs,
  BTab,
  BLink,
} from "bootstrap-vue";
import ReportService from "@/services/report";
import CustomDatePicker from "@/views/components/customDatePicker.vue";
import OblastService from "@/services/info/oblast.service";
import RegionService from "@/services/info/region.service";
export default {
  components: {
    BButton,
    BTable,
    BCol,
    BRow,
    BSpinner,
    BCard,
    BTr,
    BTh,
    BFormCheckbox,
    CustomDatePicker,
    BTableSimple,
    BThead,
    BTbody,
    BTd,
    BTabs,
    BTab,
    BLink,
  },
  props: {
    changeid: {
      type: Number,
    },
  },
  data() {
    return {
      items: [],
      Data: [],
      RegionList: [],
      OblastList: [],
      PrintLoading: false,
      lang: "ru",
      filter: {
        oblastid: 0,
        regionid: 0,
        isOrphan: null,
      },
      fields: [
        {
          key: "ordernumber",
          label: this.$t("SequenceNumber"),
          thClass: "text-center my-border-right",
          tdClass: "text-center my-border-right",
          thStyle: { backgroundColor: "#A0E7E5 !important" },
          sortable: true,
        },
        {
          key: "housingoblastname",
          label: this.$t("housingoblastname"),
          thClass: "text-center my-border-right",
          tdClass: " my-border-right",
          thStyle: {
            backgroundColor: "#A0E7E5 !important",
            verticalAlign: "middle",
          },
          sortable: true,
        },
        {
          key: "housingregionname",
          label: this.$t("housingregionname"),
          thClass: "text-center my-border-right",
          tdClass: " my-border-right",
          thStyle: {
            backgroundColor: "#A0E7E5 !important",
            verticalAlign: "middle",
          },
          sortable: true,
        },
        {
          key: "organizationname",
          label: this.$t("organizationname"),
          thClass: "text-center my-border-right",
          tdClass: "my-border-right",
          thStyle: {
            backgroundColor: "#A0E7E5 !important",
            verticalAlign: "middle",
          },
          sortable: true,
        },
        {
          key: "personname",
          label: this.$t("personnamee"),
          thClass: "text-center",
          thStyle: {
            backgroundColor: "#A0E7E5 !important",
            verticalAlign: "middle",
          },
          sortable: true,
        },
        {
          key: "dateofbirth",
          label: this.$t("dateofbirth"),
          thClass: "text-center",
          thStyle: { backgroundColor: "#A0E7E5 !important" },
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "docnumber",
          label: this.$t("documentnumber"),
          thClass: "text-center text-nowrap",
          thStyle: {
            backgroundColor: "#A0E7E5 !important",
            verticalAlign: "middle",
          },
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "docdate",
          label: this.$t("docdate"),
          thClass: "text-center",
          thStyle: { backgroundColor: "#A0E7E5 !important" },
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "guardianshiplessreasonname",
          label: this.$t("guardianshiplessreasonname"),
          thClass: "text-center my-border-right",
          thStyle: { backgroundColor: "#A0E7E5 !important" },
          tdClass: "my-border-right",
          sortable: true,
        },
        {
          key: "actions",
          label: this.$t("actions"),
          thClass: "text-center my-border-right",
          thStyle: { backgroundColor: "#A0E7E5 !important" },
          tdClass: "text-center",
          sortable: true,
        },
      ],
      isBusy: false,
    };
  },
  computed: {},
  created() {
    OblastService.GetAll(this.lang).then((res) => {
      this.OblastList = res.data;
    });
    this.Refresh();
  },
  methods: {
    Refresh() {
      this.isBusy = true;
      if (this.changeid == 0) {
        ReportService.HousingQueueReport(
          this.filter.oblastid,
          this.filter.regionid,
          this.filter.isOrphan
        ).then((res) => {
          // this.Data = res.data.reportDocInfo;
          this.items = res.data.reportDocInfo.data;
          this.filter.totalRows = res.data.total;
          // this.filter.regionid = this.filter.regionname;
          this.isBusy = false;
        });
      }
      if (this.changeid == 1) {
        ReportService.HousingQueueReportByRegion(this.filter.isOrphan).then(
          (res) => {
            this.items = res.data.data;
            this.filter.totalRows = res.data.total;
            this.isBusy = false;
          }
        );
      }
      if (this.changeid == 2) {
        ReportService.HousingQueueReportByOrganization().then((res) => {
          this.items = res.data.data;
          this.filter.totalRows = res.data.total;
          this.isBusy = false;
        });
      }
    },
    ChangeNull() {
      this.filter.isOrphan = null;
      this.Refresh();
    },
    ChangeTrue() {
      this.filter.isOrphan = true;
      this.Refresh();
    },
    ChangeFalse() {
      this.filter.isOrphan = false;
      this.Refresh();
    },
    ChangeOblast() {
      if (!!this.filter.oblastid) {
        RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
          this.RegionList = res.data;
        });
      }
    },
    Printer() {
      this.PrintLoading = true;
      ReportService.HousingQueueReportPrint(
        this.filter.oblastid,
        this.filter.regionid
      ).then((res) => {
        this.downloadFile(res, "download.xlsx");
        this.PrintLoading = false;
        this.calculate();
      });
    },
    downloadFile(response, item) {
      var blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", item); //or any other extension
      document.body.appendChild(link);
      link.click();
    },
    // ChangeRegion() {
    //     if (!!this.filter.regionId) {
    //     RegionService.GetAll(
    //       this.lang,
    //       this.filter.oblastId
    //     ).then((res) => {
    //       this.RegionList = res.data;
    //     });
    //   }
    // },
    topCountryChange() {
      this.filter.showAllInRegion = false;
      this.filter.housingoblastname = "";
      this.filter.oblastid = 0;
      this.filter.regionid = 0;
      this.filter.housingregionname = "";
      this.filter.organizationid = 0;
      this.filter.organizationname = "";
      this.Refresh();
    },
    topOblastChange() {
      this.filter.showAllInRegion = false;
      this.filter.housingregionname = "";
      this.filter.regionid = 0;
      this.fields[0].key = "housingregionname";
      this.fields[0].label = this.$t("Region");
      this.Refresh();
    },
  },
  watch: {
    changeid: {
      handler() {
        this.Refresh();
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.my-border-left {
  border-left: 2px solid #e0dee7 !important;
}
.my-border-right {
  border-right: 2px solid #e0dee7 !important;
}
.bg-info-down {
  background-color: #a0e7e5 !important;
}
</style>
