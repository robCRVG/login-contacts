export interface GetAllContactResponse {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  dataCadastro: string;
  foto: { url: string };
}
