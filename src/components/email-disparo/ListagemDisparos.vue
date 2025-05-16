<script setup lang="ts">
import { MoreVertical, MapPin, Bell, Check } from 'lucide-vue-next'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import VIcon from '@/components/VIcon.vue'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

defineProps<{
  listagem: any[]
}>()
defineEmits(['editar', 'excluir', 'abrir-enderecos'])
</script>

<template>
  <div class="p-4 max-w-screen-xl mx-auto">
    <div class="grid gap-4 md:grid-cols-3">
      <Card v-for="(destinatario, index) in listagem" :key="index" class="rounded-md">
        <CardHeader class="text-left border-b py-4 mb-3 text-gray-700">
          <CardTitle class="truncate">{{ destinatario.disparo.titulo }}</CardTitle>
        </CardHeader>

        <CardContent class="space-y-2">
          <div>
            <p class="text-sm text-left text-gray-700">
              Remetente
            </p>
            <p class="text-sm text-left text-gray-400">
              {{ destinatario.disparo.remetente }}
            </p>
          </div>
          <div>
            <p class="text-sm text-left text-gray-700">
              Destinatário
            </p>
            <p class="text-sm text-left text-gray-400">
              {{ destinatario.email }}
            </p>
          </div>

          <div>
            <p class="text-sm text-left text-gray-700">
              Status
            </p>
            <p class="text-sm text-left ">
              <span class="flex items-center gap-1" :class="destinatario.cor_status">
                {{ destinatario.situacao_amigavel }}
                <VIcon :icon="destinatario.icone_status"/>
              </span>
            </p>
          </div>
          <div>
            <p class="text-sm text-left text-gray-700">
              Modificado em
            </p>
            <p class="text-sm text-left text-gray-400">
              {{ destinatario.updated_at }}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
