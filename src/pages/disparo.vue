<script setup lang="ts">

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import RegistrosDisparo from "@/components/email-disparo/RegistrosDisparo.vue";
import AppSidebar from "@/components/AppSidebar.vue";

</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>      
      <RegistrosDisparo />      
    </SidebarInset>

  </SidebarProvider>



</template>
