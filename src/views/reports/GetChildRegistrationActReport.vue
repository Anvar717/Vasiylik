<template>
  <b-card no-body>
    <div class="m-2">
      <b-row>
        <b-col>
          <a href="javascript:void(0)" @click="topCountryChange">
            {{ $t("uzb") }}
          </a>
          <span v-if="data.oblastname !== ''" class="text-primary">/</span
          ><a href="javascript:void(0)" @click="topOblastChange">
            {{ data.oblastname }} </a
          ><span v-if="data.regionname !== ''" class="text-primary">/</span
          ><a href="javascript:void(0)"> {{ data.regionname }} </a>
        </b-col>
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
      <b-row>
        <b-col class="text-right d-flex align-items-center justify-content-end">
          <div style="margin-right: 30px">{{ $t("birthPeriod") }}</div>
          <div style="margin-right: -18px">
            <b-form-checkbox
              @input="ChangeBirthPeriod"
              switch
              v-model="data.checkBirthPeriod"
            />
          </div>
          <div
            style="margin-left: 15px"
            v-if="data.checkBirthPeriod == true"
            class="col-sm-2"
          >
            <custom-date-picker
              v-model="data.birthPeriod.startDate"
              @keyup="startDateValue"
              format="DD.MM.YYYY"
              type="date"
              clearable
              :placeholder="$t('startDate')"
            >
            </custom-date-picker>
          </div>
          <div
            style="margin-right: -24px"
            v-if="data.checkBirthPeriod == true"
            class="col-sm-2"
          >
            <custom-date-picker
              v-model="data.birthPeriod.endDate"
              @keyup="endDateValue"
              format="DD.MM.YYYY"
              type="date"
              :clearable="false"
              :placeholder="$t('endDate')"
            >
            </custom-date-picker>
          </div>
        </b-col>
      </b-row>
      <b-row class="">
        <b-col class="mt-2 d-flex">
          <div>
            <div class="col-sm-12">
              <custom-date-picker
                v-model="data.ondate"
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
        <b-col class="mt-2 text-right">
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
              v-if="!data.oblastid && !data.regionid && !data.organizationid"
            >
              {{ $t("OblastName") }}
            </span>
            <span
              v-if="!!data.oblastid && !data.regionid && !data.organizationid"
            >
              {{ $t("regionname") }}
            </span>
            <span
              v-if="!!data.oblastid && !!data.regionid && !data.organizationid"
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
            <span> {{ $t("oblast") }} </span>
          </b-th>
          <b-th
            v-if="data.showAllInRegion"
            rowspan="2"
            class="text-center bg-info-down"
            style="vertical-align: middle"
          >
            <span> {{ $t("region") }} </span>
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
            <span>{{ $t("bedcount") }}</span>
          </b-th>
          <b-th
            rowspan="2"
            class="text-center bg-info-down"
            style="vertical-align: middle"
          >
            <span>{{ $t("childrencount") }}</span>
          </b-th>
          <b-th colspan="2" class="text-center bg-info-down">
            <span>{{ $t("NumberChildren") }}</span>
          </b-th>
          <b-th
            rowspan="2"
            class="text-center bg-info-down"
            style="vertical-align: middle"
          >
            <span>{{ $t("needpropertycount") }}</span>
          </b-th>
          <b-th
            rowspan="2"
            class="text-center bg-info-down"
            style="vertical-align: middle"
          >
            <span>{{ $t("tofamilycount") }}</span>
          </b-th>
        </b-tr>
        <b-tr>
          <b-th class="text-center bg-info-down">
            <span>{{ $t("boyscount") }}</span>
          </b-th>
          <b-th class="text-center bg-info-down">
            <span>{{ $t("girlscount") }}</span>
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
            <span class="text-success"> {{ item.bedcount }}</span>
          </b-td>
          <b-td class="text-center">
            <span class="text-success"> {{ item.childrencount }}</span>
          </b-td>
          <b-td class="text-center">
            <span class="text-success"> {{ item.boyscount }}</span>
          </b-td>
          <b-td class="text-center">
            <span class="text-success"> {{ item.girlscount }}</span>
          </b-td>
          <b-td class="text-center">
            <span class="text-success"> {{ item.needpropertycount }}</span>
          </b-td>
          <b-td class="text-center">
            <span class="text-success"> {{ item.tofamilycount }}</span>
          </b-td>
        </b-tr>
        <b-tr
          style="text-align: center; vertical-align: middle; font-weight: bold"
        >
          
          <b-td>{{ $t("Total") }}</b-td>
          <b-td v-if="data.showAllInRegion"></b-td>
          <b-td v-if="data.showAllInRegion"></b-td>
          <b-td style="white-space: nowrap">
            {{ total.totalbedcount }}
          </b-td>
          <b-td style="white-space: nowrap">
            {{ total.totalchildrencount }}
          </b-td>
          <b-td style="white-space: nowrap">
            {{ total.totalboyscount }}
          </b-td>
          <b-td style="white-space: nowrap">
            {{ total.totalgirlscount }}
          </b-td>
          <b-td style="white-space: nowrap">
            {{ total.totalneedpropertycount }}
          </b-td>
          <b-td style="white-space: nowrap">
            {{ total.totaltofamilycount }}
          </b-td>

        </b-tr>
      </b-tbody>
    </b-table-simple>
    <b-row class="mb-1">
      <b-col md="12" class="text-right mr-1">
        <b-button
          class="mr-1"
          v-if="data.oblastid != 0"
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
        regionname: "",
        orderType: "",
        pageNumber: 0,
        pageLimit: 0,
        isStartPageFromZero: true,
        oblastid: 0,
        regionid: 0,
        organizationid: 0,
        ondate: "",
        showAllInRegion: false,
        birthPeriod: null,
        checkBirthPeriod: false,
      },
      fields: [
        {
          key: "oblastname",
          label: this.$t("Oblast"),
          thClass: "text-center my-border-right",
          tdClass: "text-center my-border-right",
          thStyle: { backgroundColor: "#A0E7E5 !important" },
          sortable: true,
        },
        {
          key: "bedcount",
          label: this.$t("bedcount"),
          thClass: "text-center",
          thStyle: { backgroundColor: "#A0E7E5 !important" },
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "childrencount",
          label: this.$t("childrencount"),
          thClass: "text-center",
          thStyle: { backgroundColor: "#A0E7E5 !important" },
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "boyscount",
          label: this.$t("boyscount"),
          thClass: "text-center",
          thStyle: { backgroundColor: "#A0E7E5 !important" },
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "girlscount",
          label: this.$t("girlscount"),
          thClass: "text-center my-border-right",
          thStyle: { backgroundColor: "#A0E7E5 !important" },
          tdClass: "text-center my-border-right",
          sortable: true,
        },
        {
          key: "needpropertycount",
          label: this.$t("needpropertycount"),
          thClass: "text-center",
          thStyle: { backgroundColor: "#A0E7E5 !important" },
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "tofamilycount",
          label: this.$t("tofamilycount"),
          thClass: "text-center",
          thStyle: { backgroundColor: "#A0E7E5 !important" },
          tdClass: "text-center",
          sortable: true,
        },
      ],
      fieldsShowAllTrue: [
        {
          key: "oblastname",
          label: this.$t("Oblast"),
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
          key: "bedcount",
          label: this.$t("bedcount"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "childrencount",
          label: this.$t("childrencount"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "boyscount",
          label: this.$t("boyscount"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "girlscount",
          label: this.$t("girlscount"),
          thClass: "text-center my-border-right",
          tdClass: "text-center my-border-right",
          sortable: true,
        },
        {
          key: "needpropertycount",
          label: this.$t("needpropertycount"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "tofamilycount",
          label: this.$t("tofamilycount"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
      ],
      isBusy: false,
      PrintLoading: false,
      total: {
        totalneedpropertycount: 0,
        totaltofamilycount: 0,
        totalbedcount: 0,
        totalgirlscount: 0,
        totalchildrencount: 0,
        totalboyscount: 0,
      },
    };
  },
  computed: {},
  created() {
    this.getTodayDate();
    // SchoolYearService.GetAll().then(res => {
    //     this.SchoolYearList = res.data
    // })
    this.Refresh();
  },
  methods: {
    ChangeOrg(item) {
      this.$router.push({
        name: "ChildRegistrationActList",
        query: { orgid: item.organizationid },
      });
    },
    ChangeBirthPeriod() {
      if (this.data.checkBirthPeriod) {
        this.data.birthPeriod = {
          startDate: "",
          endDate: "",
        };
      } else {
        this.data.birthPeriod = null;
      }
    },
    Refresh() {
      if (!this.Check()) {
        return false;
      }
      // if(!!this.data.checkBirthPeriod){
      //   this.data.birthPeriod = {
      //     startDate : "",
      //     endDate : ""
      //   }
      // }
      // else{
      //   this.data.birthPeriod = null
      // }
      this.isBusy = true;
      ReportService.ChildRegistrationActReport(this.data).then((res) => {
        this.items = res.data.data;
        this.data.totalRows = res.data.total;
        this.isBusy = false;
        this.calculate();
      });
    },
    Printer() {
      this.PrintLoading = true;
      ReportService.ChildRegistrationActPrint(this.data).then((res) => {
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
    BindValue(value) {
      this.data.ondate = value;
    },
    startDateValue(value) {
      this.data.birthPeriod.startDate = value;
    },
    endDateValue(value) {
      this.data.birthPeriod.endDate = value;
    },
    getTodayDate() {
      var todaydate = new Date();
      var dd = String(todaydate.getDate()).padStart(2, "0");
      var mn = String(todaydate.getMonth() + 1).padStart(2, "0");
      var yyyy = todaydate.getFullYear();
      this.data.ondate = dd + "." + mn + "." + yyyy;
    },
    showallorganization() {
      this.Refresh();
    },
    calculate() {
      this.total = {
        totalneedpropertycount: 0,
        totaltofamilycount: 0,
        totalbedcount: 0,
        totalgirlscount: 0,
        totalchildrencount: 0,
        totalboyscount: 0,
      };
      for (var i = 0; i < this.items.length; i++) {
        this.total.totalneedpropertycount += this.items[i].needpropertycount;
        this.total.totaltofamilycount += this.items[i].tofamilycount;
        this.total.totalbedcount += this.items[i].bedcount;
        this.total.totalgirlscount += this.items[i].girlscount;
        this.total.totalchildrencount += this.items[i].childrencount;
        this.total.totalboyscount += this.items[i].boyscount;
      }
    },
    Check() {
      if (
        this.data.checkBirthPeriod == true &&
        (this.data.birthPeriod.startDate === 0 ||
          this.data.birthPeriod.startDate === null ||
          this.data.birthPeriod.startDate === "" ||
          this.data.birthPeriod.startDate === undefined)
      ) {
        this.$makeToast(this.$t("startDateNotSelected"), "danger");
        return false;
      }
      if (
        this.data.checkBirthPeriod == true &&
        (this.data.birthPeriod.endDate === 0 ||
          this.data.birthPeriod.endDate === null ||
          this.data.birthPeriod.endDate === "" ||
          this.data.birthPeriod.endDate === undefined)
      ) {
        this.$makeToast(this.$t("endDateNotSelected"), "danger");
        return false;
      }
      return true;
    },
    ChangeOblast(item) {
      if (!this.data.showAllInRegion) {
        this.data.oblastid = item.oblastid;
        this.fields[0].key = "regionname";
        this.data.oblastname = item.oblastname;
        this.fields[0].label = this.$t("Region");
        this.Refresh();
      }
    },
    ChangeRegion(item) {
      if (!this.data.showAllInRegion) {
        this.data.regionid = item.regionid;
        this.fields[0].key = "organizationname";
        this.data.regionname = item.regionname;
        this.fields[0].label = this.$t("organization");
        this.Refresh();
      }
    },
    topCountryChange() {
      this.data.showAllInRegion = false;
      this.data.oblastname = "";
      this.data.oblastid = 0;
      this.data.regionid = 0;
      this.data.regionname = "";
      this.data.organizationid = 0;
      this.data.organizationname = "";
      this.Refresh();
    },
    topOblastChange() {
      this.data.showAllInRegion = false;
      this.data.regionname = "";
      this.data.regionid = 0;
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
