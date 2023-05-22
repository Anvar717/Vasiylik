<template>
  <b-overlay :show="show">
    <b-card>
      <b-row>
        <b-col sm="12" md="12" lg="3">
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("docdate")
            }}</label>
            <div class="col-sm-7">
              <custom-date-picker
                v-model="ChildListToFamily.docdate"
                @keyup="dateofbirthValue"
                format="DD.MM.YYYY"
                type="date"
                :clearable="false"
                :placeholder="$t('docdate')"
              >
              </custom-date-picker>
            </div>
          </div>
        </b-col>
        <b-col sm="12" md="12" lg="3">
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("childsearch")
            }}</label>
            <div class="col-sm-7">
              <b-form-input
                :placeholder="$t('personname')"
                v-model="ChildListToFamily.personname"
              />
            </div>
          </div>
        </b-col>
        <b-col sm="12" md="12" lg="2">
          <div>
            <b-button @click="OpenChildListToFamily" variant="primary">
              <feather-icon v-if="!SearchLoading" icon="SearchIcon" />
              <b-spinner v-if="SearchLoading" small></b-spinner>
              {{ $t("selection") }}
            </b-button>
          </div>
        </b-col>
        <b-col sm="12" md="12" lg="3">
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("UniqueCode")
            }}</label>
            <div style="margin-top: 8px" class="col-sm-7">
              {{ ChildListToFamily.docnumber }}
            </div>
          </div>
        </b-col>
      </b-row>
    </b-card>
    <!-- <b-card v-if="ChildListToFamily.personname">
      <b-row>
        <b-col sm="12" lg="6" md="6">
          <table>
            <tr>
              <td class="pt-1">{{ $t("childregistrationactdocdate") }}:</td>
              <td class="pl-1 pt-1">
                <b>{{ ChildListToFamily.childregistrationactdocdate }}</b>
              </td>
            </tr>
            <tr>
              <td class="pt-1">{{ $t("personname") }}:</td>
              <td class="pl-1 pt-1">
                <b>{{ ChildListToFamily.personname }}</b>
              </td>
            </tr>
            <tr>
              <td class="pt-1">{{ $t("pinfl") }}:</td>
              <td class="pl-1 pt-1">
                <b>{{ ChildListToFamily.pinfl }}</b>
              </td>
            </tr>
            <tr>
              <td class="pt-1">{{ $t("dateofbirth") }}:</td>
              <td class="pl-1 pt-1">
                <b>{{ ChildListToFamily.dateofbirth }}</b>
              </td>
            </tr>
            <tr>
              <td class="pt-1">{{ $t("gender") }}:</td>
              <td class="pl-1 pt-1">
                <b>{{ ChildListToFamily.gendername }}</b>
              </td>
            </tr>
            <tr>
              <td class="pt-1">{{ $t("nationality") }}:</td>
              <td class="pl-1 pt-1">
                <b>{{ ChildListToFamily.nationalityname }}</b>
              </td>
            </tr>
            <tr>
              <td class="pt-1">{{ $t("citizenship") }}:</td>
              <td class="pl-1 pt-1">
                <b>{{ ChildListToFamily.citizenshipname }}</b>
              </td>
            </tr>
            <tr>
              <td class="pt-1">{{ $t("identitydocument") }}:</td>
              <td class="pl-1 pt-1">
                <b>{{ ChildListToFamily.identitydocumentname }}</b>
              </td>
            </tr>
            <tr>
              <td class="pt-1">{{ $t("documentseries") }}:</td>
              <td class="pl-1 pt-1">
                <b>{{ ChildListToFamily.documentseries }}</b>
              </td>
            </tr>
            <tr>
              <td class="pt-1">{{ $t("documentnumber") }}:</td>
              <td class="pl-1 pt-1">
                <b>{{ ChildListToFamily.documentnumber }}</b>
              </td>
            </tr>
          </table>
        </b-col>
      </b-row>
    </b-card> -->
    <b-card v-if="ChildListToFamily.personname">
      <b-row>
        <b-col sm="12" md="6" lg="4">
          <b-list-group>
            <b-list-group-item class="d-flex justify-content-between">
              <span> {{ $t("childregistrationactdocdate") }}: </span>
              <span>
                <b> {{ ChildListToFamily.childregistrationactdocdate }} </b>
              </span>
            </b-list-group-item>
            <b-list-group-item class="d-flex justify-content-between">
              <span> {{ $t("personname") }}: </span>
              <span>
                <b> {{ ChildListToFamily.personname }} </b>
              </span>
            </b-list-group-item>
            <b-list-group-item class="d-flex justify-content-between">
              <span> {{ $t("pinfl") }}: </span>
              <span>
                <b> {{ ChildListToFamily.pinfl }} </b>
              </span>
            </b-list-group-item>
            <b-list-group-item class="d-flex justify-content-between">
              <span> {{ $t("dateofbirth") }}: </span>
              <span>
                <b> {{ ChildListToFamily.dateofbirth }} </b>
              </span>
            </b-list-group-item>
            <b-list-group-item class="d-flex justify-content-between">
              <span> {{ $t("gender") }}: </span>
              <span>
                <b> {{ ChildListToFamily.gendername }} </b>
              </span>
            </b-list-group-item>
          </b-list-group>
        </b-col>
        <b-col sm="12" md="6" lg="4">
          <b-list-group>
            <b-list-group-item class="d-flex justify-content-between">
              <span> {{ $t("nationality") }}: </span>
              <span>
                <b> {{ ChildListToFamily.nationalityname }} </b>
              </span>
            </b-list-group-item>
            <b-list-group-item class="d-flex justify-content-between">
              <span> {{ $t("citizenship") }}: </span>
              <span>
                <b> {{ ChildListToFamily.citizenshipname }} </b>
              </span>
            </b-list-group-item>
            <b-list-group-item class="d-flex justify-content-between">
              <span> {{ $t("identitydocument") }}: </span>
              <span>
                <b> {{ ChildListToFamily.identitydocumentname }} </b>
              </span>
            </b-list-group-item>
            <b-list-group-item class="d-flex justify-content-between">
              <span> {{ $t("documentseries") }}: </span>
              <span>
                <b> {{ ChildListToFamily.documentseries }} </b>
              </span>
            </b-list-group-item>
            <b-list-group-item class="d-flex justify-content-between">
              <span> {{ $t("documentnumber") }}: </span>
              <span>
                <b> {{ ChildListToFamily.documentnumber }} </b>
              </span>
            </b-list-group-item>
          </b-list-group>
        </b-col>
      </b-row>
    </b-card>
    <b-card>
      <b-row class="mb-2">
        <b-col sm="12" lg="6" md="6">
          <span
            ><b>{{ $t("PersonRelativeTables") }}</b></span
          >
        </b-col>
        <b-col class="text-right">
          <b-button
            @click="OpenModalRelative"
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
            :fields="fieldsRelative"
            :items="ChildListToFamily.Tables"
            small
            class="text-center"
          >
            <template #cell(actions)="{ item }">
              <div class="text-center">
                <b-link>
                  <feather-icon
                    style="margin-right: 5px"
                    @click="EditTableRelative(item)"
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
        v-model="ModalShowRelative"
        no-close-on-backdrop
        hide-footer
        :title="$t('PersonRelativeTables')"
      >
        <b-row class="mb-2">
          <b-col sm="12" md="1" lg="2">
            <div>
              <label>{{ $t("kinshipdegree") }}</label>
            </div>
            <div>
              <v-select
                :options="KinshipdegreeList"
                :reduce="(item) => item.id"
                :placeholder="$t('ChooseBelow')"
                label="name"
                v-model="tabrowfilter.kinshipdegreeid"
                @input="KinshipdegreeChange"
              ></v-select>
            </div>
          </b-col>
          <b-col sm="12" md="1" lg="2">
            <label>{{ $t("identitydocument") }}</label>
            <div>
              <v-select
                :options="IdentityDocumentList"
                :reduce="(item) => item.id"
                :placeholder="$t('ChooseBelow')"
                label="name"
                v-model="tabrowfilter.identityDocumentId"
                @input="ChangeIdentityDocFamily"
              ></v-select>
            </div>
          </b-col>
          <b-col sm="12" md="1" lg="2">
            <label>{{ $t("documentseries") }}</label>
            <div>
              <v-select
                v-if="tabrowfilter.identityDocumentId == 1"
                :options="DocumentSeriesList"
                :reduce="(item) => item.name"
                label="name"
                :placeholder="$t('documentseries')"
                v-model="tabrowfilter.documentSeries"
              >
              </v-select>
              <b-form-input
                class="text-upper"
                v-if="tabrowfilter.identityDocumentId != 1"
                :placeholder="$t('AA')"
                v-model="tabrowfilter.documentSeries"
                v-mask="'AA'"
              />
            </div>
          </b-col>
          <b-col sm="12" md="2" lg="2">
            <label>{{ $t("documentnumber") }}</label>
            <div>
              <b-form-input
                :placeholder="$t('documentnumber')"
                v-model="tabrowfilter.documentNumber"
                v-mask="'#######'"
              />
            </div>
          </b-col>
          <b-col
            sm="12"
            md="2"
            lg="2"
            v-if="
              tabrowfilter.identityDocumentId != 3 &&
              tabrowfilter.identityDocumentId != 4
            "
          >
            <label>{{ $t("dateofbirth") }}</label>
            <div>
              <custom-date-picker
                v-model="tabrowfilter.dateofbirth"
                @keyup="BindValue1"
                format="DD.MM.YYYY"
                type="date"
                :clearable="false"
                :placeholder="$t('dateofbirth')"
              >
              </custom-date-picker>
            </div>
          </b-col>
          <b-col sm="12" md="2" lg="2">
            <label for=""></label>
            <div style="margin-top: 2px">
              <b-button @click="getpersonRelativedata" variant="primary">
                <feather-icon v-if="!SearchFamilyLoading" icon="SearchIcon" />
                <b-spinner v-if="SearchFamilyLoading" small></b-spinner>
                {{ $t("search") }}
              </b-button>
            </div>
          </b-col>
        </b-row>
        <b-card v-if="tabrow.childregistrationactdocdate">
          <b-row>
            <b-col sm="12" lg="6" md="6">
              <table>
                <tr>
                  <td class="pt-1">{{ $t("kinshipdegreename") }}:</td>
                  <td class="pl-1 pt-1">
                    <b>{{ tabrow.kinshipdegreename }}</b>
                  </td>
                </tr>
                <tr>
                  <td class="pt-1">{{ $t("childregistrationactdocdate") }}:</td>
                  <td class="pl-1 pt-1">
                    <b>{{ tabrow.childregistrationactdocdate }}</b>
                  </td>
                </tr>
                <tr>
                  <td class="pt-1">{{ $t("personname") }}:</td>
                  <td class="pl-1 pt-1">
                    <b>{{ tabrow.personname }}</b>
                  </td>
                </tr>
                <tr>
                  <td class="pt-1">{{ $t("pinfl") }}:</td>
                  <td class="pl-1 pt-1">
                    <b>{{ tabrow.pinfl }}</b>
                  </td>
                </tr>
                <tr>
                  <td class="pt-1">{{ $t("dateofbirth") }}:</td>
                  <td class="pl-1 pt-1">
                    <b>{{ tabrow.dateofbirth }}</b>
                  </td>
                </tr>
                <tr>
                  <td class="pt-1">{{ $t("gender") }}:</td>
                  <td class="pl-1 pt-1">
                    <b>{{ tabrow.gendername }}</b>
                  </td>
                </tr>
                <tr>
                  <td class="pt-1">{{ $t("nationality") }}:</td>
                  <td class="pl-1 pt-1">
                    <b>{{ tabrow.nationalityname }}</b>
                  </td>
                </tr>
                <tr>
                  <td class="pt-1">{{ $t("citizenship") }}:</td>
                  <td class="pl-1 pt-1">
                    <b>{{ tabrow.citizenshipname }}</b>
                  </td>
                </tr>
                <tr>
                  <td class="pt-1">{{ $t("identitydocument") }}:</td>
                  <td class="pl-1 pt-1">
                    <b>{{ tabrow.identitydocument }}</b>
                  </td>
                </tr>
                <tr>
                  <td class="pt-1">{{ $t("documentseries") }}:</td>
                  <td class="pl-1 pt-1">
                    <b>{{ tabrow.documentseries }}</b>
                  </td>
                </tr>
                <tr>
                  <td class="pt-1">{{ $t("documentnumber") }}:</td>
                  <td class="pl-1 pt-1">
                    <b>{{ tabrow.documentnumber }}</b>
                  </td>
                </tr>
              </table>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col class="text-center">
              <b-button
                class="mr-2"
                @click="ModalShowRelative = false"
                size="sm"
                variant="outline-danger"
              >
                <feather-icon icon="ArrowLeftIcon"></feather-icon>
                {{ $t("back") }}
              </b-button>
              <b-button
                @click="AddRowRelative"
                size="sm"
                variant="outline-success"
              >
                <feather-icon icon="CheckIcon"></feather-icon>
                {{ $t("Save") }}
              </b-button>
            </b-col>
          </b-row>
        </b-card>
      </b-modal>
    </b-card>
    <b-row class="mt-1">
      <b-col>
        <b-card class="w-100">
          <b-row>
            <b-col sm="12" md="12" lg="12" class="text-right">
              <b-button @click="SaveData" size="sm" variant="outline-success">
                <feather-icon icon="CheckIcon"></feather-icon> {{ $t("Save") }}
              </b-button>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <b-modal
      no-close-on-backdrop
      hide-footer
      size="xl"
      v-model="ChildListToFamilyModal"
      :title="$t('ChildListToFamily')"
    >
      <b-row>
        <b-col sm="12" md="2" lg="3">
          <label>{{ $t("identitydocument") }}</label>
          <div>
            <v-select
              :options="IdentityDocumentList"
              :reduce="(item) => item.id"
              :placeholder="$t('ChooseBelow')"
              label="name"
              v-model="filterFamily.identityDocumentId"
              @input="ChangeIdentityDocFamily"
            ></v-select>
          </div>
        </b-col>
        <b-col sm="12" md="1" lg="2">
          <label>{{ $t("documentseries") }}</label>
          <div>
            <v-select
              v-if="filterFamily.identityDocumentId == 1"
              :options="DocumentSeriesList"
              :reduce="(item) => item.name"
              label="name"
              :placeholder="$t('documentseries')"
              v-model="filterFamily.documentSeries"
            >
            </v-select>
            <b-form-input
              class="text-upper"
              v-if="filterFamily.identityDocumentId != 1"
              :placeholder="$t('AA')"
              v-model="filterFamily.documentSeries"
              v-mask="'AA'"
            />
          </div>
        </b-col>
        <b-col sm="12" md="2" lg="1">
          <label>{{ $t("documentnumber") }}</label>
          <div>
            <b-form-input
              :placeholder="$t('documentnumber')"
              v-model="filterFamily.documentNumber"
              v-mask="'#######'"
            />
          </div>
        </b-col>
        <b-col
          sm="12"
          md="2"
          lg="2"
          v-if="
            filterFamily.identityDocumentId != 3 &&
            filterFamily.identityDocumentId != 4
          "
        >
          <label>{{ $t("dateofbirth") }}</label>
          <div>
            <custom-date-picker
              v-model="filterFamily.dateofbirth"
              @keyup="BindValue"
              format="DD.MM.YYYY"
              type="date"
              :clearable="false"
              :placeholder="$t('dateofbirth')"
            >
            </custom-date-picker>
          </div>
        </b-col>
        <b-col sm="12" lg="2" md="2">
          <label for=""></label>
          <div>
            <v-select
              :options="SearchTypeList"
              :reduce="(item) => item.id"
              :placeholder="$t('SearchType')"
              label="name"
              style="width: 100%"
              v-model="filterFamily.searchtype"
              @input="ChangeSearchType"
            ></v-select>
          </div>
        </b-col>
        <!-- <b-col sm="12" md="2" lg="2">
          <label for=""></label>
          <div style="margin-top: 2px">
            <b-button @click="getpersonFamilydata" variant="primary">
              <feather-icon v-if="!SearchFamilyLoading" icon="SearchIcon" />
              <b-spinner v-if="SearchFamilyLoading" small></b-spinner>
              {{ $t("search") }}
            </b-button>
          </div>
        </b-col> -->
        <b-col cols="12" md="2">
          <label for=""></label>
          <b-input-group class="text-right">
            <b-form-input
              v-model="filterFamily.fakeSearch"
              :placeholder="$t('search')"
            />
            <b-input-group-append>
              <b-button @click="Search" variant="primary">
                <feather-icon icon="SearchIcon" />
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="12" md="12">
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
            :empty-text="$t('NotFound')"
            class="position-relative mt-1"
            @sort-changed="SortChange"
            @row-dblclicked="ChildRegistrationActChange"
            @row-selected="onRowSelected"
            select-mode="single"
            selectable
          >
            <template v-slot:head(selected)>
              <div style="cursor: pointer"></div>
            </template>
            <template #cell(selected)="{ rowSelected }">
              <template v-if="rowSelected">
                <!-- <feather-icon icon="CheckIcon"> </feather-icon> -->
                <span aria-hidden="true">&check;</span>
              </template>
              <template v-else>
                <span aria-hidden="true">&nbsp;</span>
                <span class="sr-only">Not selected</span>
              </template>
            </template>
          </b-table>
        </b-col>
        <div class="mx-2 mb-2 w-100">
          <b-row>
            <b-col
              cols="12"
              sm="6"
              class="
                d-flex
                align-items-center
                justify-content-center justify-content-sm-start
              "
            >
              <span class="text-muted"
                >{{ $t("Showing") }} {{ firstNumber }} {{ $t("to") }}
                {{ lastNumber }} {{ $t("of") }} {{ filterFamily.totalRows }}
                {{ $t("entries") }}</span
              >
            </b-col>
            <!-- Pagination -->
            <b-col
              cols="12"
              sm="6"
              class="
                d-flex
                align-items-center
                justify-content-center justify-content-sm-end
              "
            >
              <b-pagination
                v-model="filterFamily.PageNumber"
                :total-rows="filterFamily.totalRows"
                :per-page="filterFamily.PageLimit"
                first-number
                last-number
                @input="Refresh"
                class="mb-0 mt-1 mt-sm-0"
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
        </div>
      </b-row>
      <b-row>
        <b-col class="text-center">
          <b-button
            variant="danger"
            @click="ChildListToFamilyModal = false"
            class="mr-1"
          >
            {{ $t("back") }}
          </b-button>
          <b-button variant="success" @click="AddtoData">
            {{ $t("Save") }}
          </b-button>
        </b-col>
      </b-row>
    </b-modal>
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
  BSpinner,
  BPagination,
  BListGroup,
  BListGroupItem,
} from "bootstrap-vue";
import CustomDatePicker from "@/views/components/customDatePicker.vue";
import ChildListToFamilyService from "@/services/document/childlisttofamily.service";
import ReportService from "@/services/report";
import IdentityDocumentService from "@/services/info/identitydocument.service";
import HelperService from "@/services/others/helper.service";
import Ripple from "vue-ripple-directive";
import flatPickr from "vue-flatpickr-component";
import KinshipDegreeService from "@/services/info/kinshipdegree.service";
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
    BSpinner,
    BPagination,
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
      ChildListToFamily: {},
      items: [],
      tabrow: {},
      editedIndex1: -1,
      KinshipdegreeList: [],
      ModalShowRelative: false,
      fieldsRelative: [
        {
          key: "kinshipdegreename",
          label: this.$t("kinshipdegree"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "personname",
          label: this.$t("personname"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "pinfl",
          label: this.$t("pinfl"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "dateofbirth",
          label: this.$t("dateofbirth"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "gendername",
          label: this.$t("gendername"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "nationalityname",
          label: this.$t("nationalityname"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "citizenshipname",
          label: this.$t("citizenshipname"),
          thClass: "text-center",
          sortable: true,
        },
      ],
      isBusy: false,
      SearchTypeList: [
        { id: 1, name: this.$t("fio") },
        { id: 2, name: this.$t("pinfl") },
      ],
      fields: [
        {
          key: "selected",
        },
        {
          key: "childregistrationactdocdate",
          label: this.$t("childregistrationactdocdate"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "personname",
          label: this.$t("personname"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "pinfl",
          label: this.$t("pinfl"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "dateofbirth",
          label: this.$t("dateofbirth"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "gendername",
          label: this.$t("gender"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "nationalityname",
          label: this.$t("nationality"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "citizenship",
          label: this.$t("citizenship"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "identitydocumentname",
          label: this.$t("identitydocument"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "documentseries",
          label: this.$t("documentseries"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "documentnumber",
          label: this.$t("documentnumber"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
      ],
      filterFamily: {
        Search: "",
        SortColumn: "",
        OrderType: "",
        PageNumber: 1,
        PageLimit: 20,
        pinfl: "",
        identityDocumentId: 0,
        documentSeries: "",
        documentNumber: "",
        searchtype: 1,
        fakeSearch: "",
        dateofbirth: "",
        perPageOptions: [10, 20, 50, 100],
        totalRows: 0,
      },
      tabrowfilter: {
        Search: "",
        SortColumn: "",
        OrderType: "",
        PageNumber: 1,
        PageLimit: 20,
        pinfl: "",
        identityDocumentId: 0,
        documentSeries: "",
        documentNumber: "",
        dateofbirth: "",
        perPageOptions: [10, 20, 50, 100],
        totalRows: 0,
        kinshipdegreeid: 0,
        kinshipdegreename: "",
      },
      SearchFamilyLoading: false,
      IdentityDocumentList: [],
      DocumentSeriesList: [],
      SearchLoading: false,
      ChildListToFamilyModal: false,
      lang: "ru",
      config: {
        dateFormat: "d.m.Y",
      },
      selected: [],
    };
  },
  created() {
    this.lang = localStorage.getItem("locale") || "ru";
    this.show = true;
    ChildListToFamilyService.Get(this.$route.params.id)
      .then((res) => {
        this.show = false;
        this.ChildListToFamily = res.data;
      })
      .catch((error) => {
        this.$makeToast(error.response.data.error, "danger");
      });
    IdentityDocumentService.GetAll(this.lang, true).then((res) => {
      this.IdentityDocumentList = res.data.result;
    });
    KinshipDegreeService.GetAll(this.lang, true).then((res) => {
      this.KinshipdegreeList = res.data;
    });
    HelperService.GetAllIdentityDocSeries(1).then((res) => {
      this.DocumentSeriesList = res.data;
    });
  },
  computed: {
    firstNumber() {
      return (
        (this.filterFamily.PageNumber - 1) * this.filterFamily.PageLimit + 1
      );
    },
    lastNumber() {
      if (this.filterFamily.totalRows < this.filterFamily.PageLimit) {
        return this.filterFamily.totalRows;
      } else {
        if (
          this.filterFamily.PageNumber * this.filterFamily.PageLimit >
          this.filterFamily.totalRows
        ) {
          return this.filterFamily.totalRows;
        } else {
          return this.filterFamily.PageNumber * this.filterFamily.PageLimit;
        }
      }
    },
  },
  directives: {
    Ripple,
  },
  methods: {
     ChangeSearchType() {
      this.filterFamily.pinfl = "";
      this.filterFamily.Search = "";
      this.filterFamily.fakeSearch = "";
    },
    AddtoData() {
      var item = this.selected[0];
      this.ChildListToFamily.personid = item.personid;
      this.ChildListToFamily.personname = item.personname;
      this.ChildListToFamily.childregistrationactid =
        item.childregistrationactid;
      this.ChildListToFamilyModal = false;
      this.ChildListToFamily.childregistrationactdocdate =
        item.childregistrationactdocdate;
      this.ChildListToFamily.personname = item.personname;
      this.ChildListToFamily.pinfl = item.pinfl;
      this.ChildListToFamily.dateofbirth = item.dateofbirth;
      this.ChildListToFamily.gendername = item.gendername;
      this.ChildListToFamily.nationalityname = item.nationalityname;
      this.ChildListToFamily.citizenshipname = item.citizenship;
      this.ChildListToFamily.identitydocumentname = item.identitydocumentname;
      this.ChildListToFamily.documentseries = item.documentseries;
      this.ChildListToFamily.documentnumber = item.documentnumber;
    },
    onRowSelected(items) {
      this.selected = items;
    },
    ChangeIdentityDocFamily() {
      (this.filterFamily.documentSeries = ""),
        (this.filterFamily.documentNumber = ""),
        (this.filterFamily.pinfl = ""),
        (this.filterFamily.dateofbirth = "");
    },
    KinshipdegreeChange() {
      this.tabrowfilter.kinshipdegreename =
        this.KinshipdegreeList.length > 0
          ? this.KinshipdegreeList.filter(
              (item) => this.tabrowfilter.kinshipdegreeid === item.id
            )[0].name
          : "";
    },
    Refresh() {
      //  if (this.filterFamily.typeid == 1) {
      //   this.filterFamily.Search = this.filterFamily.fakeSearch;
      // }
      // if (this.filterFamily.typeid == 2) {
      //   this.filterFamily.pinfl = this.filterFamily.fakeSearch;
      // }
      // if (this.filterFamily.typeid != 1 && this.filterFamily.typeid != 2) {
      //   this.filterFamily.Search = this.filterFamily.fakeSearch;
      // }
      this.isBusy = true;
      ReportService.ChildRegistrationActListForSelect(
        this.filterFamily.Search,
        this.filterFamily.SortColumn,
        this.filterFamily.OrderType,
        this.filterFamily.PageNumber,
        this.filterFamily.PageLimit,
        this.filterFamily.pinfl,
        this.filterFamily.identityDocumentId,
        this.filterFamily.documentSeries,
        this.filterFamily.documentNumber,
        this.filterFamily.dateofbirth
      ).then((res) => {
        this.SearchFamilyLoading = false;
        this.isBusy = false;
        this.items = res.data.rows;
        this.filterFamily.totalRows = res.data.total;
      });
    },
    getpersonFamilydata() {
      this.SearchFamilyLoading = true;
      if (this.filterFamily.identityDocumentId != 1) {
        this.filterFamily.documentSeries =
          this.filterFamily.documentSeries.toUpperCase();
      }
      ReportService.ChildRegistrationActListForSelect(
        this.filterFamily.Search,
        this.filterFamily.SortColumn,
        this.filterFamily.OrderType,
        this.filterFamily.PageNumber,
        this.filterFamily.PageLimit,
        this.filterFamily.pinfl,
        this.filterFamily.identityDocumentId,
        this.filterFamily.documentSeries,
        this.filterFamily.documentNumber,
        this.filterFamily.dateofbirth
      ).then((res) => {
        this.SearchFamilyLoading = false;
        this.items = res.data.rows;
      });
    },
    Search() {
      // if (this.filterFamily.searchtype === 1) {
      //   this.filterFamily.ID = this.filterFamily.fakeSearch;
      //   this.filterFamily.fakeSearch = ""
      //    this.Refresh();
      // }
      if (this.filterFamily.searchtype === 2) {
        this.filterFamily.pinfl = this.filterFamily.fakeSearch;
        this.filterFamily.fakeSearch = "";
        this.Refresh();
        this.getpersonFamilydata();
      }
      if (this.filterFamily.searchtype === 1) {
        this.filterFamily.Search = this.filterFamily.fakeSearch;
        // this.filter.fakeSearch = ""
        this.Refresh();
        this.getpersonFamilydata();
      }
      if (this.filter.PageNumber !== 1) {
        this.filter.PageNumber = 1;
      } else {
        this.Refresh();
      }
    },
    getpersonRelativedata() {
      if (!this.check()) {
        return false;
      }
      this.SearchFamilyLoading = true;
      if (this.tabrowfilter.identityDocumentId != 1) {
        this.tabrowfilter.documentSeries =
          this.tabrowfilter.documentSeries.toUpperCase();
      }
      ReportService.ChildRegistrationActListForSelect(
        this.tabrowfilter.Search,
        this.tabrowfilter.SortColumn,
        this.tabrowfilter.OrderType,
        this.tabrowfilter.PageNumber,
        this.tabrowfilter.PageLimit,
        this.tabrowfilter.pinfl,
        this.tabrowfilter.identityDocumentId,
        this.tabrowfilter.documentSeries,
        this.tabrowfilter.documentNumber,
        this.tabrowfilter.dateofbirth
      ).then((res) => {
        this.SearchFamilyLoading = false;
        this.items = res.data.rows;

        if (res.data.rows.length > 0) {
          this.tabrow = res.data.rows[0];
        }
        if (res.data.rows.length == 0) {
          this.$makeToast(this.$t("notfoundchild"), "danger");
        }
        this.tabrow.kinshipdegreeid = this.tabrowfilter.kinshipdegreeid;
        this.tabrow.kinshipdegreename = this.tabrowfilter.kinshipdegreename;
        this.tabrow.Status = 1;
      });
    },
    dateofbirthValue(value) {
      this.ChildListToFamily.docdate = value;
    },
    AddRowRelative() {
      this.tabrow.kinshipdegreename =
        this.KinshipdegreeList.length > 0
          ? this.KinshipdegreeList.filter(
              (item) => this.tabrow.kinshipdegreeid === item.id
            )[0].name
          : "";

      this.tabrow.Status = 1;
      if (this.editedIndex1 > -1) {
        Object.assign(
          this.ChildListToFamily.Tables[this.editedIndex1],
          this.tabrow
        );
      } else {
        this.ChildListToFamily.Tables.push(this.tabrow);
      }
      this.tabrow = {
        id: 0,
        ownerid: 0,
        kinshipdegreeid: 0,
        childregistrationactid: 0,
        personid: 0,
        personname: "",
        pinfl: "",
        dateofbirth: "",
        gendername: "",
        nationalityname: "",
        citizenshipname: "",
        Status: 1,
      };
      this.ModalShowRelative = false;
    },
    check() {
      if (
        this.tabrowfilter.kinshipdegreeid === 0 ||
        this.tabrowfilter.kinshipdegreeid === null ||
        this.tabrowfilter.kinshipdegreeid === undefined ||
        this.tabrowfilter.kinshipdegreeid === ""
      ) {
        this.$makeToast(this.$t("kinshipdegreeidNotSelected"), "danger");
        return false;
      }
      if (
        this.tabrowfilter.identityDocumentId === 0 ||
        this.tabrowfilter.identityDocumentId === null ||
        this.tabrowfilter.identityDocumentId === undefined ||
        this.tabrowfilter.identityDocumentId === ""
      ) {
        this.$makeToast(this.$t("identityDocumentIdNotSelected"), "danger");
        return false;
      }
      if (
        this.tabrowfilter.documentSeries === 0 ||
        this.tabrowfilter.documentSeries === null ||
        this.tabrowfilter.documentSeries === undefined ||
        this.tabrowfilter.documentSeries === ""
      ) {
        this.$makeToast(this.$t("documentSeriesNotSelected"), "danger");
        return false;
      }
      if (
        this.tabrowfilter.documentNumber === 0 ||
        this.tabrowfilter.documentNumber === null ||
        this.tabrowfilter.documentNumber === undefined ||
        this.tabrowfilter.documentNumber === ""
      ) {
        this.$makeToast(this.$t("documentNumberNotSelected"), "danger");
        return false;
      }
      if (
        this.tabrowfilter.dateofbirth === 0 ||
        this.tabrowfilter.dateofbirth === null ||
        this.tabrowfilter.dateofbirth === undefined ||
        this.tabrowfilter.dateofbirth === ""
      ) {
        this.$makeToast(this.$t("dateofbirthNotSelected"), "danger");
        return false;
      }
      return true;
    },
    OpenModalRelative() {
      this.ModalShowRelative = true;
      this.tabrow = {
        id: 0,
        ownerid: 0,
        kinshipdegreeid: 0,
        childregistrationactid: 0,
        personid: 0,
        personname: "",
        pinfl: "",
        dateofbirth: "",
        gendername: "",
        nationalityname: "",
        citizenshipname: "",
        status: 1,
      };
    },
    ChildRegistrationActChange(item) {
      this.ChildListToFamily.personid = item.personid;
      this.ChildListToFamily.personname = item.personname;
      this.ChildListToFamily.childregistrationactid =
        item.childregistrationactid;
      this.ChildListToFamilyModal = false;
      this.ChildListToFamily.childregistrationactdocdate =
        item.childregistrationactdocdate;
      this.ChildListToFamily.personname = item.personname;
      this.ChildListToFamily.pinfl = item.pinfl;
      this.ChildListToFamily.dateofbirth = item.dateofbirth;
      this.ChildListToFamily.gendername = item.gendername;
      this.ChildListToFamily.nationalityname = item.nationalityname;
      this.ChildListToFamily.citizenshipname = item.citizenship;
      this.ChildListToFamily.identitydocumentname = item.identitydocumentname;
      this.ChildListToFamily.documentseries = item.documentseries;
      this.ChildListToFamily.documentnumber = item.documentnumber;
    },
    OpenChildListToFamily() {
      this.ChildListToFamilyModal = true;
      this.selected = [];
      this.Refresh();
    },
    BindValue(data) {
      this.filterFamily.dateofbirth = data;
    },
    BindValue1(data) {
      this.tabrowfilter.dateofbirth = data;
    },
    SortChange(data) {
      this.filterFamily.SortColumn = data.sortBy;
      this.filterFamily.OrderType = data.sortDesc ? "desc" : "asc";
      this.Refresh();
    },
    SaveData() {
      ChildListToFamilyService.Update(this.ChildListToFamily)
        .then((res) => {
          this.$makeToast(this.$t("SaveSuccess"), "success");
          this.$router.push({ name: `childlisttofamily` });
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
