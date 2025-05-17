<template>
    <Dialog :open="props.aberto" @update:open="(val) => emit('update:aberto', val)">
        <DialogScrollContent class="max-w-[700px]">
            <DialogHeader>
                <DialogTitle>Crie seu novo disparo</DialogTitle>
            </DialogHeader>

            <form @submit.prevent="submeter">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <Label for="titulo">Título</Label>
                        <Input id="titulo" v-model="form.titulo" placeholder="Preencha o título do email" required />
                    </div>

                    <div>
                        <Label for="remetente">E-mail do remetente</Label>
                        <Input id="remetente" v-model="form.remetente" placeholder="remetente@mail.com" required />
                    </div>
                </div>

                <div class="mb-4">
                    <Label for="destinatario">E-mails dos destinatários</Label>
                    <Textarea id="destinatario" rows="2"
                        placeholder="Insira os e-mails separados por vírgula ex: example@org.br,example2@teste.com"
                        v-model="form.destinatario" required />
                </div>

                <div class="mb-4">
                    <Label for="conteudo">Conteúdo do e-mail</Label>
                    <Editor id="conteudo" v-model="form.corpo" :init="{
                        height: 300,
                        menubar: false,
                        plugins: 'lists link image code',
                        toolbar: 'undo redo | styleselect | bold italic underline | bullist numlist | link image | code',
                        branding: false
                    }" />
                </div>

                <DialogFooter class="mt-4">                    
                    <Button variant="ghost" type="button" @click="$emit('fechar')">Cancelar</Button>                    
                    <Button type="submit" :disabled="props.carregando">
                        <template v-if="props.carregando">
                            <Loader class="w-4 h-4 animate-spin mr-2" />
                            Enviando...
                        </template>
                        <template v-else>
                            Criar agora
                        </template>
                    </Button>
                </DialogFooter>
            </form>
        </DialogScrollContent>
    </Dialog>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { Dialog, DialogScrollContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import Editor from '@tinymce/tinymce-vue'
import { Loader } from 'lucide-vue-next'

const props = defineProps<{ aberto: boolean, carregando: boolean }>()
const emit = defineEmits(['update:aberto', 'salvar'])

const form = reactive({
    titulo: '',
    remetente: '',
    destinatario: '',
    corpo: ''
})

watch(() => props.aberto, (open) => {
    if (!open) resetar()
})

function resetar() {
    form.titulo = ''
    form.remetente = ''
    form.destinatario = ''
    form.corpo = ''
}

function submeter() {
    emit('salvar', { ...form })
}
</script>