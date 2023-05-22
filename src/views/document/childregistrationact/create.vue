<template>
  <b-overlay :show="show">
    <b-card>
      <b-row>
        <b-col sm="12" md="4" lg="4">
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for
              >{{ $t("docnumber") }} <span style="color: red">*</span></label
            >
            <div class="col-sm-7">
              <b-form-input
                :placeholder="$t('docnumber')"
                v-model="ChildRegistrationAct.docnumber"
              />
            </div>
          </div>
        </b-col>
        <b-col sm="12" md="4" lg="4"> 
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for
              >{{ $t("docdate") }} <span style="color: red">*</span></label
            >
            <div class="col-sm-7">
              <custom-date-picker
                v-model="ChildRegistrationAct.docdate"
                @keyup="docdateValue"
                format="DD.MM.YYYY"
                type="date"
                :clearable="false"
                :placeholder="$t('date')"
              >
              </custom-date-picker>
            </div>
          </div>
        </b-col>
        <b-col sm="12" md="4" lg="4"> </b-col>
      </b-row>
    </b-card>
    <b-modal
      v-model="DeleteModal"
      :title="$t('Delete')"
      no-close-on-backdrop
      hide-footer
    >
      <b-card-text>
        <h5>{{ DeleteItem.projectfiletext }}</h5>
        <h5>{{ $t("WantDelete") }}</h5>
      </b-card-text>
      <b-row>
        <b-col class="text-right">
          <b-button @click="DeleteModal = false" class="mr-1" variant="danger">
            {{ $t("no") }}
          </b-button>
          <b-button @click="Delete(DeleteItem)" variant="success">
            <b-spinner v-if="DeleteLoading" small></b-spinner> {{ $t("yes") }}
          </b-button>
        </b-col>
      </b-row>
    </b-modal>
    <b-row>
      <b-col>
        <b-card>
            <form-wizard 
               color="#0f1bf5"
               :title="null"
               :subtitle="null"
               class="steps-transparent mb-3"
               @nextTab="Change"
               >
                <template slot="footer" slot-scope="props">
                <div class="wizard-footer-left">
                    <b-button
                        variant="primary"
                        v-if="props.activeTabIndex > 0"
                        @click="props.prevTab()"
                        :style="props.fillButtonStyle"
                        >{{ $t("previous") }}
                    </b-button>
                </div>
                <div class="wizard-footer-right">
                    <b-button
                        variant="primary"
                        v-if="!props.isLastStep"
                        @click="Change(props)"
                        class="wizard-footer-right"
                        :style="props.fillButtonStyle"
                    >
                        {{ $t("next") }}
                    </b-button>

                    <b-button
                        variant="success"
                        v-else
                        @click="SaveData"
                        class="wizard-footer-right finish-button"
                        :style="props.fillButtonStyle"
                    >
                        <b-spinner v-if="SaveLoading && props.isLastStep" small></b-spinner>
                        {{ props.isLastStep ? $t("Save") : $t("next") }}
                    </b-button>
                </div>
            </template>
             <tab-content
                :title="$t('AdditionalInformation')"
                icon="feather icon-user-plus"
             >
                <b-row>
                  <b-col>
                    <edit-person-component
                      :iscomponent="true"
                      :person-data="Person"
                      :is-student="true"
                      ref="childcomp"
                      @persondatachange="persondatachange($event)"
                    >
                    </edit-person-component>
                  </b-col>
                </b-row>
             </tab-content>
             <tab-content
              :title="$t('ParametersInfo')"
              icon="feather icon-plus-circle"
             >
              <b-row>
                <b-col sm="12" md="6" lg="6">
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-5" for>{{
                      $t("childweight")
                    }} </label>
                    <div class="col-sm-7">
                      <b-form-input
                        :placeholder="$t('childweight')"
                        v-model="tabrow.childweight"
                        type="number"
                      />
                    </div>
                  </div>
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-5" for>{{
                      $t("childeyecolor")
                    }} </label>
                    <div class="col-sm-7">
                      <v-select
                        :options="childeyecolorList"
                        :reduce="(item) => item.id"
                        :placeholder="$t('ChooseBelow')"
                        label="name"
                        v-model="tabrow.childeyecolorid"
                      ></v-select>
                    </div>
                  </div>
                    <div class="form-group form-row">
                    <label class="col-form-label col-sm-5" for>{{
                      $t("childcharacter")
                    }} </label>
                    <div class="col-sm-7">
                      <v-select
                        :options="childcharacterList"
                        :reduce="(item) => item.id"
                        :placeholder="$t('ChooseBelow')"
                        label="name"
                        v-model="tabrow.childcharacterid"
                      ></v-select>
                    </div>
                  </div>
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-5" for>{{
                      $t("guardianshiplessreason")
                    }}</label>
                    <div class="col-sm-7">
                      <v-select
                        :options="GuardianshiplessReasonList"
                        :reduce="(item) => item.id"
                        :placeholder="$t('ChooseBelow')"
                        label="name"
                        v-model="tabrow.guardianshiplessreasonid"
                      ></v-select>
                    </div>
                  </div>
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-5" for>{{
                      $t("healthtype")
                    }}</label>
                    <div class="col-sm-7">
                      <v-select
                        :options="healthtypeList"
                        :reduce="(item) => item.id"
                        :placeholder="$t('ChooseBelow')"
                        label="shortname"
                        v-model="tabrow.healthtypeid"
                      ></v-select>
                    </div>
                  </div>
                </b-col>
                <b-col sm="12" md="6" lg="6">
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-5" for>{{
                      $t("childheight")
                    }} </label>
                    <div class="col-sm-7">
                      <b-form-input
                        :placeholder="$t('childheight')"
                        v-model="tabrow.childheight"
                        type="number"
                      />
                    </div>
                  </div>
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-5" for>{{
                      $t("childhaircolor")
                    }}  </label>
                    <div class="col-sm-7">
                      <v-select
                        :options="childhaircolorList"
                        :reduce="(item) => item.id"
                        :placeholder="$t('ChooseBelow')"
                        label="name"
                        v-model="tabrow.childhaircolorid"
                      ></v-select>
                    </div>
                  </div>
                      <div class="form-group form-row">
                    <label class="col-form-label col-sm-5" for>{{
                      $t("childmeasurestakenforadoption")
                    }}</label>
                    <div class="col-sm-7">
                      <v-select
                        :options="childmeasurestakenforadoptionList"
                        :reduce="(item) => item.id"
                        :placeholder="$t('ChooseBelow')"
                        label="name"
                        v-model="tabrow.childmeasurestakenforadoptionid"
                      ></v-select>
                    </div>
                  </div>
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-5" for>{{
                      $t("educationplacetype")
                    }}</label>
                    <div class="col-sm-7">
                      <v-select
                        :options="educationplacetypeList"
                        :reduce="(item) => item.id"
                        :placeholder="$t('ChooseBelow')"
                        label="shortname"
                        v-model="tabrow.educationplacetypeid"
                        @input="changeEducationPlaceType(tabrow.educationplacetypeid)"
                      ></v-select>
                    </div>
                  </div>
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-5" for>{{
                      $t("schoolname")
                    }}</label>
                    <div class="col-sm-7">
                       <b-form-input
                          :placeholder="$t('schoolname')"
                          v-model="tabrow.schoolname"
                        />
                    </div>
                  </div>
                  <div
                    v-if="tabrow.healthtypeid == 3"
                    class="form-group form-row"
                  >
                    <label class="col-form-label col-sm-5" for>{{
                      $t("invalidtype")
                    }}</label>
                    <div class="col-sm-7">
                      <v-select
                        :options="invalidtypeList"
                        :reduce="(item) => item.id"
                        :placeholder="$t('ChooseBelow')"
                        label="shortname"
                        v-model="tabrow.invalidtypeid"
                      ></v-select>
                    </div>
                  </div>
                </b-col>
              </b-row>
             </tab-content>
              <tab-content
                :title="$t('Basicdocuments')"
                icon="feather icon-file-text"
            >
                <b-row>
            <b-col sm="12" md="6" lg="6">
              <div class="form-group form-row">
                <label class="col-form-label col-sm-5" for>{{
                  $t("decisionsorg")
                }} <span style="color: red"> * </span> </label>
                <div class="col-sm-7">
                  <v-select
                    :options="decisionsorgList"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    v-model="ChildRegistrationAct.decisionsorgid"
                  ></v-select>
                </div>
              </div>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-5" for>{{
                  $t("decisionsdate")
                }} <span style="color: red"> * </span> </label>
                <div class="col-sm-7">
                  <custom-date-picker
                    v-model="ChildRegistrationAct.decisionsdate"
                    format="DD.MM.YYYY"
                    type="date"
                    :clearable="false"
                    :placeholder="$t('decisionsdate')"
                  >
                  </custom-date-picker>
                </div>
              </div>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-5" for>{{
                  $t("decisionsnumber")
                }} <span style="color: red"> * </span> </label>
                <div class="col-sm-7">
                  <b-form-input
                    :placeholder="$t('decisionsnumber')"
                    v-model="ChildRegistrationAct.decisionsnumber"
                  />
                </div>
              </div>
              <div class="form-group form-row">
                 <label
                  for="textarea-default"
                  class="text-nowrap col-form-label col-sm-5"
                  >{{$t("decisiontext")}}</label>
                  <div class="col-sm-7">
                   <b-form-textarea
                   id="textarea-default"
                   :placeholder="$t('decisiontext')"
                   v-model="ChildRegistrationAct.decisiontext"
                   />
                  </div>
              </div>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-5" for>{{
                  $t("decisiontext")
                }} <span style="color: red"> * </span> </label>
                <div class="col-sm-7">
                  <v-select
                    :options="decisiontextList"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    v-model="ChildRegistrationAct.decisiontextid"
                  ></v-select>
                </div>
              </div>
            </b-col>
          </b-row>
            </tab-content>
             <tab-content
              :title="$t('RegistrationActTables')"
              icon="feather icon-home"
             >
                <b-row class="mb-2">
                <b-col class="text-right">
                  <b-button
                    @click="OpenModalAct"
                    size="sm"
                    variant="outline-primary"
                  >
                    <feather-icon icon="PlusIcon"></feather-icon>
                    {{ $t("Add") }}
                  </b-button>
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="12" md="12" lg="12">
                  <b-table
                    :fields="fieldsAct"
                    :items="ChildRegistrationAct.RegistrationActTables"
                    small
                    class="text-center"
                    :tbody-tr-class="rowClass"
                  >
                    <template #cell(actions)="{ item }">
                      <div class="text-center">
                        <b-link>
                          <feather-icon
                            style="margin-right: 5px"
                            @click="EditTableAct(item)"
                            icon="EditIcon"
                          ></feather-icon>
                        </b-link>
                        <b-link>
                          <feather-icon
                            @click="DeleteRow(item)"
                            icon="Trash2Icon"
                          ></feather-icon>
                        </b-link>
                      </div>
                    </template>
                  </b-table>
                </b-col>
              </b-row>
              <b-modal
                size="xl"
                v-model="ModalShowAct"
                no-close-on-backdrop
                hide-footer
                :title="$t('RegistrationActTables')"
              >
                <b-row>
                  <b-col>
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for>{{
                        $t("propertytype")
                      }}</label>
                      <div class="col-sm-7">
                        <v-select
                          :options="PropertytypeList"
                          :reduce="(item) => item.id"
                          :placeholder="$t('ChooseBelow')"
                          label="name"
                          v-model="tabrow3.propertytypeid"
                        ></v-select>
                      </div>
                    </div>
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for>{{
                        $t("propertyright")
                      }}</label>
                      <div class="col-sm-7">
                        <v-select
                          :options="PropertyrightList"
                          :reduce="(item) => item.id"
                          :placeholder="$t('ChooseBelow')"
                          label="name"
                          v-model="tabrow3.propertyrightid"
                        ></v-select>
                      </div>
                    </div>
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for>{{
                        $t("address")
                      }}</label>
                      <div class="col-sm-7">
                        <b-form-input
                          :placeholder="$t('address')"
                          v-model="tabrow3.address"
                        />
                      </div>
                    </div>
                  </b-col>
                  <b-col>
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for>{{
                        $t("totalarea")
                      }}</label>
                      <div class="col-sm-7">
                        <b-form-input
                          :placeholder="$t('totalarea')"
                          v-model="tabrow3.totalarea"
                          type="number"
                        />
                      </div>
                    </div>
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for>{{
                        $t("cadastralnumber")
                      }}</label>
                      <div class="col-sm-7">
                        <b-form-input
                          :placeholder="$t('cadastralnumber')"
                          v-model="tabrow3.cadastralnumber"
                          v-mask="'##:##:##:##:##:####:####:##'"
                        />
                      </div>
                    </div>
                  </b-col>
                </b-row>
                <b-row class="mt-2">
                  <b-col class="text-center">
                    <b-button
                      class="mr-2"
                      @click="ModalShowAct = false"
                      size="sm"
                      variant="outline-danger"
                    >
                      <feather-icon icon="ArrowLeftIcon"></feather-icon>
                      {{ $t("back") }}
                    </b-button>
                    <b-button
                      @click="AddRowAct"
                      size="sm"
                      variant="outline-success"
                    >
                      <feather-icon icon="CheckIcon"></feather-icon>
                      {{ $t("Save") }}
                    </b-button>
                  </b-col>
                </b-row>
              </b-modal>
             </tab-content>
             <tab-content :title="$t('ChildrenActFiles')" icon="feather icon-file">
               <b-row>
                <b-col sm="12" md="6" lg="4">
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-5" for
                      >{{ $t("childrenactfile") }}
                    </label>
                    <div class="col-sm-7">
                      <b-form-file
                        v-model="file"
                        :placeholder="$t('importfile')"
                        drop-placeholder="Drop file here..."
                        @change="ChangeFile"
                        accept=".pdf,.jpg,.png,.jpeg"
                        :browse-text="$t('select')"
                      />
                    </div>
                  </div>
                </b-col>
                <b-col sm="12" md="6" lg="6">
                  <h4 class="d-flex align-items-center">
                    <span style="color: red"> * </span>
                    <span> {{ $t("maxsize5mb") }} </span>
                  </h4>
                </b-col>
              </b-row>
              <b-row class="mt-1">
                    <b-col
                        sm="6"
                        md="3"
                        lg="2"
                        v-for="(item, index) in ChildRegistrationAct.File"
                        :key="index"
                        v-show="item.Status != 3"
                    >
                        <b-card class="text-center" bg-variant="info" text-variant="white">
                        <b-avatar class="mb-1" variant="light-primary" size="45">
                            <feather-icon size="21" icon="PaperclipIcon" class="text-white" />
                        </b-avatar>
                        <div class="truncate">
                            <h3 class="mb-25 font-weight-bolder text-white">
                            {{ item.projectfiletext }}
                            </h3>
                            <div>
                            <feather-icon
                                v-if="!item.DownloadLoading"
                                class="cursor-pointer mr-1"
                                @click="DownLoad(item)"
                                size="20"
                                icon="DownloadIcon"
                            ></feather-icon>
                            <b-spinner v-if="item.DownloadLoading" small></b-spinner>
                            <feather-icon
                                class="cursor-pointer"
                                @click="OpenDeleteModal(item)"
                                size="20"
                                icon="TrashIcon"
                            ></feather-icon>
                            </div>
                        </div>
                        </b-card>
                    </b-col>
                </b-row>
             </tab-content>
             <tab-content :title="$t('sadadsad')" icon="feather icon-home">
               <b-row>
                  <b-col sm="12" md="6" lg="6">
                    <div div class="form-group form-row mb-0">
                      <label
                        class="
                          col-form-label col-sm-5
                          d-flex
                          align-items-center
                        "
                        for
                        >{{ $t("needproperty") }}</label
                      >
                      <div class="col-sm-7">
                        <b-form-checkbox
                          @input="ClearIsinwaitinglist"
                          v-model="ChildRegistrationAct.needproperty"
                          name="check-button1"
                          switch
                          :disabled="ChildRegistrationAct.RegistrationActTables.filter(item => item.Status != 3).length != 0"
                        >
                        </b-form-checkbox>
                      </div>
                    </div>
                    <div
                      v-if="ChildRegistrationAct.needproperty == true"
                      class="form-group form-row mb-0"
                    >
                      <label
                        class="
                          col-form-label col-sm-5
                          d-flex
                          align-items-center
                        "
                        for
                        >{{ $t("isinwaitinglist") }}</label
                      >
                      <div class="col-sm-7">
                        <b-form-checkbox
                          @input="ClearIsinwaitinglist"
                          v-model="ChildRegistrationAct.isinwaitinglist"
                          name="check-button1"
                          switch
                        >
                        </b-form-checkbox>
                      </div>
                    </div>
                  </b-col>
                  <b-col
                    sm="12"
                    md="6"
                    lg="6"
                    v-if="
                      ChildRegistrationAct.needproperty &&
                      ChildRegistrationAct.isinwaitinglist
                    "
                  >
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for>{{
                        $t("waitinglistnumber")
                      }}</label>
                      <div class="col-sm-7">
                        <b-form-input
                          :placeholder="$t('waitinglistnumber')"
                          v-model="ChildRegistrationAct.waitinglistnumber"
                        />
                      </div>
                    </div>
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for>{{
                        $t("waitinglistdate")
                      }}</label>
                      <div class="col-sm-7">
                        <custom-date-picker
                          v-model="ChildRegistrationAct.waitinglistdate"
                          @keyup="waitinglistdateValue"
                          format="DD.MM.YYYY"
                          type="date"
                          :clearable="false"
                          :placeholder="$t('date')"
                        >
                        </custom-date-picker>
                      </div>
                    </div>
                  </b-col>
                </b-row>
             </tab-content>
        </form-wizard>
        </b-card>
      </b-col>
    </b-row>
    <!-- <b-row>
      <b-col>
        <b-card>
          <b-row>
            <b-col sm="12" md="6" lg="6" class="text-left"> </b-col>
            <b-col sm="12" md="6" lg="6" class="text-right">
              <b-button @click="SaveData" size="sm" variant="outline-success">
                <feather-icon icon="CheckIcon"></feather-icon> {{ $t("Save") }}
              </b-button>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row> -->
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
  BSpinner,
  BCardText,
  BFormCheckbox,
  BAlert,
  BInputGroup,
  BInputGroupAppend,
  BFormFile,
  BAvatar,
  BFormTextarea,
} from "bootstrap-vue";
import ChildRegistrationActService from "@/services/document/childregistrationact.service";
import CustomDatePicker from "@/views/components/customDatePicker.vue";
import PropertyRightService from "@/services/info/propertyright.service";
import PropertyTypeService from "@/services/info/propertytype.service";
import RegionService from "@/services/info/region.service";
import Ripple from "vue-ripple-directive";
import flatPickr from "vue-flatpickr-component";
import PersonService from "@/services/info/person.service";
import GuardianshiplessReasonService from "@/services/info/guardianshiplessreason.service";
import ChildrenList from "@/views/components/ChildrenList.vue";
import MfyService from "@/services/info/mfy.service";
import editPersonComponent from "../../info/person/edit.vue";
import ChildrenListDocument from "@/views/components/ChildrenListDocument.vue";
import AdmImageService from "@/services/others/admImage.service";
import HelperService from "@/services/others/helper.service";
import ColorService from "@/services/info/color.service";
import ChildCharacterService from "@/services/info/childcharacter.service";
import ChildMeasuresTakenForAdoptionService from "@/services/info/childmeasurestakenforadoption.service";
import { FormWizard, TabContent } from 'vue-form-wizard'
import DecisionsOrgService from "@/services/info/decisionsorg.service";
import DecisionTextService from "@/services/info/decisiontext.service";
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
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
    BSpinner,
    BTable,
    BLink,
    flatPickr,
    BFormGroup,
    BModal,
    BCardText,
    BFormCheckbox,
    BAlert,
    BInputGroup,
    BInputGroupAppend,
    ChildrenList,
    CustomDatePicker,
    editPersonComponent,
    ChildrenListDocument,
    BFormFile,
    BAvatar,
    FormWizard,
    TabContent,
    BFormTextarea,
  },
  directives: {
    "b-tooltip": VBTooltip,
  },
  data() {
    return {
      show: false,
      person: {},
      Person: {},
      ChildRegistrationAct: {},
      PropertytypeList: [],
      PropertyrightList: [],
      GuardianshiplessReasonList: [],
      decisionsorgList:[],
      decisiontextList: [],
      childhaircolorList: [],
      childeyecolorList: [],
      childcharacterList:[],
      childmeasurestakenforadoptionList:[],
      healthtypeList: [],
      waitinglistnumber: false,
      invalidtypeList: [],
      educationplacetypeList: [],
      needproperty: false,
      isinwaitinglist: false,
      fieldsAct: [
        {
          key: "propertytypename",
          label: this.$t("propertytype"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "propertyrightname",
          label: this.$t("propertyright"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "address",
          label: this.$t("address"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "totalarea",
          label: this.$t("totalarea"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "cadastralnumber",
          label: this.$t("cadastralnumber"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "actions",
          label: this.$t("actions"),
          thClass: "text-center",
          sortable: true,
        },
      ],
      lang: "ru",
      editedIndex3: -1,
      tabrow3: {
        id: 0,
        ownerid: 0,
        propertytypeid: 0,
        propertytypename: "",
        propertyrightid: 0,
        propertyrightname: "",
        address: "",
        totalarea: 0,
        cadastralnumber: "",
        Status: 1,
      },
      tabrow: {},
      filter: {
        documentSeries: "",
        documentNumber: "",
        pinfl: "",
        dateOfBirth: "",
        isStudent: true,
        INN: "",
        identityDocumentId: 0,
      },
      SearchLoading: false,
      ModalShowAct: false,
      file: [],
      DownloadLoading: false,
      DeleteItem: {
        id: 0,
        ownerid: 0,
        ordernumber: 0,
        projectfileid: 0,
        projectfiletext: "",
        projectfiletype: "",
        Status: 1,
        DownloadLoading: false,
      },
      DeleteModal: false,
      DeleteLoading: false
    };
  },
  created() {
    this.lang = localStorage.getItem("locale") || "ru";
    this.show = true;
    ChildRegistrationActService.Get(0).then((res) => {
        this.show = false;
        this.ChildRegistrationAct = res.data.result;
        this.ChildRegistrationAct.waitinglistdate = "";
        this.tabrow = this.ChildRegistrationAct.ParametersInfo;
        this.Person = res.data.result.person;
      })
      .catch((error) => {
        this.$makeToast(error.response.data.error, "danger");
      });
    ColorService.GetAll(true).then((res) => {
      this.childeyecolorList = res.data;
    });
     ColorService.GetAll(false).then((res) => {
      this.childhaircolorList = res.data;
    });
    GuardianshiplessReasonService.GetAll(this.lang).then((res) => {
      this.GuardianshiplessReasonList = res.data;
    });
    HelperService.GetInvalidTypeList().then((res) => {
      this.invalidtypeList = res.data;
    });
    HelperService.GetHealthTypeList().then((res) => {
      this.healthtypeList = res.data;
    });
    HelperService.GetEducationPlaceTypeList().then((res) => {
      this.educationplacetypeList = res.data;
    });
    PropertyRightService.GetAll(this.lang).then((res) => {
      this.PropertyrightList = res.data;
    });
    PropertyTypeService.GetAll(this.lang).then((res) => {
      this.PropertytypeList = res.data;
    });
    ChildCharacterService.GetAll(this.lang).then((res)=>{
      this.childcharacterList = res.data
    });
    ChildMeasuresTakenForAdoptionService.GetAll(this.lang).then((res)=>{
    this.childmeasurestakenforadoptionList = res.data
    });
     DecisionsOrgService.GetAll(this.lang).then((res) => {
      this.decisionsorgList = res.data;
    });
     DecisionTextService.GetAll(this.lang).then((res)=>{
      this.decisiontextList = res.data;
    })
  },
  directives: {
    Ripple,
  },
  methods: {
    Change(props){
        if(props.activeTabIndex == 0){
            if(!this.$refs.childcomp.check()){
                return false
            }
        }
        if(props.activeTabIndex == 1){
            // if(!this.ParametersInfoCheck()){
            // return false
            // }
        }
        if(props.activeTabIndex == 2){
            
        }
        if(props.activeTabIndex == 3){
            
        }
        if(props.activeTabIndex == 4){
            
        }
        props.nextTab();
    },
    ClearIsinwaitinglist() {
      this.ChildRegistrationAct.waitinglistnumber = "";
      this.ChildRegistrationAct.waitinglistdate = "";
    },
    Delete(item) {
      this.DeleteLoading = true;
      AdmImageService.Delete(item.projectfileid)
        .then((res) => {
          this.DeleteLoading = false;
          var self = this;
          self.ChildRegistrationAct.File.forEach(function (el) {
            if (item.projectfileid == el.projectfileid) {
              el.Status = 3;
            }
          });
          this.$makeToast(this.$t("DeleteSuccess"), "success");
          this.DeleteModal = false;
        })
        .catch((error) => {
          this.DeleteLoading = false;
          this.$makeToast(error.response.data.error, "danger");
        });
    },
    OpenDeleteModal(item) {
      this.DeleteModal = true;
      this.DeleteItem = item;
    },
    changeEducationPlaceType(id){
      var isschool
      isschool = this.educationplacetypeList.filter(item => item.id == id)[0].isschool
      if(isschool){
        HelperService.GetPersonEducationPlace(this.ChildRegistrationAct.person.DocumentTables[0].documentseries,this.ChildRegistrationAct.person.DocumentTables[0].documentnumber).then(res => {
          this.tabrow.schoolname = res.data.personEducationPlace.schoolname
          this.tabrow.schoolid = res.data.personEducationPlace.schoolid
        })
      }
    },
    DownLoad(item) {
      item.DownloadLoading = true;
      AdmImageService.Get(item.projectfileid)
        .then((res) => {
          item.DownloadLoading = false;
          this.downloadFile(res, item);
        })
        .catch((error) => {
          item.DownloadLoading = false;
          this.$makeToast(error.response.data.error, "danger");
        });
    },
    downloadFile(response, item) {
      var blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", item.projectfiletext); //or any other extension
      document.body.appendChild(link);
      link.click();
    },
    ChangeFile(data) {
      console.log(data.target.files[0]);
      if (data.target.files.length > 0 && data.target.files[0].size > 5242880) {
        this.$makeToast(this.$t("morethen5mb"), "danger");
        return false;
      }
      var formData = new FormData();
      formData.append("attachfile", data.target.files[0]);
      this.show = true;
      AdmImageService.AttachImage(formData)
        .then((res) => {
          this.show = false;
          this.ChildRegistrationAct.File.push({
            id: 0,
            ownerid: 0,
            ordernumber: 0,
            projectfileid: res.data.id,
            projectfiletext: res.data.pfiletext,
            projectfiletype: res.data.pfiletype,
            Status: 1,
            DownloadLoading: false,
          });
        })
        .catch((error) => {
          this.show = false;
          this.$makeToast(error.response.data.error, "danger");
        });
      this.file = [];
    },
    persondatachange(data) {
      this.ChildRegistrationAct.person = data;
    },
    waitinglistdateValue(value) {
      this.ChildRegistrationAct.waitinglistdate = value;
    },
    docdateValue(value) {
      this.ChildRegistrationAct.docdate = value;
    },
    OpenModalAct() {
      this.ModalShowAct = true;
      this.tabrow3 = {
        id: 0,
        ownerid: 0,
        propertytypeid: 0,
        propertytypename: "",
        propertyrightid: 0,
        propertyrightname: "",
        address: "",
        totalarea: 0,
        cadastralnumber: "",
        Status: 1,
      };
      this.editedIndex3 = -1;
    },
    rowClass(item, type) {
      if (item.Status === 3) return "d-none";
    },
    AddRowAct() {
      this.tabrow3.propertytypename = this.PropertytypeList.filter(
        (item) => this.tabrow3.propertytypeid === item.id
      )[0].name;
      this.tabrow3.propertyrightname = this.PropertyrightList.filter(
        (item) => this.tabrow3.propertyrightid === item.id
      )[0].name;
      if (this.editedIndex3 > -1) {
        Object.assign(
          this.ChildRegistrationAct.RegistrationActTables[this.editedIndex3],
          this.tabrow3
        );
      } else {
        this.ChildRegistrationAct.RegistrationActTables.push(this.tabrow3);
      }
      this.ModalShowAct = false;
    },
    EditTableAct(item) {
      if (item.Status == 0) {
        item.Status = 2;
      }
      this.editedIndex3 =
        this.ChildRegistrationAct.RegistrationActTables.indexOf(item);
      this.tabrow3 = Object.assign({}, item);
      this.ModalShowAct = true;
    },
    DeleteRow(item) {
      item.Status = 3;
    },
    check() {
      if (
        this.ChildRegistrationAct.docnumber === 0 ||
        this.ChildRegistrationAct.docnumber === null ||
        this.ChildRegistrationAct.docnumber === undefined ||
        this.ChildRegistrationAct.docnumber === ""
      ) {
        this.$makeToast(this.$t("docnumberNotSelected"), "danger");
        return false;
      }
      if (
        this.ChildRegistrationAct.docdate === 0 ||
        this.ChildRegistrationAct.docdate === null ||
        this.ChildRegistrationAct.docdate === undefined ||
        this.ChildRegistrationAct.docdate === ""
      ) {
        this.$makeToast(this.$t("docdateNotSelected"), "danger");
        return false;
      }
      return true;
    },
    SaveData() {
      if (!this.check()) {
        return false;
      }

      ChildRegistrationActService.Update(this.ChildRegistrationAct)
        .then((res) => {
          this.$makeToast(this.$t("SaveSuccess"), "success");
          this.$router.push({ name: `childregistrationact` });
        })
        .catch((err) => {
          this.$makeToast(this.$t(err.response.data.error), "danger");
        });
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-flatpicker.scss";
</style>
