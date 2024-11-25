import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Atividade {
  id?: number;
  descricao: string;
  dataEntrega: string;
  nota: number;
  materia: string;
}

interface ApiResponse {
  status: string;
  message?: string;
  data?: any;
  id?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AtividadeService {
  // URL da API no MySQL Workbench
  private apiUrl = 'http://localhost/ClassConect2.0/src/app/db.php';

  constructor(private http: HttpClient) {}

  // Criar atividade
  addAtividade(atividade: Atividade): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.apiUrl, atividade);
  }

  // Listar todas as atividades
  getAtividades(): Observable<Atividade[]> {
    return this.http.get<ApiResponse>(this.apiUrl).pipe(
      map(response => {
        if (response.status === 'success' && response.data) {
          return response.data as Atividade[];
        }
        return [];
      })
    );
  }

  // Atualizar atividade
  updateAtividade(atividade: Atividade): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.apiUrl, atividade);
  }

  // Excluir atividade
  deleteAtividade(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}?id=${id}`);
  }

  // Obter atividades recentes
  getAtividadesRecentes(): Observable<Atividade[]> {
    return this.getAtividades().pipe(
      map(atividades => {
        return atividades
          .sort((a, b) => new Date(a.dataEntrega).getTime() - new Date(b.dataEntrega).getTime())
          .slice(0, 3);
      })
    );
  }

  // Método para contar atividades
  getContagemAtividades(): Observable<number> {
    return this.getAtividades().pipe(
      map(atividades => atividades.length)
    );
  }

  // Método para contar matérias diferentes
  getContagemMaterias(): Observable<number> {
    return this.getAtividades().pipe(
      map(atividades => {
        const materias = new Set(atividades.map(atividade => atividade.materia));
        return materias.size;
      })
    );
  }
}
