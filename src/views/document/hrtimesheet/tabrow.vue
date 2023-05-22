<template>
  <b-overlay :show="show">
    <b-card>
      <b-row>
        <b-col>
          <h4 class="text-center mb-3">{{ $t("HRTimeSheetTables") }}</h4>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="12" md="6" lg="6">
          <b-list-group>
            <b-list-group-item class="d-flex justify-content-between">
              <span> {{ $t("personname") }}: </span>
              <span>
                <b> {{ tabrow.personname }} </b>
              </span>
            </b-list-group-item>
            <b-list-group-item class="d-flex justify-content-between">
              <span> {{ $t("positionname") }}: </span>
              <span>
                <b> {{ tabrow.positionname }} </b>
              </span>
            </b-list-group-item>
            <b-list-group-item class="d-flex justify-content-between">
              <span> {{ $t("positionname") }}: </span>
              <span>
                <b> {{ tabrow.positionname }} </b>
              </span>
            </b-list-group-item>
            <b-list-group-item class="d-flex justify-content-between">
              <span> {{ $t("startdate") }}: </span>
              <span>
                <b> {{ tabrow.startdate }} </b>
              </span>
            </b-list-group-item>
            <b-list-group-item class="d-flex justify-content-between">
              <span> {{ $t("factdays") }}: </span>
              <span>
                <b> {{ tabrow.factdays }} </b>
              </span>
            </b-list-group-item>
            <b-list-group-item class="d-flex justify-content-between">
              <span> {{ $t("dayoffhours") }}: </span>
              <span>
                <b> {{ tabrow.dayoffhours }} </b>
              </span>
            </b-list-group-item>
            <b-list-group-item class="d-flex justify-content-between">
              <span> {{ $t("detailinfo") }}: </span>
              <span>
                <b> {{ tabrow.detailinfo }} </b>
              </span>
            </b-list-group-item>
          </b-list-group>
        </b-col>
        <b-col sm="12" md="6" lg="6">
          <b-list-group>
            <b-list-group-item class="d-flex justify-content-between">
              <span> {{ $t("departmentname") }}: </span>
              <span>
                <b> {{ tabrow.departmentname }} </b>
              </span>
            </b-list-group-item>
            <b-list-group-item class="d-flex justify-content-between">
              <span> {{ $t("departmentname") }}: </span>
              <span>
                <b> {{ tabrow.departmentname }} </b>
              </span>
            </b-list-group-item>
            <b-list-group-item class="d-flex justify-content-between">
              <span> {{ $t("enddate") }}: </span>
              <span>
                <b> {{ tabrow.enddate }} </b>
              </span>
            </b-list-group-item>
            <b-list-group-item class="d-flex justify-content-between">
              <span> {{ $t("facthours") }}: </span>
              <span>
                <b> {{ tabrow.facthours }} </b>
              </span>
            </b-list-group-item>
            <b-list-group-item class="d-flex justify-content-between">
              <span> {{ $t("nighthours") }}: </span>
              <span>
                <b> {{ tabrow.nighthours }} </b>
              </span>
            </b-list-group-item>
          </b-list-group>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col>
          <b-table
            :fields="DaysTables"
            :items="tabrow.DaysTable"
            class="text-center"
            style="vertical-align: middle"
            bordered
            responsive="sm"
            :tbody-tr-class="rowClass"
            sticky-header="60vh"
            no-border-collapse
            small
          >
            <template #cell(ondate)="{ item }">
              <p class="m-0 p-0" style="white-space: nowrap">
                {{ item.ondate.split(".")[0] }}
                <b> ( {{ getWeekday(item) }} ) </b>
              </p>
            </template>
            <template #cell(timesheetindicatorname)="{ item }">
              <p class="m-0 p-0" >
                {{ item.timesheetindicatorname }}
              </p>
              <v-select
        
                :options="TimeSheetIndicator"
                v-model="item.timesheetindicatorid"
                :reduce="(item) => item.id"
                :placeholder="$t('ChooseBelow')"
                label="name"
              ></v-select>
            </template>
            <template #cell(plandays)="{ item }">
              <p class="m-0 p-0" > {{ item.plandays }} </p>
              <b-form-input @input="ChangeEdit(item)"  class="mb-0" v-model="item.plandays" size="sm" />
            </template>
            <template #cell(planhours)="{ item }">
              <p class="m-0 p-0"> {{ item.planhours }} </p>
              <b-form-input   class="mb-0" v-model="item.planhours" size="sm" />
            </template>
            <template #cell(factdays)="{ item }">
              <p class="m-0 p-0" > {{ item.factdays }} </p>
              <b-form-input   class="mb-0" v-model="item.factdays" size="sm" />
            </template>
            <template #cell(facthours)="{ item }">
              <b-form-input
                class="mb-0"
                @input="changehrtime(item)"
                v-model="item.facthours"
                size="sm"
              
              />
            </template>
            <template #cell(dayoffhours)="{ item }">
              <b-form-input
                class="mb-0"
                @input="changehrtime(item)"
                v-model="item.dayoffhours"
                size="sm"
             
              />
            </template>
            <template #cell(nighthours)="{ item }">
              <b-form-input
                class="mb-0"
                @input="changehrtime(item)"
                v-model="item.nighthours"
                size="sm"
              
              />
            </template>
          </b-table>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-button
            variant="danger"
            @click="
              $route.query.newdocid
                ? $router.push({
                    name: 'EditHRTimeSheet',
                    params: { id: $route.query.newdocid },
                  })
                : $router.back()
            "
          >
            <b-icon icon="arrow-left-short"></b-icon> {{ $t("back") }}
          </b-button>
        </b-col>
        <b-col class="text-right">
          <b-button :disabled="SaveLoading" variant="success" @click="SaveData">
            <b-spinner small v-if="SaveLoading"></b-spinner>
            <b-icon v-if="!SaveLoading" icon="check2"></b-icon> {{ $t("Save") }}
          </b-button>
        </b-col>
      </b-row>
    </b-card>
  </b-overlay>
</template>

<script>
import {
  BOverlay,
  BCard,
  BRow,
  BCol,
  BFormInput,
  BTabs,
  BTab,
  BButton,
  BTable,
  BLink,
  BFormGroup,
  VBTooltip,
  BModal,
  VBModal,
  BCardText,
  BFormCheckbox,
  BAlert,
  BInputGroupAppend,
  BInputGroup,
  BTr,
  BTd,
  BPagination,
  BIcon,
  BSpinner,
  BListGroup,
  BListGroupItem,
} from "bootstrap-vue";
import HRTimeSheetService from "@/services/document/hrtimesheet.service";
import HelperService from "@/services/others/helper.service";
//import TimeSheetIndicatorService from '@/services/TimesheetIndicator.service'
import CustomDatePicker from "@/views/components/customDatePicker.vue";
import CustomNumberInput from "@/views/components/CustomNumberInput.vue";
import Ripple from "vue-ripple-directive";
import flatPickr from "vue-flatpickr-component";
export default {
  components: {
    BOverlay,
    BCard,
    BRow,
    BCol,
    BFormInput,
    BTabs,
    BTab,
    BButton,
    BTable,
    BLink,
    flatPickr,
    BFormGroup,
    BModal,
    BCardText,
    BFormCheckbox,
    BAlert,
    BInputGroupAppend,
    BInputGroup,
    BTr,
    BTd,
    CustomDatePicker,
    BPagination,
    CustomNumberInput,
    BIcon,
    BSpinner,
    BListGroup,
    BListGroupItem,
  },
  directives: {
    "b-tooltip": VBTooltip,
    "b-modal": VBModal,
  },
  data() {
    return {
      show: false,
      SaveLoading : false,
      DaysTables: [
        { key: "ondate", label: this.$t("ondate") },
        { key: "timesheetindicatorname", label: this.$t("timesheetindicator") },
        // {key : 'factdays',label : this.$t('factdays')},
        { key: "facthours", label: this.$t("facthours") },
        { key: "dayoffhours", label: this.$t("dayoffhours") },
        { key: "nighthours", label: this.$t("nighthours") },
        // {key : 'actions',label : this.$t('actions')}
      ],
      tabrow: {
        id: 0,
        ownerid: 0,
        departmentid: 0,
        departmentname: "",
        personid: 0,
        personname: "",
        positionid: 0,
        positionname: "",
        employeeenrolmentid: 0,
        organizationaccountid: 0,
        workscheduleid: 0,
        employmentrate: 0,
        employmenttypeid: 0,
        employmenttypename: "",
        plandays: 0,
        planhours: 0,
        factdays: 0,
        facthours: 0,
        dayoffhours: 0,
        nighthours: 0,
        detailinfo: "",
        startdate: "",
        enddate: "",
        tableid: 0,
        documentid: 0,
        documentinfo: "",
        Status: 1,  
        DaysTable: [],
      },
       lang: "ru",
      TimeSheetIndicator: [],
      paramsid: -1,
    };
  },
  created() {
    HRTimeSheetService.GetHRTimeSheetTable(this.$route.params.id)
      .then((res) => {
        this.show = false;
        this.tabrow = res.data;
        this.calculate();
      })
      .catch((error) => {
       this.$makeToast(error.response.data.error, "danger");
      });
      HelperService.GetTimeSheetIndicator(this.lang).then(res => {
            this.TimeSheetIndicator = res.data;
        })
  },
  computed: {},
  directives: {
    Ripple,
  },
  methods: {
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },
    getWeekday(item) {
      var d = new Date(
        item.ondate.split(".")[2],
        item.ondate.split(".")[1] - 1,
        item.ondate.split(".")[0]
      ).getDay();
      if (d === 0) {
        return "Вс";
      }
      if (d === 1) {
        return "Пн";
      }
      if (d === 2) {
        return "Вт";
      }
      if (d === 3) {
        return "Ср";
      }
      if (d === 4) {
        return "Чт";
      }
      if (d === 5) {
        return "Пт";
      }
      if (d === 6) {
        return "Сб";
      }
    },
    changehrtime(item) {
      this.calculate();
    },
    ChangeEdit(item){
        item.Status = 2;
    },
    calculate() {
      var self = this;
      self.tabrow.facthours = 0;
      self.tabrow.dayoffhours = 0;
      self.tabrow.nighthours = 0;
      self.tabrow.factdays = 0;

      self.tabrow.DaysTable.forEach(function (item) {
        if (item.Status !== 3) {
          self.tabrow.facthours =
            self.tabrow.facthours * 1 + item.facthours * 1;
          self.tabrow.dayoffhours =
            self.tabrow.dayoffhours * 1 + item.dayoffhours * 1;
          self.tabrow.nighthours =
            self.tabrow.nighthours * 1 + item.nighthours * 1;
          if (item.facthours != 0) {
            self.tabrow.factdays = self.tabrow.factdays * 1 + 1;
          }
        }
      });
    },
    SaveData() {
      this.SaveLoading = true;
      HRTimeSheetService.UpdateHRTimeSheetTable(this.tabrow)
        .then((res) => {
          this.SaveLoading = false;
          var vm = this;
          setTimeout(() => {
            // vm.$router.push({name : 'EditHRTimeSheet',params : {id : vm.$route.params.id}})
            vm.$route.query.newdocid
              ? vm.$router.push({
                  name: "EditHRTimeSheet",
                  params: { id: vm.$route.query.newdocid },
                })
              : vm.$router.back();
          }, 500);
        })
        .catch((error) => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-flatpicker.scss";
</style>
