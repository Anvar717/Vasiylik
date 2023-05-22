<template>
  <b-overlay :show="show">
      <b-row>
          <b-col sm='12' md="6" lg="4">
              <b-card>
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-5" for>{{
                        $t("number")
                    }}</label>
                    <div class="col-sm-7">
                        <b-form-input
                            :placeholder="$t('number')"
                            v-model="OrgInfo.number"
                            type="number"
                        />
                    </div>
                  </div>
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-5" for>{{
                        $t("inn")
                    }}</label>
                    <div class="col-sm-7">
                        <b-form-input
                            :placeholder="$t('inn')"
                            v-model="OrgInfo.inn"
                            type="number"
                        />
                    </div>
                  </div>
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-5" for>{{
                        $t("sector")
                    }}</label>
                    <div class="col-sm-7">
                        <b-form-input
                            :placeholder="$t('sector')"
                            v-model="OrgInfo.sector"
                        />
                    </div>
                </div>
                <div class="form-group form-row">
                    <label class="col-form-label col-sm-5" for>{{
                        $t("educationlevel")
                    }}</label>
                    <div class="col-sm-7">
                        <b-form-input
                            :placeholder="$t('educationlevel')"
                            v-model="OrgInfo.educationlevel"
                        />
                    </div>
                </div>
              </b-card>
          </b-col>

          <b-col sm='12' md="6" lg="4">
              <b-card>
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-5" for>{{
                        $t("computersrooms")
                    }}</label>
                    <div class="col-sm-7">
                        <b-form-input
                            :placeholder="$t('computersrooms')"
                            v-model="OrgInfo.computersrooms"
                            type="number"
                        />
                    </div>
                  </div>
                  <div class="d-flex justify-content-between">
                      <label class="col-form-label col-sm-5 ml-n1" for="electricity">
                          {{ $t("electricity") }}
                      </label>
                      <b-form-checkbox
                          id="electricity"
                          v-model="OrgInfo.electricity"
                          switch
                      />
                  </div>
                  <div class="form-group form-row" v-if="OrgInfo.electricity">
                    <label class="col-form-label col-sm-5" for>{{
                        $t("electricitytype")
                    }}</label>
                    <div class="col-sm-7">
                        <b-form-input
                            :placeholder="$t('electricitytype')"
                            v-model="OrgInfo.electricitytype"
                        />
                    </div>
                </div>
                <div class="d-flex justify-content-between">
                      <label class="col-form-label col-sm-5 ml-n1" for="mobilecoverage">
                          {{ $t("mobilecoverage") }}
                      </label>
                      <b-form-checkbox
                          id="mobilecoverage"
                          v-model="OrgInfo.mobilecoverage"
                          switch
                      />
                  </div>
                <div class="form-group form-row" v-if="OrgInfo.mobilecoverage">
                    <label class="col-form-label col-sm-5" for>{{
                        $t("mobilecoveragetype")
                    }}</label>
                    <div class="col-sm-7">
                        <b-form-input
                            :placeholder="$t('mobilecoveragetype')"
                            v-model="OrgInfo.mobilecoveragetype"
                        />
                    </div>
                </div>
              </b-card>
          </b-col>
          
          <b-col sm='12' md="6" lg="4">
              <b-card>
                <div class="d-flex justify-content-between">
                    <label class="col-form-label col-sm-5 ml-n1" for="internetconnection">
                        {{ $t("internetconnection") }}
                    </label>
                    <b-form-checkbox
                        id="internetconnection"
                        v-model="OrgInfo.internetconnection"
                        switch
                    />
                </div>
              <div class="form-group form-row" v-if="OrgInfo.internetconnection">
                  <label class="col-form-label col-sm-5" for>{{
                      $t("internetconnectiontype")
                  }}</label>
                  <div class="col-sm-7">
                      <b-form-input
                          :placeholder="$t('internetconnectiontype')"
                          v-model="OrgInfo.internetconnectiontype"
                      />
                  </div>
              </div>
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-5" for>{{
                        $t("connectivityspeed")
                    }}</label>
                    <div class="col-sm-7">
                        <b-form-input
                            :placeholder="$t('connectivityspeed')"
                            v-model="OrgInfo.connectivityspeed"
                        />
                    </div>
                </div>
                <b-modal size="xl" v-model="MapModal" no-close-on-backdrop hide-footer :title="$t('map')">
                    <div style="width : 100%;height : 80vh">
                        <gmap-map
                            :center="position"
                            :zoom="17"
                            style="width:100%;height : 100%"
                            @click="myFunc"
                            map-type-id="hybrid"
                            
                        >
                        <GmapMarker
                            :key="'three'"
                            :position="position"
                            :clickable="true"
                        >
                            <gmap-info-window 
                                @closeclick="window_open1=false" 
                                :opened="window_open1" 
                                :position="position"
                                :options="{
                                    pixelOffset: {
                                        width: 0,
                                        height: 0
                                    }
                                }"
                            >
                                {{ OrgInfo.organizationname }}
                            </gmap-info-window>  
                        </GmapMarker>
                        </gmap-map>
                    </div>
                    <b-row class="mt-1">
                        <b-col class="text-center">
                            <b-button variant="outline-danger" v-ripple.400="'rgba(113, 102, 240, 0.15)'" @click="MapModal=false" class="mr-1" size="sm"> {{ $t('back') }} </b-button>
                            <b-button :variant="isChange ? 'primary' : 'outline-primary'" v-ripple.400="'rgba(113, 102, 240, 0.15)'" @click="isChange = !isChange" class="mr-1" size="sm"> {{ $t('Edit') }} </b-button>
                            <b-button variant="outline-success" @click="AddMarker"  size="sm"> {{ $t('Save') }} </b-button>
                        </b-col>
                    </b-row>
                </b-modal>
              </b-card>
              <b-card>
                    <div class="d-flex justify-content-between">
                        <h4 class="text-center m-0"> <feather-icon size="15" icon="MapIcon"></feather-icon>  {{ $t('map') }} </h4> 
                        <a class="text-primary"  @click="OpenMapModal"> <feather-icon icon="PlusIcon"></feather-icon>  {{ $t('MarkInMap') }} </a>
                    </div>
                    <b-alert
                        class="mb-0 mt-1"
                        show
                        :variant="OrgInfo.latitude == 0 || OrgInfo.latitude == null ? 'danger' : 'success'"
                        >
                        <div class="alert-body">
                            <feather-icon
                            class="mr-25"
                            :icon="OrgInfo.latitude == 0 || OrgInfo.latitude == null ? 'AlertTriangleIcon' : 'CheckSquareIcon'"
                            />
                            <span class="ml-25" > {{ OrgInfo.latitude == 0 || OrgInfo.latitude == null ? $t('NotMarkedInMap') : $t('MarkedInMap') }}</span>
                        </div>
                    </b-alert>
                </b-card>
          </b-col>
      </b-row>
      
      <b-row class="mt-1">
          <b-col>
              <b-card class="w-100">
                  
                  <b-row>
                      <b-col sm="12" md="12" lg="12" class="text-right">
                          <b-button @click="SaveData" size="sm" variant="outline-success"> <feather-icon icon="CheckIcon"></feather-icon> {{ $t('Save') }} </b-button>
                      </b-col>
                  </b-row>
              </b-card>
          </b-col>
      </b-row>
  </b-overlay>
</template>

<script>
import { BOverlay,BCard,BRow,BCol,BFormInput,BTabs,BTab,BButton,BTable,BLink, BFormGroup,VBTooltip,BModal,VBModal,BCardText, BFormCheckbox, BAlert } from 'bootstrap-vue'
import OrgInfoService from '@/services/info/orginfo.service'
import Ripple from 'vue-ripple-directive'
import flatPickr from 'vue-flatpickr-component';
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
export default {
    components : {BOverlay,BCard,BRow,BCol,BFormInput,BTabs,BTab,BButton,BTable,BLink, flatPickr, BFormGroup, BModal,BCardText,BFormCheckbox, BAlert},
    directives: {
        'b-tooltip': VBTooltip,
        'b-modal': VBModal
    },
    data(){
        return {
            show : false,
            MapModal : false,
            isChange : false,
            OrgInfo : {},
            filter : {
                isfarmfy : ''
            },
            lang : 'ru',
            config : {
                dateFormat : 'd.m.Y'
            },
            position : {
                lat : '',
                lng : ''
            },
            window_open1 : false
        }
    },
    created(){
        this.lang = localStorage.getItem('locale') || 'ru'
        this.show = true
        OrgInfoService.Get(this.$route.params.id).then(res => {
            this.show = false
            this.OrgInfo = res.data
            this.position = {
                lat : res.data.latitude,
                lng : res.data.longitude
            }
            console.log(this.OrgInfo.sector)
        }).catch(error => {
            this.$makeToast(error.response.data.error,'danger')
        })
    },
    directives: {
        Ripple,
    },
    methods:{
         
        check(){
            if (
                this.SchoolAdmissionQuota.ondate === 0 ||
                this.SchoolAdmissionQuota.ondate === null ||
                this.SchoolAdmissionQuota.ondate === undefined ||
                this.SchoolAdmissionQuota.ondate === ""
            ) {
                this.$makeToast(
                    this.$t("ondateNotSelected"),
                    "danger"
                );
                return false;
            } 
            if (
                this.SchoolAdmissionQuota.schoolyearid === 0 ||
                this.SchoolAdmissionQuota.schoolyearid === null ||
                this.SchoolAdmissionQuota.schoolyearid === undefined ||
                this.SchoolAdmissionQuota.schoolyearid === ""
            ) {
                this.$makeToast(
                    this.$t("schoolyearNotSelected"),
                    "danger"
                );
                return false;
            } 
            if (
                this.SchoolAdmissionQuota.oblastid === 0 ||
                this.SchoolAdmissionQuota.oblastid === null ||
                this.SchoolAdmissionQuota.oblastid === undefined ||
                this.SchoolAdmissionQuota.oblastid === ""
            ) {
                this.$makeToast(
                    this.$t("oblastNotSelected"),
                    "danger"
                );
                return false;
            } 
            if (
                this.SchoolAdmissionQuota.regionid === 0 ||
                this.SchoolAdmissionQuota.regionid === null ||
                this.SchoolAdmissionQuota.regionid === undefined ||
                this.SchoolAdmissionQuota.regionid === ""
            ) {
                this.$makeToast(
                    this.$t("regionNotSelected"),
                    "danger"
                );
                return false;
            } 
            if (
                this.SchoolAdmissionQuota.organizationid === 0 ||
                this.SchoolAdmissionQuota.organizationid === null ||
                this.SchoolAdmissionQuota.organizationid === undefined ||
                this.SchoolAdmissionQuota.organizationid === ""
            ) {
                this.$makeToast(
                    this.$t("organizationNotSelected"),
                    "danger"
                );
                return false;
            } 
            return true
        },
        myFunc(el){
            if(this.isChange){
                this.position.lat = el.latLng.lat(),
                this.position.lng = el.latLng.lng()
            }
        },
        AddMarker(){
            this.OrgInfo.latitude = this.position.lat
            this.OrgInfo.longitude = this.position.lng
            this.MapModal = false
        },
        OpenMapModal(){
            this.MapModal = true
        },
        SaveData(){
            if (!this.check()) {
                return false;
            }
            OrgInfoService.Update(this.OrgInfo).then((res) => {
               this.$makeToast(
                    this.$t("SaveSuccess"),
                    "success"
                ); 
                this.$router.push({path: `/info/orginfo`})
            })
            .catch(err => {
                this.$makeToast(
                    this.$t(err),
                    "danger"
                ); 
            })
        }
    }
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>