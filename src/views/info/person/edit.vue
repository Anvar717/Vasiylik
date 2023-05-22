<template>
  <b-overlay :show="show">
    <b-row>
      <b-col sm="12" md="12" lg="12">
        <b-card>
          <b-row>
            <b-col sm="12" md="12" lg="3">
              <label>{{ $t("identitydocument") }}</label>
              <div>
                <v-select
                  :options="IdentityDocumentList"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="filter.identityDocumentId"
                  @input="ChangeIdentityDoc"
                ></v-select>
              </div>
            </b-col>
            <b-col sm="12" md="12" lg="2">
              <label>{{ $t("documentseries") }}</label>
              <div>
                <v-select
                  v-if="filter.identityDocumentId == 1"
                  :options="DocumentSeriesList"
                  :reduce="(item) => item.name"
                  label="name"
                  :placeholder="$t('documentseries')"
                  v-model="filter.documentSeries"
                >
                </v-select>
                <b-form-input
                  class="text-upper"
                  v-if="filter.identityDocumentId != 1"
                  :placeholder="$t('AA')"
                  v-model="filter.documentSeries"
                />
              </div>
            </b-col>
            <b-col sm="12" md="12" lg="2">
              <label>{{ $t("documentnumber") }}</label>
              <div>
                <b-form-input
                  :placeholder="$t('documentnumber')"
                  v-model="filter.documentNumber"
                />
              </div>
            </b-col>

            <b-col
              sm="12"
              md="12"
              lg="2"
              v-if="
                filter.identityDocumentId != 3 
              "
            >
              <label>{{ $t("dateofbirth") }}</label>
              <div>
                <custom-date-picker
                  v-model="filter.dateOfBirth"
                  @keyup="BindValue"
                  format="DD.MM.YYYY"
                  type="date"
                  :clearable="false"
                  :placeholder="$t('dateofbirth')"
                >
                </custom-date-picker>
              </div>
            </b-col>
            <b-col
              sm="12"
              md="12"
              lg="2"
              v-if="
                filter.identityDocumentId == 3
              "
            >
              <label>{{ $t("pinfl") }}</label>
              <div>
                <b-form-input
                  :placeholder="$t('pinfl')"
                  v-model="filter.pinfl"
                />
              </div>
            </b-col>
            <b-col sm="12" md="12" lg="2">
              <label for=""></label>
              <div style="margin-top: 2px">
                <b-button @click="getpersondata" variant="primary">
                  <feather-icon v-if="!SearchLoading" icon="SearchIcon" />
                  <b-spinner v-if="SearchLoading" small></b-spinner>
                  {{ $t("search") }}
                </b-button>
              </div>
            </b-col>
          </b-row>
        </b-card>
        <b-card v-if="iscomponent == false">
          <b-row v-if="$route.params.id !== 0">
            <b-col sm="12" md="6" class="text-center text-md-left">
              <h4 v-if="Person && Person.CheckResult != null">
                {{ Person.fullname }}
                <feather-icon
                  size="20"
                  class="text-success"
                  icon="CheckCircleIcon"
                ></feather-icon>
              </h4>
              <h4 v-if="Person && Person.CheckResult == null">
                {{ Person.fullname }}
                <feather-icon
                  size="20"
                  style="margin-bottom: 4px"
                  class="text-warning"
                  icon="AlertCircleIcon"
                ></feather-icon>
              </h4>
            </b-col>
            <b-col sm="12" md="6" class="text-md-right text-center">
              <b-button
                v-if="$route.params.id != 0"
                @click="UpdateDataFromEGov"
                size="sm"
                variant="primary"
              >
                <b-spinner v-if="UpdateFromEGovLoading" small></b-spinner>
                <feather-icon
                  v-if="!UpdateFromEGovLoading"
                  icon="RefreshCcwIcon"
                ></feather-icon>
                {{ $t("UpdateFromEGov") }}
              </b-button>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="12" md="6" lg="6">
        <b-card>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for
              >{{ $t("familyname") }} <span style="color: red">*</span></label
            >
            <div class="col-sm-7">
              <b-form-input
                :placeholder="$t('familyname')"
                v-model="Person.familyname"
                disabled
              />
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for
              >{{ $t("firstname") }} <span style="color: red">*</span></label
            >
            <div class="col-sm-7">
              <b-form-input
                :placeholder="$t('firstname')"
                v-model="Person.firstname"
                disabled
              />
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("lastname")
            }}</label>
            <div class="col-sm-7">
              <b-form-input
                :placeholder="$t('lastname')"
                v-model="Person.lastname"
                disabled
              />
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for
              >{{ $t("dateofbirth") }} <span style="color: red">*</span></label
            >
            <div class="col-sm-7">
              <date-picker
                style="width: 100%"
                v-model="Person.dateofbirth"
                value-type="format"
                format="DD.MM.YYYY"
                :placeholder="$t('dateofbirth')"
                disabled
              ></date-picker>
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("Country")
            }}</label>
            <div class="col-sm-7">
              <v-select
                :options="CountryList"
                :reduce="(item) => item.id"
                :placeholder="$t('ChooseBelow')"
                label="name"
                v-model="Person.birthcountryid"
              ></v-select>
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("oblast")
            }}</label>
            <div class="col-sm-7">
              <v-select
                @input="ChangeOblast"
                :options="OblastList"
                :reduce="(item) => item.id"
                :placeholder="$t('ChooseBelow')"
                label="name"
                v-model="Person.birthoblastid"
              ></v-select>
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("region")
            }}</label>
            <div class="col-sm-7">
              <v-select
                @input="ChangeRegion"
                :options="birthregionlist"
                :reduce="(item) => item.id"
                :placeholder="$t('ChooseBelow')"
                label="name"
                v-model="Person.birthregionid"
              ></v-select>
            </div>
          </div>
        </b-card>
      </b-col>

      <b-col sm="12" md="6" lg="6">
        <b-card>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for
              >{{ $t("gender") }} <span style="color: red">*</span></label
            >
            <div class="col-sm-7">
              <v-select
                :options="GenderList"
                :reduce="(item) => item.id"
                disabled
                :placeholder="$t('ChooseBelow')"
                label="name"
                v-model="Person.genderid"
              ></v-select>
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for
              >{{ $t("nationality") }} <span style="color: red">*</span></label
            >
            <div class="col-sm-7">
              <v-select
                :options="nationalitylist"
                :reduce="(item) => item.id"
                :placeholder="$t('ChooseBelow')"
                label="name"
                v-model="Person.nationalityid"
              ></v-select>
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for
              >{{ $t("citizenship") }} <span style="color: red">*</span></label
            >
            <div class="col-sm-7">
              <v-select
                :options="CountryList"
                :reduce="(item) => item.id"
                :placeholder="$t('ChooseBelow')"
                label="name"
                v-model="Person.citizenshipid"
                disabled
              ></v-select>
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{ $t("pinfl") }}</label>
            <div class="col-sm-7">
              <b-form-input
                :placeholder="$t('pinfl')"
                v-model="Person.pinfl"
                v-mask="'##############'"
                disabled
              />
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("contactinfo")
            }}</label>
            <div class="col-sm-7">
              <b-form-input
                v-mask="'+998-##-###-##-##'"
                :placeholder="$t('contactinfo')"
                v-model="Person.contactinfo"
              />
            </div>
          </div>
        </b-card>
      </b-col>
    </b-row>
    <b-card v-if="iscomponent == false">
      <b-row>
        <b-col class="text-right mt-1">
          <b-button
            @click="OpenCheckDocModal"
            size="sm"
            variant="outline-primary"
          >
            <feather-icon icon="PlusIcon"></feather-icon>
            {{ $t("Add") }}
          </b-button>
        </b-col>
      </b-row>
    </b-card>
    <b-modal
      no-close-on-backdrop
      hide-footer
      size="xl"
      v-model="CheckDocModal"
      :title="$t('CheckDoc')"
    >
      <b-row>
        <b-col sm="12" md="2" lg="3">
          <label>{{ $t("identitydocument") }}</label>
          <div>
            <v-select
              :options="identitydocumentlist"
              :reduce="(item) => item.id"
              :placeholder="$t('ChooseBelow')"
              label="name"
              v-model="filtercheckdoc.identityDocumentId"
            ></v-select>
          </div>
        </b-col>
        <b-col sm="12" md="1" lg="2">
          <label>{{ $t("documentseries") }}</label>
          <div>
            <v-select
              v-if="filtercheckdoc.identityDocumentId == 1"
              :options="documentserieslist"
              :reduce="(item) => item.name"
              label="name"
              :placeholder="$t('documentseries')"
              v-model="filtercheckdoc.documentSeries"
            >
            </v-select>
            <b-form-input
              class="text-upper"
              v-if="filtercheckdoc.identityDocumentId != 1"
              :placeholder="$t('AA')"
              v-model="filtercheckdoc.documentSeries"
              v-mask="'AA'"
            />
          </div>
        </b-col>
        <b-col sm="12" md="2" lg="2">
          <label>{{ $t("documentnumber") }}</label>
          <div>
            <b-form-input
              :placeholder="$t('documentnumber')"
              v-model="filtercheckdoc.documentNumber"
              v-mask="'##########'"
            />
          </div>
        </b-col>
        <b-col sm="12" md="2" lg="2">
          <label>{{ $t("dateofbirth") }}</label>
          <div>
            <custom-date-picker
              v-model="filtercheckdoc.dateOfBirth"
              @keyup="dateofValue"
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
            <b-button @click="getcheckdocdata" variant="primary">
              <feather-icon v-if="!SearchLoadingcheck" icon="SearchIcon" />
              <b-spinner v-if="SearchLoadingcheck" small></b-spinner>
              {{ $t("search") }}
            </b-button>
          </div>
        </b-col>
      </b-row>
      <b-row v-if="person.fullname" class="mt-2">
        <b-col sm="12" md="4" lg="4">
          <b-list-group>
            <b-list-group-item class="d-flex justify-content-between">
              <span> {{ $t("fullname") }}: </span>
              <span>
                <b> {{ person.fullname }} </b>
              </span>
            </b-list-group-item>
            <b-list-group-item class="d-flex justify-content-between">
              <span> {{ $t("pinfl") }}: </span>
              <span>
                <b> {{ person.pinfl }} </b>
              </span>
            </b-list-group-item>
            <b-list-group-item class="d-flex justify-content-between">
              <span> {{ $t("dateofbirth") }}: </span>
              <span>
                <b> {{ person.dateofbirth }} </b>
              </span>
            </b-list-group-item>
          </b-list-group>
        </b-col>
      </b-row>
      <b-row class="mt-2">
        <b-col class="text-center">
          <b-button
            variant="danger"
            @click="CheckDocModal = false"
            class="mr-1"
          >
            {{ $t("back") }}
          </b-button>
          <b-button variant="success" @click="CheckDocumentbyGov">
            <b-spinner v-if="CheckByGovLoading" small></b-spinner>
            {{ $t("Save") }}
          </b-button>
        </b-col>
      </b-row>
    </b-modal>
    <b-card>
      <b-row>
        <b-col>
          <b-tabs>
            <b-tab active :title="$t('DocumentTables')">
              <b-row class="mt-1">
                <b-col>
                  <b-row class="mb-2">
                    <!-- <b-col class="text-right">
                      <b-button
                        @click="OpenModal"
                        size="sm"
                        variant="outline-primary"
                      >
                        <feather-icon icon="PlusIcon"></feather-icon>
                        {{ $t("Add") }}
                      </b-button>
                    </b-col> -->
                  </b-row>
                  <b-row>
                    <b-col sm="12" md="12" lg="12">
                      <b-table
                        :fields="fields"
                        :items="Person.DocumentTables"
                        small
                        class="text-center"
                        :tbody-tr-class="rowClass"
                      >
                        <template #cell(actions)="{ item }">
                          <div class="text-center">
                            <b-link>
                              <feather-icon
                                style="margin-right: 5px"
                                @click="EditTable(item)"
                                icon="EditIcon"
                              ></feather-icon>
                            </b-link>
                            <!-- <b-link>
                              <feather-icon
                                @click="DeleteRow(item)"
                                icon="Trash2Icon"
                              ></feather-icon>
                            </b-link> -->
                          </div>
                        </template>
                      </b-table>
                    </b-col>
                  </b-row>
                  <b-modal
                    size="lg"
                    v-model="ModalShow"
                    no-close-on-backdrop
                    hide-footer
                    :title="$t('Person')"
                  >
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for>{{
                        $t("dateofbirth")
                      }}</label>
                      <div class="col-sm-7">
                        <date-picker
                          style="width: 100%"
                          v-model="tabrow.ondate"
                          value-type="format"
                          v-mask="'##.##.####'"
                          format="DD.MM.YYYY"
                          :placeholder="$t('dateofbirth')"
                        ></date-picker>
                      </div>
                    </div>
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for>{{
                        $t("identitydocument")
                      }}</label>
                      <div class="col-sm-7">
                        <v-select
                          :options="IdentityDocumentList"
                          :reduce="(item) => item.id"
                          :placeholder="$t('ChooseBelow')"
                          label="name"
                          v-model="tabrow.identitydocumentid"
                        ></v-select>
                      </div>
                    </div>
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for>{{
                        $t("documentseries")
                      }}</label>
                      <div class="col-sm-7">
                        <b-form-input
                          :placeholder="$t('documentseries')"
                          v-model="tabrow.documentseries"
                          style="text-transform: uppercase"
                        />
                      </div>
                    </div>
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for>{{
                        $t("documentnumber")
                      }}</label>
                      <div class="col-sm-7">
                        <b-form-input
                          :placeholder="$t('documentnumber')"
                          v-model="tabrow.documentnumber"
                          type="number"
                        />
                      </div>
                    </div>
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for>{{
                        $t("dateofissue")
                      }}</label>
                      <div class="col-sm-7">
                        <date-picker
                          style="width: 100%"
                          v-model="tabrow.dateofissue"
                          value-type="format"
                          v-mask="'##.##.####'"
                          format="DD.MM.YYYY"
                          :placeholder="$t('dateofissue')"
                        ></date-picker>
                      </div>
                    </div>
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for>{{
                        $t("dateofexpire")
                      }}</label>
                      <div class="col-sm-7">
                        <date-picker
                          style="width: 100%"
                          v-model="tabrow.dateofexpire"
                          value-type="format"
                          v-mask="'##.##.####'"
                          format="DD.MM.YYYY"
                          :placeholder="$t('dateofexpire')"
                        ></date-picker>
                      </div>
                    </div>
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for>{{
                        $t("issueorganization")
                      }}</label>
                      <div class="col-sm-7">
                        <b-form-input
                          :placeholder="$t('issueorganization')"
                          v-model="tabrow.issueorganization"
                        />
                      </div>
                    </div>
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for>{{
                        $t("state")
                      }}</label>
                      <div class="col-sm-7">
                        <v-select
                          :options="StateList"
                          :reduce="(item) => item.id"
                          :placeholder="$t('ChooseBelow')"
                          label="name"
                          v-model="tabrow.stateid"
                        ></v-select>
                      </div>
                    </div>
                    <b-row>
                      <b-col class="text-center">
                        <b-button
                          class="mr-2"
                          @click="ModalShow = false"
                          size="sm"
                          variant="outline-danger"
                        >
                          <feather-icon icon="ArrowLeftIcon"></feather-icon>
                          {{ $t("back") }}
                        </b-button>
                        <b-button
                          @click="AddRow"
                          size="sm"
                          variant="outline-success"
                        >
                          <feather-icon icon="CheckIcon"></feather-icon>
                          {{ $t("Save") }}
                        </b-button>
                      </b-col>
                    </b-row>
                  </b-modal>
                </b-col>
              </b-row>
            </b-tab>

            <b-tab :title="$t('PersonRelativeTables')">
              <b-row class="mb-2">
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
                    :items="Person.PersonRelativeTables"
                    small
                    class="text-center"
                    :tbody-tr-class="rowClass"
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
                <b-row>
                  <b-col sm="12" md="2" lg="3">
                    <label>{{ $t("identitydocument") }}</label>
                    <div>
                      <v-select
                        :options="IdentityDocumentList"
                        :reduce="(item) => item.id"
                        :placeholder="$t('ChooseBelow')"
                        label="name"
                        v-model="filterRelative.identityDocumentId"
                        @input="ChangeIdentityDocRel"
                      ></v-select>
                    </div>
                  </b-col>
                  <b-col sm="12" md="1" lg="2">
                    <label>{{ $t("documentseries") }}</label>
                    <div>
                      <v-select
                        v-if="filterRelative.identityDocumentId == 1"
                        :options="DocumentSeriesList"
                        :reduce="(item) => item.name"
                        label="name"
                        :placeholder="$t('documentseries')"
                        v-model="filterRelative.documentSeries"
                      >
                      </v-select>
                      <b-form-input
                        class="text-upper"
                        v-if="filterRelative.identityDocumentId != 1"
                        :placeholder="$t('AA')"
                        v-model="filterRelative.documentSeries"
                        v-mask="'AA'"
                      />
                    </div>
                  </b-col>
                  <b-col sm="12" md="2" lg="2">
                    <label>{{ $t("documentnumber") }}</label>
                    <div>
                      <b-form-input
                        :placeholder="$t('documentnumber')"
                        v-model="filterRelative.documentNumber"
                        v-mask="'#######'"
                      />
                    </div>
                  </b-col>

                  <b-col
                    sm="12"
                    md="2"
                    lg="2"
                    v-if="
                      filterRelative.identityDocumentId != 3 &&
                      filterRelative.identityDocumentId != 4
                    "
                  >
                    <label>{{ $t("dateofbirth") }}</label>
                    <div>
                      <custom-date-picker
                        v-model="filterRelative.dateOfBirth"
                        @keyup="BindValue1"
                        format="DD.MM.YYYY"
                        type="date"
                        :clearable="false"
                        :placeholder="$t('dateofbirth')"
                      >
                      </custom-date-picker>
                    </div>
                  </b-col>
                  <b-col
                    sm="12"
                    md="12"
                    lg="2"
                    v-if="
                      filterRelative.identityDocumentId == 3 ||
                      filterRelative.identityDocumentId == 4
                    "
                  >
                    <label>{{ $t("pinfl") }}</label>
                    <div>
                      <b-form-input
                        :placeholder="$t('pinfl')"
                        v-model="filter.pinfl"
                      />
                    </div>
                  </b-col>
                  <b-col sm="12" md="2" lg="2">
                    <label for=""></label>
                    <div style="margin-top: 2px">
                      <b-button
                        @click="getpersonRelativedata"
                        variant="primary"
                      >
                        <feather-icon
                          v-if="!SearchRelativeLoading"
                          icon="SearchIcon"
                        />
                        <b-spinner
                          v-if="SearchRelativeLoading"
                          small
                        ></b-spinner>
                        {{ $t("search") }}
                      </b-button>
                    </div>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col sm="12" md="6" class="mt-2">
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for
                        >{{ $t("kinshipdegree") }}
                        <span style="color: red">*</span></label
                      >
                      <div class="col-sm-7">
                        <v-select
                          :options="KinshipdegreeList"
                          :reduce="(item) => item.id"
                          :placeholder="$t('ChooseBelow')"
                          label="name"
                          v-model="tabrow2.kinshipdegreeid"
                        ></v-select>
                      </div>
                    </div>
                  </b-col>
                  <b-col sm="12" md="6" class="mt-2">
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for>{{
                        $t("ondate")
                      }}</label>
                      <div class="col-sm-7">
                        <date-picker
                          style="width: 100%"
                          v-model="tabrow2.ondate"
                          value-type="format"
                          v-mask="'##.##.####'"
                          disabled
                          format="DD.MM.YYYY"
                          :placeholder="$t('ondate')"
                        ></date-picker>
                      </div>
                    </div>
                  </b-col>
                  <b-col sm="12" md="6">
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for>{{
                        $t("familyname")
                      }}</label>
                      <div class="col-sm-7">
                        <b-form-input
                          :placeholder="$t('familyname')"
                          v-model="tabrow2.familyname"
                          :disabled="filterRelative.identityDocumentId != 4"
                        />
                      </div>
                    </div>
                  </b-col>
                  <b-col sm="12" md="6">
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for>{{
                        $t("firstname")
                      }}</label>
                      <div class="col-sm-7">
                        <b-form-input
                          :placeholder="$t('firstname')"
                          v-model="tabrow2.firstname"
                          :disabled="filterRelative.identityDocumentId != 4"
                        />
                      </div>
                    </div>
                  </b-col>
                  <b-col sm="12" md="6">
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for>{{
                        $t("lastname")
                      }}</label>
                      <div class="col-sm-7">
                        <b-form-input
                          :placeholder="$t('lastname')"
                          v-model="tabrow2.lastname"
                          :disabled="filterRelative.identityDocumentId != 4"
                        />
                      </div>
                    </div>
                  </b-col>
                  <b-col sm="12" md="6">
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for>{{
                        $t("dateofbirth")
                      }}</label>
                      <div class="col-sm-7">
                        <custom-date-picker
                          v-model="tabrow2.dateofbirth"
                          @keyup="dateofbirthValue"
                          format="DD.MM.YYYY"
                          type="date"
                          :clearable="false"
                          :disabled="filterRelative.identityDocumentId != 4"
                          :placeholder="$t('dateofbirth')"
                        >
                        </custom-date-picker>
                      </div>
                    </div>
                  </b-col>
                  <b-col sm="12" md="6">
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for>{{
                        $t("pinfl")
                      }}</label>
                      <div class="col-sm-7">
                        <b-form-input
                          check
                          :placeholder="$t('pinfl')"
                          v-model="tabrow2.pinfl"
                        />
                      </div>
                    </div>
                  </b-col>
                  <b-col sm="12" md="6">
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for
                        >{{ $t("hasdied") }}
                      </label>
                      <div class="col-sm-7">
                        <b-form-checkbox v-model="tabrow2.hasdied" />
                      </div>
                    </div>
                  </b-col>
                  <b-col sm="12" md="6" v-if="tabrow2.hasdied == true">
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for
                        >{{ $t("dateofdeath") }}
                        <span style="color: red">*</span></label
                      >
                      <div class="col-sm-7">
                        <custom-date-picker
                          v-model="tabrow2.dateofdeath"
                          @keyup="dateofdeathValue"
                          format="DD.MM.YYYY"
                          type="date"
                          :clearable="false"
                          :placeholder="$t('dateofbirth')"
                        >
                        </custom-date-picker>
                      </div>
                    </div>
                  </b-col>
                  <b-col sm="12" md="6">
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for
                        >{{ $t("nationality") }}
                        <span style="color: red">*</span></label
                      >
                      <div class="col-sm-7">
                        <v-select
                          :options="nationalitylist"
                          :reduce="(item) => item.id"
                          :placeholder="$t('ChooseBelow')"
                          label="name"
                          v-model="tabrow2.nationalityid"
                        ></v-select>
                      </div>
                    </div>
                  </b-col>
                  <b-col sm="12" md="6">
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for
                        >{{ $t("citizenship") }}
                        <span style="color: red">*</span></label
                      >
                      <div class="col-sm-7">
                        <v-select
                          :options="CountryList"
                          :reduce="(item) => item.id"
                          :placeholder="$t('ChooseBelow')"
                          label="name"
                          v-model="tabrow2.citizenshipid"
                        ></v-select>
                      </div>
                    </div>
                  </b-col>
                  <b-col sm="12" md="6">
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for
                        >{{ $t("phonenumber") }}
                      </label>
                      <div class="col-sm-7">
                        <b-form-input
                          v-mask="'+998-##-###-##-##'"
                          :placeholder="$t('phonenumber')"
                          v-model="tabrow2.phonenumber"
                        />
                      </div>
                    </div>
                  </b-col>
                  <b-col sm="12" class="my-2">
                    <b-row>
                      <b-col sm="3">
                        <hr />
                      </b-col>
                      <b-col sm="6">
                        <h4 class="text-center">{{ $t("InfoLivePlace") }}</h4>
                      </b-col>
                      <b-col sm="3">
                        <hr />
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col sm="12" md="6">
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for
                        >{{ $t("Country") }}
                        <span v-if="!tabrow2.hasdied" style="color: red"
                          >*</span
                        ></label
                      >
                      <div class="col-sm-7">
                        <v-select
                          :options="CountryList"
                          :reduce="(item) => item.id"
                          :placeholder="$t('ChooseBelow')"
                          label="name"
                          v-model="tabrow2.countryid"
                        ></v-select>
                      </div>
                    </div>
                  </b-col>
                  <b-col sm="12" md="6">
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for
                        >{{ $t("oblast") }}
                        <span v-if="!tabrow2.hasdied" style="color: red"
                          >*</span
                        ></label
                      >
                      <div class="col-sm-7">
                        <v-select
                          @input="ChangeOblastTable"
                          :options="OblastList"
                          :reduce="(item) => item.id"
                          :placeholder="$t('ChooseBelow')"
                          label="name"
                          v-model="tabrow2.oblastid"
                        ></v-select>
                      </div>
                    </div>
                  </b-col>
                  <b-col sm="12" md="6">
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for
                        >{{ $t("region") }}
                        <span v-if="!tabrow2.hasdied" style="color: red"
                          >*</span
                        ></label
                      >
                      <div class="col-sm-7">
                        <v-select
                          @input="ChangeRegionTable"
                          :options="birthregionlist"
                          :reduce="(item) => item.id"
                          :placeholder="$t('ChooseBelow')"
                          label="name"
                          v-model="tabrow2.regionid"
                        ></v-select>
                      </div>
                    </div>
                  </b-col>
                  <b-col sm="12" md="6">
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for
                        >{{ $t("mfy") }}
                      </label>
                      <div class="col-sm-7">
                        <v-select
                          :options="birthmfylist"
                          :reduce="(item) => item.id"
                          :placeholder="$t('ChooseBelow')"
                          label="name"
                          v-model="tabrow2.mfyid"
                        ></v-select>
                      </div>
                    </div>
                  </b-col>
                  <b-col sm="12" md="6">
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for
                        >{{ $t("address") }}
                        <span v-if="!tabrow2.hasdied" style="color: red"
                          >*</span
                        ></label
                      >
                      <div class="col-sm-7">
                        <b-form-input
                          :placeholder="$t('address')"
                          v-model="tabrow2.address"
                        />
                      </div>
                    </div>
                  </b-col>
                  <b-col sm="12" class="my-2">
                    <b-row>
                      <b-col sm="3">
                        <hr />
                      </b-col>
                      <b-col sm="6">
                        <h4 class="text-center">
                          {{ $t("InfoIdentityDocument") }}
                        </h4>
                      </b-col>
                      <b-col sm="3">
                        <hr />
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col sm="12" md="6">
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for>{{
                        $t("identitydocument")
                      }}</label>
                      <div class="col-sm-7">
                        <v-select
                          :options="IdentityDocumentList"
                          :reduce="(item) => item.id"
                          :placeholder="$t('ChooseBelow')"
                          label="name"
                          v-model="tabrow2.identitydocumentid"
                          :disabled="filterRelative.identityDocumentId != 4"
                        ></v-select>
                      </div>
                    </div>
                  </b-col>
                  <b-col sm="12" md="6">
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for>{{
                        $t("documentseries")
                      }}</label>
                      <div class="col-sm-7">
                        <b-form-input
                          :placeholder="$t('documentseries')"
                          v-if="tabrow2.identitydocumentid != 1"
                          v-model="tabrow2.documentseries"
                          style="text-transform: uppercase"
                          :disabled="filterRelative.identityDocumentId != 4"
                          v-mask="'AA'"
                        />
                        <v-select
                          v-if="tabrow2.identitydocumentid == 1"
                          :options="DocumentSeriesList"
                          :reduce="(item) => item.name"
                          label="name"
                          :placeholder="$t('documentseries')"
                          v-model="tabrow2.documentseries"
                          :disabled="filterRelative.identityDocumentId != 4"
                        >
                        </v-select>
                      </div>
                    </div>
                  </b-col>
                  <b-col sm="12" md="6">
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for>{{
                        $t("documentnumber")
                      }}</label>
                      <div class="col-sm-7">
                        <b-form-input
                          :placeholder="$t('documentnumber')"
                          v-model="tabrow2.documentnumber"
                          :disabled="filterRelative.identityDocumentId != 4"
                        />
                      </div>
                    </div>
                  </b-col>
                  <b-col sm="12" md="6">
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for>{{
                        $t("dateofissue")
                      }}</label>
                      <div class="col-sm-7">
                        <custom-date-picker
                          v-model="tabrow2.dateofissue"
                          @keyup="dateofissueValue"
                          format="DD.MM.YYYY"
                          type="date"
                          :clearable="false"
                          :placeholder="$t('dateofissue')"
                          :disabled="filterRelative.identityDocumentId != 4"
                        >
                        </custom-date-picker>
                      </div>
                    </div>
                  </b-col>
                  <b-col sm="12" md="6">
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for>{{
                        $t("dateofexpire")
                      }}</label>
                      <div class="col-sm-7">
                        <custom-date-picker
                          v-model="tabrow2.dateofexpire"
                          @keyup="dateofexpireValue"
                          format="DD.MM.YYYY"
                          type="date"
                          :clearable="false"
                          :disabled="filterRelative.identityDocumentId != 4"
                          :placeholder="$t('dateofexpire')"
                        >
                        </custom-date-picker>
                      </div>
                    </div>
                  </b-col>
                  <b-col sm="12" md="6">
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for>{{
                        $t("issueorganization")
                      }}</label>
                      <div class="col-sm-7">
                        <b-form-input
                          :placeholder="$t('issueorganization')"
                          v-model="tabrow2.issueorganization"
                          :disabled="filterRelative.identityDocumentId != 4"
                        />
                      </div>
                    </div>
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
              </b-modal>
            </b-tab>
            <b-tab :title="$t('LivePlaceTables')">
              <b-row class="mb-2">
                <b-col class="text-right">
                  <b-button
                    @click="OpenModalPlace"
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
                    :fields="fieldsPlace"
                    :items="Person.LivePlaceTables"
                    small
                    class="text-center"
                    :tbody-tr-class="rowClass"
                  >
                    <template #cell(actions)="{ item }">
                      <div class="text-center">
                        <b-link>
                          <feather-icon
                            style="margin-right: 5px"
                            @click="EditTablePlace(item)"
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
                v-model="ModalShowPlace"
                no-close-on-backdrop
                hide-footer
                :title="$t('LivePlaceTables')"
              >
                <b-row>
                  <b-col>
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for>{{
                        $t("ondate")
                      }}</label>
                      <div class="col-sm-7">
                        <custom-date-picker
                          v-model="tabrow3.ondate"
                          @keyup="ondateValue"
                          format="DD.MM.YYYY"
                          type="date"
                          :clearable="false"
                          :placeholder="$t('ondate')"
                        >
                        </custom-date-picker>
                      </div>
                    </div>
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for>{{
                        $t("countryname")
                      }}</label>
                      <div class="col-sm-7">
                        <v-select
                          :options="CountryList"
                          :reduce="(item) => item.id"
                          :placeholder="$t('ChooseBelow')"
                          label="name"
                          v-model="tabrow3.countryid"
                        ></v-select>
                      </div>
                    </div>
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for
                        >{{ $t("Oblast") }} <span style="color: red">*</span>
                      </label>
                      <div class="col-sm-7">
                        <v-select
                          @input="ChangeOblastListTable"
                          :options="OblastList"
                          :reduce="(item) => item.id"
                          :placeholder="$t('ChooseBelow')"
                          label="name"
                          v-model="tabrow3.oblastid"
                        ></v-select>
                      </div>
                    </div>
                  </b-col>
                  <b-col>
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for
                        >{{ $t("Region") }} <span style="color: red">*</span>
                      </label>
                      <div class="col-sm-7">
                        <v-select
                          @input="ChangeRegionListTable"
                          :options="RegionList"
                          :reduce="(item) => item.id"
                          :placeholder="$t('ChooseBelow')"
                          label="name"
                          v-model="tabrow3.regionid"
                        ></v-select>
                      </div>
                    </div>
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for
                        >{{ $t("mfy") }} <span style="color: red">*</span>
                      </label>
                      <div class="col-sm-7">
                        <v-select
                          :options="MfyList"
                          :reduce="(item) => item.id"
                          :placeholder="$t('ChooseBelow')"
                          label="name"
                          v-model="tabrow3.mfyid"
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
                </b-row>
                <b-row class="mt-2">
                  <b-col class="text-center">
                    <b-button
                      class="mr-2"
                      @click="ModalShowPlace = false"
                      size="sm"
                      variant="outline-danger"
                    >
                      <feather-icon icon="ArrowLeftIcon"></feather-icon>
                      {{ $t("back") }}
                    </b-button>
                    <b-button
                      @click="AddRowPlace"
                      size="sm"
                      variant="outline-success"
                    >
                      <feather-icon icon="CheckIcon"></feather-icon>
                      {{ $t("Save") }}
                    </b-button>
                  </b-col>
                </b-row>
              </b-modal>
            </b-tab>
          </b-tabs>
        </b-col>
      </b-row>
      <b-row class="mt-2" v-if="!iscomponent">
        <b-col>
          <b-row>
            <b-col sm="12" md="6" lg="6" class="text-left"> </b-col>
            <b-col sm="12" md="6" lg="6" class="text-right">
              <b-button @click="SaveData" size="sm" variant="outline-success">
                <feather-icon icon="CheckIcon"></feather-icon> {{ $t("Save") }}
              </b-button>
            </b-col>
          </b-row>
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
  BFormCheckbox,
  VBTooltip,
  BModal,
  VBModal,
  BCardText,
  BSpinner,
  BListGroup,
  BListGroupItem,
  BIcon,
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
    BFormCheckbox,
    BModal,
    BCardText,
    BSpinner,
    CustomDatePicker,
    BListGroup,
    BListGroupItem,
    BIcon,
  },
  directives: {
    "b-tooltip": VBTooltip,
    "b-modal": VBModal,
  },
  data() {
    return {
      show: false,
      CheckDocModal: false,
      CheckByGovLoading: false,
      UpdateFromEGovLoading: false,
      DocumentSeriesList: [],
      nationalitylist: [],
      person: {
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
      CountryList: [],
      OblastList: [],
      RegionList: [],
      MfyList: [],
      filter: {
        documentSeries: "",
        documentNumber: "",
        pinfl: "",
        dateOfBirth: "",
        isStudent: true,
        INN: "",
        identityDocumentId: 0,
      },
      KinshipdegreeList: [],
      birthregionlist: [],
      birthmfylist: [],
      IdentityDocumentList: [],
      StateList: [],
      GenderList: [],
      lang: localStorage.getItem("locale") || "ru",
      fieldsPlace: [
        {
          key: "oblastname",
          label: this.$t("oblastname"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "regionname",
          label: this.$t("regionname"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "mfyname",
          label: this.$t("mfyname"),
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
          key: "actions",
          label: this.$t("actions"),
          thClass: "text-center",
          sortable: true,
        },
      ],
      fieldsRelative: [
        {
          key: "kinshipdegreename",
          label: this.$t("kinshipdegree"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "familyname",
          label: this.$t("familyname"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "firstname",
          label: this.$t("firstname"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "lastname",
          label: this.$t("lastname"),
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
      fields: [
        {
          key: "identitydocumentname",
          label: this.$t("identitydocument"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "documentseries",
          label: this.$t("documentseries"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "documentnumber",
          label: this.$t("documentnumber"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "ondate",
          label: this.$t("dateofbirth"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "dateofissue",
          label: this.$t("dateofissue"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "statename",
          label: this.$t("state"),
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
      identitydocumentlist: [],
      documentserieslist: [],
      CheckResult: false,
      filtercheckdoc: {
        documentSeries: "",
        documentNumber: "",
        pinfl: "",
        dateOfBirth: "",
        isStudent: true,
        INN: "",
        identityDocumentId: 0,
      },
      ModalShow: false,
      ModalShowRelative: false,
      ModalShowPlace: false,
      editedIndex2: -1,
      editedIndex3: -1,
      tabrow3: {
        id: 0,
        ownerid: 0,
        ondate: "",
        countryid: 0,
        countryname: "",
        oblastid: 0,
        oblastname: "",
        regionid: 0,
        regionname: "",
        mfyid: 0,
        mfyname: "",
        address: "",
        stateid: 0,
        statename: "",
        Status: 1,
      },
      tabrow2: {
        id: 0,
        personid: 0,
        ondate: "",
        kinshipdegreeid: 0,
        kinshipdegreename: "",
        familyname: "",
        firstname: "",
        lastname: "",
        shortname: "",
        fullname: "",
        dateofbirth: "",
        pinfl: "",
        hasdied: false,
        dateofdeath: "",
        countryid: 0,
        countryname: "",
        oblastid: 0,
        oblastname: "",
        regionid: 0,
        regionname: "",
        mfyid: 0,
        mfyname: "",
        address: "",
        phonenumber: "",
        identitydocumentid: 0,
        identitydocumentname: "",
        documentseries: "",
        documentnumber: "",
        dateofissue: "",
        dateofexpire: "",
        issueorganization: "",
        nationalityid: 0,
        nationalityname: "",
        citizenshipid: 0,
        citizenshipname: "",
        Status: 1,
      },
      tabrow: {
        id: 0,
        ownerid: 0,
        ondate: "",
        identitydocumentid: 0,
        identitydocumentname: "",
        documentseries: "",
        documentnumber: "",
        dateofissue: "",
        dateofexpire: "",
        issueorganization: "",
        stateid: 0,
        statename: "",
        Status: 1,
      },
      editedIndex1: -1,
      config: {
        dateFormat: "d.m.Y",
      },
      SearchLoading: false,
      SearchLoadingcheck: false,
      filterRelative: {
        documentSeries: "",
        documentNumber: "",
        pinfl: "",
        dateOfBirth: "",
        isStudent: true,
        INN: "",
        identityDocumentId: 0,
      },
      SearchRelativeLoading: false,
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
    };
  },
  props: {
    isStudent: {
      type: Boolean,
      default: true,
    },
    iscomponent: {
      type: Boolean,
      default: false,
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
    Person: {
      get: function () {
        return !!this.personlocal.firstname
          ? this.personlocal
          : this.personData;
      },
      set: function (value) {
        this.personlocal = value;
        this.Person.isstudent = this.isStudent;
        // this.personlocal.isstudent = this.isStudent
        // this.person.isstudent = this.isStudent
        console.log(this.isStudent);
        this.$emit("persondatachange", this.Person);
        this.tabrow2.countryid = 211;
      },
    },
  },
  created() {
    this.lang = localStorage.getItem("locale") || "ru";
    this.show = true;

    if (this.iscomponent == true) {
      this.Person = this.person;
      this.filter.isStudent = this.isStudent;

      this.show = false;
      this.getOblastList();
      this.ChangeRegion();
    } else {
      PersonService.Get(this.$route.params.id)
        .then((res) => {
          this.show = false;
          this.Person = res.data;
          this.getOblastList();
          this.ChangeRegion();
        })
        .catch((error) => {
          this.$makeToast(error.response.data.error, "danger");
        });
    }
    IdentityDocumentService.GetAll(this.lang, true).then((res) => {
      this.IdentityDocumentList = res.data.result;
      this.identitydocumentlist = res.data.result;
    });
    HelperService.GetAllIdentityDocSeries(1).then((res) => {
      this.DocumentSeriesList = res.data;
      this.documentserieslist = res.data;
    });
    OblastService.GetAll(this.lang).then((res) => {
      this.OblastList = res.data;
    });
    HelperService.GetGenderList().then((res) => {
      this.GenderList = res.data;
    });
    CountryService.GetAll(this.lang).then((res) => {
      this.CountryList = res.data;
    });
    KinshipDegreeService.GetAll(this.lang).then((res) => {
      this.KinshipdegreeList = res.data;
    });
    NationalityService.GetAll(this.lang).then((res) => {
      this.nationalitylist = res.data;
    });
    HelperService.GetStateList().then((res) => {
      this.StateList = res.data;
    });
    // this.Person.isstudent = this.isStudent;
  },
  directives: {
    Ripple,
  },
  methods: {
    ChangeIdentityDoc() {
      this.filter.documentSeries = "";
      this.filter.documentNumber = "";
      this.filter.pinfl = "";
      this.filter.dateOfBirth = "";
      this.filter.INN = "";
      if (this.filter.identityDocumentId === 4) {
        this.filter.documentSeries = "WW";
      }
      // this.getpersondata();
    },
    Refresh() {
      PersonService.Get(this.$route.params.id)
        .then((res) => {
          this.show = false;
          this.Person = res.data;
          this.getOblastList();
          this.ChangeRegion();
        })
        .catch((error) => {
          this.$makeToast(error.response.data.error, "danger");
        });
    },
    ChangeIdentityDocRel() {
      this.filterRelative.documentSeries = "";
      this.filterRelative.documentNumber = "";
      this.filterRelative.pinfl = "";
      this.filterRelative.dateOfBirth = "";
      this.filterRelative.INN = "";
    },
    LivePlaceTablesOblast() {
      if (
        this.tabrow3.oblastid === 0 ||
        this.tabrow3.oblastid === null ||
        this.tabrow3.oblastid === "" ||
        this.tabrow3.oblastid === undefined
      ) {
        this.$makeToast(this.$t("oblastidNotSelected"), "danger");
        return false;
      }
      if (
        this.tabrow3.regionid === 0 ||
        this.tabrow3.regionid === null ||
        this.tabrow3.regionid === "" ||
        this.tabrow3.regionid === undefined
      ) {
        this.$makeToast(this.$t("regionidNotSelected"), "danger");
        return false;
      }
      if (
        this.tabrow3.mfyid === 0 ||
        this.tabrow3.mfyid === null ||
        this.tabrow3.mfyid === "" ||
        this.tabrow3.mfyid === undefined
      ) {
        this.$makeToast(this.$t("mfyidNotSelected"), "danger");
        return false;
      }
      return true;
    },
    getTodayDate() {
      var todaydate = new Date();
      var dd = String(todaydate.getDate()).padStart(2, "0");
      // var mm = String(todaydate.getMonth() - 2).padStart(2, "0");
      var mn = String(todaydate.getMonth() + 1).padStart(2, "0");
      var yyyy = todaydate.getFullYear();
      // var yyy1 = todaydate.getFullYear();
      // if(mm < 1){
      //   mm = 12
      //   yyyy = yyyy - 1
      // }
      // this.filter.startdate = dd + "." + mm + "." + yyyy;
      // this.filter.enddate = dd + "." + mn + "." + yyy1;
      this.tabrow2.ondate = dd + "." + mn + "." + yyyy;
      this.tabrow3.ondate = dd + "." + mn + "." + yyyy;
    },
    dateofValue(data) {
      this.filtercheckdoc.dateOfBirth = data;
    },
    BindValue1(data) {
      this.filterRelative.dateOfBirth = data;
    },
    AddDatacheckDoc() {},
    UpdateDataFromEGov() {
      this.UpdateFromEGovLoading = true;
      PersonService.UpdateDataFromEGov(this.Person.id)
        .then((res) => {
          this.UpdateFromEGovLoading = false;
          this.Refresh();
          this.$makeToast(this.$t("SaveSuccess"), "success");
        })
        .catch((error) => {
          this.UpdateFromEGovLoading = false;
          this.$makeToast(error.response.data.error, "danger");
        });
    },
    getpersonRelativedata() {
      this.SearchRelativeLoading = true;
      if (this.filterRelative.identityDocumentId != 1) {
        this.filterRelative.documentSeries =
          this.filterRelative.documentSeries.toUpperCase();
      }
      PersonService.GetFromGovData(
        this.filterRelative.documentSeries,
        this.filterRelative.documentNumber,
        this.filterRelative.pinfl,
        this.filterRelative.dateOfBirth,
        this.filterRelative.isStudent,
        this.filterRelative.INN,
        this.filterRelative.identityDocumentId
      )
        .then((res) => {
          this.SearchRelativeLoading = false;
          // this.tabrow2 = res.data;
          this.tabrow2.id = 0;
          this.tabrow2.personid = 0;
          this.tabrow2.ondate = "";
          this.tabrow2.kinshipdegreeid = "";
          this.tabrow2.kinshipdegreename = "";
          this.tabrow2.familyname = res.data.familyname;
          this.tabrow2.firstname = res.data.firstname;
          this.tabrow2.lastname = res.data.lastname;
          this.tabrow2.shortname = res.data.shortname;
          this.tabrow2.fullname = res.data.fullname;
          this.tabrow2.dateofbirth = res.data.dateofbirth;
          this.tabrow2.pinfl = res.data.pinfl;
          this.tabrow2.dateofdeath = "";
          this.tabrow2.countryid = res.data.birthcountryid;
          this.tabrow2.countryname = res.data.birthcountryname;
          this.tabrow2.oblastid = res.data.birthoblastid;
          this.tabrow2.oblastname = res.data.birthoblastname;
          this.tabrow2.regionid = res.data.birthregionid;
          this.tabrow2.regionname = res.data.birthregionname;
          this.tabrow2.mfyid = res.data.birthmfyid;
          this.tabrow2.mfyname = res.data.birthmfyname;
          this.tabrow2.address = "";
          this.tabrow2.phonenumber = "";
          this.tabrow2.nationalityid = res.data.nationalityid;
          this.tabrow2.nationalityname = res.data.nationalityname;
          this.tabrow2.citizenshipid = res.data.citizenshipid;
          this.tabrow2.citizenshipname = res.data.citizenshipname;
          this.tabrow2.Status = 1;
          this.tabrow2.identitydocumentid =
            res.data.DocumentTables[0].identitydocumentid || 0;
          this.tabrow2.identitydocumentname =
            res.data.DocumentTables[0].identitydocumentname || "";
          this.tabrow2.documentseries =
            res.data.DocumentTables[0].documentseries || "";
          this.tabrow2.documentnumber =
            res.data.DocumentTables[0].documentnumber || "";
          this.tabrow2.dateofissue =
            res.data.DocumentTables[0].dateofissue || "";
          this.tabrow2.dateofexpire =
            res.data.DocumentTables[0].dateofexpire || "";
          this.tabrow2.issueorganization =
            res.data.DocumentTables[0].issueorganization || "";
          this.tabrow2.hasdied = false;
          this.getTodayDate();
        })
        .catch((error) => {
          this.SearchRelativeLoading = false;
          this.$makeToast(error.response.data.error, "danger");
        });
    },
    getpersondata() {
      var self = this;
      self.SearchLoading = true;
      if (self.filter.identityDocumentId != 1) {
        self.filter.documentSeries = self.filter.documentSeries.toUpperCase();
      }
      if (self.filter.identityDocumentId === 4) {
        self.filter.documentSeries = "WW";
      }
      PersonService.GetFromGovData(
        self.filter.documentSeries,
        self.filter.documentNumber,
        self.filter.pinfl,
        self.filter.dateOfBirth,
        self.filter.isStudent,
        self.filter.INN,
        self.filter.identityDocumentId
      )
        .then((res) => {
          self.SearchLoading = false;
          self.Person = res.data;
          self.personlocal = res.data;
          self.$emit("persondatachange", res.data);
        })
        .catch((error) => {
          self.SearchLoading = false;
          self.$makeToast(error.response.data.error, "danger");
        });
    },
    getcheckdocdata() {
      var self = this;
      self.SearchLoadingcheck = true;
      if (self.filtercheckdoc.identityDocumentId != 1) {
        self.filtercheckdoc.documentSeries =
          self.filtercheckdoc.documentSeries.toUpperCase();
      }
      PersonService.GetFromGovData(
        self.filtercheckdoc.documentSeries,
        self.filtercheckdoc.documentNumber,
        self.filtercheckdoc.pinfl,
        self.filtercheckdoc.dateOfBirth,
        self.filtercheckdoc.isStudent,
        self.filtercheckdoc.INN,
        self.filtercheckdoc.identityDocumentId
      )
        .then((res) => {
          self.SearchLoadingcheck = false;
          self.person = res.data;
        })
        .catch((error) => {
          self.SearchLoadingcheck = false;
          self.$makeToast(error.response.data.error, "danger");
        });
    },
    CheckDocumentbyGov() {
      this.CheckByGovLoading = true;
      PersonService.ChangeIdentityDocument(
        this.Person.id,
        this.filtercheckdoc.identityDocumentId,
        this.filtercheckdoc.documentSeries,
        this.filtercheckdoc.documentNumber,
        this.filtercheckdoc.dateOfBirth,
        (this.filtercheckdoc.pinfl = this.person.pinfl)
      )
        .then((res) => {
          this.CheckByGovLoading = false;
          this.CheckDocModal = false;
          this.loaddata();
        })
        .catch((err) => {
          this.$makeToast(this.$t(err.response.data.error), "danger");
          this.CheckByGovLoading = false;
        });
    },
    BindValue(value) {
      this.filter.dateOfBirth = value;
    },
    OndateValue(value) {
      this.tabrow2.ondate = value;
    },
    ondateValue(value) {
      this.tabrow3.ondate = value;
    },
    dateofbirthValue(value) {
      this.tabrow2.dateofbirth = value;
    },
    dateofdeathValue(value) {
      this.tabrow2.dateofdeath = value;
    },
    dateofissueValue(value) {
      this.tabrow2.dateofissue = value;
    },
    dateofexpireValue(value) {
      this.tabrow2.dateofexpire = value;
    },
    rowClass(item, type) {
      if (item.Status === 3) return "d-none";
    },
    getOblastList() {
      if (!!this.Person.birthoblastid) {
        RegionService.GetAll(this.lang, this.Person.birthoblastid).then(
          (res) => {
            this.birthregionlist = res.data;
          }
        );
      }
    },
    ChangeOblast() {
      this.Person.birthregionid = 0;
      this.getOblastList();
    },
    ChangeRegion() {
      if (!!this.Person.birthregionid) {
        MfyService.GetAll(this.lang, this.Person.birthregionid).then((res) => {
          this.birthmfylist = res.data;
        });
      }
    },
    ChangeOblastTable() {
      //   this.tabrow2.birthregionid = 0;
      //   if (!!this.tabrow2.birthoblastid) {
      RegionService.GetAll(this.lang, this.tabrow2.oblastid).then((res) => {
        this.birthregionlist = res.data;
      });
      //   }
    },
    ChangeOblastListTable() {
      this.tabrow3.regionid = 0;
      this.tabrow3.mfyid = 0;
      this.getRegionListInLivePlace();
    },
    getRegionListInLivePlace() {
      RegionService.GetAll(this.lang, this.tabrow3.oblastid).then((res) => {
        this.RegionList = res.data;
      });
    },
    ChangeRegionTable() {
      MfyService.GetAll(this.lang, this.tabrow2.regionid).then((res) => {
        this.birthmfylist = res.data;
      });
    },
    getMfyListInLivePlace() {
      MfyService.GetAll(this.lang, this.tabrow3.regionid).then((res) => {
        this.MfyList = res.data;
      });
    },
    ChangeRegionListTable() {
      this.tabrow3.mfyid = 0;
      this.getMfyListInLivePlace();
    },
    OpenModal() {
      // if (!this.check()) {
      //     return false;
      // }
      this.ModalShow = true;
      (this.tabrow = {
        id: 0,
        ownerid: 0,
        ondate: "",
        identitydocumentid: 0,
        identitydocumentname: "",
        documentseries: "",
        documentnumber: "",
        dateofissue: "",
        dateofexpire: "",
        issueorganization: "",
        stateid: 0,
        statename: "",
        Status: 1,
      }),
        (this.editedIndex1 = -1);
    },
    OpenModalPlace() {
      this.ModalShowPlace = true;
      this.tabrow3 = {
        id: 0,
        ownerid: 0,
        ondate: "",
        countryid: 211,
        countryname: "",
        oblastid: 0,
        oblastname: "",
        regionid: 0,
        regionname: "",
        mfyid: 0,
        mfyname: "",
        address: "",
        stateid: 0,
        statename: "",
        Status: 1,
      };
      this.getTodayDate();
      this.editedIndex3 = -1;
    },
    OpenModalRelative() {
      this.ModalShowRelative = true;
      this.tabrow2 = {
        id: 0,
        personid: 0,
        ondate: "",
        kinshipdegreeid: 0,
        kinshipdegreename: "",
        familyname: "",
        firstname: "",
        lastname: "",
        shortname: "",
        fullname: "",
        dateofbirth: "",
        pinfl: "",
        hasdied: false,
        dateofdeath: "",
        countryid: 0,
        countryname: "",
        oblastid: 0,
        oblastname: "",
        regionid: 0,
        regionname: "",
        mfyid: 0,
        mfyname: "",
        address: "",
        phonenumber: "",
        identitydocumentid: 0,
        identitydocumentname: "",
        documentseries: "",
        documentnumber: "",
        dateofissue: "",
        dateofexpire: "",
        issueorganization: "",
        nationalityid: 0,
        nationalityname: "",
        citizenshipid: 0,
        citizenshipname: "",
        Status: 1,
      };
      this.getTodayDate();
      this.editedIndex2 = -1;
    },
    EditTable(item) {
      if (item.Status == 0) {
        item.Status = 2;
      }
      this.editedIndex1 = this.Person.DocumentTables.indexOf(item);
      this.tabrow = Object.assign({}, item);
      this.ModalShow = true;
    },
    EditTableRelative(item) {
      if (item.Status == 0) {
        item.Status = 2;
      }
      this.editedIndex2 = this.Person.PersonRelativeTables.indexOf(item);
      this.tabrow2 = Object.assign({}, item);
      this.ModalShowRelative = true;
    },
    EditTablePlace(item) {
      if (item.Status == 0) {
        item.Status = 2;
      }
      this.editedIndex3 = this.Person.LivePlaceTables.indexOf(item);
      this.tabrow3 = Object.assign({}, item);
      this.getRegionListInLivePlace();
      this.getMfyListInLivePlace();
      this.ModalShowPlace = true;
    },
    DeleteRow(item) {
      item.Status = 3;
    },
    check() {
      if (
        this.Person.familyname === 0 ||
        this.Person.familyname === null ||
        this.Person.familyname === undefined ||
        this.Person.familyname === ""
      ) {
        this.$makeToast(this.$t("familynameNotSelected"), "danger");
        return false;
      }
      if (
        this.Person.firstname === 0 ||
        this.Person.firstname === null ||
        this.Person.firstname === undefined ||
        this.Person.firstname === ""
      ) {
        this.$makeToast(this.$t("firstnameNotSelected"), "danger");
        return false;
      }
      if (
        this.Person.dateofbirth === 0 ||
        this.Person.dateofbirth === null ||
        this.Person.dateofbirth === undefined ||
        this.Person.dateofbirth === ""
      ) {
        this.$makeToast(this.$t("dateofbirthNotSelected"), "danger");
        return false;
      }
      if (
        this.Person.birthcountryid === 211 &&
        (this.Person.birthoblastid === null ||
          this.Person.birthoblastid === 0 ||
          this.Person.birthoblastid === "" ||
          this.Person.birthoblastid === undefined)
      ) {
        this.$makeToast(this.$t("birthoblastidNotSelected"), "danger");
        return false;
      }
      if (
        this.Person.birthcountryid === 211 &&
        (this.Person.birthregionid === null ||
          this.Person.birthregionid === 0 ||
          this.Person.birthregionid === "" ||
          this.Person.birthregionid === undefined)
      ) {
        this.$makeToast(this.$t("birthregionidNotSelected"), "danger");
        return false;
      }
      if (
        this.Person.genderid === 0 ||
        this.Person.genderid === null ||
        this.Person.genderid === undefined ||
        this.Person.genderid === ""
      ) {
        this.$makeToast(this.$t("genderidNotSelected"), "danger");
        return false;
      }
      if (
        this.Person.nationalityid === 0 ||
        this.Person.nationalityid === null ||
        this.Person.nationalityid === undefined ||
        this.Person.nationalityid === ""
      ) {
        this.$makeToast(this.$t("nationalityidNotSelected"), "danger");
        return false;
      }
      if (
        this.Person.citizenshipid === 0 ||
        this.Person.citizenshipid === null ||
        this.Person.citizenshipid === undefined ||
        this.Person.citizenshipid === ""
      ) {
        this.$makeToast(this.$t("citizenshipidNotSelected"), "danger");
        return false;
      }

      return true;
    },
    checkRelative() {
      if (
        this.tabrow2.kinshipdegreeid === 0 ||
        this.tabrow2.kinshipdegreeid === null ||
        this.tabrow2.kinshipdegreeid === undefined ||
        this.tabrow2.kinshipdegreeid === ""
      ) {
        this.$makeToast(this.$t("kinshipdegreeidNotSelected"), "danger");
        return false;
      }
      if (
        this.tabrow2.hasdied === true &&
        (this.tabrow2.dateofdeath === 0 ||
          this.tabrow2.dateofdeath === null ||
          this.tabrow2.dateofdeath === undefined ||
          this.tabrow2.dateofdeath === "")
      ) {
        this.$makeToast(this.$t("hasdiedNotSelected"), "danger");
        return false;
      }
      if (
        this.tabrow2.nationalityid === 0 ||
        this.tabrow2.nationalityid === null ||
        this.tabrow2.nationalityid === undefined ||
        this.tabrow2.nationalityid === ""
      ) {
        this.$makeToast(this.$t("nationalityidNotSelected"), "danger");
        return false;
      }
      if (
        this.tabrow2.hasdied === false &&
        (this.tabrow2.countryid === 0 ||
          this.tabrow2.countryid === null ||
          this.tabrow2.countryid === undefined ||
          this.tabrow2.countryid === "")
      ) {
        this.$makeToast(this.$t("countryidNotSelected"), "danger");
        return false;
      }
      if (
        this.tabrow2.hasdied === false &&
        (this.tabrow2.oblastid === 0 ||
          this.tabrow2.oblastid === null ||
          this.tabrow2.oblastid === undefined ||
          this.tabrow2.oblastid === "")
      ) {
        this.$makeToast(this.$t("oblastidNotSelected"), "danger");
        return false;
      }
      if (
        this.tabrow2.hasdied === false &&
        (this.tabrow2.citizenshipid === 0 ||
          this.tabrow2.citizenshipid === null ||
          this.tabrow2.citizenshipid === undefined ||
          this.tabrow2.citizenshipid === "")
      ) {
        this.$makeToast(this.$t("citizenshipidNotSelected"), "danger");
        return false;
      }
      if (
        this.tabrow2.hasdied === false &&
        (this.tabrow2.regionid === 0 ||
          this.tabrow2.regionid === null ||
          this.tabrow2.regionid === undefined ||
          this.tabrow2.regionid === "")
      ) {
        this.$makeToast(this.$t("regionidNotSelected"), "danger");
        return false;
      }
      if (
        this.tabrow2.hasdied === false &&
        (this.tabrow2.address === 0 ||
          this.tabrow2.address === null ||
          this.tabrow2.address === undefined ||
          this.tabrow2.address === "")
      ) {
        this.$makeToast(this.$t("addressNotSelected"), "danger");
        return false;
      }
      return true;
    },
    AddRow() {
      //   if (
      //     this.tabrow.quotatypeid === 0 ||
      //     this.tabrow.quotatypeid === null ||
      //     this.tabrow.quotatypeid === undefined ||
      //     this.tabrow.quotatypeid === ""
      //   ) {
      //     this.$makeToast(this.$t("quotatypeNotSelected"), "danger");
      //     return false;
      //   }
      //   if (
      //     this.tabrow.startdate === 0 ||
      //     this.tabrow.startdate === null ||
      //     this.tabrow.startdate === undefined ||
      //     this.tabrow.startdate === ""
      //   ) {
      //     this.$makeToast(this.$t("startdateNotSelected"), "danger");
      //     return false;
      //   }
      //   if (
      //     this.tabrow.enddate === 0 ||
      //     this.tabrow.enddate === null ||
      //     this.tabrow.enddate === undefined ||
      //     this.tabrow.enddate === ""
      //   ) {
      //     this.$makeToast(this.$t("enddateNotSelected"), "danger");
      //     return false;
      //   }
      this.tabrow.identitydocumentname = this.IdentityDocumentList.filter(
        (item) => this.tabrow.identitydocumentid === item.id
      )[0].name;
      this.tabrow.statename = this.StateList.filter(
        (item) => this.tabrow.stateid === item.id
      )[0].name;
      if (this.editedIndex1 > -1) {
        Object.assign(
          this.Person.DocumentTables[this.editedIndex1],
          this.tabrow
        );
      } else {
        this.Person.DocumentTables.push(this.tabrow);
      }
      this.ModalShow = false;
    },
    OpenCheckDocModal() {
      this.CheckDocModal = true;
    },
    AddRowRelative() {
      if (!this.checkRelative()) {
        return false;
      }
      this.tabrow2.kinshipdegreename =
        this.KinshipdegreeList.length > 0
          ? this.KinshipdegreeList.filter(
              (item) => this.tabrow2.kinshipdegreeid === item.id
            )[0].name
          : "";
      // this.tabrow2.countryname =
      //   this.CountryList.length > 0
      //     ? this.CountryList.filter(
      //         (item) => this.tabrow2.countryid === item.id
      //       )[0].name
      //     : "";
      // this.tabrow2.identitydocumentname = this.IdentityDocumentList.filter(
      //   (item) => this.tabrow2.identitydocumentid === item.id
      // )[0].name;
      // this.tabrow2.oblastname = !!this.tabrow2.oblastid
      //   ? this.OblastList.filter((item) => this.tabrow2.oblastid === item.id)[0]
      //       .name
      //   : "";
      // this.tabrow2.regionname = !!this.tabrow2.regionid
      //   ? this.birthregionlist.filter(
      //       (item) => this.tabrow2.regionid === item.id
      //     )[0].name
      //   : "";
      // this.tabrow2.mfyname = !!this.tabrow2.mfyid
      //   ? this.birthmfylist.filter((item) => this.tabrow2.mfyid === item.id)[0]
      //       .name
      //   : "";
      // this.tabrow2.nationalityname = this.nationalitylist.filter(
      //   (item) => this.tabrow2.nationalityid === item.id
      // )[0].name;
      // this.tabrow2.citizenshipname = this.CountryList.filter(
      //   (item) => this.tabrow2.citizenshipid === item.id
      // )[0].name;
      if (this.editedIndex2 > -1) {
        Object.assign(
          this.Person.PersonRelativeTables[this.editedIndex2],
          this.tabrow2
        );
      } else {
        this.Person.PersonRelativeTables.push(this.tabrow2);
      }
      this.ModalShowRelative = false;
      console.log(this.Person.PersonRelativeTables);
      this.filterRelative = {
        documentSeries: "",
        documentNumber: "",
        pinfl: "",
        dateOfBirth: "",
        isStudent: true,
        INN: "",
        identityDocumentId: 0,
      };
    },
    AddRowPlace() {
      if (!this.LivePlaceTablesOblast()) {
        return false;
      }
      this.tabrow3.countryname = !!this.tabrow3.countryid
        ? this.CountryList.filter(
            (item) => this.tabrow3.countryid === item.id
          )[0].name
        : "";
      this.tabrow3.oblastname = !!this.tabrow3.oblastid
        ? this.OblastList.filter((item) => this.tabrow3.oblastid === item.id)[0]
            .name
        : "";
      this.tabrow3.regionname = !!this.tabrow3.regionid
        ? this.RegionList.filter((item) => this.tabrow3.regionid === item.id)[0]
            .name
        : "";
      this.tabrow3.mfyname = !!this.tabrow3.mfyid
        ? this.MfyList.filter((item) => this.tabrow3.mfyid === item.id)[0].name
        : "";
      this.tabrow3.statename = !!this.tabrow3.stateid
        ? this.StateList.filter((item) => this.tabrow3.stateid === item.id)[0]
            .name
        : "";
      if (this.editedIndex3 > -1) {
        Object.assign(
          this.Person.LivePlaceTables[this.editedIndex3],
          this.tabrow3
        );
      } else {
        this.Person.LivePlaceTables.push(this.tabrow3);
      }
      this.ModalShowPlace = false;
    },
    SaveData() {
      console.log(this.Person);
      if (!this.check()) {
        return false;
      }
      PersonService.Update(this.Person)
        .then((res) => {
          this.$makeToast(this.$t("SaveSuccess"), "success");
          if (this.iscomponent === true) {
            this.$emit("successSave", true);
          } else {
            if (this.isStudent == false) {
              this.$router.push({ name: "guardianship" });
            } else {
              this.$router.push({ name: "person" });
            }
          }
        })
        .catch((err) => {
          this.$makeToast(this.$t(err.response.data.error), "danger");
        });
    },
  },
  watch: {
    "Person.birthoblastid": {
      handler(newValue, oldValue) {
        if (newValue) {
          if (oldValue) {
            this.Person.birthregionid = null;
          }
          var self = this;
          this.getOblastList();
        }
      },
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-flatpicker.scss";
</style>
