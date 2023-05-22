<template>
  <b-card no-body>
    <b-card>
      <b-tabs pills v-model="tabIndex" @input="Refresh">
        <b-tab :title="$t('CreatedCountChildRegistrationActBy')"> </b-tab>
        <b-tab :title="$t('CreatedCountChildUnderGuardianshipBy')"> </b-tab>
      </b-tabs>
      <b-row>
        <b-col>
          <div class="m-2">
            <b-row>
              <b-col>
                <div class="col-sm-6">
                  <custom-date-picker
                    v-model="filter.startDate"
                    format="DD.MM.YYYY"
                    type="date"
                    :clearable="false"
                    :placeholder="$t('startDate')"
                  >
                  </custom-date-picker>
                </div>
              </b-col>
              <b-col>
                <div class="col-sm-6">
                  <custom-date-picker
                    v-model="filter.endDate"
                    format="DD.MM.YYYY"
                    type="date"
                    :clearable="false"
                    :placeholder="$t('endDate')"
                  >
                  </custom-date-picker>
                </div>
              </b-col>
              <b-col class="mt-2 text-right">
              <b-button class="mr-1" @click="Refresh" variant="outline-primary"> <feather-icon icon="RefreshCcwIcon"> </feather-icon> {{ $t('Refresh') }} </b-button>
              <b-button @click="Printer" variant="outline-primary"> <b-spinner v-if="PrintLoading" small></b-spinner> <feather-icon v-if="!PrintLoading" icon="PrinterIcon"> </feather-icon> {{ $t('Print') }} </b-button>
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
              :foot-clone="true"
              no-footer-sorting
              :empty-text="$t('NotFound')"
              class="position-relative mt-2"
              small
              bordered
            >
              <template #foot(oblastname)>
                {{ $t("Total") }}
              </template>
              <template #cell(createdcount)="{ item }">
                <b v-if="item.organizationname == null">{{
                  item.createdcount
                }}</b>
                <span v-if="item.organizationname">
                  {{ item.createdcount }}
                </span>
              </template>
              <template #cell(dateofcreated)="{ item }">
                <b v-if="item.organizationname == null">{{
                  item.dateofcreated
                }}</b>
                <span v-if="item.organizationname">
                  {{ item.dateofcreated }}
                </span>
              </template>
              <template #foot(createdcount)>
                <p class="text-center">{{ total.totalcreatedcount }}</p>
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
  BTabs,
  BTab,
} from "bootstrap-vue";
import ReportService from "@/services/report";
import CustomDatePicker from "@/views/components/customDatePicker.vue";
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
    BTabs,
    BTab,
  },
  data() {
    return {
      items: [],
      filter: {
        startDate: "",
        endDate: "",
      },
      fields: [
        {
          key: "dateofcreated",
          label: this.$t("dateofcreated"),
          thClass: "text-center",
          tdClass: "text-center",
          thStyle : {backgroundColor : '#A0E7E5 !important'},
          sortable: true,
        },
        {
          key: "organizationname",
          label: this.$t("organizationname"),
          thClass: "text-center",
          tdClass: "text-center",
          thStyle : {backgroundColor : '#A0E7E5 !important'},
          sortable: true,
        },
        {
          key: "createdcount",
          label: this.$t("createdcount"),
          thClass: "text-center",
          tdClass: "text-center",
          thStyle : {backgroundColor : '#A0E7E5 !important'},
          sortable: true,
        },
      ],
      isBusy: false,
      PrintLoading: false,
      tabIndex: 0,
      total: {},
    };
  },
  computed: {},
  created() {
    this.getTodayDate();
    this.Refresh();
  },
  methods: {
    Refresh() {
      this.isBusy = true;
      if (this.tabIndex == 0) {
        ReportService.CreatedCountChildRegistrationActByDate(
          this.filter.startDate,
          this.filter.endDate
        ).then((res) => {
          this.items = res.data.data;
          this.isBusy = false;
          this.calculate();
        });
      }
      if (this.tabIndex == 1) {
        ReportService.CreatedCountChildUnderGuardianshipByDate(
          this.filter.startDate,
          this.filter.endDate
        ).then((res) => {
          this.items = res.data.data;
          this.isBusy = false;
          this.calculate();
        });
      }
    },
    calculate() {
      this.total = {
        totalcreatedcount: 0,
      };

      for (var i = 0; i < this.items.length; i++) {
        if (this.items[i].organizationname != null) {
          this.total.totalcreatedcount += this.items[i].createdcount;
        }
      }
    },
    Printer(){
      this.PrintLoading = true;
      if(this.tabIndex == 0){
       ReportService.CreatedCountChildRegistrationActByDatePrint(
       this.filter.startDate,
       this.filter.endDate
      ).then((res) =>{
        this.downloadFile(res,"download.xlsx")
        this.PrintLoading = false;
        this.calculate()
      });
      }
     if(this.tabIndex == 1){
       ReportService.CreatedCountChildUnderGuardianshipByDatePrint(
       this.filter.startDate,
       this.filter.endDate
      ).then((res) =>{
        this.downloadFile(res,"download.xlsx")
        this.PrintLoading = false;
        this.calculate()
      })
     }
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
    getTodayDate() {
      var todaydate = new Date();
      var dd = String(todaydate.getDate()).padStart(2, "0");
      var mn = String(todaydate.getMonth() + 1).padStart(2, "0");
      var yyyy = todaydate.getFullYear();
      this.filter.ondate = dd + "." + mn + "." + yyyy;
    }
  },
};
</script>

<style lang="scss" scoped>
// .my-border-left {
//   border-left: 2px solid #e0dee7!important;
// }
// .my-border-right {
//   border-right: 2px solid #e0dee7!important;
// }
</style>
