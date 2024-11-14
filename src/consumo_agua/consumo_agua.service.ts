import { Injectable } from '@nestjs/common';
import { ConsumoAgua } from './consumo_agua.model';

@Injectable()
export class ConsumoAguaService {
  private consumos: ConsumoAgua[] = [];

  registrarConsumo(consumoData: ConsumoAgua) {
    this.consumos.push(consumoData);
    return { message: 'Consumo registrado com sucesso!' };
  }

  consultarHistorico(inicio: Date, fim: Date) {
    return this.consumos.filter(consumo =>
      consumo.data_leitura >= inicio && consumo.data_leitura <= fim
    );
  }

  verificarAlerta(idUsuario: string) {
    const consumosUsuario = this.consumos.filter(consumo => consumo.id_usuario === idUsuario);
    if (consumosUsuario.length < 2) return { message: 'Dados insuficientes para alerta.' };

    const [ultimo, penultimo] = consumosUsuario.slice(-2);
    if (ultimo.quantidade_consumida > penultimo.quantidade_consumida) {
      return { alerta: 'Consumo elevado detectado!', ultimoConsumo: ultimo, penultimoConsumo: penultimo };
    }
    return { message: 'Consumo dentro do esperado.' };
  }
}
