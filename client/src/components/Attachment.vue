<script setup>
import axios from 'axios';
import { socket } from '../composables/socket';
import axiosInstance from '../composables/axios';

const props = defineProps({
  src: String,
  cardId: String,
  listId: String
})

const emit = defineEmits(["updateCard"])


const encodedURL = props.src.replace("https://", "http://").replace(/[ +#]/g, (match) => {
  return '%' + match.charCodeAt(0).toString(16).toUpperCase();
});

const fullDateOptions = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
const filename = props.src.slice(96);
const filedate = new Date(Date(props.src.slice(41))).toLocaleString("en-GB", fullDateOptions)

const deleteAttachment = () => {
  axiosInstance.put(`/card/deleteAttachment/${props.cardId}`, {
    attachmentToDelete: props.src
  }, {
    withCredentials: true
  }).then((res) => {
    emit("updateCard", res.data);
    socket.emit("update-card", props.cardId);
    socket.emit("update-cards", props.cardId, [props.listId])
  }).catch((err) => {
    console.log(err);
  })
}
const downloadFile = async (uri) => {
  try {
    const fileUri = uri; // Replace 'YOUR_FILE_URI' with the actual URI of the file in your Google Cloud Storage bucket
    const response = await axiosInstance(fileUri, {
      // headers: {
      //   'Access-Control-Allow-Credentials': true
      // }
    });
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = 'filename'; // Optionally set the downloaded file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error downloading file:', error);
  }
}
</script>
<template>
  <v-row>
    <v-col cols="4">
      <v-img :src rounded="lg">
      </v-img>
      <div v-if="src.slice(-3) === 'pdf'" class="h-24">
        <a :href="`${encodedURL}`" :download="filename">
          <v-avatar color="primary" rounded="lg" size="100%" class="w-full bg-red">
            PDF
          </v-avatar>
        </a>
      </div>
    </v-col>
    <v-col cols="8">
      <p class="font-bold">
        {{ filename }}
      </p>
      <p class="text-xs">
        at {{ filedate }}
      </p>
      <div class="flex gap-1 justify-start items-center">
        <p class="text-xs cursor-pointer underline">
          <!-- <a :href="`${encodedURL}`" rel="external" target="_blank"> -->
          <!--   View -->
          <!-- </a> -->
        </p>
        <p class="text-xs underline cursor-pointer">
        <div @click="() => downloadFile(encodedURL)" :download="filename">
          Download
        </div>
        </p>
        <p class="text-xs underline cursor-pointer" @click="deleteAttachment">
          Delete
        </p>
      </div>
    </v-col>
  </v-row>
</template>
