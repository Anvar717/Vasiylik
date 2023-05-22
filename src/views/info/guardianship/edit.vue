<template>
  <div>
    <edit-person-component
      :is-student="false"
    >
    </edit-person-component>
  </div>
</template>

<script>
import editPersonComponent from "../../info/person/edit.vue";
export default {
  components : {editPersonComponent}
}
</script>

<style>

</style>