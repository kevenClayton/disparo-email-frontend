<template>
    <Dialog :open="props.aberto" @update:open="(val) => emit('update:aberto', val)">
        <DialogContent class="max-w-sm text-center">         

            <div class="flex flex-col items-left place-items-start space-y-4 pb-6 text-left">
                <Send class="w-10 h-10 text-zinc-600" />
                <h2 class="text-xl font-semibold">Parabéns seu envio<br />foi agendado</h2>
                <p class="text-sm text-muted-foreground">
                    Acompanhe as atualizações do seu envio na<br />listagem de disparos
                </p>

                <Button variant="outline" class="mt-2" @click="$emit('fechar')">Entendido</Button>
            </div>
        </DialogContent>
    </Dialog>
</template>

<script setup lang="ts">
import { X, Send } from 'lucide-vue-next'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
const props = defineProps<{ aberto: boolean }>()
const emit = defineEmits(['update:aberto', 'fechar'])
</script>