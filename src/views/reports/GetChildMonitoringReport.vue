<template>
  <b-card no-body>
    <div class="m-2">
      <b-row>
        <b-col> </b-col>
        <b-col class="text-right d-flex justify-content-end">
          <div>
            <b-row class="mb-1">
              <b-col sm="10">
                {{ $t("showAllInRegion") }}
              </b-col>
              <b-col sm="2">
                <b-form-checkbox
                  switch
                  v-model="data.showAllInRegion"
                  @input="showallorganization"
                />
              </b-col>
            </b-row>
          </div>
        </b-col>
      </b-row>
      <b-row> </b-row>
      <b-row class="mt-2">
        <b-col class="mt-1 d-flex">
          <div>
            <div class="col-sm-12">
              <custom-date-picker
                v-model="data.onDate"
                @keyup="BindValue"
                format="DD.MM.YYYY"
                type="date"
                :clearable="false"
                :placeholder="$t('ondate')"
              >
              </custom-date-picker>
            </div>
          </div>
        </b-col>
        <b-col class="mt-1 d-flex">
          <div class="col-sm-7">
            <v-select
              @input="ChangeOblastData"
              :options="OblastList"
              :reduce="(item) => item.id"
              :placeholder="$t('ChooseBelow')"
              label="name"
              v-model="data.oblastId"
            >
            </v-select>
          </div>
          <div class="col-sm-7">
            <v-select
              :options="RegionList"
              :reduce="(item) => item.id"
              :placeholder="$t('ChooseBelow')"
              label="name"
              v-model="data.regionId"
            >
            </v-select>
          </div>
        </b-col>
        <b-col class="mt-1 text-right">
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
    </div>
    <b-table-simple bordered responsive="sm" striped>
      <b-thead>
        <b-tr>
          <b-th
            rowspan="2"
            class="text-center bg-info-down"
            style="vertical-align: middle"
            v-if="!data.showAllInRegion"
          >
            <span
              v-if="!data.oblastId && !data.regionId && !data.organizationId"
            >
              {{ $t("OblastName") }}
            </span>
            <span
              v-if="!!data.oblastId && !data.regionId && !data.organizationId"
            >
              {{ $t("regionname") }}
            </span>
            <span
              v-if="!!data.oblastId && !!data.regionId && !data.organizationId"
            >
              {{ $t("organization") }}
            </span>
          </b-th>
          <b-th
            v-if="data.showAllInRegion"
            rowspan="2"
            class="text-center bg-info-down"
            style="vertical-align: middle"
          >
            <span> {{ $t("Oblast") }} </span>
          </b-th>
          <b-th
            v-if="data.showAllInRegion"
            rowspan="2"
            class="text-center bg-info-down"
            style="vertical-align: middle"
          >
            <span> {{ $t("regionname") }} </span>
          </b-th>
          <b-th
            v-if="data.showAllInRegion"
            rowspan="2"
            class="text-center bg-info-down"
            style="vertical-align: middle"
          >
            <span> {{ $t("organization") }} </span>
          </b-th>
          <b-th
            rowspan="2"
            class="text-center bg-info-down"
            style="vertical-align: middle"
          >
            <span>{{ $t("totalcount") }}</span>
          </b-th>
          <b-th colspan="2" class="text-center bg-info-down">
            <span>{{ $t("NumberChildren") }}</span>
          </b-th>
          <b-th colspan="2" class="text-center bg-info-down">
            <span>{{ $t("Nazorat qilingan") }}</span>
          </b-th>
        </b-tr>
        <b-tr>
          <b-th class="text-center bg-info-down">
            <span>{{ $t("Nazorat qilingan") }}</span>
          </b-th>
          <b-th class="text-center bg-info-down">
            <span>{{ $t("Nazorat qilinmagan") }}</span>
          </b-th>
          <b-th class="text-center bg-info-down">
            <span>{{ $t("Nazorat natijalari qoniqarlilari") }}</span>
          </b-th>
          <b-th class="text-center bg-info-down">
            <span>{{ $t("Nazorat natijalari qoniqarsizlari") }}</span>
          </b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr v-for="(item, index) in items" :key="'index' + index">
          <b-td class="text-center" v-if="!data.showAllInRegion">
            <a
              href="javascript:void(0)"
              @click="ChangeOblast(item)"
              v-if="!!item.oblastid && !item.regionid && !item.organizationid"
            >
              {{ item.oblastname }}
            </a>
            <a
              href="javascript:void(0)"
              @click="ChangeRegion(item)"
              v-if="!!item.oblastid && !!item.regionid && !item.organizationid"
            >
              {{ item.regionname }}
            </a>
            <a
              href="javascript:void(0)"
              @click="ChangeOrg(item)"
              v-if="!!item.oblastid && !!item.regionid && !!item.organizationid"
            >
              {{ item.organizationname }}
            </a>
          </b-td>
          <b-td class="text-center" v-if="data.showAllInRegion">
            <a href="javascript:void(0)"> {{ item.oblastname }} </a>
          </b-td>
          <b-td class="text-center" v-if="data.showAllInRegion">
            <a href="javascript:void(0)"> {{ item.regionname }} </a>
          </b-td>
          <b-td class="text-center" v-if="data.showAllInRegion">
            <a href="javascript:void(0)"> {{ item.organizationname }} </a>
          </b-td>
          <b-td class="text-center">
            <span class="text-success"> {{ item.totalcount }}</span>
          </b-td>
          <b-td class="text-center">
            <span class="text-success"> {{ item.donemonitoringcount }}</span>
          </b-td>
          <b-td class="text-center">
            <span class="text-success"> {{ item.shouldmonitoringcount }}</span>
          </b-td>
          <b-td class="text-center">
            <span class="text-success"> {{ item.satisfyingcount }}</span>
          </b-td>
          <b-td class="text-center">
            <span class="text-success"> {{ item.unsatisfyingcount }}</span>
          </b-td>
        </b-tr>
        <b-tr
          style="text-align: center; vertical-align: middle; font-weight: bold"
        >
          <b-td>{{ $t("Total") }}</b-td>
          <b-td v-if="data.showAllInRegion"></b-td>
          <b-td v-if="data.showAllInRegion"></b-td>
          <b-td style="white-space: nowrap">
            {{ total.totaltotalcount }}
          </b-td>
          <b-td style="white-space: nowrap">
            {{ total.totaldonemonitoringcount }}
          </b-td>
          <b-td style="white-space: nowrap">
            {{ total.totalshouldmonitoringcount }}
          </b-td>
          <b-td style="white-space: nowrap">
            {{ total.totalsatisfyingcount }}
          </b-td>
          <b-td style="white-space: nowrap">
            {{ total.totalunsatisfyingcount }}
          </b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
    <b-row class="mb-1">
      <b-col md="12" class="text-right mr-1">
        <b-button
          class="mr-1"
          v-if="data.oblastId != 0"
          variant="outline-danger"
          size="sm"
          @click="topOblastChange"
        >
          <feather-icon icon="ArrowLeftIcon"> </feather-icon> {{ $t("back") }}
        </b-button>
      </b-col>
    </b-row>
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
  },
  data() {
    return {
      items: [],
      data: {
        search: "",
        lang: "",
        sortColumn: "",
        orderType: "",
        regionname: "",
        pageNumber: 0,
        pageLimit: 0,
        isStartPageFromZero: true,
        oblastId: 0,
        regionId: 0,
        organizationId: 0,
        onDate: "",
        showAllInRegion: false,
      },
      OblastList: [],
      RegionList: [],
      fields: [
        {
          key: "oblastname",
          label: this.$t("oblastname"),
          thClass: "text-center my-border-right",
          tdClass: "text-center my-border-right",
          thStyle: { backgroundColor: "#A0E7E5 !important" },
          sortable: true,
        },

        {
          key: "donemonitoringcount",
          label: this.$t("donemonitoringcount"),
          thClass: "text-center",
          thStyle: { backgroundColor: "#A0E7E5 !important" },
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "shouldmonitoringcount",
          label: this.$t("shouldmonitoringcount"),
          thClass: "text-center",
          thStyle: { backgroundColor: "#A0E7E5 !important" },
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "satisfyingcount",
          label: this.$t("satisfyingcount"),
          thClass: "text-center my-border-right",
          thStyle: { backgroundColor: "#A0E7E5 !important" },
          tdClass: "text-center my-border-right",
          sortable: true,
        },
        {
          key: "unsatisfyingcount",
          label: this.$t("unsatisfyingcount"),
          thClass: "text-center my-border-right",
          thStyle: { backgroundColor: "#A0E7E5 !important" },
          tdClass: "text-center my-border-right",
          sortable: true,
        },
      ],
      fieldsShowAllTrue: [
        {
          key: "oblastname",
          label: this.$t("oblastname"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "regionname",
          label: this.$t("Region"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "organizationname",
          label: this.$t("Organization"),
          thClass: "text-center my-border-right",
          tdClass: "text-center my-border-right",
          sortable: true,
        },

        {
          key: "donemonitoringcount",
          label: this.$t("donemonitoringcount"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "shouldmonitoringcount",
          label: this.$t("shouldmonitoringcount"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "satisfyingcount",
          label: this.$t("satisfyingcount"),
          thClass: "text-center my-border-right",
          tdClass: "text-center my-border-right",
          sortable: true,
        },
        {
          key: "unsatisfyingcount",
          label: this.$t("unsatisfyingcount"),
          thClass: "text-center my-border-right",
          tdClass: "text-center my-border-right",
          sortable: true,
        },
      ],
      isBusy: false,
      PrintLoading: false,
      total: {
        totaltotalcount: 0,
        totaldonemonitoringcount: 0,
        totalshouldmonitoringcount: 0,
        totalsatisfyingcount: 0,
        totalunsatisfyingcount: 0,
      },
    };
  },
  computed: {},
  created() {
    OblastService.GetAll(this.lang).then((res) => {
      this.OblastList = res.data;
    });
    this.getTodayDate();
    this.Refresh();
  },
  methods: {
    ChangeOrg(item) {
      this.$router.push({
        name: "GetChildMonitoringListReport",
        query: { orgid: item.organizationid },
      });
    },
    Refresh() {
      this.isBusy = true;
      ReportService.GetChildMonitoringReport(this.data).then((res) => {
        this.items = res.data.data;
        this.data.totalRows = res.data.total;
        this.isBusy = false;
        this.calculate();
      });
    },
    ChangeOblastData() {
        this.data.regionId = 0
      if (!!this.data.oblastId) {
        RegionService.GetAll(this.lang, this.data.oblastId).then((res) => {
          this.RegionList = res.data;
        });
      }
    },
    // Printer() {
    //   this.PrintLoading = true;
    //   ReportService.ChildRegistrationActPrint(this.data).then((res) => {
    //     this.downloadFile(res, "download.xlsx");
    //     this.PrintLoading = false;
    //     this.calculate();
    //   });
    // },
    // downloadFile(response, item) {
    //   var blob = new Blob([response.data]);
    //   const url = window.URL.createObjectURL(blob);
    //   const link = document.createElement("a");
    //   link.href = url;
    //   link.setAttribute("download", item); //or any other extension
    //   document.body.appendChild(link);
    //   link.click();
    // },
    BindValue(value) {
      this.data.onDate = value;
    },
    getTodayDate() {
      var todaydate = new Date();
      var dd = String(todaydate.getDate()).padStart(2, "0");
      var mn = String(todaydate.getMonth() + 1).padStart(2, "0");
      var yyyy = todaydate.getFullYear();
      this.data.onDate = dd + "." + mn + "." + yyyy;
    },
    showallorganization() {
      this.Refresh();
    },
    calculate() {
      this.total = {
        totaltotalcount: 0,
        totaldonemonitoringcount: 0,
        totalshouldmonitoringcount: 0,
        totalsatisfyingcount: 0,
        totalunsatisfyingcount: 0,
      };
      for (var i = 0; i < this.items.length; i++) {
        this.total.totaltotalcount += this.items[i].totalcount;
        this.total.totaldonemonitoringcount +=
          this.items[i].donemonitoringcount;
        this.total.totalshouldmonitoringcount +=
          this.items[i].shouldmonitoringcount;
        this.total.totalsatisfyingcount += this.items[i].satisfyingcount;
        this.total.totalunsatisfyingcount += this.items[i].unsatisfyingcount;
      }
    },
    // Check() {
    //   if (
    //     this.data.checkBirthPeriod == true &&
    //     (this.data.birthPeriod.startDate === 0 ||
    //       this.data.birthPeriod.startDate === null ||
    //       this.data.birthPeriod.startDate === "" ||
    //       this.data.birthPeriod.startDate === undefined)
    //   ) {
    //     this.$makeToast(this.$t("startDateNotSelected"), "danger");
    //     return false;
    //   }
    //   if (
    //     this.data.checkBirthPeriod == true &&
    //     (this.data.birthPeriod.endDate === 0 ||
    //       this.data.birthPeriod.endDate === null ||
    //       this.data.birthPeriod.endDate === "" ||
    //       this.data.birthPeriod.endDate === undefined)
    //   ) {
    //     this.$makeToast(this.$t("endDateNotSelected"), "danger");
    //     return false;
    //   }
    //   return true;
    // },
    ChangeOblast(item) {
      if (!this.data.showAllInRegion) {
        this.data.oblastId = item.oblastid;
        this.fields[0].key = "regionname";
        this.data.oblastname = item.oblastname;
        this.fields[0].label = this.$t("Region");
        this.Refresh();
      }
    },
    ChangeRegion(item) {
      if (!this.data.showAllInRegion) {
        this.data.regionId = item.regionid;
        this.fields[0].key = "organizationname";
        this.data.regionname = item.regionname;
        this.fields[0].label = this.$t("organization");
        this.Refresh();
      }
    },
    topCountryChange() {
      this.data.showAllInRegion = false;
      this.data.oblastname = "";
      this.data.oblastId = 0;
      this.data.regionId = 0;
      this.data.regionname = "";
      this.data.organizationId = 0;
      this.data.organizationname = "";
      this.Refresh();
    },
    topOblastChange() {
      this.data.showAllInRegion = false;
      this.data.regionname = "";
      this.data.regionId = 0;
      this.fields[0].key = "regionname";
      this.fields[0].label = this.$t("Region");
      this.Refresh();
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
