<script setup lang="ts">
import { onMounted } from 'vue'
import { emailDisparoServico, botaoExportacao } from '@/services/EmailDisparoServico.ts'
import { Button } from '@/components/ui/button'
import { RefreshCcw, UserPlus, Download } from 'lucide-vue-next'
import { ref } from 'vue'
import { watch } from 'vue'
import api from '@/lib/axios'
import { useToast } from '@/components/ui/toast/use-toast'
import ModalCriarDisparo from '@/components/email-disparo/ModalCriarDisparo.vue'
import ListagemDisparos from '@/components/email-disparo/ListagemDisparos.vue'
import ModalDisparoEnviado from '@/components/email-disparo/ModalDisparoEnviado.vue'


const { toast } = useToast()

const store = emailDisparoServico()
const modalDisparo = ref(false);
const modalDisparoFinalizado = ref(true);
const carregando = ref(false)

onMounted(() => {
  store.carregarEmails()
});
const emailDisparo = ref({
  nome: '',
  remetente: '',
  titulo: '',
  corpo: '',
  destinatario: ''
})

const exportacaoExcel = async () => {
  try {
    botaoExportacao("EmailDisparo");
  } catch (error) {
    console.error("Erro ao exportar para Excel:", error);
  }
};
async function criarDisparoEmail(disparo: {
  titulo: string
  remetente: string
  destinatarios: string
  corpo: string
}) {
  try {
    carregando.value = true
    await store.adicionarDisparo(disparo)

    if (store.erro || store.errors) {
      if (store.erro) {
        toast({
          description: store.erro,
          variant: 'destructive'
        })
      }
      if (store.errors) {
        store.errors.forEach((error: string) => {
          toast({
            description: error,
            variant: 'destructive'
          })
        })
      }
      return false
    }
    toast({
      title: 'Sucesso',
      description: 'Disparo adicionado com sucesso!'
    })
    
    modalDisparo.value = false;
    modalDisparoFinalizado.value = true;
 
    resetarFormulario()
  } catch (e) {
    console.error('Erro ao salvar disparo', e)
  }finally {
    carregando.value = false
  }
}

function resetarFormulario() {
  emailDisparo.value = {
    nome: '',
    remetente: '',
    titulo: '',
    corpo: '',
    destinatario: ''
  }
}
</script>
<template>
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-3xl font-bold text-gray-800 relative z-10">
      <span class="absolute left-3 top-1/2 -translate-y-1/4 w-5 h-5 bg-zinc-200 rounded-md -ml-6"></span>
      <span class="relative z-10">Disparos</span>
    </h1>
    <div class="">
      <Button class="bg-zinc-800 text-white hover:bg-zinc-700" @click="modalDisparo = true">
        Criar novo disparo
      </Button>
      <Button variant="outline" class="ml-1 " @click="exportacaoExcel">
        <Download class="w-3 h-3" />
        Exportar
      </Button>
    </div>
  </div>
  <div class="p-6 max-w-5xl mx-auto">
    <div v-if="store.carregando" class="text-gray-500">Carregando...</div>
    <div v-if="store.erro" class="text-red-500">Erro: {{ store.erro }}</div>
    <ListagemDisparos v-if="!store.carregando" :listagem="store.emailDisparos" />
    <div v-else-if="!store.carregando && !store.emailDisparos.length" class="text-gray-500">
      Nenhum e-mail encontrado.
    </div>
  </div>

  <ModalCriarDisparo :aberto="modalDisparo" :carregando="carregando" @salvar="criarDisparoEmail" @fechar="modalDisparo = false" />
  <ModalDisparoEnviado :aberto="modalDisparoFinalizado" @fechar="modalDisparoFinalizado = false" />
</template>