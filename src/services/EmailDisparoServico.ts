import api from '@/lib/axios'
import { defineStore } from 'pinia'

export interface EmailDisparo {
  codigo: number
  nome: string
  remetente: string
  titulo: string
  corpo: string
  destinatarios: DestinatariosEmailDisparo[]
}
export interface DestinatariosEmailDisparo {
  codigo_disparo: number
  email: string
  situacao: string
  enviado_em: string 
}


export const emailDisparoServico = defineStore('emailDisparo', {
  state: () => ({
    emailDisparos: [] as EmailDisparo[],
    carregando: false,
    erro: null as string | null,
    errors: null as [] | null,
  }),

  actions: {   
    async carregarEmails() {
      this.carregando = true
      this.erro = null
      try {
        const response = await api.get<EmailDisparo[]>('/email-disparo')
        this.emailDisparos.splice(0, this.emailDisparos.length, ...response.data)       
      } catch (err: any) {
        this.erro = err.message || 'Erro ao buscar.'
      } finally {
        this.carregando = false
      }
    },

    async adicionarDisparo(emailDisparo: Omit<EmailDisparo, 'id'>) {
      try {
        const response = await api.post<EmailDisparo>('/email-disparo', emailDisparo)
        this.erro = null
        this.errors = null
        setTimeout(() => this.carregarEmails(), 500)
      } catch (err: any) {
        this.erro = err.response?.data?.message || 'Erro ao adicionar.'
        this.errors = err.response?.data?.errors || []
      }
    },

    reset() {
      this.emailDisparos = []     
      this.carregando = false
      this.erro = null
    }
  },
})

export const exportacaoService = {
  exportarExcel: (data: any) => {
    return api.get<{ data: any }>(
      `/exportacao/excel?tipoExportacao=${data}`,
      { responseType: 'blob' }
    );
  }
}


export const botaoExportacao = async (tipoExportacao: any) => {
  try {
    const response = await exportacaoService.exportarExcel(tipoExportacao);

    // Cria um URL para o Blob de dados da resposta
    const url = window.URL.createObjectURL(new Blob([response.data]));

    // Cria um elemento <a> para download
    const link = document.createElement("a");
    link.href = url;
    const dataHoraAtualFormatadaArquivo = new Date().toLocaleString().replace(/[^0-9]/g, "");
    const nomeArquivo = tipoExportacao+"_"+dataHoraAtualFormatadaArquivo+".xlsx";
    link.setAttribute("download", nomeArquivo);

    // Adiciona o link ao corpo do documento e dispara o clique
    document.body.appendChild(link);
    link.click();

    // Remove o link após o download ser iniciado
    link.remove();
  } catch (error) {
    console.error("Erro ao exportar para Excel:", error);
  }
};