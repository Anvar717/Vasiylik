<template>
<div>
<b-overlay>
    <b-row>
       <b-col sm="12" md="2">
         <b-card class="d-flex justify-content-center text-center">
           <img v-if="ChildListToFamilyList.gender == 2" src="@/assets/images/163802.svg" width="80%" alt="">
           <img v-if="ChildListToFamilyList.gender != 2" src="@/assets/images/163807.svg" width="80%" alt="">
         </b-card>
       </b-col>
       <b-col sm="12" md="8" >
         <b-card style="min-height:200px">
           <table>
             <tr>
                <th class="text-primary h1"><span>{{ ChildListToFamilyList.personname }} </span></th>
              </tr>
           </table>
         </b-card>
       </b-col>
     </b-row>
        <b-row>
         <b-col>
          <b-card class="spes-card">
            <b-tabs v-model="tabIndex" justified pills>
              <b-tab active>
                <template #title>
                  <feather-icon icon="UserIcon"></feather-icon> {{ $t('AdditionalInformation') }}
                </template>
              </b-tab>
              <b-tab>
                <template #title>
                  <feather-icon icon="PlusIcon"></feather-icon> {{ $t('PersonRelativeTables') }}
                </template>
              </b-tab>
            </b-tabs>
         </b-card>
       </b-col>
     </b-row>
     <b-row v-if="tabIndex == 0">
       <b-col sm="12" md="4">
        <b-card>
            <b-list-group>
                <b-list-group-item class="d-flex justify-content-between">
                  <span>{{ $t("childregistrationactdocdate") }} :</span>
                  <span> <b> {{ ChildListToFamilyList.childregistrationactdocdate }} </b> </span>
                </b-list-group-item>
                 <b-list-group-item class="d-flex justify-content-between">
                  <span>{{ $t("personname") }} :</span>
                  <span> <b> {{ ChildListToFamilyList.personname }} </b> </span>
                </b-list-group-item>
                 <b-list-group-item class="d-flex justify-content-between">
                  <span>{{ $t("pinfl") }} :</span>
                  <span> <b> {{ ChildListToFamilyList.pinfl }} </b> </span>
                </b-list-group-item>
                 <b-list-group-item class="d-flex justify-content-between">
                  <span>{{ $t("dateofbirth") }} :</span>
                  <span> <b> {{ ChildListToFamilyList.dateofbirth }} </b> </span>
                </b-list-group-item>
            </b-list-group>
        </b-card>
       </b-col>
       <b-col sm="12" md="4">
         <b-card>
               <b-list-group>
                <b-list-group-item class="d-flex justify-content-between">
                  <span>{{ $t("gender") }} :</span>
                  <span> <b> {{ ChildListToFamilyList.gendername }} </b> </span>
                </b-list-group-item>
                 <b-list-group-item class="d-flex justify-content-between">
                  <span>{{ $t("nationalityname") }} :</span>
                  <span> <b> {{ ChildListToFamilyList.nationalityname }} </b> </span>
                </b-list-group-item>
                 <b-list-group-item class="d-flex justify-content-between">
                  <span>{{ $t("citizenshipname") }} :</span>
                  <span> <b> {{ ChildListToFamilyList.citizenshipname }} </b> </span>
                </b-list-group-item>
                 <b-list-group-item class="d-flex justify-content-between">
                  <span>{{ $t("identitydocumentname") }} :</span>
                  <span> <b> {{ ChildListToFamilyList.identitydocumentname }} </b> </span>
                </b-list-group-item>
            </b-list-group>
         </b-card>
       </b-col>
       <b-col sm="12" md="4">
          <b-card>
                <b-list-group>
                <b-list-group-item class="d-flex justify-content-between">
                  <span>{{ $t("documentseries") }} :</span>
                  <span> <b> {{ ChildListToFamilyList.documentseries }} </b> </span>
                </b-list-group-item>
                 <b-list-group-item class="d-flex justify-content-between">
                  <span>{{ $t("documentnumber") }} :</span>
                  <span> <b> {{ ChildListToFamilyList.documentnumber }} </b> </span>
                </b-list-group-item>
            </b-list-group>
          </b-card>
       </b-col>
     </b-row>
     <b-row v-if="tabIndex == 1">
         <b-col sm="12" md="4"  v-for="(item, index) in ChildListToFamilyList.Tables" :key="index" >
          <b-card>
              <b-list-group>
                  <b-list-group-item class="d-flex justify-content-between">
                      <span>{{ $t("kinshipdegreename") }} :</span>
                      <span> <b> {{ item.kinshipdegreename }} </b> </span>
                  </b-list-group-item>
                    <b-list-group-item class="d-flex justify-content-between">
                      <span>{{ $t("childregistrationactdocdate") }} :</span>
                      <span> <b> {{ item.childregistrationactdocdate }} </b> </span>
                  </b-list-group-item>
                    <b-list-group-item class="d-flex justify-content-between">
                      <span>{{ $t("personname") }} :</span>
                      <span> <b> {{ item.personname }} </b> </span>
                  </b-list-group-item>
                    <b-list-group-item class="d-flex justify-content-between">
                      <span>{{ $t("pinfl") }} :</span>
                      <span> <b> {{ item.pinfl }} </b> </span>
                  </b-list-group-item>
                   <b-list-group-item class="d-flex justify-content-between">
                      <span>{{ $t("dateofbirth") }} :</span>
                      <span> <b> {{ item.dateofbirth }} </b> </span>
                  </b-list-group-item>
                   <b-list-group-item class="d-flex justify-content-between">
                      <span>{{ $t("gendername") }} :</span>
                      <span> <b> {{ item.gendername }} </b> </span>
                  </b-list-group-item>
                    <b-list-group-item class="d-flex justify-content-between">
                      <span>{{ $t("nationalityname") }} :</span>
                      <span> <b> {{ item.nationalityname }} </b> </span>
                  </b-list-group-item>
                    <b-list-group-item class="d-flex justify-content-between">
                      <span>{{ $t("citizenshipname") }} :</span>
                      <span> <b> {{ item.citizenshipname }} </b> </span>
                  </b-list-group-item>
                   <b-list-group-item class="d-flex justify-content-between">
                      <span>{{ $t("identitydocumentname") }} :</span>
                      <span> <b> {{ item.identitydocumentname }} </b> </span>
                  </b-list-group-item>
                    <b-list-group-item class="d-flex justify-content-between">
                      <span>{{ $t("documentseries") }} :</span>
                      <span> <b> {{ item.documentseries }} </b> </span>
                  </b-list-group-item>
                    <b-list-group-item class="d-flex justify-content-between">
                      <span>{{ $t("documentnumber") }} :</span>
                      <span> <b> {{ item.documentnumber }} </b> </span>
                  </b-list-group-item>
              </b-list-group>
          </b-card>
         </b-col>
     </b-row>
</b-overlay>
</div>
</template>
<script>
import ChildListToFamilyService from "@/services/document/childlisttofamily.service";
import {
  BRow,
  BCol,
  BCard,
  BButton,
  BSpinner,
  BModal,
  BTable,
  BBadge,
  BFormInput,
  BTabs,
  BTab,
  BAvatar,
  BOverlay,
  BListGroup,
  BListGroupItem
} from "bootstrap-vue";
import flatPickr from "vue-flatpickr-component";
export default {
  components: {
    BRow,
    BCol,
    BCard,
    BButton,
    BSpinner,
    BTable,
    BModal,
    BBadge,
    flatPickr,
    BFormInput,
    BTabs,
    BTab,
    BAvatar,
    BOverlay,
    BListGroup,
    BListGroupItem
  },
  data() {
    return {
      ChildListToFamilyList: {},
      config: { dateFormat: "d.m.Y" },
      tabIndex: 0,
      personTabIndex : 0,
      previewshow : false,
       tabrow:{
          id: 0,
          ownerid: 0,
          kinshipdegreeid: 0,
          kinshipdegreename: "",
          childregistrationactid: 0,
          personid: 0,
          personname: "",
          pinfl: "",
          dateofbirth: "",
          gendername: "",
          nationalityname: "",
          citizenshipname : "",
          Status: 1,
      },
    };
  },
  created() {
    this.previewshow = true
    ChildListToFamilyService.Get(this.$route.params.id)
      .then((res) => {
        this.ChildListToFamilyList = res.data;
        this.previewshow = false
      })
      .catch((err) => {
        this.$makeToast(err.response.data.error, "danger");
      });
  },
  methods: {
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-flatpicker.scss";
.spes-card .card-body{
  padding-bottom: 6px;
}
</style>