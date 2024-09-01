<script setup>
const props = defineProps({
  date: String | Date | Object,
  includeTime: Boolean,
});

const dateHourOptions = {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};

const dateOptions = {
  year: "numeric",
  month: "short",
  day: "numeric",
};
</script>
<template>
  <p>
    {{
      new Date(date)?.toLocaleString(
        "en-GB",
        includeTime ? dateHourOptions : dateOptions
      )
    }}
  </p>
</template>
