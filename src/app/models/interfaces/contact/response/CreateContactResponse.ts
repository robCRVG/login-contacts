export interface CreateContactResponse {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  dataCadastro: string;
  foto: { url: string };
}
