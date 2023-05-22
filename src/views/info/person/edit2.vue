<template>
  <b-row>
    <b-col>
      <b-card accent-color="primary" class="pb-4">
        <b-card-header v-if="showBackButton">
          <b-row>
            <b-col
              sm="12"
              md="6"
              class="text-center d-md-flex align-items-center text-md-left"
            >
              <h4 v-if="isStudent">{{ $t("Student") }}</h4>
              <h4 v-if="!isStudent">{{ $t("Employee") }}</h4>
            </b-col>
            <b-col sm="12" md="6" class="text-right">
              <b-button-group size="sm" v-if="$route.params.id != 0">
                <b-button
                  @click="GotoCard"
                  v-if="$route.params.id != 0"
                  variant="outline-primary"
                  >{{ isStudent ? $t("gotoStudent") : $t("gotoEmployee") }}
                  <b-icon icon="arrow-right-circle-fill"></b-icon>
                </b-button>
                <b-button @click="OpenActiveSidebar" variant="outline-primary">
                  {{ $t("gotohistory") }}
                  <b-icon icon="arrow-right-circle-fill"></b-icon>
                </b-button>
              </b-button-group>
            </b-col>
          </b-row>
        </b-card-header>
        <b-card-body>
          <b-card v-if="isView()">
            <b-card-body>
              <b-row>
                <b-col sm="3" class="text-left">
                  <label>{{ $t("identitydocument") }}</label>
                  <v-select
                    :options="IdentityDocumentList"
                    v-model="filter.identitydocumentid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    @input="filteridentitydocumentchange(filter)"
                  ></v-select>
                </b-col>
                <b-col sm="2" class="text-left">
                  <label>{{ $t("documentseries") }}</label>
                  <v-select
                    v-if="filteridentitydocserieslist.length > 0"
                    :options="filteridentitydocserieslist"
                    v-model="filter.docseries"
                    :reduce="(item) => item.code"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  ></v-select>
                  <b-form-input
                    class="mb-0"
                    :placeholder="$t('docseries')"
                    v-if="filteridentitydocserieslist.length === 0"
                    v-model="filter.docseries"
                  ></b-form-input>
                </b-col>

                <b-col sm="2" class="text-left">
                  <b-form-input
                    :placeholder="$t('docnumber')"
                    autocomplete="docnumber"
                    :label="$t('docnumber')"
                    v-model="filter.docnumber"
                  ></b-form-input>
                </b-col>
                <b-col
                  sm="2"
                  v-if="
                    filter.identitydocumentid == 1 ||
                      filter.identitydocumentid == 2 ||
                      filter.identitydocumentid == 5
                  "
                >
                  <label for=""> {{ $t("dateofbirth") }} </label>
                  <date-picker
                    v-model="filter.dateofbirth"
                    style="width:100%"
                    size="sm"
                    lang="ru"
                    :placeholder="$t('dateofbirth')"
                    value-type="format"
                    format="DD.MM.YYYY"
                  >
                  </date-picker>
                </b-col>
                <b-col
                  v-if="
                    filteridentitydocserieslist.length === 0 &&
                      filter.identitydocumentid != 2 &&
                      filter.identitydocumentid != 5
                  "
                >
                  <label> {{ $t("pinfl") }} </label>
                  <b-input-group>
                    <b-form-input
                      v-model="filter.pinfl"
                      :placeholder="$t('pinfl')"
                    ></b-form-input>
                    <template #append>
                      <b-button variant="primary" @click="SearchByPinfl">
                        <b-icon v-if="!pinflLoading" icon="search"></b-icon>
                        <b-spinner v-if="pinflLoading" small></b-spinner>
                        {{ $t("search") }}
                      </b-button>
                    </template>
                  </b-input-group>
                </b-col>
                <b-col
                  v-if="
                    filter.identitydocumentid == 1 ||
                      filter.identitydocumentid == 2 ||
                      filter.identitydocumentid == 5
                  "
                >
                  <label for="" style="margin-top : 41px"></label>
                  <b-button variant="primary" @click="SearchByPinfl">
                    <b-icon v-if="!pinflLoading" icon="search"></b-icon>
                    <b-spinner v-if="pinflLoading" small></b-spinner>
                    {{ $t("search") }}
                  </b-button>
                </b-col>
              </b-row>
            </b-card-body>
          </b-card>
          <b-card class="p-4">
            <ValidationObserver ref="form" v-slot="errors">
              {{ setAllErrors(errors.errors) }}
              <b-row v-if="$route.params.id !== 0">
                <b-col sm="12" md="6" class="text-center text-md-left">
                  <h4 class="mb-4" v-if="person.CheckResult != null">
                    {{ person.fullname }}
                    <vs-tooltip
                      class="m-0"
                      style="display:inline-block"
                      :text="$t('CheckedPerson')"
                      ><b-icon
                        variant="success"
                        icon="check-circle-fill"
                      ></b-icon>
                    </vs-tooltip>
                  </h4>
                  <h4 class="mb-4" v-if="person.CheckResult == null">
                    {{ person.fullname }}
                    <vs-tooltip
                      style="display:inline-block"
                      :text="$t('UncheckedPerson')"
                    >
                      <b-icon
                        variant="warning"
                        icon="info-circle-fill"
                      ></b-icon>
                    </vs-tooltip>
                  </h4>
                </b-col>
                <b-col sm="12" md="6" class="text-md-right text-center">
                  <!-- v-if="person.CheckResult == null && $route.params.id != 0" -->
                  <b-button
                    v-if="$route.params.id != 0"
                    @click="UpdateDataFromEGov"
                    size="sm"
                    variant="primary"
                  >
                    <b-spinner v-if="UpdateFromEGovLoading" small></b-spinner>
                    <b-icon
                      v-if="!UpdateFromEGovLoading"
                      icon="arrow-repeat"
                    ></b-icon>
                    {{ $t("UpdateFromEGov") }}
                  </b-button>
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="12" md="6">
                  <ValidationProvider
                    v-slot="v"
                    name="familyname"
                    rules="required"
                  >
                    <div class="form-group form-row m-0 px-0">
                      <label class="col-form-label col-sm-3 pl-sm-2 pl-md-0">
                        {{ $t("familyname") }}
                        <code color="red" style="font-size:16px">*</code>
                      </label>
                      <b-form-input
                        class="px-0 col-sm-9"
                        :placeholder="$t('familyname')"
                        autocomplete="familyname"
                        :disabled="
                          filter.identitydocumentid !== 4 &&
                            filter.identitydocumentid !== 3
                        "
                        v-model="person.familyname"
                        :addInputClasses="{
                          'is-invalid': v.classes.invalid,
                          'is-valid': v.classes.valid,
                        }"
                      >
                        <template slot="invalid-feedback">
                          <div class="invalid-feedback">{{ v.errors[0] }}</div>
                        </template>
                      </b-form-input>
                    </div>
                  </ValidationProvider>
                </b-col>
                <b-col>
                  <ValidationProvider
                    v-slot="v"
                    name="firstname"
                    rules="required"
                  >
                    <div class="form-group form-row m-0">
                      <label class="col-form-label col-sm-3 pl-sm-2 pl-md-0">
                        {{ $t("firstname") }}
                        <code color="red" style="font-size:16px">*</code>
                      </label>
                      <b-form-input
                        :placeholder="$t('firstname')"
                        autocomplete="firstname"
                        v-model="person.firstname"
                        :disabled="
                          filter.identitydocumentid != 3 &&
                            filter.identitydocumentid != 4
                        "
                        class="col-sm-9 px-0"
                        :addInputClasses="{
                          'is-invalid': v.classes.invalid,
                          'is-valid': v.classes.valid,
                        }"
                      >
                        <template slot="invalid-feedback">
                          <div class="invalid-feedback">{{ v.errors[0] }}</div>
                        </template>
                      </b-form-input>
                    </div>
                  </ValidationProvider>
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="12" md="6">
                  <ValidationProvider
                    v-slot="v"
                    name="lastname"
                    rules="required"
                  >
                    <div class="form-group form-row m-0">
                      <label class="col-form-label col-sm-3 pl-sm-2 pl-md-0">
                        {{ $t("lastname") }}
                      </label>
                      <b-form-input
                        :placeholder="$t('lastname')"
                        autocomplete="lastname"
                        class="col-sm-9 px-0"
                        v-model="person.lastname"
                        :disabled="
                          filter.identitydocumentid != 3 &&
                            filter.identitydocumentid != 4
                        "
                        :addInputClasses="{
                          'is-invalid': v.classes.invalid,
                          'is-valid': v.classes.valid,
                        }"
                      >
                        <template slot="invalid-feedback">
                          <div class="invalid-feedback">{{ v.errors[0] }}</div>
                        </template>
                      </b-form-input>
                    </div>
                  </ValidationProvider>
                </b-col>
                <b-col sm="12" md="6">
                  <ValidationProvider
                    v-slot="v"
                    name="dateofbirth"
                    rules="required"
                  >
                    <div class="form-group form-row">
                      <label
                        for="datepicker-dateformat2"
                        class="col-form-label col-sm-3 ml-2 ml-md-0"
                        >{{ $t("dateofbirth") }}
                        <code color="red" style="font-size:16px">*</code></label
                      >
                      <div class="col-sm-9">
                        <date-picker
                          v-model="person.dateofbirth"
                          :disabled="
                            filter.identitydocumentid != 3 &&
                              filter.identitydocumentid != 4 &&
                              person.CheckResult
                          "
                          style="width:100%"
                          size="sm"
                          lang="ru"
                          :placeholder="$t('dateofbirth')"
                          value-type="format"
                          format="DD.MM.YYYY"
                          :disabled-date="disabledForDateofBirth"
                        >
                          <template slot="invalid-feedback">
                            <div class="invalid-feedback">
                              {{ v.errors[0] }}
                            </div>
                          </template>
                        </date-picker>
                      </div>
                    </div>
                  </ValidationProvider>
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="12" md="6">
                  <ValidationProvider v-slot="v" name="gender" rules="required">
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-3 ml-2 ml-md-0" for
                        >{{ $t("gender") }}
                        <code color="red" style="font-size:16px">*</code>
                      </label>
                      <v-select
                        class="col-sm-9"
                        :options="GenderList"
                        v-model="person.genderid"
                        :reduce="(item) => item.id"
                        :placeholder="$t('ChooseBelow')"
                        label="name"
                        :disabled="
                          (filter.identitydocumentid != 3 &&
                            filter.identitydocumentid != 4) ||
                            InfoOfEGov.genderid === 3
                        "
                        :class="{ danger: v.errors[0] }"
                      >
                        <template slot="invalid-feedback">
                          <div class="invalid-feedback">{{ v.errors[0] }}</div>
                        </template>
                      </v-select>
                    </div>
                  </ValidationProvider>
                </b-col>
                <b-col sm="12" md="6">
                  <ValidationProvider
                    v-slot="v"
                    name="nationality"
                    rules="required"
                  >
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-3 ml-2 ml-md-0" for
                        >{{ $t("Nationality") }}
                        <code color="red" style="font-size:16px">*</code>
                      </label>
                      <v-select
                        class="col-sm-9"
                        :options="NationalityList"
                        v-model="person.nationalityid"
                        :reduce="(item) => item.id"
                        :placeholder="$t('ChooseBelow')"
                        label="name"
                      >
                        <template slot="invalid-feedback">
                          <div class="invalid-feedback">{{ v.errors[0] }}</div>
                        </template>
                      </v-select>
                    </div>
                  </ValidationProvider>
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="12" md="6">
                  <ValidationProvider
                    v-slot="v"
                    name="citizenship"
                    rules="required"
                  >
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-3 ml-2 ml-md-0" for
                        >{{ $t("citizenship") }}
                        <code color="red" style="font-size:16px">*</code></label
                      >
                      <v-select
                        class="col-sm-9"
                        :options="CountryList"
                        v-model="person.citizenshipid"
                        :reduce="(item) => item.id"
                        :placeholder="$t('ChooseBelow')"
                        label="name"
                      >
                        <template slot="invalid-feedback">
                          <div class="invalid-feedback">{{ v.errors[0] }}</div>
                        </template>
                      </v-select>
                    </div>
                  </ValidationProvider>
                </b-col>
                <b-col sm="12" md="6">
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-3 ml-2 ml-md-0"
                      >{{ $t("inn") }}
                      <!-- <code color="red" v-if="!isStudent" style="font-size:16px"
                        >*</code> -->
                    </label>
                    <div class="col-sm-9">
                      <b-form-input
                        :placeholder="$t('inn')"
                        autocomplete="inn"
                        v-model="person.inn"
                        maxlength="9"
                      ></b-form-input>
                    </div>
                  </div>
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="12" md="6">
                  <ValidationProvider v-slot="v" name="pinfl" rules="required">
                    <div
                      class="form-group form-row"
                      v-if="person.citizenshipid == 211"
                    >
                      <label class="col-form-label col-sm-3 ml-2 ml-md-0"
                        >{{ $t("pinfl") }}
                        <code
                          color="red"
                          v-if="!isStudent"
                          style="font-size:16px"
                          >*</code
                        ></label
                      >
                      <div class="col-sm-9">
                        <b-form-input
                          :placeholder="$t('pinfl')"
                          autocomplete="pinfl"
                          v-model="person.pinfl"
                          :disabled="
                            filter.identitydocumentid != 3 &&
                              filter.identitydocumentid != 4
                          "
                          :addInputClasses="{
                            'is-invalid': v.classes.invalid,
                            'is-valid': v.classes.valid,
                          }"
                        >
                          <template slot="invalid-feedback">
                            <div class="invalid-feedback">
                              {{ v.errors[0] }}
                            </div>
                          </template>
                        </b-form-input>
                      </div>
                    </div>
                  </ValidationProvider>
                </b-col>
                <b-col sm="12" md="6">
                  <div class="form-group form-row m-0">
                    <label class="col-form-label col-sm-3 pl-0">
                      {{ $t("ContactInfo") }}
                    </label>
                    <!-- <b-form-input
                      :placeholder="$t('ContactInfo')"
                      autocomplete="contactinfo"
                      class="col-sm-9"
                      v-model="person.contactinfo"
                    >
                    </b-form-input> -->
                    <b-input-group class="col-sm-9 mb-3 px-0" prepend="+998">
                      <b-form-input
                        type="text"
                        v-mask="'##-###-##-##'"
                        v-model="person.contactinfo"
                        :placeholder="$t('ContactInfo')"
                      ></b-form-input>
                    </b-input-group>
                  </div>
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="12" md="6">
                  <ValidationProvider
                    v-slot="v"
                    name="birthcountry"
                    rules="required"
                  >
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-3" for>{{
                        $t("birthcountry")
                      }}</label>
                      <v-select
                        class="col-sm-9"
                        :options="CountryList"
                        v-model="person.birthcountryid"
                        :reduce="(item) => item.id"
                        :placeholder="$t('ChooseBelow')"
                        label="name"
                        @input="changeadress"
                      >
                        <template slot="invalid-feedback">
                          <div class="invalid-feedback">{{ v.errors[0] }}</div>
                        </template>
                      </v-select>
                    </div>
                  </ValidationProvider>
                </b-col>
                <b-col sm="12" md="6">
                  <ValidationProvider
                    v-slot="v"
                    name="birthoblast"
                    rules="required"
                  >
                    <div
                      class="form-group form-row"
                      v-if="person.birthcountryid == 211"
                    >
                      <label
                        v-if="!OblastLoading"
                        class="col-form-label col-sm-3"
                        for
                        >{{ $t("birthoblast") }}</label
                      >
                      <label
                        v-if="OblastLoading"
                        class="col-form-label col-sm-3 text-right"
                      >
                        <b-spinner small></b-spinner>
                      </label>
                      <v-select
                        class="col-sm-9"
                        :options="BirthOblastList"
                        v-model="person.birthoblastid"
                        :reduce="(item) => item.id"
                        :placeholder="$t('ChooseBelow')"
                        label="name"
                        @input="changeadress"
                      >
                        <template slot="invalid-feedback">
                          <div class="invalid-feedback">{{ v.errors[0] }}</div>
                        </template>
                      </v-select>
                    </div>
                  </ValidationProvider>
                </b-col>
              </b-row>
              <b-row v-if="person.birthcountryid == 211">
                <b-col sm="6">
                  <ValidationProvider
                    v-slot="v"
                    name="birthregion"
                    rules="required"
                  >
                    <div class="form-group form-row">
                      <label
                        v-if="!RegionLoading"
                        class="col-form-label col-sm-3"
                        for
                        >{{ $t("birthregion") }}</label
                      >
                      <label
                        v-if="RegionLoading"
                        class="col-form-label col-sm-3 text-right"
                      >
                        <b-spinner small></b-spinner>
                      </label>
                      <v-select
                        class="col-sm-9"
                        :options="BirthRegionList"
                        v-model="person.birthregionid"
                        :reduce="(item) => item.id"
                        :placeholder="$t('ChooseBelow')"
                        label="name"
                        @input="changeadress"
                      >
                        <template slot="invalid-feedback">
                          <div class="invalid-feedback">{{ v.errors[0] }}</div>
                        </template>
                      </v-select>
                    </div>
                  </ValidationProvider>
                </b-col>
                <!-- <b-col>
                  <ValidationProvider v-slot="v" name="birthmfy" rules="required">
                    <div class="form-group form-row">
                      <label v-if="!MfyLoading" class="col-form-label col-sm-3" for>{{$t('birthmfy')}}</label>
                      <label v-if="MfyLoading" class="col-form-label col-sm-3 text-right">
                        <b-spinner small></b-spinner>
                      </label>
                      <v-select
                        class="col-sm-9"
                        :options="BirthMfyList"
                        v-model="person.birthmfyid"
                        :reduce="item => item.id"
                        :placeholder="$t('ChooseBelow')"
                        label="name"
                      >
                        <template slot="invalid-feedback">
                          <div class="invalid-feedback">{{ v.errors[0] }}</div>
                        </template>
                      </v-select>
                    </div>
                  </ValidationProvider>
                </b-col>
                <b-col>
                  <ValidationProvider v-slot="v" name="birthaddress" rules="required">
                    <b-form-input
                      :placeholder="$t('birthaddress')"
                      autocomplete="birthaddress"
                      horizontal
                      :label="$t('birthaddress')"
                      v-model="person.birthaddress"
                      :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                    >
                      <template slot="invalid-feedback">
                        <div class="invalid-feedback">{{ v.errors[0] }}</div>
                      </template>
                    </b-form-input>
                  </ValidationProvider>
                </b-col>-->
              </b-row>
              <b-row>
                <b-col>
                  <div class="float-right">
                    <b-button
                      @click="AddPersonHigherEdu"
                      class="mb-n3"
                      v-if="tabIndex == 4"
                      color="primary"
                    >
                      <b-icon icon="plus"> </b-icon>
                      {{ $t("Add") }}
                    </b-button>
                    <b-button
                      @click="AddPersonPlaceOfWork"
                      class="mb-n3"
                      v-if="tabIndex == 3"
                      color="primary"
                    >
                      <b-icon icon="plus"> </b-icon>
                      {{ $t("Add") }}
                    </b-button>
                    <b-button
                      @click="AddRowRelativeTables"
                      class="mb-n3"
                      v-if="tabIndex == 2"
                      color="primary"
                    >
                      <b-icon icon="plus"> </b-icon>
                      {{ $t("Add") }}
                    </b-button>
                    <b-button
                      @click="AddRowLivePlacesTables"
                      class="mb-n3"
                      color="primary"
                      v-if="tabIndex == 1"
                    >
                      <!-- v-if="(((filter.identitydocumentid == 3 || filter.identitydocumentid == 4) && tabIndex == 1) || (tabIndex == 1 && person.LivePlaceTables.length == 0 && egovinfo === true) )" -->
                      <!-- :disabled="person.LivePlaceTables.filter(item => item.Status != 3).length !== 0" -->
                      <b-icon icon="plus"> </b-icon>
                      {{ $t("Add") }}
                    </b-button>
                    <b-button
                      @click="AddRowDocumentTables"
                      class="mb-n3"
                      color="primary"
                      v-if="
                        tabIndex == 0 &&
                          $route.params.id == 0 &&
                          filter.identitydocumentid == 4
                      "
                    >
                      <b-icon icon="plus"> </b-icon>
                      {{ $t("Add") }}
                    </b-button>
                    <b-button
                      @click="OpenCheckDocModal"
                      class="mb-n3"
                      color="primary"
                      v-if="tabIndex == 0 && filter.identitydocumentid != 4"
                    >
                      <b-icon icon="plus"> </b-icon>
                      {{ $t("Add") }}
                    </b-button>
                  </div>
                  <b-tabs pills v-model="tabIndex">
                    <b-tab active>
                      <template #title>
                        {{ $t("Document") }}
                        <code style="font-size:16px;color : red !important"
                          >*</code
                        >
                      </template>
                      <b-row class="mt-4">
                        <b-col>
                          <b-table
                            :fields="fieldsDocument"
                            :items="person.DocumentTables"
                            class="bg-color-table text-center tdpadding"
                            style="vertical-align:middle"
                            bordered
                            responsive="sm"
                            :tbody-tr-class="rowClass"
                          >
                            <template
                              v-slot:cell(identitydocumentname)="{ item }"
                            >
                              <p>{{ item.identitydocumentname }}</p>
                            </template>
                            <template v-slot:cell(documentseries)="{ item }">
                              <p>{{ item.documentseries }}</p>
                            </template>
                            <template v-slot:cell(statename)="{ item }">
                              <b-badge
                                :variant="
                                  item.statename == 'Актив'
                                    ? 'success'
                                    : 'danger'
                                "
                              >
                                {{ item.statename }}
                              </b-badge>
                            </template>
                            <template
                              v-slot:cell(actions)="{ item, index }"
                              v-if="person.CheckResult == null"
                            >
                              <div class="text-center">
                                <b-link
                                  @click="EditItemDocument(item, index)"
                                  class="mr-2"
                                  v-c-tooltip="{ content: $t('Edit') }"
                                >
                                  <b-icon icon="pencil"></b-icon>
                                </b-link>
                                <!-- <b-link
                                  class="mr-2"
                                  v-c-tooltip="{content: $t('Delete') }"
                                  @click="DeleteItem(item,index)"
                                >
                                  <b-icon icon="trash" ></b-icon>
                                </b-link> -->
                              </div>
                            </template>
                          </b-table>
                        </b-col>
                      </b-row>
                      <!-- <div class="form-group form-row">
                      <label
                        class="col-form-label col-sm-3"
                      >{{$t('pinfl')}}  <code color="red" style="font-size:16px">*</code></label>
                      <div class="col-sm-9">
                         <b-form-input
                            :placeholder="$t('pinfl')"
                            autocomplete="pinfl"
                            v-model="person.pinfl"
                            :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                          >
                            <template slot="invalid-feedback">
                              <div class="invalid-feedback">{{ v.errors[0] }}</div>
                            </template>
                          </b-form-input>
                      </div>
                    </div> -->
                      <b-modal
                        id="AddModalDocument"
                        size="xl"
                        no-close-on-backdrop
                      >
                        <template v-slot:modal-title>{{
                          $t("Document")
                        }}</template>
                        <b-row>
                          <b-col>
                            <div class="form-group form-row">
                              <label class="col-form-label col-sm-3" for
                                >{{ $t("identitydocument") }}
                              </label>
                              <v-select
                                :options="IdentityDocumentList"
                                v-model="documenttabrow.identitydocumentid"
                                :reduce="(item) => item.id"
                                :placeholder="$t('ChooseBelow')"
                                :disabled="
                                  !(person.CheckResult === null && isStudent)
                                "
                                label="name"
                                @input="doctabrowIdentityDoc()"
                                class="col-sm-9"
                              ></v-select>
                            </div>
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col v-if="documenttabrow.identitydocumentid == 1">
                            <div class="form-group form-row">
                              <label class="col-form-label col-sm-3" for>{{
                                $t("documentseries")
                              }}</label>
                              <v-select
                                :options="filteridentitydocserieslist"
                                v-model="documenttabrow.documentseries"
                                :reduce="(item) => item.code"
                                :placeholder="$t('ChooseBelow')"
                                label="name"
                                class="col-sm-9"
                              ></v-select>
                            </div>
                          </b-col>
                          <b-col v-if="documenttabrow.identitydocumentid != 1">
                            <b-form-input
                              class="mb-0"
                              :label="$t('documentseries')"
                              horizontal
                              v-model="documenttabrow.documentseries"
                            ></b-form-input>
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col>
                            <b-form-input
                              :label="$t('documentnumber')"
                              horizontal
                              class="mb-0 mt-3"
                              v-model="documenttabrow.documentnumber"
                              :maxlength="20"
                            ></b-form-input>
                          </b-col>
                        </b-row>
                        <b-row class="mt-3">
                          <b-col>
                            <div class="form-group form-row">
                              <label class="col-form-label col-sm-3" for>{{
                                $t("dateofissue")
                              }}</label>
                              <date-picker
                                v-model="documenttabrow.dateofissue"
                                style="width:100%"
                                size="sm"
                                lang="ru"
                                :placeholder="$t('dateofissue')"
                                value-type="format"
                                format="DD.MM.YYYY"
                                class="col-sm-9"
                                :disabled-date="disabledDateOfBirth"
                              ></date-picker>
                            </div>
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col>
                            <b-form-input
                              :label="$t('issueorganization')"
                              horizontal
                              class="mb-0"
                              v-model="documenttabrow.issueorganization"
                            ></b-form-input>
                          </b-col>
                        </b-row>
                        <template v-slot:modal-footer>
                          <div class="text-center mx-auto">
                            <b-button
                              size="sm"
                              color="danger"
                              class="mr-2"
                              @click="$bvModal.hide('AddModalDocument')"
                            >
                              <b-icon icon="arrow-left-short"></b-icon>
                              {{ $t("back") }}
                            </b-button>
                            <b-button
                              size="sm"
                              color="primary"
                              @click="AddItemDocument"
                            >
                              <b-icon icon="check2"></b-icon>
                              {{ $t("Save") }}
                            </b-button>
                          </div>
                        </template>
                      </b-modal>
                    </b-tab>
                    <b-tab>
                      <template #title>
                        {{ $t("LivePlace") }}
                        <code style="font-size:16px;color : red !important"
                          >*</code
                        >
                      </template>
                      <b-row class="mt-4">
                        <b-col>
                          <b-table
                            :fields="fieldsLivePlace"
                            :items="person.LivePlaceTables"
                            class="bg-color-table text-center tdpadding"
                            style="vertical-align:middle"
                            bordered
                            responsive="sm"
                            :tbody-tr-class="rowClass"
                          >
                            <template v-slot:cell(oblast)="{ item }">
                              <p>{{ item.oblastname }}</p>
                            </template>
                            <template v-slot:cell(region)="{ item }">
                              <p>{{ item.regionname }}</p>
                            </template>
                            <template v-slot:cell(mfy)="{ item }">
                              <p>{{ item.mfyname }}</p>
                            </template>
                            <!-- <template v-slot:cell(actions)="{item,index}">
                              <div class="text-center">
                                <b-link
                                  @click="EditItem1(item,index)"
                                  class="mr-2"
                                  v-c-tooltip="{content: $t('Edit') }"
                                >
                                  <b-icon icon="pencil" ></b-icon>
                                </b-link>
                                <b-link
                                  class="mr-2"
                                  v-c-tooltip="{content: $t('Delete') }"
                                  @click="DeleteItem(item,index)"
                                >
                                  <b-icon icon="trash" ></b-icon>
                                </b-link>
                              </div>
                            </template> -->
                          </b-table>
                        </b-col>
                      </b-row>
                      <b-modal id="AddModal2" size="lg" no-close-on-backdrop>
                        <template v-slot:modal-title>{{
                          $t("LivePlace")
                        }}</template>
                        <b-row>
                          <b-col>
                            <div class="form-group form-row">
                              <label class="col-form-label col-sm-3" for>{{
                                $t("oblast")
                              }}</label>
                              <v-select
                                :options="LiveOblastList"
                                v-model="liveplacetabrow.oblastid"
                                :reduce="(item) => item.id"
                                :placeholder="$t('ChooseBelow')"
                                label="name"
                                class="col-sm-9"
                              ></v-select>
                            </div>
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col>
                            <div class="form-group form-row">
                              <label class="col-form-label col-sm-3" for>{{
                                $t("region")
                              }}</label>
                              <v-select
                                :options="LiveRegionList"
                                v-model="liveplacetabrow.regionid"
                                :reduce="(item) => item.id"
                                :placeholder="$t('ChooseBelow')"
                                label="name"
                                class="col-sm-9"
                              ></v-select>
                            </div>
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col>
                            <div class="form-group form-row">
                              <label class="col-form-label col-sm-3" for>{{
                                $t("mfy")
                              }}</label>
                              <v-select
                                :options="LiveMfyList"
                                v-model="liveplacetabrow.mfyid"
                                :reduce="(item) => item.id"
                                :placeholder="$t('ChooseBelow')"
                                label="name"
                                class="col-sm-9"
                              ></v-select>
                            </div>
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col>
                            <b-form-input
                              horizontal
                              :label="$t('address')"
                              class="mb-0"
                              v-model="liveplacetabrow.address"
                            ></b-form-input>
                          </b-col>
                        </b-row>
                        <template v-slot:modal-footer>
                          <div class="text-center mx-auto">
                            <b-button
                              size="sm"
                              color="danger"
                              class="mr-2"
                              @click="$bvModal.hide('AddModal2')"
                            >
                              <b-icon icon="arrow-left-short"></b-icon>
                              {{ $t("back") }}
                            </b-button>
                            <b-button
                              size="sm"
                              color="primary"
                              @click="AddItemLivePlaces"
                            >
                              <b-icon icon="check2"></b-icon>
                              {{ $t("Save") }}
                            </b-button>
                          </div>
                        </template>
                      </b-modal>
                    </b-tab>
                    <b-tab :title="$t('personrelative')">
                      <b-row class="mt-4">
                        <b-col>
                          <b-table
                            :fields="fieldsRelative"
                            :items="person.PersonRelativeTables"
                            class="bg-color-table text-center"
                            style="vertical-align:middle"
                            bordered
                            responsive="md"
                            :tbody-tr-class="rowClass"
                          >
                            <template v-slot:cell(actions)="{ item }">
                              <div class="text-center">
                                <b-link
                                  @click="EditItemRelativeTables(item)"
                                  class="mr-2"
                                  v-c-tooltip="{ content: $t('Edit') }"
                                >
                                  <b-icon icon="pencil"></b-icon>
                                </b-link>
                                <b-link
                                  class="mr-2"
                                  v-c-tooltip="{ content: $t('Delete') }"
                                  @click="DeleteItem(item)"
                                >
                                  <b-icon icon="trash"></b-icon>
                                </b-link>
                              </div>
                            </template>
                          </b-table>
                        </b-col>
                      </b-row>
                    </b-tab>
                    <b-tab :title="$t('personplaceofwork')" v-if="!isStudent">
                      <b-row class="mt-4">
                        <c-col>
                          <b-table
                            :fields="fieldsPlaceOfWork"
                            :items="person.PersonPlaceofWorkTables"
                            class="bg-color-table text-center"
                            style="vertical-align:middle"
                            bordered
                            responsive="md"
                            :tbody-tr-class="rowClass"
                          >
                            <template v-slot:cell(actions)="{ item }">
                              <div class="text-center">
                                <b-link
                                  @click="EditItemPlaceOfWork(item)"
                                  class="mr-2"
                                  v-c-tooltip="{ content: $t('Edit') }"
                                >
                                  <b-icon icon="pencil"></b-icon>
                                </b-link>
                                <b-link
                                  class="mr-2"
                                  v-c-tooltip="{ content: $t('Delete') }"
                                  @click="DeleteItem(item)"
                                >
                                  <b-icon icon="trash"></b-icon>
                                </b-link>
                              </div>
                            </template>
                          </b-table>
                        </c-col>
                      </b-row>
                    </b-tab>
                    <b-tab :title="$t('personhigheredu')" v-if="!isStudent">
                      <b-row class="mt-1">
                        <b-col sm="12" md="4">
                          <b-button
                            variant="success"
                            size="sm"
                            @click="IntegrationDTM"
                            block
                          >
                            {{ $t("IntegrationDTM") }}
                          </b-button>
                        </b-col>
                        <b-col> </b-col>
                        <b-col> </b-col>
                      </b-row>
                      <b-row class="mt-3">
                        <c-col>
                          <b-table
                            :fields="fieldsHigherEdu"
                            :items="person.PersonHigherEduTables"
                            class="bg-color-table text-center"
                            style="vertical-align:middle"
                            bordered
                            responsive="md"
                            :tbody-tr-class="rowClass"
                          >
                            <template v-slot:cell(actions)="{ item }">
                              <div class="text-center">
                                <b-link
                                  @click="EditItemHigherEdu(item)"
                                  class="mr-2"
                                  v-c-tooltip="{ content: $t('Edit') }"
                                >
                                  <b-icon icon="pencil"></b-icon>
                                </b-link>
                                <b-link
                                  class="mr-2"
                                  v-c-tooltip="{ content: $t('Delete') }"
                                  @click="DeleteItem(item)"
                                >
                                  <b-icon icon="trash"></b-icon>
                                </b-link>
                              </div>
                            </template>
                          </b-table>
                        </c-col>
                      </b-row>
                    </b-tab>
                  </b-tabs>
                </b-col>
              </b-row>
            </ValidationObserver>
          </b-card>

          <b-modal id="AddModal" size="xl" modal-class="custom-size-modal">
            <template v-slot:modal-title>{{ $t("personrelative") }}</template>
            <b-row>
              <b-col sm="12" md="3" class="text-left mt-2">
                <label>{{ $t("identitydocument") }}</label>
                <v-select
                  :options="IdentityDocumentList"
                  v-model="relative.identitydocumentid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  @input="filteridentitydocumentchange(relative)"
                ></v-select>
              </b-col>
              <b-col sm="12" md="2" class="text-left mt-2">
                <label>{{ $t("documentseries") }}</label>
                <v-select
                  v-if="filteridentitydocserieslist.length > 0"
                  :options="filteridentitydocserieslist"
                  v-model="relative.docseries"
                  :reduce="(item) => item.code"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                ></v-select>
                <b-form-input
                  class="mb-0"
                  :placeholder="$t('docseries')"
                  v-if="filteridentitydocserieslist.length === 0"
                  v-model="relative.docseries"
                ></b-form-input>
              </b-col>

              <b-col sm="12" md="2" class="text-left mt-2">
                <b-form-input
                  :placeholder="$t('docnumber')"
                  autocomplete="docnumber"
                  :label="$t('docnumber')"
                  v-model="relative.docnumber"
                ></b-form-input>
              </b-col>
              <b-col
                sm="12"
                md="2"
                class="mt-2"
                v-if="
                  relative.identitydocumentid == 1 ||
                    relative.identitydocumentid == 5 ||
                    relative.identitydocumentid == 2
                "
              >
                <label for=""> {{ $t("dateofbirth") }} </label>
                <date-picker
                  v-model="relative.dateofbirth"
                  style="width:100%"
                  size="sm"
                  lang="ru"
                  :placeholder="$t('dateofbirth')"
                  value-type="format"
                  format="DD.MM.YYYY"
                >
                </date-picker>
              </b-col>
              <b-col
                sm="12"
                md="2"
                class="mt-2"
                v-if="
                  filteridentitydocserieslist.length === 0 &&
                    relative.identitydocumentid != 5 &&
                    relative.identitydocumentid != 2
                "
              >
                <label> {{ $t("pinfl") }} </label>
                <b-input-group>
                  <b-form-input
                    v-model="relative.pinfl"
                    :placeholder="$t('pinfl')"
                  ></b-form-input>
                  <template #append>
                    <b-button variant="primary" @click="SearchByPinflRelative">
                      <b-icon
                        v-if="!pinflRelativeLoading"
                        icon="search"
                      ></b-icon>
                      <b-spinner v-if="pinflRelativeLoading" small></b-spinner>
                      {{ $t("search") }}
                    </b-button>
                  </template>
                </b-input-group>
              </b-col>
              <b-col
                sm="12"
                md="2"
                class="mt-4"
                v-if="
                  relative.identitydocumentid == 1 ||
                    relative.identitydocumentid == 5 ||
                    relative.identitydocumentid == 2
                "
              >
                <label for="" class="mt-4"></label>
                <b-button variant="primary" @click="SearchByPinflRelative">
                  <b-icon v-if="!pinflRelativeLoading" icon="search"></b-icon>
                  <b-spinner v-if="pinflRelativeLoading" small></b-spinner>
                  {{ $t("search") }}
                </b-button>
              </b-col>
            </b-row>

            <b-row class="mt-2">
              <!-- <b-col>
                <label>{{$t('ondate')}}</label>
                <p v-if="relativetabrow.Status === 2" style="color:blue">{{relativetabrow.ondate}}</p>
                <date-picker
                  v-if="relativetabrow.Status === 1"
                  v-model="relativetabrow.ondate"
                  style="width:100%"
                  size="sm"
                  lang="ru"
                  :placeholder="$t('ondate')"
                  value-type="format"
                  format="DD.MM.YYYY"
                ></date-picker>
              </b-col> -->
              <b-col sm="12" md="6" class="mt-2 mt-md-0">
                <label>{{ $t("kinshipdegree") }}</label>
                <p v-if="relativetabrow.Status === 2" style="color:blue">
                  {{ relativetabrow.kinshipdegreename }}
                </p>
                <v-select
                  v-if="relativetabrow.Status === 1"
                  :options="KinshipDegreeList"
                  v-model="relativetabrow.kinshipdegreeid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                ></v-select>
              </b-col>
              <b-col sm="12" md="6" class="mt-2 mt-md-0">
                <b-form-input
                  :label="$t('familyname')"
                  class="mb-0"
                  type="text"
                  v-model="relativetabrow.familyname"
                  maxlength="100"
                ></b-form-input>
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col sm="12" md="4" class="mt-2 mt-md-0">
                <b-form-input
                  :label="$t('firstname')"
                  class="mb-0"
                  maxlength="100"
                  v-model="relativetabrow.firstname"
                ></b-form-input>
              </b-col>
              <b-col sm="12" md="4" class="mt-2 mt-md-0">
                <b-form-input
                  :label="$t('lastname')"
                  class="mb-0"
                  maxlength="100"
                  v-model="relativetabrow.lastname"
                ></b-form-input>
              </b-col>
              <b-col sm="12" md="4" class="mt-2 mt-md-0">
                <label>{{ $t("dateofbirth") }}</label>
                <date-picker
                  v-model="relativetabrow.dateofbirth"
                  style="width:100%"
                  size="sm"
                  lang="ru"
                  :placeholder="$t('ondate')"
                  value-type="format"
                  format="DD.MM.YYYY"
                ></date-picker>
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col sm="12" md="3" class="mt-2 mt-md-0">
                <ValidationProvider v-slot="v" name="pinfl" rules="min:14">
                  <b-form-input
                    :label="$t('pinfl')"
                    class="mb-0"
                    v-mask="'##############'"
                    :addInputClasses="{
                      'is-invalid': v.classes.invalid,
                      'is-valid': v.classes.valid,
                    }"
                    autocomplete="pinfl"
                    maxlength="14"
                    v-model="relativetabrow.pinfl"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">
                        {{ $t("NotCorrect14Pinfl") }}
                      </div>
                    </template>
                  </b-form-input>
                </ValidationProvider>
              </b-col>

              <b-col sm="12" md="1" class="mt-2 mt-md-0">
                <label>{{ $t("hasdied") }}</label>
                <b-form-checkbox
                  v-model="relativetabrow.hasdied"
                  name="check-button1"
                  switch
                ></b-form-checkbox>
              </b-col>
              <b-col
                sm="12"
                md="2"
                class="mt-2 mt-md-0"
                v-if="relativetabrow.hasdied"
              >
                <label>{{ $t("dateofdeath") }}</label>
                <date-picker
                  v-model="relativetabrow.dateofdeath"
                  style="width:100%"
                  size="sm"
                  :disabled="!relativetabrow.hasdied"
                  lang="ru"
                  :placeholder="$t('ondate')"
                  value-type="format"
                  format="DD.MM.YYYY"
                ></date-picker>
              </b-col>
              <b-col sm="12" md="3" class="mt-2 mt-md-0">
                <label for>{{ $t("Nationality") }}</label>
                <v-select
                  :options="NationalityList"
                  v-model="relativetabrow.nationalityid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                ></v-select>
              </b-col>

              <b-col sm="12" md="3" class="mt-2 mt-md-0">
                <label for>{{ $t("citizenship") }}</label>
                <v-select
                  :options="CountryList"
                  v-model="relativetabrow.citizenshipid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                ></v-select>
              </b-col>
            </b-row>
            <b-row class="mt-2">
              <b-col sm="12" md="4">
                <b-form-input
                  :label="$t('phonenumber')"
                  class="mb-0"
                  v-model="relativetabrow.phonenumber"
                  maxlength="30"
                ></b-form-input>
              </b-col>
              <b-col sm="12" md="4"></b-col>
              <b-col sm="12" md="4"></b-col>
            </b-row>
            <b-row class="divider my-4">
              <b-col>
                <hr class="mr-auto ml-auto d-block text-center" />
              </b-col>
              <b-col
                class="text-center d-flex"
                style="align-items:center;justify-content:center"
              >
                <h5>{{ $t("InfoLivePlace") }}</h5>
              </b-col>
              <b-col class="text-center">
                <hr class="mr-auto ml-auto d-block text-center" />
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="12" md="4">
                <label>{{ $t("country") }}</label>
                <v-select
                  :options="CountryList"
                  v-model="relativetabrow.countryid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                ></v-select>
              </b-col>
              <b-col sm="12" md="4" class="mt-2 mt-md-0">
                <label>{{ $t("oblast") }}</label>
                <v-select
                  :options="RelativeOblastList"
                  v-model="relativetabrow.oblastid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  @input="ChangeRelativeOblast"
                  label="name"
                ></v-select>
              </b-col>
              <b-col sm="12" md="4" class="mt-2 mt-md-0">
                <label>{{ $t("region") }}</label>
                <v-select
                  :options="RelativeRegionList"
                  v-model="relativetabrow.regionid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  @input="ChangeRelativeRegion"
                  label="name"
                ></v-select>
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col sm="12" md="4">
                <label>{{ $t("mfy") }}</label>
                <v-select
                  :options="RelativeMfyList"
                  v-model="relativetabrow.mfyid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                ></v-select>
              </b-col>
              <b-col sm="12" md="4">
                <b-form-input
                  :label="$t('address')"
                  class="mb-0"
                  maxlength="300"
                  v-model="relativetabrow.address"
                ></b-form-input>
              </b-col>
              <b-col sm="12" md="4"></b-col>
            </b-row>
            <b-row class="divider my-4">
              <b-col>
                <hr class="mr-auto ml-auto d-block text-center" />
              </b-col>
              <b-col
                class="text-center d-flex"
                style="align-items:center;justify-content:center"
              >
                <h5>{{ $t("InfoIdentityDocument") }}</h5>
              </b-col>
              <b-col class="text-center">
                <hr class="mr-auto ml-auto d-block text-center" />
              </b-col>
            </b-row>

            <b-row class="mt-3">
              <b-col sm="12" md="4">
                <label>{{ $t("identitydocument") }}</label>
                <v-select
                  :options="IdentityDocumentList"
                  v-model="relativetabrow.identitydocumentid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  @input="relativeidentitydocumentchange"
                ></v-select>
              </b-col>
              <b-col sm="12" md="4" class="mt-2 mt-md-0">
                <label>{{ $t("documentseries") }}</label>
                <v-select
                  v-if="relativeidentitydocserieslist.length > 0"
                  :options="relativeidentitydocserieslist"
                  v-model="relativetabrow.documentseries"
                  :reduce="(item) => item.code"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                ></v-select>
                <b-form-input
                  class="mb-0"
                  v-if="relativeidentitydocserieslist.length === 0"
                  v-model="relativetabrow.documentseries"
                  maxlength="5"
                ></b-form-input>
              </b-col>
              <b-col sm="12" md="4" class="mt-2 mt-md-0">
                <b-form-input
                  :label="$t('documentnumber')"
                  maxlength="10"
                  class="mb-0"
                  v-model="relativetabrow.documentnumber"
                ></b-form-input>
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col sm="12" md="4">
                <label>{{ $t("dateofissue") }}</label>
                <date-picker
                  v-model="relativetabrow.dateofissue"
                  style="width:100%"
                  size="sm"
                  lang="ru"
                  :placeholder="$t('ondate')"
                  value-type="format"
                  format="DD.MM.YYYY"
                ></date-picker>
              </b-col>
              <b-col sm="12" md="4" class="mt-2 mt-md-0">
                <label>{{ $t("dateofexpire") }}</label>
                <date-picker
                  v-model="relativetabrow.dateofexpire"
                  style="width:100%"
                  size="sm"
                  lang="ru"
                  :placeholder="$t('ondate')"
                  value-type="format"
                  format="DD.MM.YYYY"
                ></date-picker>
              </b-col>
              <b-col sm="12" md="4" class="mt-2 mt-md-0">
                <b-form-input
                  :label="$t('issueorganization')"
                  class="mb-0"
                  v-model="relativetabrow.issueorganization"
                  maxlength="100"
                ></b-form-input>
              </b-col>
            </b-row>
            <template v-slot:modal-footer>
              <div class="text-center mx-auto">
                <b-button
                  size="sm"
                  color="danger"
                  class="mr-2"
                  @click="$bvModal.hide('AddModal')"
                >
                  <b-icon icon="arrow-left-short"></b-icon>
                  {{ $t("back") }}
                </b-button>
                <b-button size="sm" color="primary" @click="AddItemRelative">
                  <b-icon icon="check2"></b-icon>
                  {{ $t("Save") }}
                </b-button>
              </div>
            </template>
          </b-modal>
          <b-modal
            id="AddModalPersonPlaceOfWork"
            size="lg"
            :title="$t('personplaceofwork')"
          >
            <b-row>
              <b-col>
                <c-input
                  :label="$t('organizationinn')"
                  horizontal
                  v-model="personofworktabrow.organizationinn"
                >
                </c-input>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <div class="form-group form-row mb-0">
                  <label class="col-form-label col-sm-3">
                    {{ $t("Organization") }}
                  </label>
                  <div class="col-sm-9 d-flex">
                    <c-input
                      style="width:100%"
                      disabled
                      v-model="personofworktabrow.organizationname"
                    >
                      <template #append>
                        <b-button
                          @click="OpenOrgModal"
                          size="sm"
                          type="button"
                          color="primary"
                        >
                          <b-icon icon="three-dots"></b-icon>
                        </b-button>
                      </template>
                    </c-input>
                  </div>
                </div>
              </b-col>
            </b-row>
            <!--<b-row>
              <b-col>
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3">
                    {{
                    $t("organizationname")
                    }}
                  </label>
                  <div class="col-sm-9">
                    <c-input
                      disabled
                      style="width:100%"
                      class="mr-2"
                      v-model="personofworktabrow.organizationname"
                    ></c-input>
                  </div>
                </div>
              </b-col>
            </b-row>-->

            <b-row>
              <b-col>
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("positionname")
                  }}</label>
                  <v-select
                    :options="PositionList"
                    v-model="personofworktabrow.positionid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    class="col-sm-9"
                  ></v-select>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("employmenttype")
                  }}</label>
                  <v-select
                    :options="employmenttypelist"
                    v-model="personofworktabrow.employmenttypeid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    class="col-sm-9"
                  ></v-select>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <div class="form-group form-row">
                  <label
                    for="datepicker-dateformat2"
                    class="col-form-label col-sm-3"
                    >{{ $t("startdate") }}</label
                  >
                  <div class="col-sm-9">
                    <!-- <custom-date-input />  -->
                    <date-picker
                      v-model="personofworktabrow.startdate"
                      style="width:100%"
                      size="sm"
                      lang="ru"
                      :placeholder="$t('startdate')"
                      value-type="format"
                      format="DD.MM.YYYY"
                    ></date-picker>
                  </div>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <div class="form-group form-row">
                  <label
                    for="datepicker-dateformat2"
                    class="col-form-label col-sm-3"
                    >{{ $t("enddate") }}</label
                  >
                  <div class="col-sm-9">
                    <!-- <custom-date-input />  -->
                    <date-picker
                      v-model="personofworktabrow.enddate"
                      style="width:100%"
                      size="sm"
                      lang="ru"
                      :placeholder="$t('enddate')"
                      value-type="format"
                      format="DD.MM.YYYY"
                    ></date-picker>
                  </div>
                </div>
              </b-col>
            </b-row>
            <template v-slot:modal-footer>
              <div class="text-center mx-auto">
                <b-button size="sm" color="danger" class="mr-2" @click="Close">
                  <b-icon icon="arrow-left-short"></b-icon>
                  {{ $t("back") }}
                </b-button>
                <b-button
                  size="sm"
                  color="primary"
                  @click="AddItemPersonPlaceOfWork"
                >
                  <b-icon icon="check2"></b-icon>
                  {{ $t("Save") }}
                </b-button>
              </div>
            </template>
          </b-modal>
          <b-modal
            id="AddModalPersonHigherEdu"
            size="lg"
            :title="$t('personhigheredu')"
          >
            <b-row>
              <b-col>
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("country")
                  }}</label>
                  <v-select
                    :options="CountryList"
                    v-model="personhigheredutabrow.countryid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    @input="ChangeCountryHigherEdu"
                    label="name"
                    class="col-sm-9"
                  ></v-select>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("oblast")
                  }}</label>
                  <v-select
                    :options="OblastList"
                    v-model="personhigheredutabrow.oblastid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    class="col-sm-9"
                    @input="ChangeOblastHigherEdu"
                  ></v-select>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("universityname")
                  }}</label>
                  <v-select
                    :options="UniversityList"
                    v-model="personhigheredutabrow.universityid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    @input="UniversityChange"
                    label="name"
                    class="col-sm-9"
                  ></v-select>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("EducationType")
                  }}</label>
                  <v-select
                    :options="EducationTypeList"
                    v-model="personhigheredutabrow.educationtypeid"
                    @input="EducationChange"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="fullname"
                    class="col-sm-9"
                  ></v-select>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("highereduclassifiername")
                  }}</label>
                  <v-select
                    :options="HigherEduClassifierList"
                    v-model="personhigheredutabrow.highereduclassifierid"
                    @input="HighereducChange"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="fullname"
                    class="col-sm-9"
                  ></v-select>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <c-input
                  :label="$t('documentseries')"
                  horizontal
                  v-model="personhigheredutabrow.documentseries"
                />
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <c-input
                  :label="$t('documentnumber')"
                  horizontal
                  v-model="personhigheredutabrow.documentnumber"
                />
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <div class="form-group form-row">
                  <label
                    for="datepicker-dateformat2"
                    class="col-form-label col-sm-3"
                    >{{ $t("dateofissue") }}</label
                  >
                  <div class="col-sm-9">
                    <!-- <custom-date-input />  -->
                    <date-picker
                      v-model="personhigheredutabrow.dateofissue"
                      style="width:100%"
                      size="sm"
                      lang="ru"
                      :placeholder="$t('dateofissue')"
                      value-type="format"
                      format="DD.MM.YYYY"
                    ></date-picker>
                  </div>
                </div>
              </b-col>
            </b-row>

            <template v-slot:modal-footer>
              <div class="text-center mx-auto">
                <b-button
                  size="sm"
                  color="danger"
                  class="mr-2"
                  @click="CloseHigherEdu"
                >
                  <b-icon icon="arrow-left-short"></b-icon>
                  {{ $t("back") }}
                </b-button>
                <b-button
                  size="sm"
                  color="primary"
                  @click="AddItemPersonHigherEdu"
                >
                  <b-icon icon="check2"></b-icon>
                  {{ $t("Save") }}
                </b-button>
              </div>
            </template>
          </b-modal>
        </b-card-body>
        <b-row>
          <b-col>
            <p class="ml-4 mt-n3">
              <b>
                <code style="font-size:16px" color="red">*</code>
                {{ $t("NeedFillAllFields") }}
              </b>
            </p>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <div v-if="showBackButton" class="text-left">
              <b-button
                v-if="isStudent"
                class="ml-4"
                size="sm"
                color="danger"
                @click="
                  $router.push({
                    name: 'Student',
                    query: {
                      docseries: $route.query.docseries,
                      docnumber: $route.query.docnumber,
                      search: $route.query.search,
                      pagelimit: $route.query.pagelimit,
                    },
                  })
                "
              >
                <b-icon icon="arrow-left-short"></b-icon>
                {{ $t("back") }}
              </b-button>
              <b-button
                v-if="!isStudent"
                class="ml-4"
                size="sm"
                color="danger"
                @click="
                  $router.push({
                    name: 'Employee',
                    query: {
                      docseries: $route.query.docseries,
                      docnumber: $route.query.docnumber,
                      search: $route.query.search,
                      pagelimit: $route.query.pagelimit,
                    },
                  })
                "
              >
                <b-icon icon="arrow-left-short"></b-icon>
                {{ $t("back") }}
              </b-button>
            </div>
          </b-col>
          <b-col v-if="person.CanSave">
            <div v-if="showSaveButton" class="text-right">
              <b-button size="sm" color="success" class="mr-4" @click="SaveData">
                <b-spinner v-if="SaveLoading" small></b-spinner>
                <b-icon v-if="!SaveLoading" icon="check2"></b-icon>
                {{ $t("Save") }}
              </b-button>
            </div>
          </b-col>
        </b-row>
      </b-card>
      <b-modal
        id="OrgModal"
        no-close-on-backdrop
        size="xl"
        :title="$t('Organization')"
        hide-footer
        modal-class="custom-size-modal"
      >
        <organization-list
          @SelectedItem="SelectedItem(orgvalue)"
          @DblClick="AddOrgData"
        ></organization-list>
        <c-row class="mt-2">
          <c-col class="text-center">
            <b-button class="mr-2" variant="danger" @click="CloseOrgModal">
              {{ $t("back") }}
            </b-button>
            <b-button variant="primary" @click="AddOrgData(orgvalue)">
              {{ $t("Add") }}
            </b-button>
          </c-col>
        </c-row>
      </b-modal>
      <b-sidebar
        bg-variant="white"
        @hidden="activeHistory = false"
        width="40vw"
        backdrop-variant="dark"
        backdrop
        id="side"
        :visible="activeHistory"
        aria-label="Sidebar with custom footer"
        right
        :title="$t('personhistory')"
      >
        <history-detail-info :history="personhistory"></history-detail-info>
      </b-sidebar>
      <!-- <vs-sidebar parent="body" default-index="1"  color="primary" position-right class="sidebarx" spacer v-model="activeHistory">
        <b-container class="sidebar-vsx" fluid > dsdsd</b-container>
      </vs-sidebar> -->
      <b-modal
        id="CheckModal"
        size="xl"
        no-close-on-backdrop
        hide-footer
        :title="$t('checkDocument')"
      >
        <b-row>
          <b-col sm="12" md="4">
            <label>{{ $t("identitydocument") }}</label>
            <v-select
              :options="IdentityDocumentList"
              v-model="CheckDoc.identitydocumentid"
              :reduce="(item) => item.id"
              :placeholder="$t('ChooseBelow')"
              label="name"
            ></v-select>
          </b-col>
          <b-col sm="12" md="8">
            <b-row>
              <b-col>
                <b-form-input
                  v-if="CheckDoc.identitydocumentid != 1"
                  class="mb-0"
                  :label="$t('docseries')"
                  :placeholder="$t('docseries')"
                  v-model="CheckDoc.documentseries"
                ></b-form-input>
                <div v-if="CheckDoc.identitydocumentid == 1">
                  <label for=""> {{ $t("docseries") }} </label>
                  <v-select
                    :options="filteridentitydocserieslist"
                    v-model="CheckDoc.documentseries"
                    :reduce="(item) => item.name"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  ></v-select>
                </div>
              </b-col>
              <b-col>
                <b-form-input
                  :placeholder="$t('docnumber')"
                  autocomplete="docnumber"
                  :label="$t('docnumber')"
                  v-model="CheckDoc.documentnumber"
                ></b-form-input>
              </b-col>
              <b-col>
                <!-- <b-button @click="CheckDocument" class="mt-4" variant="primary" block> <b-spinner small v-if="CheckDocLoading"></b-spinner>  Check </b-button> -->
                <label for=""> {{ $t("pinfl") }} </label>
                <b-input-group>
                  <b-form-input v-model="CheckDoc.pinfl"></b-form-input>
                  <b-input-group-append>
                    <b-button variant="primary" @click="CheckDocument">
                      <b-spinner small v-if="CheckDocLoading"></b-spinner>
                      <b-icon v-if="!CheckDocLoading" icon="search"> </b-icon>
                    </b-button>
                  </b-input-group-append>
                </b-input-group>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row v-if="!!CheckDocData.fullname">
          <b-col>
            <table>
              <tr>
                <td>
                  <b
                    >{{ isStudent ? $t("studentname") : $t("personname") }} :
                  </b>
                </td>
                <td class="text-right">
                  {{ CheckDocData.fullname }}
                </td>
              </tr>
              <tr>
                <td>
                  <b>{{ $t("pinfl") }} : </b>
                </td>
                <td class="text-right">
                  {{ CheckDocData.pinfl }}
                </td>
              </tr>
              <tr>
                <td>
                  <b>{{ $t("dateofbirth") }} : </b>
                </td>
                <td class="text-right">
                  {{ CheckDocData.dateofbirth }}
                </td>
              </tr>
            </table>
          </b-col>
          <b-col>
            <table>
              <tr>
                <td></td>
                <td></td>
              </tr>
            </table>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="text-center">
            <b-button
              class="mr-2"
              variant="danger"
              @click="$bvModal.hide('CheckModal')"
            >
              {{ $t("back") }}
            </b-button>
            <b-button variant="success" @click="CheckDocumentbyGov">
              <b-spinner v-if="CheckByGovLoading" small></b-spinner>
              {{ $t("Accept") }}
            </b-button>
          </b-col>
        </b-row>
      </b-modal>
    </b-col>
  </b-row>
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
  BFormCheckbox,
  VBTooltip,
  BModal,
  VBModal,
  BCardText,
  BSpinner,
} from "bootstrap-vue";
import CustomDatePicker from "@/views/components/customDatePicker.vue";
import PersonService from "@/services/info/person.service";
import HelperService from "@/services/others/helper.service";
import CountryService from "@/services/info/country.service";
import IdentityDocumentService from "@/services/info/identitydocument.service";
import OblastService from "@/services/info/oblast.service";
import RegionService from "@/services/info/region.service";
import MfyService from "@/services/info/mfy.service";
import NationalityService from "@/services/info/nationality.service";
import KinshipDegreeService from "@/services/info/kinshipdegree.service";
import Ripple from "vue-ripple-directive";
import flatPickr from "vue-flatpickr-component";
// import OrganizationList from "@/components/OrganizationList";
// import HistoryDetailInfo from "@/components/HistoryDetailInfo.vue";
export default {
  name: "editPersonComponent",
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
    BFormCheckbox,
    BModal,
    BCardText,
    BSpinner,
    CustomDatePicker,
  },
  directives: {
    "b-tooltip": VBTooltip,
    "b-modal": VBModal,
  },
  props: {
    showBackButton: {
      type: Boolean,
      default: true,
    },
    isStudent: {
      type: Boolean,
      default: true,
    },

    showSaveButton: {
      type: Boolean,
      default: true,
    },
    personData: {
      familyname: "",
      firstname: "",
      lastname: "",
      dateofbirth: "",
      genderid: "",
      nationalityid: "",
      citizenshipid: "",
      inn: "",
      pinfl: "",
      contactinfo: "",
      birthcountryid: "",
      birthoblastid: "",
      birthregionid: "",
      birthmfyid: "",
      birthaddress: "",
      isstudent: true,
      PersonRelativeTables: [],
      LivePlaceTables: [],
      DocumentTables: [],
    },
    model: {
      prop: "personData",
      event: "persondatachange",
    },
  },
  computed: {
    person: {
      get: function() {
        return this.personData ? this.personData : this.personlocal;
      },
      set: function(value) {
        this.personlocal = value;
        this.$emit("persondatachange", value);
        this.liveplacetabrow.countryid = 211;
      },
    },
    isNotCameData() {
      var a = localStorage.getItem("egovinfo");
      var b = JSON.parse(localStorage.getItem("infoofegov"));
      if (a == true && b.LivePlaceTables.length == 0) {
        return true;
      } else {
        return false;
      }
    },
  },
  data() {
    return {
      orgloading: false,
      personhistory: [],
      activeHistory: false,
      personofworktabrow: {
        id: 0,
        ownerid: 0,
        organizationid: 0,
        organizationname: "",
        organizationinn: "",
        positionid: 0,
        positionname: "",
        employmenttypeid: 0,
        employmenttypename: "",
        Status: 1,
        startdate: 0,
        enddate: 0,
      },
      personhigheredutabrow: {
        id: 0,
        ownerid: 0,
        educationtypeid: 0,
        educationtypename: "",
        universityid: 0,
        universityname: "",
        documentseries: "",
        documentnumber: "",
        dateofissue: "",
        highereduclassifierid: 0,
        highereduclassifiername: "",
        Status: 1,
        countryid: 211,
        oblastid: 0,
      },
      personlocal: {
        familyname: "",
        firstname: "",
        lastname: "",
        dateofbirth: "",
        genderid: "",
        nationalityid: "",
        citizenshipid: "",
        inn: "",
        pinfl: "",
        contactinfo: "",
        birthcountryid: "",
        birthoblastid: "",
        birthregionid: "",
        birthmfyid: "",
        birthaddress: "",
        PersonRelativeTables: [],
        LivePlaceTables: [],
        DocumentTables: [],
      },
      OblastLoading: false,
      RegionLoading: false,
      MfyLoading: false,
      GenderList: [],
      lang: "",
      NationalityList: [],
      CitizenShipList: [],
      CountryList: [],
      BirthOblastList: [],
      BirthRegionList: [],
      BirthMfyList: [],
      RelativeOblastList: [],
      RelativeRegionList: [],
      RelativeMfyList: [],
      LiveOblastList: [],
      LiveRegionList: [],
      LiveMfyList: [],
      identitydocserieslist: [],
      filteridentitydocserieslist: [],
      relativeidentitydocserieslist: [],
      employmenttypelist: [],
      pinflRelativeLoading: false,
      fieldsDocument: [
        {
          key: "identitydocumentname",
          label: this.$t("IdentityDocument"),
        },
        {
          key: "documentseries",
          label: this.$t("documentseries"),
        },
        {
          key: "documentnumber",
          label: this.$t("documentnumber"),
        },
        {
          key: "dateofissue",
          label: this.$t("dateofissue"),
        },
        {
          key: "issueorganization",
          label: this.$t("issueorganization"),
        },
        {
          key: "statename",
          label: this.$t("statename"),
        },
        {
          key: "actions",
          label: this.$t("actions"),
        },
      ],
      documenttabrow: {
        ondate: "",
        identitydocumentname: "",
        identitydocumentid: 0,
        documentseries: "",
        documentnumber: "",
        dateofissue: "",
        dateofexpire: null,
        issueorganization: "",
        stateid: 1,
        Status: 1,
      },
      UpdateFromEGovLoading: false,
      IdentityDocumentList: [],
      fieldsLivePlace: [
        {
          key: "oblast",
          label: this.$t("oblast"),
        },
        {
          key: "region",
          label: this.$t("region"),
        },
        {
          key: "mfy",
          label: this.$t("Mfy"),
        },
        {
          key: "address",
          label: this.$t("Address"),
        },
        {
          key: "actions",
          label: this.$t("actions"),
        },
      ],
      liveplacetabrow: {
        ondate: "",
        countryname: "",
        countryid: 211,
        oblastname: "",
        oblastid: null,
        regionname: "",
        regionid: null,
        mfyid: null,
        address: "",
        stateid: 1,
        Status: 1,
      },
      fieldsRelative: [
        {
          key: "actions",
          label: this.$t("actions"),
        },
        {
          key: "kinshipdegreename",
          label: this.$t("KinshipDegree"),
        },
        {
          key: "familyname",
          label: this.$t("familyname"),
        },
        {
          key: "firstname",
          label: this.$t("firstname"),
        },
        {
          key: "lastname",
          label: this.$t("lastname"),
        },
        {
          key: "dateofbirth",
          label: this.$t("dateofbirth"),
        },
      ],
      fieldsPlaceOfWork: [
        {
          key: "actions",
          label: this.$t("actions"),
        },
        {
          key: "organizationname",
          label: this.$t("organizationname"),
        },
        {
          key: "organizationinn",
          label: this.$t("organizationinn"),
        },
        {
          key: "positionname",
          label: this.$t("positionname"),
        },
        {
          key: "employmenttypename",
          label: this.$t("employmenttype"),
        },
        {
          key: "startdate",
          label: this.$t("startdate"),
        },
        {
          key: "enddate",
          label: this.$t("enddate"),
        },
      ],
      fieldsHigherEdu: [
        { key: "actions", label: this.$t("actions") },
        { key: "universityname", label: this.$t("universityname") },
        { key: "documentseries", label: this.$t("documentseries") },
        { key: "documentnumber", label: this.$t("documentnumber") },
        { key: "dateofissue", label: this.$t("dateofissue") },
        {
          key: "highereduclassifiername",
          label: this.$t("highereduclassifiername"),
        },
      ],
      relativetabrow: {
        id: 0,
        personid: 0,
        ondate: "",
        kinshipdegreename: "",
        kinshipdegreeid: null,
        familyname: "",
        firstname: "",
        lastname: "",
        dateofbirth: "",
        pinfl: "",
        hasdied: false,
        dateofdeath: "",
        countryname: "",
        countryid: 211,
        oblastname: "",
        oblastid: null,
        regionname: "",
        regionid: null,
        mfyname: "",
        mfyid: null,
        address: "",
        phonenumber: "",
        identitydocumentname: "",
        identitydocumentid: null,
        documentseries: "",
        documentnumber: "",
        dateofissue: "",
        dateofexpire: null,
        issueorganization: "",
        nationalityid: 0,
        nationalityname: "",
        citizenshipid: 211,
        citizenshipname: "",
        Status: 1,
      },
      filter: {
        identitydocumentid: 1,
        docseries: "",
        docnumber: "",
        inn: "",
        pinfl: "",
        dateofbirth: "",
      },
      relative: {
        identitydocumentid: 2,
        docseries: "",
        docnumber: "",
        inn: "",
        pinfl: "",
        dateofbirth: "",
      },
      pinflLoading: false,
      KinshipDegreeList: [],
      SaveLoading: false,
      tabIndex: 0,
      today: "",
      livetabrowindex: -1,
      documenttabrowindex: -1,
      editedIndex: -1,
      editedIndex1: -1,
      PositionList: [],
      UniversityList: [],
      HigherEduClassifierList: [],
      EducationTypeList: [],
      orgvalue: {},
      CheckResult: false,
      InfoOfEGov: {},
      egovinfo: false,
      CheckDoc: {
        identitydocumentid: 0,
        documentseries: "",
        documentnumber: "",
        pinfl: "",
      },
      CheckDocLoading: false,
      CheckByGovLoading: false,
      CheckDocData: {},
      OblastList: [],
    };
  },
  destroyed() {
    localStorage.removeItem("egovinfo");
    localStorage.removeItem("infoofegov");
  },
  created() {
    this.lang = localStorage.getItem("locale") || "ru";
    if (this.isStudent) {
      this.relative.identitydocumentid = 1;
    }
    this.loaddata();
    this.loadhelper();
    var self = this;
    this.getoblastlist(self.liveplacetabrow.countryid, function(data) {
      self.LiveOblastList = data;
      self.liveplacetabrow.countryid = 211;
      self.RelativeOblastList = data;
    });
    if (this.isStudent) {
      this.filter.identitydocumentid = 1;
      this.documenttabrow.identitydocumentid = 1;
    } else {
      this.filter.identitydocumentid = 2;
      this.documenttabrow.identitydocumentid = 2;
    }
    this.createDate();
    this.documenttabrow.ondate = this.today;
    this.relativetabrow.ondate = this.today;
    this.liveplacetabrow.ondate = this.today;
    this.filteridentitydocumentchange(this.filter);
    // this.identitydocumentchange(this.documenttabrow);

    if (self.$route.params.id != 0) {
      PersonService.GetDocumentStatusLog(self.$route.params.id).then((res) => {
        this.personhistory = res.data;
      });
    }
  },
  methods: {
    CheckDocumentbyGov() {
      this.CheckByGovLoading = true;
      PersonService.ChangeIdentityDocument(
        this.person.id,
        this.CheckDoc.identitydocumentid,
        this.CheckDoc.documentseries,
        this.CheckDoc.documentnumber,
        this.CheckDoc.pinfl
      )
        .then((res) => {
          this.CheckByGovLoading = false;
          this.loaddata();
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, this.$t("error"), "danger");
          this.CheckByGovLoading = false;
        });
    },
    CheckDocument() {
      this.CheckDocLoading = true;
      PersonService.GetFromGovData(
        this.CheckDoc.documentseries,
        this.CheckDoc.documentnumber,
        this.CheckDoc.pinfl,
        "",
        this.isStudent,
        "",
        this.CheckDoc.identitydocumentid
      )
        .then((res) => {
          this.CheckDocLoading = false;
          this.CheckDocData = res.data;
        })
        .catch((err) => {
          this.makeToast(err.response.data.error, this.$t("error"), "danger");
          this.CheckDocLoading = false;
        });
    },
    OpenCheckDocModal() {
      this.$bvModal.show("CheckModal");
      this.CheckDoc.identitydocumentid = 0;
      this.CheckDoc.documentseries = "";
      this.CheckDoc.documentnumber = "";
      this.CheckDoc.pinfl = "";
      this.CheckDoc = {};
    },
    InnDisabled() {
      var self = this;
      if (
        self.filter.identitydocumentid == 3 ||
        self.filter.identitydocumentid == 4
      ) {
        return false;
      }
      if (
        self.egovinfo &&
        self.InfoOfEGov.inn !== undefined &&
        self.InfoOfEGov.inn === null
      ) {
        return false;
      }
      console.log(self.InfoOfEGov.inn);
      return true;
    },
    UpdateDataFromEGov() {
      this.UpdateFromEGovLoading = true;
      PersonService.UpdateDataFromEGov(this.person.id)
        .then((res) => {
          this.UpdateFromEGovLoading = false;
          this.loaddata();
          this.makeToast(
            this.$t("SuccessUpdate"),
            this.$t("message"),
            "success"
          );
        })
        .catch((error) => {
          this.UpdateFromEGovLoading = false;
          this.makeToast(error.response.data.error, this.$t("error"), "danger");
        });
    },
    GotoCard() {
      if (this.isStudent) {
        this.$router.push({
          name: "StudentCard",
          query: {
            docseries: this.person.DocumentTables[0].documentseries,
            docnumber: this.person.DocumentTables[0].documentnumber,
            dateofbirth: this.person.DocumentTables[0].dateofissue,
          },
        });
      } else {
        this.$router.push({
          name: "EmployeeCard",
          query: {
            docseries: this.person.DocumentTables[0].documentseries,
            docnumber: this.person.DocumentTables[0].documentnumber,
            pinfl: this.person.pinfl,
          },
        });
      }
    },
    disabledForDateofBirth(date) {
      var todaydate = new Date();
      var dd = String(todaydate.getDate()).padStart(2, "0");
      var mm = String(todaydate.getMonth() + 1).padStart(2, "0");
      var yyyy = todaydate.getFullYear();
      if (this.isStudent) {
        // alert(date)
        return !(
          date < new Date(yyyy - 6, mm, dd) &&
          date > new Date(yyyy - 20, mm, dd)
        );
      }
    },
    OpenActiveSidebar() {
      this.activeHistory = !this.activeHistory;
    },
    SearchByPinflRelative() {
      this.pinflRelativeLoading = true;
      PersonService.GetFromGovData(
        this.relative.docseries,
        this.relative.docnumber,
        this.relative.pinfl,
        this.relative.dateofbirth,
        this.isStudent,
        this.relative.inn,
        this.relative.identitydocumentid
      )
        .then((res) => {
          // this.relativetabrow = {
          //   Status : 1,
          //   familyname : res.data.familyname,
          //   firstname : res.data.firstname,
          //   lastname : res.data.lastname,
          //   dateofbirth : res.data.dateofbirth,
          //   pinfl : res.data.pinfl,

          // }
          this.relativetabrow = res.data;
          this.relativetabrow.Status = 1;
          this.relativetabrow.countryid = res.data.birthcountryid;
          this.relativetabrow.oblastid = res.data.birthoblastid;
          this.relativetabrow.regionid = res.data.birthregionid;
          this.relativetabrow.mfyid = res.data.birthmfyid;
          this.relativetabrow.hasdied = fetch;
          this.relativetabrow.address = res.data.birthaddress;
          this.relativetabrow.identitydocumentid =
            res.data.DocumentTables[0].identitydocumentid;
          this.relativetabrow.documentseries =
            res.data.DocumentTables[0].documentseries;
          this.relativetabrow.documentnumber =
            res.data.DocumentTables[0].documentnumber;
          this.relativetabrow.dateofissue =
            res.data.DocumentTables[0].dateofissue;
          this.relativetabrow.dateofexpire =
            res.data.DocumentTables[0].dateofexpire;
          this.relativetabrow.issueorganization =
            res.data.DocumentTables[0].issueorganization;
          this.pinflRelativeLoading = false;
        })
        .catch((error) => {
          this.pinflRelativeLoading = false;
          this.makeToast(error.response.data.error, this.$t("error"), "danger");
        });
    },
    getCountryHigherEdu() {
      if (!!this.personhigheredutabrow.countryid) {
        OblastService.GetAll(this.personhigheredutabrow.countryid).then(
          (res) => {
            this.OblastList = res.data;
          }
        );
      }
    },
    ChangeCountryHigherEdu() {
      this.personhigheredutabrow.oblastid = 0;
      this.personhigheredutabrow.universityid = 0;
      this.getCountryHigherEdu();
      this.getOblastHigherEdu();
    },
    getOblastHigherEdu() {
      // if(!!this.personhigheredutabrow.oblastid){
      UniversityService.GetAll(
        this.personhigheredutabrow.countryid,
        this.personhigheredutabrow.oblastid,
        this.lang
      ).then((res) => {
        this.UniversityList = res.data;
      });
      // }
    },
    ChangeOblastHigherEdu() {
      this.personhigheredutabrow.universityid = 0;
      this.getOblastHigherEdu();
    },
    OpenOrgModal() {
      this.$bvModal.show("OrgModal");
    },
    CloseOrgModal() {
      this.$bvModal.hide("OrgModal");
    },
    SelectedItem(value, data) {
      value = data;
    },
    AddOrgData(data) {
      var self = this;
      self.personofworktabrow.organizationid = data.id;
      self.personofworktabrow.organizationname = data.fullname;
      self.CloseOrgModal();
    },
    FindOrgByInn() {
      if (!!this.personofworktabrow.organizationinn) {
        this.orgloading = true;
        OrganizationService.Get(0, this.personofworktabrow.organizationinn)
          .then((res) => {
            this.personofworktabrow.organizationname = res.data.FullName;
            this.personofworktabrow.organizationid = res.data.ID;
            this.orgloading = false;
            console.log(res.data);
          })
          .catch((error) => {
            this.orgloading = false;
            this.makeToast(
              error.response.data.error,
              this.$t("message"),
              "danger"
            );
          });
      }
    },
    isView() {
      if (!this.showBackButton) {
        return true;
      } else {
        if (this.$route.params.id == 0) {
          return true;
        } else {
          return false;
        }
      }
    },
    disabledDateOfBirth(date) {
      var today = new Date();
      return date.getFullYear() < today.getFullYear() - 6;
    },
    AddPersonPlaceOfWork() {
      HelperService.GetEmploymentType(this.lang).then((res) => {
        this.employmenttypelist = res.data;
      });
      PositionService.GetAll1().then((res) => {
        this.PositionList = res.data;
      });
      this.$bvModal.show("AddModalPersonPlaceOfWork");
    },
    getHigherEduApis() {
      HigherEduClassifierService.GetAll().then((res) => {
        this.HigherEduClassifierList = res.data;
      });
      EducationTypeService.GetAll().then((res) => {
        this.EducationTypeList = res.data;
      });
      this.getCountryHigherEdu();
      this.getOblastHigherEdu();
    },
    AddPersonHigherEdu() {
      this.getHigherEduApis();
      this.$bvModal.show("AddModalPersonHigherEdu");
      this.$nextTick(() => {
        (this.personhigheredutabrow = {
          id: 0,
          ownerid: 0,
          educationtypeid: 0,
          educationtypeid: "",
          universityid: 0,
          universityname: "",
          documentseries: "",
          documentnumber: "",
          dateofissue: "",
          highereduclassifierid: 0,
          highereduclassifiername: "",
          countryid: 211,
          oblastid: 0,
          Status: 1,
        }),
          (this.editedIndex1 = -1);
      });
    },
    AddItemPersonPlaceOfWork() {
      if (this.editedIndex > -1) {
        Object.assign(
          this.person.PersonPlaceofWorkTables[this.editedIndex],
          this.personofworktabrow
        );
        this.Close();
      } else {
        this.AddPersonPlaceWork();
      }
    },
    AddItemPersonHigherEdu() {
      if (this.editedIndex1 > -1) {
        Object.assign(
          this.person.PersonHigherEduTables[this.editedIndex1],
          this.personhigheredutabrow
        );
        this.CloseHigherEdu();
      } else {
        this.AddHigherEdu();
      }
    },
    AddHigherEdu() {
      var self = this;
      if (
        self.personhigheredutabrow.universityid === 0 ||
        self.personhigheredutabrow.universityid === null ||
        self.personhigheredutabrow.universityid === undefined ||
        self.personhigheredutabrow.universityid === ""
      ) {
        this.makeToast(
          this.$t("universityNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.personhigheredutabrow.documentseries === 0 ||
        self.personhigheredutabrow.documentseries === null ||
        self.personhigheredutabrow.documentseries === undefined ||
        self.personhigheredutabrow.documentseries === ""
      ) {
        this.makeToast(
          this.$t("documentseriesNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.personhigheredutabrow.documentnumber === 0 ||
        self.personhigheredutabrow.documentnumber === null ||
        self.personhigheredutabrow.documentnumber === undefined ||
        self.personhigheredutabrow.documentnumber === ""
      ) {
        this.makeToast(
          this.$t("documentnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.personhigheredutabrow.dateofissue === 0 ||
        self.personhigheredutabrow.dateofissue === null ||
        self.personhigheredutabrow.dateofissue === undefined ||
        self.personhigheredutabrow.dateofissue === ""
      ) {
        this.makeToast(
          this.$t("dateofissueNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.personhigheredutabrow.highereduclassifierid === 0 ||
        self.personhigheredutabrow.highereduclassifierid === null ||
        self.personhigheredutabrow.highereduclassifierid === undefined ||
        self.personhigheredutabrow.highereduclassifierid === ""
      ) {
        this.makeToast(
          this.$t("highereduclassifierNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      self.personhigheredutabrow.universityname = self.UniversityList.filter(
        (item) => item.id === self.personhigheredutabrow.universityid
      )[0].name;
      self.personhigheredutabrow.highereduclassifiername = self.HigherEduClassifierList.filter(
        (item) => item.id === self.personhigheredutabrow.highereduclassifierid
      )[0].name;
      self.person.PersonHigherEduTables.push(self.personhigheredutabrow);
      console.log(self.person.PersonHigherEduTables);
      self.$bvModal.hide("AddModalPersonHigherEdu");
    },
    EducationChange() {
      this.personhigheredutabrow.educationtypename = this.EducationTypeList.filter(
        (item) => item.id === this.personhigheredutabrow.educationtypeid
      )[0].name;
    },
    UniversityChange() {
      this.personhigheredutabrow.universityname = this.UniversityList.filter(
        (item) => item.id === this.personhigheredutabrow.universityid
      )[0].name;
    },
    HighereducChange() {
      this.personhigheredutabrow.highereduclassifiername = this.HigherEduClassifierList.filter(
        (item) => item.id === this.personhigheredutabrow.highereduclassifierid
      )[0].name;
    },
    AddPersonPlaceWork() {
      var self = this;
      if (
        self.personofworktabrow.organizationid === 0 ||
        self.personofworktabrow.organizationid === null ||
        self.personofworktabrow.organizationid === undefined ||
        self.personofworktabrow.organizationid === ""
      ) {
        this.makeToast(
          this.$t("organizationNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.personofworktabrow.organizationinn === 0 ||
        self.personofworktabrow.organizationinn === null ||
        self.personofworktabrow.organizationinn === undefined ||
        self.personofworktabrow.organizationinn === "" ||
        self.personofworktabrow.organizationinn.length != 9
      ) {
        this.makeToast(
          this.$t("organizationinnNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.personofworktabrow.positionid === 0 ||
        self.personofworktabrow.positionid === null ||
        self.personofworktabrow.positionid === undefined ||
        self.personofworktabrow.positionid === ""
      ) {
        this.makeToast(
          this.$t("positionNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.personofworktabrow.startdate === 0 ||
        self.personofworktabrow.startdate === null ||
        self.personofworktabrow.startdate === undefined ||
        self.personofworktabrow.startdate === ""
      ) {
        this.makeToast(
          this.$t("startdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.personofworktabrow.enddate === 0 ||
        self.personofworktabrow.enddate === null ||
        self.personofworktabrow.enddate === undefined ||
        self.personofworktabrow.enddate === ""
      ) {
        this.makeToast(
          this.$t("enddateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      self.personofworktabrow.positionname = self.PositionList.filter(
        (item) => item.id === self.personofworktabrow.positionid
      )[0].name;
      self.personofworktabrow.employmenttypename = self.employmenttypelist.filter(
        (item) => item.id === self.personofworktabrow.employmenttypeid
      )[0].name;
      console.log(self.personofworktabrow);
      self.person.PersonPlaceofWorkTables.push(self.personofworktabrow);
      self.$bvModal.hide("AddModalPersonPlaceOfWork");
    },
    Close() {
      this.$bvModal.hide("AddModalPersonPlaceOfWork");
      this.$nextTick(() => {
        (this.personofworktabrow = {
          id: 0,
          ownerid: 0,
          organizationid: 0,
          organizationname: "",
          organizationinn: "",
          positionid: 0,
          positionname: "",
          employmenttypeid: 0,
          employmenttypename: "",
          Status: 1,
          startdate: 0,
          enddate: 0,
        }),
          (this.editedIndex = -1);
      });
    },
    CloseHigherEdu() {
      this.$bvModal.hide("AddModalPersonHigherEdu");
      this.$nextTick(() => {
        (this.personhigheredutabrow = {
          id: 0,
          ownerid: 0,
          educationtypeid: 0,
          educationtypename: "",
          universityid: 0,
          universityname: "",
          documentseries: "",
          documentnumber: "",
          dateofissue: "",
          highereduclassifierid: 0,
          highereduclassifiername: "",
          countryid: 211,
          oblastid: 0,
          Status: 1,
        }),
          (this.editedIndex1 = -1);
      });
    },
    EditItemPlaceOfWork(item) {
      if (item.Status == 0) {
        item.Status = 2;
      }
      this.editedIndex = this.person.PersonPlaceofWorkTables.indexOf(item);
      this.personofworktabrow = Object.assign({}, item);
      this.$bvModal.show("AddModalPersonPlaceOfWork");
    },
    EditItemHigherEdu(item) {
      if (item.Status == 0) {
        item.Status = 2;
      }
      this.getHigherEduApis();
      this.editedIndex1 = this.person.PersonHigherEduTables.indexOf(item);
      this.personhigheredutabrow = Object.assign({}, item);
      this.$bvModal.show("AddModalPersonHigherEdu");
    },
    EditItem1(item, index) {
      this.liveplacetabrow = {
        id: item.id,
        ondate: item.ondate,
        countryid: item.countryid,
        countryname: item.countryname,
        oblastid: item.oblastid,
        oblastname: item.oblastname,
        regionid: item.regionid,
        regionname: item.regionname,
        mfyid: item.mfyid,
        mfyname: item.mfyname,
        stateid: item.stateid,
        address: item.address,
      };
      this.$bvModal.show("AddModal2");
      if (item.Status == 0) {
        item.Status = 2;
      }
      this.livetabrowindex = index;
    },
    EditItemDocument(item, index) {
      this.documenttabrow = {
        id: item.id,
        ondate: item.ondate,
        identitydocumentname: item.identitydocumentname,
        identitydocumentid: item.identitydocumentid,
        documentseries: item.documentseries,
        documentnumber: item.documentnumber,
        dateofissue: item.dateofissue,
        dateofexpire: item.dateofexpire,
        issueorganization: item.issueorganization,
        stateid: item.stateid,
      };
      this.$bvModal.show("AddModalDocument");
      if (item.Status == 0) {
        item.Status = 2;
      }
      this.documenttabrowindex = index;
    },
    AddRowDocumentTables() {
      this.$bvModal.show("AddModalDocument");
      this.documenttabrowindex = -1;
    },
    changeadress() {
      // if (!!this.person.birthcountryid) {
      //   // this.liveplacetabrow.countryid = this.person.birthcountryid;
      // }
      // if (!!this.person.birthoblastid) {
      //   this.liveplacetabrow.oblastid = this.person.birthoblastid;
      // }
      // if (!!this.person.birthregionid) {
      //   this.liveplacetabrow.regionid = this.person.birthregionid;
      // }
    },
    AddRowLivePlacesTables() {
      this.$bvModal.show("AddModal2");
      this.livetabrowindex = -1;
      this.liveplacetabrow = {
        ondate: "",
        countryname: "",
        countryid: 211,
        oblastname: "",
        oblastid: null,
        regionname: "",
        regionid: null,
        mfyid: null,
        address: "",
        stateid: 1,
        Status: 1,
      };
    },
    createDate() {
      var todaydate = new Date();
      var dd = String(todaydate.getDate()).padStart(2, "0");
      var mm = String(todaydate.getMonth() + 1).padStart(2, "0");
      var yyyy = todaydate.getFullYear();
      this.today = dd + "." + mm + "." + yyyy;
    },
    loaddata() {
      var selectedid = 0;
      if (this.showBackButton) selectedid = this.$route.params.id;
      else selectedid = 0;
      if (this.showSaveButton) {
        PersonService.Get(selectedid, 0, "", "", "", true, this.isStudent).then(
          (res) => {
            this.person = res.data;
            this.CheckResult = res.data.CheckResult.isfound;
          }
        );
      }
    },
    loadhelper() {
      HelperService.GetGenderList(this.lang).then((res) => {
        this.GenderList = res.data;
      });
      NationalityService.GetAll().then((res) => {
        this.NationalityList = res.data;
      });

      CountryService.GetAll().then((res) => {
        this.CountryList = res.data;
      });
      IdentityDocumentService.GetAll().then((res) => {
        this.IdentityDocumentList = res.data.result;
      });
    },
    setAllErrors(errors) {
      this.allSignupErrors = errors;
    },
    getoblastlist(countryid, setoblastlist) {
      this.OblastLoading = true;
      OblastService.GetAll(countryid).then((res) => {
        setoblastlist(res.data);
        this.OblastLoading = false;
      });
    },
    getregionlist(oblastid, setregionlist) {
      this.RegionLoading = true;

      RegionService.GetAll(this.lang, oblastid).then((res) => {
        setregionlist(res.data);
        this.RegionLoading = false;
      });
    },
    getmfylist(regionid, setmfylist) {
      this.MfyLoading = true;
      MfyService.GetAll(regionid).then((res) => {
        setmfylist(res.data);
        this.MfyLoading = false;
      });
    },
    rowClass(item, type) {
      if (item.rowbreak === true) {
        return " bottom-color-red";
      }
    },
    isCheckDisabled() {
      if (
        ((this.filter.identitydocumentid == 3 ||
          this.filter.identitydocumentid == 4) &&
          this.tabIndex == 0) ||
        (this.tabIndex == 0 &&
          this.person.DocumentTables.length == 0 &&
          this.egovinfo === true)
      ) {
        return true;
      }
    },
    doctabrowIdentityDoc() {
      this.documenttabrow.documentseries = "";
      this.documenttabrow.documentnumber = "";
      this.documenttabrow.issueorganization = "";
      this.documenttabrow.dateofissue = "";
      this.documenttabrow.dateofexpire = "";
      IdentityDocumentService.GetAllIdentityDocSeries(
        this.documenttabrow.identitydocumentid
      ).then((res) => {
        this.filteridentitydocserieslist = res.data.result;
      });
    },
    filteridentitydocumentchange(row) {
      var self = this;
      row.documentseries = "";
      self.person = {
        familyname: "",
        firstname: "",
        lastname: "",
        dateofbirth: "",
        genderid: "",
        nationalityid: "",
        citizenshipid: 211,
        inn: "",
        pinfl: "",
        contactinfo: "",
        birthcountryid: 211,
        birthoblastid: "",
        birthregionid: "",
        birthmfyid: "",
        birthaddress: "",
        isstudent: this.isStudent,
        PersonRelativeTables: [],
        LivePlaceTables: [],
        DocumentTables: [],
        CanSave: true,
      };
      // self.person.birthcountryid = 211
      IdentityDocumentService.GetAllIdentityDocSeries(
        row.identitydocumentid
      ).then((res) => {
        self.filteridentitydocserieslist = res.data.result;
      });
      self.documenttabrow.identitydocumentid = self.filter.identitydocumentid;
    },
    relativeidentitydocumentchange() {
      var self = this;
      self.relativetabrow.documentseries = "";
      IdentityDocumentService.GetAllIdentityDocSeries(
        self.relativetabrow.identitydocumentid
      ).then((res) => {
        self.relativeidentitydocserieslist = res.data.result;
      });
    },

    SearchByPinfl() {
      var self = this;
      self.pinflLoading = true;
      PersonService.GetFromGovData(
        self.filter.docseries,
        self.filter.docnumber,
        self.filter.pinfl,
        self.filter.dateofbirth,
        self.isStudent,
        self.filter.inn,
        self.filter.identitydocumentid
      )
        .then((res) => {
          // self.egovinfo = true
          localStorage.setItem("egovinfo", true);
          localStorage.setItem("infoofegov", JSON.stringify(res.data));
          self.pinflLoading = false;
          self.InfoOfEGov = JSON.parse(JSON.stringify(res.data));
          self.person = res.data;
          self.isNotCameData(res.data);
          console.log(self.egovinfo);
          console.log(self.InfoOfEGov);
        })
        .catch((error) => {
          self.pinflLoading = false;
          self.egovinfo = true;
          self.makeToast(error.response.data.error, self.$t("error"), "danger");
        });
    },
    IntegrationDTM() {
      if (!!this.filter.pinfl) {
        PersonService.GetGraduatedStudentDataByPinfl(
          this.filter.pinfl,
          this.filter.docseries + this.filter.docnumber
        )
          .then((res) => {
            // console.log(this.employeelist)
            this.personhigheredutabrow.educationtypeid =
              res.data.educationtypeid;
            this.personhigheredutabrow.educationtypename =
              res.data.educationtypename;
            this.personhigheredutabrow.universityid = res.data.universityid;
            this.personhigheredutabrow.universityname = res.data.universityname;
            this.personhigheredutabrow.documentseries = res.data.documentseries;
            this.personhigheredutabrow.documentnumber = res.data.documentnumber;
            this.personhigheredutabrow.schoolsubjectid =
              res.data.schoolsubjectid;
            this.personhigheredutabrow.dateofissue = res.data.dateofissue;
          })
          .catch((error) => {
            this.makeToast(
              error.response.data.error,
              this.$t("message"),
              "danger"
            );
          });
      }
    },
    Search() {
      if (
        this.filter.identitydocumentid === 0 ||
        this.filter.identitydocumentid === null ||
        this.filter.identitydocumentid === undefined ||
        this.filter.identitydocumentid === ""
      ) {
        this.makeToast(
          this.$t("identitydocumentNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (this.filter.identitydocumentid === 1) {
        if (
          this.filter.docseries === 0 ||
          this.filter.docseries === null ||
          this.filter.docseries === undefined ||
          this.filter.docseries === ""
        ) {
          this.makeToast(
            this.$t("docseriesNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        if (
          this.filter.docnumber === 0 ||
          this.filter.docnumber === null ||
          this.filter.docnumber === undefined ||
          this.filter.docnumber === ""
        ) {
          this.makeToast(
            this.$t("docnumberNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
      }
      if (this.filter.identitydocumentid === 2) {
        if (
          this.filter.inn === "0" ||
          this.filter.inn === null ||
          this.filter.inn === undefined ||
          this.filter.inn === ""
        ) {
          if (
            this.filter.docseries === 0 ||
            this.filter.docseries === null ||
            this.filter.docseries === undefined ||
            this.filter.docseries === ""
          ) {
            this.makeToast(
              this.$t("docseriesNotCorrect"),
              this.$t("Error"),
              "danger"
            );
            return false;
          }
          if (
            this.filter.docnumber === 0 ||
            this.filter.docnumber === null ||
            this.filter.docnumber === undefined ||
            this.filter.docnumber === ""
          ) {
            this.makeToast(
              this.$t("docnumberNotCorrect"),
              this.$t("Error"),
              "danger"
            );
            return false;
          }
        }
      }
      PersonService.Get(
        0,
        this.filter.identitydocumentid,
        this.filter.docseries,
        this.filter.docnumber,
        this.filter.inn,
        true,
        this.isStudent
      )
        .then((res) => {
          this.person = res.data;
        })
        .catch((error) => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
    },

    AddItemDocument() {
      var self = this;
      self.documenttabrow.ondate = this.today;
      if (
        self.documenttabrow.ondate === 0 ||
        self.documenttabrow.ondate === null ||
        self.documenttabrow.ondate === undefined ||
        self.documenttabrow.ondate === ""
      ) {
        this.makeToast(this.$t("ondateNotCorrect"), this.$t("Error"), "danger");
        return false;
      }

      if (
        self.documenttabrow.identitydocumentid === 0 ||
        self.documenttabrow.identitydocumentid === null ||
        self.documenttabrow.identitydocumentid === undefined ||
        self.documenttabrow.identitydocumentid === ""
      ) {
        this.makeToast(
          this.$t("identitydocumentidNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (self.documenttabrow.identitydocumentid !== 4) {
        if (
          self.documenttabrow.documentseries === 0 ||
          self.documenttabrow.documentseries === null ||
          self.documenttabrow.documentseries === undefined ||
          self.documenttabrow.documentseries === ""
        ) {
          this.makeToast(
            this.$t("documentseriesNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        if (!/^[A-Z,a-z,-]/.test(self.documenttabrow.documentseries)) {
          this.makeToast(
            this.$t("documentseriesNotA-Z"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
      }

      if (
        self.documenttabrow.documentnumber === 0 ||
        self.documenttabrow.documentnumber === null ||
        self.documenttabrow.documentnumber === undefined ||
        self.documenttabrow.documentnumber === ""
      ) {
        this.makeToast(
          this.$t("documentnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (!/^[0-9]/.test(self.documenttabrow.documentnumber)) {
        this.makeToast(
          this.$t("documentnumberNot0-9"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.documenttabrow.dateofissue === 0 ||
        self.documenttabrow.dateofissue === null ||
        self.documenttabrow.dateofissue === undefined ||
        self.documenttabrow.dateofissue === ""
      ) {
        this.makeToast(
          this.$t("dateofissueNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      /* if (
          self.documenttabrow.dateofexpire === 0 ||
          self.documenttabrow.dateofexpire === null ||
          self.documenttabrow.dateofexpire === undefined ||
          self.documenttabrow.dateofexpire === ""
        ) {
          this.makeToast(
            this.$t("dateofexpireNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        } */
      if (
        self.documenttabrow.issueorganization === 0 ||
        self.documenttabrow.issueorganization === null ||
        self.documenttabrow.issueorganization === undefined ||
        self.documenttabrow.issueorganization === ""
      ) {
        this.makeToast(
          this.$t("issueorganizationNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      self.documenttabrow.identitydocumentname = self.documenttabrow
        .identitydocumentid
        ? self.IdentityDocumentList.filter(function(item) {
            if (item.id === self.documenttabrow.identitydocumentid) return item;
          })[0].name
        : "";
      // if(this.documenttabrowindex === -1){
      //   self.person.DocumentTables.push(self.documenttabrow);
      // }
      self.documenttabrow;
      if (self.documenttabrow.id === 0 || self.documenttabrowindex === -1) {
        var addnewrow = true;
        self.person.DocumentTables.forEach(function(item) {
          if (item.ondate === self.documenttabrow.ondate && item.id === 0) {
            item.ondate = self.documenttabrow.ondate;
            item.identitydocumentname =
              self.documenttabrow.identitydocumentname;
            item.identitydocumentid = self.documenttabrow.identitydocumentid;
            item.documentseries = self.documenttabrow.documentseries;
            item.documentnumber = self.documenttabrow.documentnumber;
            item.dateofissue = self.documenttabrow.dateofissue;
            item.dateofexpire = self.documenttabrow.dateofexpire;
            item.issueorganization = self.documenttabrow.issueorganization;
            item.stateid = self.documenttabrow.stateid;
            item.Status = 1;
            addnewrow = false;
          }
        });
        if (addnewrow) {
          self.person.DocumentTables.push(self.documenttabrow);
          self.documenttabrow = {
            id: 0,
            ondate: "",
            identitydocumentname: "",
            identitydocumentid: 0,
            documentseries: "",
            documentnumber: "",
            dateofissue: "",
            dateofexpire: null,
            issueorganization: "",
            stateid: 1,
            Status: 1,
          };
        }
      } else {
        self.person.DocumentTables.forEach(function(item) {
          if (item.id === self.documenttabrow.id) {
            item.ondate = self.documenttabrow.ondate;
            item.identitydocumentname =
              self.documenttabrow.identitydocumentname;
            item.identitydocumentid = self.documenttabrow.identitydocumentid;
            item.documentseries = self.documenttabrow.documentseries;
            item.documentnumber = self.documenttabrow.documentnumber;
            item.dateofissue = self.documenttabrow.dateofissue;
            item.dateofexpire = self.documenttabrow.dateofexpire;
            item.issueorganization = self.documenttabrow.issueorganization;
            item.stateid = self.documenttabrow.stateid;
            item.Status = 2;
          }
        });
        self.documenttabrow = {
          ondate: "",
          identitydocumentname: "",
          identitydocumentid: 0,
          documentseries: "",
          documentnumber: "",
          dateofissue: "",
          dateofexpire: null,
          issueorganization: "",
          stateid: 1,
          Status: 1,
        };
      }

      this.$bvModal.hide("AddModalDocument");
    },
    EditItem(item) {
      item.Status = 2;
    },
    AddRowRelativeTables() {
      KinshipDegreeService.GetAll().then((res) => {
        this.KinshipDegreeList = res.data;
      });
      this.relativetabrow = {
        id: 0,
        personid: 0,
        ondate: this.today,
        kinshipdegreename: "",
        kinshipdegreeid: null,
        familyname: "",
        firstname: "",
        lastname: "",
        dateofbirth: "",
        pinfl: "",
        hasdied: false,
        dateofdeath: "",
        countryname: "",
        countryid: 211,
        oblastname: "",
        oblastid: null,
        regionname: "",
        regionid: null,
        mfyname: "",
        mfyid: null,
        address: "",
        phonenumber: "",
        identitydocumentname: "",
        identitydocumentid: null,
        documentseries: "",
        documentnumber: "",
        dateofissue: "",
        dateofexpire: null,
        issueorganization: "",
        nationalityid: 0,
        nationalityname: "",
        citizenshipid: 211,
        citizenshipname: "",
        Status: 1,
      };
      this.$bvModal.show("AddModal");
    },
    EditItemRelativeTables(item) {
      this.relativetabrow = {
        id: item.id,
        personid: item.personid,
        ondate: item.ondate,
        kinshipdegreename: item.kinshipdegreename,
        kinshipdegreeid: item.kinshipdegreeid,
        familyname: item.familyname,
        firstname: item.firstname,
        lastname: item.lastname,
        dateofbirth: item.dateofbirth,
        pinfl: item.pinfl,
        hasdied: item.hasdied,
        dateofdeath: item.dateofdeath,
        countryname: item.countryname,
        countryid: item.countryid,
        oblastname: item.oblastname,
        oblastid: item.oblastid,
        regionname: item.regionname,
        regionid: item.regionid,
        mfyname: item.mfyname,
        mfyid: item.mfyid,
        address: item.address,
        phonenumber: item.phonenumber,
        identitydocumentname: item.identitydocumentname,
        identitydocumentid: item.identitydocumentid,
        documentseries: item.documentseries,
        documentnumber: item.documentnumber,
        dateofissue: item.dateofissue,
        dateofexpire: item.dateofexpire,
        issueorganization: item.issueorganization,
        nationalityid: item.nationalityid,
        nationalityname: item.nationalityname,
        citizenshipid: item.citizenshipid,
        citizenshipname: item.citizenshipname,
        Status: 2,
      };
      this.$bvModal.show("AddModal");
    },
    DeleteItem(item) {
      item.Status = 3;
    },
    AddItemLivePlaces() {
      var self = this;
      self.liveplacetabrow.ondate = this.today;
      if (
        self.liveplacetabrow.ondate === 0 ||
        self.liveplacetabrow.ondate === null ||
        self.liveplacetabrow.ondate === undefined ||
        self.liveplacetabrow.ondate === ""
      ) {
        this.makeToast(this.$t("ondateNotCorrect"), this.$t("Error"), "danger");
        return false;
      }

      if (
        self.liveplacetabrow.countryid === 0 ||
        self.liveplacetabrow.countryid === null ||
        self.liveplacetabrow.countryid === undefined ||
        self.liveplacetabrow.countryid === ""
      ) {
        this.makeToast(
          this.$t("countryNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (self.liveplacetabrow.countryid === 211) {
        if (
          self.liveplacetabrow.oblastid === 0 ||
          self.liveplacetabrow.oblastid === null ||
          self.liveplacetabrow.oblastid === undefined ||
          self.liveplacetabrow.oblastid === ""
        ) {
          this.makeToast(
            this.$t("oblastNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
      }
      if (self.liveplacetabrow.countryid === 211) {
        if (
          self.liveplacetabrow.regionid === 0 ||
          self.liveplacetabrow.regionid === null ||
          self.liveplacetabrow.regionid === undefined ||
          self.liveplacetabrow.regionid === ""
        ) {
          this.makeToast(
            this.$t("regionNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
      }

      /*       if (
        self.liveplacetabrow.mfyid === 0 ||
        self.liveplacetabrow.mfyid === null ||
        self.liveplacetabrow.mfyid === undefined ||
        self.liveplacetabrow.mfyid === ""
      ) {
        this.makeToast(this.$t("mfyNotCorrect"), this.$t("Error"), "danger");
        return false;   07-07-2020 commented
      } */

      if (
        self.liveplacetabrow.address === 0 ||
        self.liveplacetabrow.address === null ||
        self.liveplacetabrow.address === undefined ||
        self.liveplacetabrow.address === ""
      ) {
        this.makeToast(
          this.$t("addressNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      this.$bvModal.hide("AddModal2");
      self.liveplacetabrow.countryname = self.CountryList.filter(function(
        item
      ) {
        if (item.id === self.liveplacetabrow.countryid) return item;
      })[0].name;
      self.liveplacetabrow.oblastname = self.liveplacetabrow.oblastid
        ? self.LiveOblastList.filter(function(item) {
            if (item.id === self.liveplacetabrow.oblastid) return item;
          })[0].name
        : "";
      self.liveplacetabrow.regionname = self.liveplacetabrow.regionid
        ? self.LiveRegionList.filter(function(item) {
            if (item.id === self.liveplacetabrow.regionid) return item;
          })[0].name
        : "";
      self.liveplacetabrow.mfyname = self.liveplacetabrow.mfyid
        ? self.LiveMfyList.filter(function(item) {
            if (item.id === self.liveplacetabrow.mfyid) return item;
          })[0].name
        : "";
      // if(this.livetabrowindex === -1){
      //   this.person.LivePlaceTables.push(this.liveplacetabrow);
      // }
      // else{
      //   self.person.LivePlaceTables.forEach(function(item,index){
      //     if(self.livetabrowindex === index){
      //       alert(index)
      //     }
      //   })
      // }
      self.liveplacetabrow;
      if (self.liveplacetabrow.id === 0 || self.livetabrowindex === -1) {
        var addnewrow = true;
        self.person.LivePlaceTables.forEach(function(item) {
          if (item.ondate === self.liveplacetabrow.ondate && item.id === 0) {
            item.ondate = self.liveplacetabrow.ondate;
            item.oblastid = self.liveplacetabrow.oblastid;
            item.regionid = self.liveplacetabrow.regionid;
            item.mfyid = self.liveplacetabrow.mfyid;
            item.address = self.liveplacetabrow.address;
            item.Status = 1;
            item.mfyname = self.liveplacetabrow.mfyname;
            item.oblastname = self.liveplacetabrow.oblastname;
            item.regionname = self.liveplacetabrow.regionname;
            addnewrow = false;
          }
        });
        if (addnewrow) {
          self.person.LivePlaceTables.push(self.liveplacetabrow);
          self.liveplacetabrow = {
            id: 0,
            ondate: self.today,
            countryname: "",
            countryid: 211,
            oblastname: "",
            oblastid: null,
            regionname: "",
            regionid: null,
            mfyid: null,
            address: "",
            stateid: 1,
            Status: 1,
          };
        }
      } else {
        self.person.LivePlaceTables.forEach(function(item) {
          if (item.id === self.liveplacetabrow.id) {
            item.ondate = self.liveplacetabrow.ondate;
            item.oblastid = self.liveplacetabrow.oblastid;
            item.oblastname = self.liveplacetabrow.oblastname;
            item.regionid = self.liveplacetabrow.regionid;
            item.regionname = self.liveplacetabrow.regionname;
            item.mfyid = self.liveplacetabrow.mfyid;
            item.mfyname = self.liveplacetabrow.mfyname;
            item.address = self.liveplacetabrow.address;
            item.Status = 2;
          }
        });
        this.liveplacetabrow = {
          id: 0,
          ondate: "",
          countryname: "",
          countryid: 211,
          oblastname: "",
          oblastid: null,
          regionname: "",
          regionid: null,
          mfyid: null,
          address: "",
          stateid: 1,
          Status: 1,
        };
      }
    },
    AddItemRelative() {
      var self = this;

      /* if (
        self.relativetabrow.ondate === 0 ||
        self.relativetabrow.ondate === null ||
        self.relativetabrow.ondate === undefined ||
        self.relativetabrow.ondate === ""
      ) {
        this.makeToast(this.$t("ondateNotCorrect"), this.$t("Error"), "danger");
        return false;
      } */

      if (
        self.relativetabrow.kinshipdegreeid === 0 ||
        self.relativetabrow.kinshipdegreeid === null ||
        self.relativetabrow.kinshipdegreeid === undefined ||
        self.relativetabrow.kinshipdegreeid === ""
      ) {
        this.makeToast(
          this.$t("kinshipdegreeNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      if (
        self.relativetabrow.familyname === 0 ||
        self.relativetabrow.familyname === null ||
        self.relativetabrow.familyname === undefined ||
        self.relativetabrow.familyname === ""
      ) {
        this.makeToast(
          this.$t("familynameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      if (
        self.relativetabrow.firstname === 0 ||
        self.relativetabrow.firstname === null ||
        self.relativetabrow.firstname === undefined ||
        self.relativetabrow.firstname === ""
      ) {
        this.makeToast(
          this.$t("firstnameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      if (
        self.relativetabrow.lastname === 0 ||
        self.relativetabrow.lastname === null ||
        self.relativetabrow.lastname === undefined ||
        self.relativetabrow.lastname === ""
      ) {
        this.makeToast(
          this.$t("lastnameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      if (
        self.relativetabrow.dateofbirth === 0 ||
        self.relativetabrow.dateofbirth === null ||
        self.relativetabrow.dateofbirth === undefined ||
        self.relativetabrow.dateofbirth === ""
      ) {
        this.makeToast(
          this.$t("dateofbirthNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.relativetabrow.nationalityid === 0 ||
        self.relativetabrow.nationalityid === null ||
        self.relativetabrow.nationalityid === undefined ||
        self.relativetabrow.nationalityid === ""
      ) {
        this.makeToast(
          this.$t("nationalityNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.relativetabrow.citizenshipid === 0 ||
        self.relativetabrow.citizenshipid === null ||
        self.relativetabrow.citizenshipid === undefined ||
        self.relativetabrow.citizenshipid === ""
      ) {
        this.makeToast(
          this.$t("citizenshipNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      /* if (
        self.relativetabrow.pinfl === 0 ||
        self.relativetabrow.pinfl === null ||
        self.relativetabrow.pinfl === undefined ||
        self.relativetabrow.pinfl === ""
      ) {
        this.makeToast(this.$t("pinflNotCorrect"), this.$t("Error"), "danger");
        return false;
      } */

      if (
        (self.relativetabrow.hasdied === true) &
        (self.relativetabrow.dateofdeath === 0 ||
          self.relativetabrow.dateofdeath === null ||
          self.relativetabrow.dateofdeath === undefined ||
          self.relativetabrow.dateofdeath === "")
      ) {
        this.makeToast(
          this.$t("dateofdeathNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      if (
        self.relativetabrow.countryid === 0 ||
        self.relativetabrow.countryid === null ||
        self.relativetabrow.countryid === undefined ||
        self.relativetabrow.countryid === ""
      ) {
        this.makeToast(
          this.$t("countryNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (self.relativetabrow.countryid === 211) {
        if (
          self.relativetabrow.oblastid === 0 ||
          self.relativetabrow.oblastid === null ||
          self.relativetabrow.oblastid === undefined ||
          self.relativetabrow.oblastid === ""
        ) {
          this.makeToast(
            this.$t("oblastNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }

        if (
          self.relativetabrow.regionid === 0 ||
          self.relativetabrow.regionid === null ||
          self.relativetabrow.regionid === undefined ||
          self.relativetabrow.regionid === ""
        ) {
          this.makeToast(
            this.$t("regionNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
      }
      /* if (
          self.relativetabrow.mfyid === 0 ||
          self.relativetabrow.mfyid === null ||
          self.relativetabrow.mfyid === undefined ||
          self.relativetabrow.mfyid === ""
        ) {
          this.makeToast(this.$t("mfyNotCorrect"), this.$t("Error"), "danger");
          return false;
        }
      */
      if (
        self.relativetabrow.address === 0 ||
        self.relativetabrow.address === null ||
        self.relativetabrow.address === undefined ||
        self.relativetabrow.address === ""
      ) {
        this.makeToast(
          this.$t("addressNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      /*       if (
        self.relativetabrow.phonenumber === 0 ||
        self.relativetabrow.phonenumber === null ||
        self.relativetabrow.phonenumber === undefined ||
        self.relativetabrow.phonenumber === ""
      ) {
        this.makeToast(
          this.$t("phonenumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      } */
      if (self.relativetabrow.hasdied === false) {
        if (
          self.relativetabrow.identitydocumentid === 0 ||
          self.relativetabrow.identitydocumentid === null ||
          self.relativetabrow.identitydocumentid === undefined ||
          self.relativetabrow.identitydocumentid === ""
        ) {
          this.makeToast(
            this.$t("identitydocumentNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
      }
      if (self.relativetabrow.hasdied === false) {
        if (
          self.relativetabrow.documentseries === 0 ||
          self.relativetabrow.documentseries === null ||
          self.relativetabrow.documentseries === undefined ||
          self.relativetabrow.documentseries === ""
        ) {
          this.makeToast(
            this.$t("documentseriesNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
      }
      if (self.relativetabrow.hasdied === false) {
        if (
          self.relativetabrow.documentnumber === 0 ||
          self.relativetabrow.documentnumber === null ||
          self.relativetabrow.documentnumber === undefined ||
          self.relativetabrow.documentnumber === ""
        ) {
          this.makeToast(
            this.$t("documentnumberNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
      }
      if (self.relativetabrow.hasdied === false) {
        if (
          self.relativetabrow.dateofissue === 0 ||
          self.relativetabrow.dateofissue === null ||
          self.relativetabrow.dateofissue === undefined ||
          self.relativetabrow.dateofissue === ""
        ) {
          this.makeToast(
            this.$t("dateofissueNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
      }
      if (self.relativetabrow.hasdied === false) {
        if (!/^[A-Z,a-z,-]/.test(self.relativetabrow.documentseries)) {
          this.makeToast(
            this.$t("documentseriesNotA-Z"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
      }
      if (self.relativetabrow.hasdied === false) {
        if (!/^[0-9]/.test(self.relativetabrow.documentnumber)) {
          this.makeToast(
            this.$t("documentnumberNot0-9"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
      }

      /*  if (
          self.relativetabrow.dateofexpire === 0 ||
          self.relativetabrow.dateofexpire === null ||
          self.relativetabrow.dateofexpire === undefined ||
          self.relativetabrow.dateofexpire === ""
        ) {
          this.makeToast(
            this.$t("dateofexpireNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        } */
      if (self.relativetabrow.hasdied === false) {
        if (
          self.relativetabrow.issueorganization === 0 ||
          self.relativetabrow.issueorganization === null ||
          self.relativetabrow.issueorganization === undefined ||
          self.relativetabrow.issueorganization === ""
        ) {
          this.makeToast(
            this.$t("issueorganizationNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
      }

      /* var self = this; */
      self.relativetabrow.nationalityname = self.NationalityList.filter(
        function(item) {
          if (item.id === self.relativetabrow.nationalityid) return item;
        }
      )[0].name;
      self.relativetabrow.citizenshipname = self.CountryList.filter(function(
        item
      ) {
        if (item.id === self.relativetabrow.citizenshipid) return item;
      })[0].name;

      self.relativetabrow.kinshipdegreename = self.KinshipDegreeList.filter(
        function(item) {
          if (item.id === self.relativetabrow.kinshipdegreeid) return item;
        }
      )[0].name;

      self.relativetabrow.countryname = self.CountryList.filter(function(item) {
        if (item.id === self.relativetabrow.countryid) return item;
      })[0].name;
      self.relativetabrow.oblastname = self.relativetabrow.oblastid
        ? self.RelativeOblastList.filter(function(item) {
            if (item.id === self.relativetabrow.oblastid) return item;
          })[0].name
        : "";
      self.relativetabrow.regionname = self.relativetabrow.regionid
        ? self.RelativeRegionList.filter(function(item) {
            if (item.id === self.relativetabrow.regionid) return item;
          })[0].name
        : "";
      self.relativetabrow.mfyname = self.relativetabrow.mfyid
        ? self.RelativeMfyList.filter(function(item) {
            if (item.id === self.relativetabrow.mfyid) return item;
          })[0].name
        : "";
      self.relativetabrow.identitydocumentname = self.relativetabrow
        .identitydocumentid
        ? self.IdentityDocumentList.filter(function(item) {
            if (item.id === self.relativetabrow.identitydocumentid) return item;
          })[0].name
        : "";
      self.relativetabrow;
      if (self.relativetabrow.id === 0) {
        var addnewrow = true;
        self.person.PersonRelativeTables.forEach(function(item) {
          if (
            item.ondate === self.relativetabrow.ondate &&
            item.kinshipdegreeid === self.relativetabrow.kinshipdegreeid &&
            item.id === 0
          ) {
            item.ondate = self.relativetabrow.ondate;
            item.kinshipdegreename = self.relativetabrow.kinshipdegreename;
            item.kinshipdegreeid = self.relativetabrow.kinshipdegreeid;
            item.familyname = self.relativetabrow.familyname;
            item.firstname = self.relativetabrow.firstname;
            item.lastname = self.relativetabrow.lastname;
            item.dateofbirth = self.relativetabrow.dateofbirth;
            item.pinfl = self.relativetabrow.pinfl;
            item.hasdied = self.relativetabrow.hasdied;
            item.dateofdeath = self.relativetabrow.dateofdeath;
            item.countryname = self.relativetabrow.countryname;
            item.countryid = self.relativetabrow.countryid;
            item.oblastname = self.relativetabrow.oblastname;
            item.oblastid = self.relativetabrow.oblastid;
            item.regionname = self.relativetabrow.regionname;
            item.regionid = self.relativetabrow.regionid;
            item.mfyname = self.relativetabrow.mfyname;
            item.mfyid = self.relativetabrow.mfyid;
            item.address = self.relativetabrow.address;
            item.phonenumber = self.relativetabrow.phonenumber;
            item.identitydocumentname =
              self.relativetabrow.identitydocumentname;
            item.identitydocumentid = self.relativetabrow.identitydocumentid;
            item.documentseries = self.relativetabrow.documentseries;
            item.documentnumber = self.relativetabrow.documentnumber;
            item.dateofissue = self.relativetabrow.dateofissue;
            item.dateofexpire = self.relativetabrow.dateofexpire;
            item.issueorganization = self.relativetabrow.issueorganization;
            item.nationalityid = self.relativetabrow.nationalityid;
            item.nationalityname = self.relativetabrow.nationalityname;
            item.citizenshipid = self.relativetabrow.citizenshipid;
            item.citizenshipname = self.relativetabrow.citizenshipname;
            item.Status = 1;

            addnewrow = false;
          }
        });
        if (addnewrow) {
          self.person.PersonRelativeTables.push(self.relativetabrow);
          self.relativetabrow = {
            id: 0,
            personid: 0,
            ondate: self.today,
            kinshipdegreename: "",
            kinshipdegreeid: null,
            familyname: "",
            firstname: "",
            lastname: "",
            dateofbirth: "",
            pinfl: "",
            hasdied: false,
            dateofdeath: "",
            countryname: "",
            countryid: 211,
            oblastname: "",
            oblastid: null,
            regionname: "",
            regionid: null,
            mfyname: "",
            mfyid: null,
            address: "",
            phonenumber: "",
            identitydocumentname: "",
            identitydocumentid: null,
            documentseries: "",
            documentnumber: "",
            dateofissue: "",
            dateofexpire: null,
            issueorganization: "",
            nationalityid: 0,
            nationalityname: "",
            citizenshipid: 211,
            citizenshipname: "",
            Status: 1,
          };
        }
      } else {
        self.person.PersonRelativeTables.forEach(function(item) {
          if (item.id === self.relativetabrow.id) {
            item.ondate = self.relativetabrow.ondate;
            item.kinshipdegreename = self.relativetabrow.kinshipdegreename;
            item.kinshipdegreeid = self.relativetabrow.kinshipdegreeid;
            item.familyname = self.relativetabrow.familyname;
            item.firstname = self.relativetabrow.firstname;
            item.lastname = self.relativetabrow.lastname;
            item.dateofbirth = self.relativetabrow.dateofbirth;
            item.pinfl = self.relativetabrow.pinfl;
            item.hasdied = self.relativetabrow.hasdied;
            item.dateofdeath = self.relativetabrow.dateofdeath;
            item.countryname = self.relativetabrow.countryname;
            item.countryid = self.relativetabrow.countryid;
            item.oblastname = self.relativetabrow.oblastname;
            item.oblastid = self.relativetabrow.oblastid;
            item.regionname = self.relativetabrow.regionname;
            item.regionid = self.relativetabrow.regionid;
            item.mfyname = self.relativetabrow.mfyname;
            item.mfyid = self.relativetabrow.mfyid;
            item.address = self.relativetabrow.address;
            item.phonenumber = self.relativetabrow.phonenumber;
            item.identitydocumentname =
              self.relativetabrow.identitydocumentname;
            item.identitydocumentid = self.relativetabrow.identitydocumentid;
            item.documentseries = self.relativetabrow.documentseries;
            item.documentnumber = self.relativetabrow.documentnumber;
            item.dateofissue = self.relativetabrow.dateofissue;
            item.dateofexpire = self.relativetabrow.dateofexpire;
            item.issueorganization = self.relativetabrow.issueorganization;
            item.nationalityid = self.relativetabrow.nationalityid;
            item.nationalityname = self.relativetabrow.nationalityname;
            item.citizenshipid = self.relativetabrow.citizenshipid;
            item.citizenshipname = self.relativetabrow.citizenshipname;
            item.Status = 2;
          }
        });
        this.relativetabrow = {
          id: 0,
          personid: 0,
          ondate: this.today,
          kinshipdegreename: "",
          kinshipdegreeid: null,
          familyname: "",
          firstname: "",
          lastname: "",
          dateofbirth: "",
          pinfl: "",
          hasdied: false,
          dateofdeath: "",
          countryname: "",
          countryid: 211,
          oblastname: "",
          oblastid: null,
          regionname: "",
          regionid: null,
          mfyname: "",
          mfyid: null,
          address: "",
          phonenumber: "",
          identitydocumentname: "",
          identitydocumentid: null,
          documentseries: "",
          documentnumber: "",
          dateofissue: "",
          dateofexpire: null,
          issueorganization: "",
          nationalityid: 0,
          nationalityname: "",
          citizenshipid: 211,
          citizenshipname: "",
          Status: 1,
        };
      }

      this.$bvModal.hide("AddModal");
    },

    check() {
      var self = this;
      if (
        self.person.familyname === 0 ||
        self.person.familyname === null ||
        self.person.familyname === undefined ||
        self.person.familyname === ""
      ) {
        this.makeToast(
          this.$t("familynameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.person.firstname === 0 ||
        self.person.firstname === null ||
        self.person.firstname === undefined ||
        self.person.firstname === ""
      ) {
        this.makeToast(
          this.$t("firstnameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (self.person.contactinfo !== "") {
        if (!!self.person.contactinfo && self.person.contactinfo.length < 9) {
          self.makeToast(
            self.$t("NotFillContactInfo"),
            self.$t("error"),
            "danger"
          );
          return false;
        }
      }

      // if (
      //   self.person.lastname === 0 ||
      //   self.person.lastname === null ||
      //   self.person.lastname === undefined ||
      //   self.person.lastname === ""
      // ) {
      //   this.makeToast(
      //     this.$t("lastnameNotCorrect"),
      //     this.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      if (
        self.person.dateofbirth === 0 ||
        self.person.dateofbirth === null ||
        self.person.dateofbirth === undefined ||
        self.person.dateofbirth === ""
      ) {
        this.makeToast(
          this.$t("dateofbirthNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.person.birthcountryid === 0 ||
        self.person.birthcountryid === null ||
        self.person.birthcountryid === undefined ||
        self.person.birthcountryid === ""
      ) {
        this.makeToast(
          this.$t("birthcountryNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.person.genderid === 0 ||
        self.person.genderid === null ||
        self.person.genderid === undefined ||
        self.person.genderid === ""
      ) {
        this.makeToast(
          this.$t("genderidNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.filter.identitydocumentid == 4 &&
        self.person.citizenshipid == 211
      ) {
        this.makeToast(
          this.$t("citizenshipNotUzb"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.person.nationalityid === 0 ||
        self.person.nationalityid === null ||
        self.person.nationalityid === undefined ||
        self.person.nationalityid === ""
      ) {
        this.makeToast(
          this.$t("nationalityNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      if (
        self.person.citizenshipid === 0 ||
        self.person.citizenshipid === null ||
        self.person.citizenshipid === undefined ||
        self.person.citizenshipid === ""
      ) {
        this.makeToast(
          this.$t("citizenshipNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      // if (
      //   self.person.contactinfo === 0 ||
      //   self.person.contactinfo === null ||
      //   self.person.contactinfo === undefined ||
      //   self.person.contactinfo === ""
      // ) {
      //   this.makeToast(
      //     this.$t("contactinfoNotCorrect"),
      //     this.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }

      // if (
      //   self.person.birthcountryid === 0 ||
      //   self.person.birthcountryid === null ||
      //   self.person.birthcountryid === undefined ||
      //   self.person.birthcountryid === ""
      // ) {
      //   this.makeToast(
      //     this.$t("birthcountryNotCorrect"),
      //     this.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      // if (self.person.birthcountryid === 211) {

      //   if (
      //     self.person.birthregionid === 0 ||
      //     self.person.birthregionid === null ||
      //     self.person.birthregionid === undefined ||
      //     self.person.birthregionid === ""
      //   ) {
      //     this.makeToast(
      //       this.$t("birthregionNotCorrect"),
      //       this.$t("Error"),
      //       "danger"
      //     );
      //     return false;
      //   }
      // }
      this.isStudent;
      if (!this.isStudent) {
        // if (
        //   self.person.inn === "0" ||
        //   self.person.inn === null ||
        //   self.person.inn === undefined ||
        //   self.person.inn === ""
        // ) {
        //   this.makeToast(this.$t("innNotCorrect"), this.$t("Error"), "danger");
        //   return false;
        // }
        if (self.person.citizenshipid === 211) {
          if (
            self.person.pinfl === 0 ||
            self.person.pinfl === null ||
            self.person.pinfl === undefined ||
            self.person.pinfl === ""
          ) {
            this.makeToast(this.$t("pinflCorrect"), this.$t("Error"), "danger");
            return false;
          }
        }
      }

      if (self.person.DocumentTables.length === 0) {
        this.makeToast(
          this.$t("DocumentTablesNotFilled"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (self.person.LivePlaceTables.length === 0) {
        this.makeToast(
          this.$t("LivePlaceTablesNotFilled"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      /* if (self.person.PersonRelativeTables.length === 0) {
          this.makeToast(
            this.$t("PersonRelativeTablesNotFilled"),
            this.$t("Error"),
            "danger"
          );
          return false;
        } */

      return true;
    },

    SaveData() {
      var self = this;
      if (!self.check()) {
        return false;
      }

      if (this.person.id === 0) {
        this.person.isStudent = this.isStudent;
      }
      if (!!this.person.contactinfo && this.person.contactinfo.length == 9) {
        this.person.contactinfo = "+998-" + this.person.contactinfo;
      }
      this.SaveLoading = true;
      PersonService.Update(this.person)
        .then((res) => {
          this.personId = res.data.id;
          this.SaveLoading = false;
          this.makeToast(
            this.$t("SuccessMessage"),
            this.$t("message"),
            "success"
          );
          if (this.showBackButton) {
            this.$router.push({
              name: this.isStudent ? "Student" : "Employee",
              query: {
                docseries: this.$route.query.docseries,
                docnumber: this.$route.query.docnumber,
                search: this.$route.query.search,
                pagelimit: this.$route.query.pagelimit,
              },
            });
          } else {
            var self = this;
            setTimeout(function() {
              self.$emit("success", res.data);
            }, 500);
          }
        })
        .catch((error) => {
          this.SaveLoading = false;
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
    },
    makeToast(message, title, type) {
      this.toastCount++;
      this.$bvToast.toast(message, {
        title: title,
        autoHideDelay: 2000,
        variant: type,
        solid: true,
      });
    },
    ChangeRelativeOblast() {
      var self = this;

      self.relativetabrow.regionid = 0;
      self.relativetabrow.mfyid = null;
      self.relativetabrow.mfyname = null;
      self.getregionlist(self.relativetabrow.oblastid, function(data) {
        self.RelativeRegionList = data;
      });
    },
    ChangeRelativeRegion() {
      var self = this;
      self.relativetabrow.mfyid = null;
      self.relativetabrow.mfyname = null;
      self.getmfylist(self.relativetabrow.regionid, function(data) {
        self.RelativeMfyList = data;
      });
    },
  },
  watch: {
    "person.birthcountryid": {
      handler(newValue, oldValue) {
        newValue;
        oldValue;
        if (newValue) {
          if (oldValue) {
            this.person.birthoblastid = null;
          }
          var self = this;
          this.getoblastlist(newValue, function(data) {
            self.BirthOblastList = data;
          });
        }
      },
    },
    "person.birthoblastid": {
      handler(newValue, oldValue) {
        if (newValue) {
          if (oldValue) {
            this.person.birthregionid = null;
          }
          var self = this;
          this.getregionlist(newValue, function(data) {
            self.BirthRegionList = data;
          });
        }
      },
    },
    "person.birthregionid": {
      handler(newValue, oldValue) {
        if (newValue) {
          if (oldValue) {
            this.person.birthmfyid = null;
          }
          var self = this;
          this.getmfylist(newValue, function(data) {
            self.BirthMfyList = data;
          });
        }
      },
    },
    "liveplacetabrow.countryid": {
      handler(newValue, oldValue) {
        if (newValue) {
          if (oldValue) {
            this.liveplacetabrow.oblastid = null;
          }
          var self = this;
          this.getoblastlist(newValue, function(data) {
            self.LiveOblastList = data;
          });
        }
      },
    },
    "liveplacetabrow.oblastid": {
      handler(newValue, oldValue) {
        if (newValue) {
          if (oldValue) {
            this.liveplacetabrow.regionid = null;
          }
          var self = this;
          this.getregionlist(newValue, function(data) {
            self.LiveRegionList = data;
          });
        }
      },
    },
    "liveplacetabrow.regionid": {
      handler(newValue, oldValue) {
        if (newValue) {
          if (oldValue) {
            this.liveplacetabrow.mfyid = null;
          }
          var self = this;
          this.getmfylist(newValue, function(data) {
            self.LiveMfyList = data;
          });
        }
      },
    },
    "relativetabrow.countryid": {
      handler(newValue, oldValue) {
        if (newValue) {
          if (oldValue) {
            this.relativetabrow.oblastid = null;
          }
          var self = this;
          this.getoblastlist(newValue, function(data) {
            self.RelativeOblastList = data;
          });
        }
      },
    },
    // "relativetabrow.oblastid": {
    //   handler(newValue, oldValue) {
    //     alert("sasa")
    //     if (newValue) {
    //       if (oldValue) {
    //         this.relativetabrow.regionid = null;
    //       }
    //       var self = this;
    //       this.getregionlist(newValue, function(data) {
    //         self.RelativeRegionList = data;
    //       });
    //     }
    //   },
    // },
    // "relativetabrow.regionid": {
    //   handler(newValue, oldValue) {
    //     if (newValue) {
    //       if (oldValue) {
    //         this.relativetabrow.mfyid = null;
    //       }
    //       var self = this;
    //       this.getmfylist(newValue, function(data) {
    //         self.RelativeMfyList = data;
    //       });
    //     }
    //   },
    // },
  },
};
</script>
<style lang="scss">
.bottom-color-red {
  border-bottom: 2px solid red;
}
</style>
