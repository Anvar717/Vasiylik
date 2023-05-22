<template>
  <div>
    <b-row>
      <b-col sm="12" md="6" class="mt-3" v-if="$can('ChildRegistrationActReportView','permissions')">
        <h3 class="text-center mb-1"> {{ $t('diagramchildhouse') }} </h3>
        <b-card>
          <apexchart type="bar" height="430" :options="chartOptions1" :series="series1"></apexchart>
        </b-card>
      </b-col>
      <b-col sm="12" md="6" class="mt-3" v-if="$can('ChildUnderGuardianshipReportView','permissions')">
        <h3 class="text-center mb-1"> {{ $t('diagramchildhouse2') }} </h3>
        <b-card>
          <apexchart type="bar" height="430" :options="chartOptions2" :series="series2"></apexchart>
        </b-card>
      </b-col>
      <b-col sm="12" md="6" class="mt-3" v-if="$can('ChildRegistrationActReportView','permissions')">
        <h3 class="text-center mb-1"> {{ $t('diagramchildhouse3') }} </h3>
        <b-card>
          <apexchart type="donut" height="430" :options="chartOptions3" :series="series3"></apexchart>
        </b-card>
      </b-col>
      <b-col sm="12" md="6" class="mt-3" v-if="$can('ChildUnderGuardianshipReportView','permissions')">
        <h3 class="text-center mb-1"> {{ $t('diagramchildhouse4') }} </h3>
        <b-card>
          <apexchart type="pie" height="430" :options="chartOptions4" :series="series4"></apexchart>
        </b-card>
      </b-col>
    </b-row>
      <!-- <b-card v-if="$can('DocumentsMonitoringView','permissions')">
        <b-row>
          <b-col sm="12" md="4" class="pb-1">
            <label for=""> {{ $t('Oblast') }} </label>
            <v-select
                :options="OblastList"
                :reduce="(item) => item.id"
                :placeholder="$t('ChooseBelow')"
                label="name"
                v-model="filter.oblastid"
                @input="ChangeOblast"
            ></v-select>
          </b-col>
          <b-col sm="12" md="4" class="pb-1">
            <label for=""> {{ $t('Region') }} </label>
            <v-select
                :options="RegionList"
                :reduce="(item) => item.id"
                :placeholder="$t('ChooseBelow')"
                label="name"
                v-model="filter.regionid"
                @input="ChangeRegion"
            ></v-select>
          </b-col>
          <b-col sm="12" md="4" >
            <label for=""> {{ $t('Organization') }} </label>
            <v-select
                :options="OrganizationList"
                :reduce="(item) => item.id"
                :placeholder="$t('ChooseBelow')"
                @input="ChangeOrg"
                label="name"
                v-model="filter.organizationid"
            ></v-select>
          </b-col>
        </b-row>
      </b-card>
      <b-card style="width:100%;height : 700px" v-if="$can('DocumentsMonitoringView','permissions')">
        <gmap-map
              :center="center"
              :zoom="16"
              style="width:100%;height : 100%"
              map-type-id="hybrid"
            >
              <gmap-polygon
                v-for="(element,index) in Locations"
                :key="index+element.id"
                :paths="element.Locations"
                :options="{
                  geodesic: true,
                  strokeColor: getRandomColor()
                }"
              ></gmap-polygon>
              <GmapMarker v-for="(el,i) in Locations" :key="'three'+i" :position="{lat : el.latitude,lng : el.longitude}">
                <gmap-info-window
                  :opened="true"
                  :position="{lat : el.latitude,lng : el.longitude}"
                  :options="{
                    pixelOffset: {
                      width: 0,
                      height: 0,
                    },
                  }"
                >
                  {{ el.organizationname }}
                </gmap-info-window>
              </GmapMarker>
            </gmap-map>
      </b-card> -->
  </div>
</template>

<script>
import { BCard,BRow,BCol } from 'bootstrap-vue'
import OblastService from '@/services/info/oblast.service'
import RegionService from '@/services/info/region.service'
import OrganizationService from '@/services/managment/organization.service'
import DashboardService from '@/services/dashboard.service'
import vSelect from 'vue-select'
import VueApexCharts from 'vue-apexcharts'
import ReportService from '@/services/report'
import AppEchartDoughnut from '@core/components/charts/echart/AppEchartDoughnut.vue'
import ChartjsComponentDoughnutChart from './components/ChartjsComponentDoughnutChart.vue'
export default {
  components : { BCard,vSelect,BRow,BCol,apexchart: VueApexCharts,AppEchartDoughnut,ChartjsComponentDoughnutChart },
  data(){
    return{
      filter : {
        obalstid : 0,
        regionid : 0,
        organizationid : 0
      },
      OblastList : [],
      RegionList : [],
      OrganizationList : [],
      center : {
        lat : 41,
        lng : 69
      },
      paths : [],
      Locations : [],
      filter : {
        birthPeriod: null,
        checkBirthPeriod: false,
        isStartPageFromZero: true,
        lang: "",
        oblastId: 0,
        ondate: "14.10.2021",
        orderType: "",
        pageLimit: 0,
        pageNumber: 0,
        regionId: 0,
        regionname: "",
        search: "",
        showAllInRegion: false,
        sortColumn: "",
      },
      series1: [],
      chartOptions1: {
        colors: ['#1E90FF', '#32CD32']
      },
      series2: [],
      chartOptions2: {
         colors: ['#1E90FF', '#32CD32']
      },
      series3: [44, 55, 41, 17, 15],
      chartOptions3: {
        chart: {
              height: 430,
              type: 'donut',
              toolbar: {
                show: false,
              },
            },
            plotOptions: {
              pie: {
                startAngle: -90,
                endAngle: 270
              }
            },
            dataLabels: {
              enabled: false
            },
            fill: {
              type: 'gradient',
            },
            legend: {
              formatter: function(val, opts) {
                return val + " - " + opts.w.globals.series[opts.seriesIndex]
              }
            },
            title: {
              text: 'Gradient Donut with custom Start-angle'
            },
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'bottom'
                }
              }
            }],
             colors: ['#1E90FF','#32CD32','#FF8C00','#DC143C','#8A2BE2','#1E90FF','#32CD32','#FF8C00','#DC143C','#8A2BE2','#1E90FF','#32CD32']
      },
      series4: [44, 55, 13, 43, 22],
      chartOptions4: {
        chart: {  
          width: 380,
          type: 'pie',
        },
        labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      },
    }
  },
  created(){
    if(this.$can('ChildRegistrationActReportView','permissions')){
      ReportService.ChildRegistrationActReport(this.filter).then(res => {
      this.series1 = [
        {
          name : this.$t('childrencount'),
          data : res.data.data.map(item => item.childrencount)
        },
        {
          name : this.$t('needpropertycount'),
          data : res.data.data.map(item => item.needpropertycount)
        }
      ],
      this.chartOptions1 = {
        chart: {
          type: 'bar',
          height: 430,
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: true,
            dataLabels: {
              position: 'top',
            },
          }
        },
        dataLabels: {
          enabled: true,
          offsetX: -6,
          style: {
            fontSize: '12px',
            colors: ['#fff']
          }
        },
        stroke: {
          show: true,
          width: 1,
          colors: ['#fff']
        },
        tooltip: {
          shared: true,
          intersect: false
        },
        xaxis: {
          categories: res.data.data.map(item => item.oblastname),
        },
      }
      this.series3 =  res.data.data.map(item => item.childrencount),
      this.chartOptions3 = {
        chart: {
          height: 430,
          type: 'donut',
          toolbar: {
            show: false,
          },
        },
        
        plotOptions: {
          pie: {
            startAngle: -90,
            endAngle: 270
          }
        },
        labels : res.data.data.map(item => item.oblastname),
        dataLabels: {
          enabled: false
        },
        fill: {
          type: 'gradient',
        },
        legend: {
          formatter: function(val, opts) {
            return val + " - " + opts.w.globals.series[opts.seriesIndex]
          }
        },
        title: {
          text: ''
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      }
    })
    }
    if(this.$can('ChildUnderGuardianshipReportView','permissions')){
      ReportService.ChildUnderGuardianshipReport(this.filter).then(res => {
      this.series2 = [
        {
          name : this.$t('childrencount'),
          data : res.data.data.map(item => item.childrencount)
        },
        {
          name : this.$t('needpropertycount'),
          data : res.data.data.map(item => item.needpropertycount)
        }
      ],
      this.chartOptions2 = {
        chart: {
          type: 'bar',
          height: 430,
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: true,
            dataLabels: {
              position: 'top',
            },
          }
        },
        dataLabels: {
          enabled: true,
          offsetX: -6,
          style: {
            fontSize: '12px',
            colors: ['#fff']
          }
        },
        stroke: {
          show: true,
          width: 1,
          colors: ['#fff']
        },
        tooltip: {
          shared: true,
          intersect: false
        },
        xaxis: {
          categories: res.data.data.map(item => item.oblastname),
        },
      }
      this.series4 = res.data.data.map(item => item.childrencount),
      this.chartOptions4 = {
        chart: {
          height: 430,
          type: 'pie',
        },
        labels:  res.data.data.map(item => item.oblastname),
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      }
    })
    }
    
  },
  methods:{
    getRandomColor() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
    ChangeOblast(){
        this.filter.regionid = 0
        this.filter.organizationid = 0
        if(!!this.filter.oblastid){
            RegionService.GetAll(this.lang,this.filter.oblastid).then(res => {
                this.RegionList = res.data
            })
            this.GetLocation()
        }
    },
    GetLocation(){
      DashboardService.GetMicroTerritoryListInDashboard(this.filter.oblastid,this.filter.regionid,this.filter.organizationid).then(res => {
        this.Locations = res.data.result
      })
    },
    ChangeRegion(){
      this.filter.organizationid = 0
        if(!!this.filter.regionid){
            OrganizationService.GetAll(this.filter.oblastid,this.filter.regionid).then(res => {
                this.OrganizationList = res.data
            })
            this.GetLocation()

        }
    },
    ChangeOrg(){
      // if(!!this.filter.organizationid){
            this.GetLocation()
        // }
    }
  }
}
</script>

<style>

</style>