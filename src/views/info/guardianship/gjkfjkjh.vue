<template>
  <b-overlay :show="show">
    <b-row>
      <b-col sm="12" md="12" lg="12">
        <b-card>
          <b-row>
            <b-col sm="12" md="2" lg="3">
              <label>{{ $t("identitydocument") }}</label>
              <div>
                <v-select
                  :options="identityDocumentList"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="filter.identityDocumentId"
                ></v-select>
              </div>
            </b-col>
            <b-col sm="12" md="1" lg="2">
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
                  v-if="filter.identityDocumentId != 1"
                  :placeholder="$t('AA')"
                  v-model="filter.documentSeries"
                />
              </div>
            </b-col>
            <b-col sm="12" md="2" lg="2">
              <label>{{ $t("documentnumber") }}</label>
              <div>
                <b-form-input
                  :placeholder="$t('documentnumber')"
                  v-model="filter.documentNumber"
                  v-mask="'#######'"
                />
              </div>
            </b-col>

            <b-col sm="12" md="2" lg="2">
              <label>{{ $t("dateofbirth") }}</label>
              <div>
                <!-- <date-picker
                  style="width: 100%"
                  v-model="filter.dateOfBirth"
                  value-type="format"
                  v-mask="'##.##.####'"
                  format="DD.MM.YYYY"
                  :placeholder="$t('dateofbirth')"
                ></date-picker> -->
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
            <b-col sm="12" md="2" lg="2">
              <!-- <b-button variant="primary">{{ $t("search") }}</b-button> -->
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
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="12" md="6" lg="6">
        <b-card>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("familyname")
            }}</label>
            <div class="col-sm-7">
              <b-form-input
                :placeholder="$t('familyname')"
                v-model="Person.familyname"
                disabled
              />
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("firstname")
            }}</label>
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
            <label class="col-form-label col-sm-5" for>{{
              $t("dateofbirth")
            }}</label>
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
                :options="birthoblastlist"
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
            <label class="col-form-label col-sm-5" for>{{
              $t("gender")
            }}</label>
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
            <label class="col-form-label col-sm-5" for>{{
              $t("nationality")
            }}</label>
            <div class="col-sm-7">
              <v-select
                :options="nationalitylist"
                :reduce="(item) => item.id"
                :placeholder="$t('ChooseBelow')"
                label="name"
                v-model="Person.nationalityid"
                disabled
              ></v-select>
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("citizenship")
            }}</label>
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
            <label class="col-form-label col-sm-5" for>{{ $t("inn") }}</label>
            <div class="col-sm-7">
              <b-form-input
                :placeholder="$t('inn')"
                v-model="Person.inn"
                v-mask="'#########'"
                disabled
              />
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{ $t("pinfl") }}</label>
            <div class="col-sm-7">
              <b-form-input
                :placeholder="$t('pinfl')"
                v-model="Person.pinfl"
                v-mask="'############## '"
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
                v-mask="'+998-9#-###-##-##'"
                :placeholder="$t('contactinfo')"
                v-model="Person.contactinfo"
              />
            </div>
          </div>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card>
          <b-tabs>
            <b-tab active :title="$t('DocumentTables')">
              <b-row class="mt-1">
                <b-col>
                  <b-row class="mb-2">
                    <b-col class="text-right">
                      <b-button
                        @click="OpenModal"
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
                    size="lg"
                    v-model="ModalShow"
                    no-close-on-backdrop
                    hide-footer
                    :title="$t('Person')"
                  >
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for>{{
                        $t("ondate")
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
                        <!-- <flat-pickr
                          v-model="tabrow.ondate"
                          class="form-control"
                          :placeholder="$t('ondate')"
                          :config="config"
                        /> -->
                      </div>
                    </div>
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for>{{
                        $t("identitydocument")
                      }}</label>
                      <div class="col-sm-7">
                        <v-select
                          :options="identitydocumentlist"
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
                        <!-- <flat-pickr
                          v-model="tabrow.dateofissue"
                          class="form-control"
                          :placeholder="$t('dateofissue')"
                          :config="config"
                        /> -->
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
                        <!-- <flat-pickr
                          v-model="tabrow.dateofexpire"
                          class="form-control"
                          :placeholder="$t('dateofexpire')"
                          :config="config"
                        /> -->
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
                          :options="statelist"
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
                  <!-- <b-row class="mt-3">
            <b-col sm="12" md="6" lg="6" class="text-left"> </b-col>
            <b-col sm="12" md="6" lg="6" class="text-right">
              <b-button @click="SaveData" size="sm" variant="outline-success">
                <feather-icon icon="CheckIcon"></feather-icon> {{ $t("Save") }}
              </b-button>
            </b-col>
          </b-row> -->
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
                <!-- <div class="form-group form-row"> -->
                <b-row>
                  <b-col>
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
                          format="DD.MM.YYYY"
                          :placeholder="$t('dateofbirth')"
                        ></date-picker>
                        <!-- <flat-pickr
                          v-model="tabrow2.ondate"
                          class="form-control"
                          :placeholder="$t('ondate')"
                          :config="config"
                        /> -->
                      </div>
                    </div>
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for>{{
                        $t("kinshipdegree")
                      }}</label>
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
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for>{{
                        $t("familyname")
                      }}</label>
                      <div class="col-sm-7">
                        <b-form-input
                          :placeholder="$t('familyname')"
                          v-model="tabrow2.familyname"
                        />
                      </div>
                    </div>
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for>{{
                        $t("firstname")
                      }}</label>
                      <div class="col-sm-7">
                        <b-form-input
                          :placeholder="$t('firstname')"
                          v-model="tabrow2.firstname"
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
                          v-model="tabrow2.lastname"
                        />
                      </div>
                    </div>
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for>{{
                        $t("shortname")
                      }}</label>
                      <div class="col-sm-7">
                        <b-form-input
                          :placeholder="$t('shortname')"
                          v-model="tabrow2.shortname"
                        />
                      </div>
                    </div>
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for>{{
                        $t("fullname")
                      }}</label>
                      <div class="col-sm-7">
                        <b-form-input
                          :placeholder="$t('fullname')"
                          v-model="tabrow2.fullname"
                        />
                      </div>
                    </div>
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for>{{
                        $t("dateofbirth")
                      }}</label>
                      <div class="col-sm-7">
                        <date-picker
                          style="width: 100%"
                          v-model="tabrow2.dateofbirth"
                          value-type="format"
                          v-mask="'##.##.####'"
                          format="DD.MM.YYYY"
                          :placeholder="$t('dateofbirth')"
                        ></date-picker>
                        <!-- <flat-pickr
                          v-model="tabrow2.dateofbirth"
                          class="form-control"
                          :placeholder="$t('dateofbirth')"
                          :config="config"
                        /> -->
                      </div>
                    </div>
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
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for>{{
                        $t("hasdied")
                      }}</label>
                      <div class="col-sm-7">
                        <b-form-checkbox v-model="tabrow2.hasdied" plain />
                      </div>
                    </div>
                    <div
                      v-if="tabrow2.hasdied == true"
                      class="form-group form-row"
                    >
                      <label class="col-form-label col-sm-5" for>{{
                        $t("dateofdeath")
                      }}</label>
                      <div class="col-sm-7">
                        <date-picker
                          style="width: 100%"
                          v-model="tabrow2.dateofdeath"
                          value-type="format"
                          v-mask="'##.##.####'"
                          format="DD.MM.YYYY"
                          :placeholder="$t('dateofbirth')"
                        ></date-picker>
                        <!-- <flat-pickr
                          v-model="tabrow2.dateofdeath"
                          class="form-control"
                          :placeholder="$t('dateofdeath')"
                          :config="config"
                        /> -->
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
                          v-model="tabrow2.countryid"
                        ></v-select>
                      </div>
                    </div>
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for>{{
                        $t("oblast")
                      }}</label>
                      <div class="col-sm-7">
                        <v-select
                          @input="ChangeOblastTable"
                          :options="birthoblastlist"
                          :reduce="(item) => item.id"
                          :placeholder="$t('ChooseBelow')"
                          label="name"
                          v-model="tabrow2.oblastid"
                        ></v-select>
                      </div>
                    </div>
                  </b-col>
                  <b-col>
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for>{{
                        $t("region")
                      }}</label>
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
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for>{{
                        $t("mfy")
                      }}</label>
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
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for>{{
                        $t("address")
                      }}</label>
                      <div class="col-sm-7">
                        <b-form-input
                          :placeholder="$t('address')"
                          v-model="tabrow2.address"
                        />
                      </div>
                    </div>
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for>{{
                        $t("phonenumber")
                      }}</label>
                      <div class="col-sm-7">
                        <b-form-input
                          v-mask="'+998-##-###-##-##'"
                          :placeholder="$t('phonenumber')"
                          v-model="tabrow2.phonenumber"
                        />
                      </div>
                    </div>
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for>{{
                        $t("identitydocument")
                      }}</label>
                      <div class="col-sm-7">
                        <v-select
                          :options="identitydocumentlist"
                          :reduce="(item) => item.id"
                          :placeholder="$t('ChooseBelow')"
                          label="name"
                          v-model="tabrow2.identitydocumentid"
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
                          v-model="tabrow2.documentseries"
                          style="text-transform: uppercase"
                          v-mask="'AA'"
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
                          v-model="tabrow2.documentnumber"
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
                          v-model="tabrow2.dateofissue"
                          value-type="format"
                          v-mask="'##.##.####'"
                          format="DD.MM.YYYY"
                          :placeholder="$t('dateofissue')"
                        ></date-picker>
                        <!-- <flat-pickr
                          v-model="tabrow2.dateofissue"
                          class="form-control"
                          :placeholder="$t('dateofissue')"
                          :config="config"
                        /> -->
                      </div>
                    </div>
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for>{{
                        $t("dateofexpire")
                      }}</label>
                      <div class="col-sm-7">
                        <date-picker
                          style="width: 100%"
                          v-model="tabrow2.dateofexpire"
                          value-type="format"
                          v-mask="'##.##.####'"
                          format="DD.MM.YYYY"
                          :placeholder="$t('dateofexpire')"
                        ></date-picker>
                        <!-- <flat-pickr
                          v-model="tabrow2.dateofexpire"
                          class="form-control"
                          :placeholder="$t('dateofexpire')"
                          :config="config"
                        /> -->
                      </div>
                    </div>
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for>{{
                        $t("issueorganization")
                      }}</label>
                      <div class="col-sm-7">
                        <b-form-input
                          :placeholder="$t('issueorganization')"
                          v-model="tabrow2.issueorganization"
                        />
                      </div>
                    </div>
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for>{{
                        $t("nationality")
                      }}</label>
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
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for>{{
                        $t("citizenship")
                      }}</label>
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
                <!-- <div class="form-group form-row"> -->
                <b-row>
                  <b-col>
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for>{{
                        $t("ondate")
                      }}</label>
                      <div class="col-sm-7">
                        <date-picker
                          style="width: 100%"
                          v-model="tabrow3.ondate"
                          value-type="format"
                          v-mask="'##.##.####'"
                          format="DD.MM.YYYY"
                          :placeholder="$t('dateofbirth')"
                        ></date-picker>
                        <!-- <flat-pickr
                          v-model="tabrow2.ondate"
                          class="form-control"
                          :placeholder="$t('ondate')"
                          :config="config"
                        /> -->
                      </div>
                    </div>
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for>{{
                        $t("country")
                      }}</label>
                      <div class="col-sm-7">
                        <v-select
                          :options="countryList"
                          :reduce="(item) => item.id"
                          :placeholder="$t('ChooseBelow')"
                          label="name"
                          v-model="tabrow3.countryid"
                        ></v-select>
                      </div>
                    </div>
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-5" for>{{
                        $t("oblast")
                      }}</label>
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
                      <label class="col-form-label col-sm-5" for>{{
                        $t("region")
                      }}</label>
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
                      <label class="col-form-label col-sm-5" for>{{
                        $t("mfy")
                      }}</label>
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
                          v-model="tabrow3.stateid"
                        ></v-select>
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
        </b-card>
      </b-col>
    </b-row>

    <b-row class="mt-1">
      <b-col>
        <b-card class="w-100">
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
    </b-row>
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
  },
  directives: {
    "b-tooltip": VBTooltip,
    "b-modal": VBModal,
  },
  data() {
    return {
      show: false,
      Person: {},
      DocumentSeriesList: [],
      SchoolYearList: [],
      nationalitylist: [],
      nationalityid: 0,
      citizenshipid: 0,
      birthcountryid: 211,
      birthoblastid: 0,
      birthregionid: 0,
      birthmfyid: 0,
      CountryList: [],
      countryList: [],
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
      birthoblastlist: [],
      birthregionlist: [],
      birthmfylist: [],
      identitydocumentlist: [],
      statelist: [],
      isstudent: true,
      canSave: true,
      SchoolUniformDesignTypeList: {},
      GenderList: [],
      lang: localStorage.getItem("locale") || "ru",
      fieldsPlace: [
        {
          key: "ondate",
          label: this.$t("ondate"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "countryname",
          label: this.$t("countryname"),
          thClass: "text-center",
          sortable: true,
        },
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
          key: "statename",
          label: this.$t("statename"),
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
          key: "ondate",
          label: this.$t("ondate"),
          thClass: "text-center",
          sortable: true,
        },
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
          key: "address",
          label: this.$t("address"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "phonenumber",
          label: this.$t("phonenumber"),
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
          key: "actions",
          label: this.$t("actions"),
          thClass: "text-center",
          sortable: true,
        },
      ],
      fields: [
        {
          key: "ondate",
          label: this.$t("ondate"),
          thClass: "text-center",
          sortable: true,
        },
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
      SchoolSubjectList: [],
      PersonList: [],
      OrgSchoolGradeList: [],
      StatusList: [],
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
        Status: 0,
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
      identityDocumentList: [],
      SearchLoading: false,
    };
  },
  props: {
    iscomponent: {
      type: Boolean,
      default: false,
    },
    model: {
      prop: "personData",
      event: "persondatachange",
    },
  },
  computed: {
    person: {
      get: function () {
        return this.personData ? this.personData : this.tabrow3;
      },
      set: function (value) {
        this.tabrow3 = value;
        this.$emit("persondatachange", value);
        this.tabrow2.countryid = 211;
      },
    },
  },
  created() {
    this.lang = localStorage.getItem("locale") || "ru";
    this.show = true;
    PersonService.Get(this.$route.params.id)
      .then((res) => {
        this.show = false;
        this.Person = res.data;
        RegionService.GetAll(this.lang, this.Person.birthoblastid).then(
          (resp) => {
            this.birthregionlist = resp.data;
          }
        );
        this.ChangeRegion();
      })
      .catch((error) => {
        this.$makeToast(error.response.data.error, "danger");
      });
    IdentityDocumentService.GetAll(this.lang, true).then((res) => {
      this.identityDocumentList = res.data.result;
    });
    HelperService.GetAllIdentityDocSeries(1).then((res) => {
      this.DocumentSeriesList = res.data;
    });
    OblastService.GetAll(this.lang).then((res) => {
      this.birthoblastlist = res.data;
      this.OblastList = res.data;
    });
    HelperService.GetGenderList().then((res) => {
      this.GenderList = res.data;
    });
    CountryService.GetAll(this.lang).then((res) => {
      this.CountryList = res.data;
      this.countryList = res.data;
    });
    KinshipDegreeService.GetAll(this.lang).then((res) => {
      this.KinshipdegreeList = res.data;
    });
    NationalityService.GetAll(this.lang).then((res) => {
      this.nationalitylist = res.data;
    });
    HelperService.GetAllIdentityDocument().then((res) => {
      this.identitydocumentlist = res.data;
    });
    HelperService.GetStateList().then((res) => {
      this.statelist = res.data;
    });
    HelperService.GetStateList().then((res) => {
      this.StateList = res.data;
    });
  },
  directives: {
    Ripple,
  },
  methods: {
    getpersondata() {
      this.SearchLoading = true;
      PersonService.GetFromGovData(
        this.filter.documentSeries,
        this.filter.documentNumber,
        this.filter.pinfl,
        this.filter.dateOfBirth,
        this.filter.isStudent,
        this.filter.INN,
        this.filter.identityDocumentId
      )
        .then((res) => {
          this.SearchLoading = false;
          this.Person = res.data;
        })
        .catch((error) => {
          this.SearchLoading = false;
          this.$makeToast(error.response.data.error, "danger");
        });
    },
    BindValue(value) {
      this.filter.dateOfBirth = value;
    },
    rowClass(item, type) {
      if (item.Status === 3) return "d-none";
    },
    ChangeOblast() {
      this.Person.birthregionid = 0;
      if (!!this.Person.birthoblastid) {
        RegionService.GetAll(this.lang, this.Person.birthoblastid).then(
          (res) => {
            this.birthregionlist = res.data;
          }
        );
      }
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
      //   this.tabrow2.birthregionid = 0;
      //   if (!!this.tabrow2.birthoblastid) {
      RegionService.GetAll(this.lang, this.tabrow3.oblastid).then((res) => {
        this.RegionList = res.data;
      });
      //   }
    },
    ChangeRegionTable() {
      //   if (!!this.tabrow2.birthregionid) {
      MfyService.GetAll(this.lang, this.tabrow2.regionid).then((res) => {
        this.birthmfylist = res.data;
      });
      //   }
    },
    ChangeRegionListTable() {
      //   if (!!this.tabrow2.birthregionid) {
      MfyService.GetAll(this.lang, this.tabrow3.regionid).then((res) => {
        this.MfyList = res.data;
      });
      //   }
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
        Status: 0,
      };
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
      this.ModalShowPlace = true;
    },
    DeleteRow(item) {
      item.Status = 3;
    },
    check() {
      //   if (
      //     this.Person.docnumber === 0 ||
      //     this.Person.docnumber === null ||
      //     this.Person.docnumber === undefined ||
      //     this.Person.docnumber === ""
      //   ) {
      //     this.$makeToast(this.$t("docnumberNotSelected"), "danger");
      //     return false;
      //   }
      //   if (
      //     this.Person.schoolyearid === 0 ||
      //     this.Person.schoolyearid === null ||
      //     this.Person.schoolyearid === undefined ||
      //     this.Person.schoolyearid === ""
      //   ) {
      //     this.$makeToast(this.$t("schoolyearNotSelected"), "danger");
      //     return false;
      //   }
      //   if (
      //     this.Person.docdate === 0 ||
      //     this.Person.docdate === null ||
      //     this.Person.docdate === undefined ||
      //     this.Person.docdate === ""
      //   ) {
      //     this.$makeToast(this.$t("docdateNotSelected"), "danger");
      //     return false;
      //   }
      //   if (
      //     this.Person.admissiontypeid === 0 ||
      //     this.Person.admissiontypeid === null ||
      //     this.Person.admissiontypeid === undefined ||
      //     this.Person.admissiontypeid === ""
      //   ) {
      //     this.$makeToast(this.$t("admissiontypeNotSelected"), "danger");
      //     return false;
      //   }
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
      this.tabrow.identitydocumentname = this.identitydocumentlist.filter(
        (item) => this.tabrow.identitydocumentid === item.id
      )[0].name;
      this.tabrow.statename = this.statelist.filter(
        (item) => this.tabrow.stateid === item.id
      )[0].name;

      //   this.tabrow.schooluniformdesigntypename =
      //     this.SchoolUniformDesignTypeList.filter(
      //       (item) => this.tabrow.schooluniformdesigntypeid === item.id
      //     )[0].name;
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
    AddRowRelative() {
      this.tabrow2.kinshipdegreename = this.KinshipdegreeList.filter(
        (item) => this.tabrow2.kinshipdegreeid === item.id
      )[0].name;
      this.tabrow2.countryname = this.CountryList.filter(
        (item) => this.tabrow2.countryid === item.id
      )[0].name;
      this.tabrow2.identitydocumentname = this.identitydocumentlist.filter(
        (item) => this.tabrow2.identitydocumentid === item.id
      )[0].name;
      this.tabrow2.oblastname = this.birthoblastlist.filter(
        (item) => this.tabrow2.oblastid === item.id
      )[0].name;
      this.tabrow2.regionname = this.birthregionlist.filter(
        (item) => this.tabrow2.regionid === item.id
      )[0].name;
      this.tabrow2.mfyname = this.birthmfylist.filter(
        (item) => this.tabrow2.mfyid === item.id
      )[0].name;
      this.tabrow2.nationalityname = this.nationalitylist.filter(
        (item) => this.tabrow2.nationalityid === item.id
      )[0].name;
      this.tabrow2.citizenshipname = this.CountryList.filter(
        (item) => this.tabrow2.citizenshipid === item.id
      )[0].name;
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
    },
    AddRowPlace() {
      this.tabrow3.countryname = this.countryList.filter(
        (item) => this.tabrow3.countryid === item.id
      )[0].name;
      this.tabrow3.oblastname = this.OblastList.filter(
        (item) => this.tabrow3.oblastid === item.id
      )[0].name;
      this.tabrow3.regionname = this.RegionList.filter(
        (item) => this.tabrow3.regionid === item.id
      )[0].name;
      this.tabrow3.mfyname = this.MfyList.filter(
        (item) => this.tabrow3.mfyid === item.id
      )[0].name;
      this.tabrow3.statename = this.StateList.filter(
        (item) => this.tabrow3.stateid === item.id
      )[0].name;
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
            this.$router.push({ name: "person" });
          }
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
