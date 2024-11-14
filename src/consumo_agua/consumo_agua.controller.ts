import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { ConsumoAguaService } from './consumo_agua.service';
import { ConsumoAgua } from './consumo_agua.model';

@Controller('consumo_agua')
export class ConsumoAguaController {
  constructor(private readonly consumoAguaService: ConsumoAguaService) {}

  @Post('registrar')
  async registrarConsumo(@Body() consumoData: ConsumoAgua) {
    return this.consumoAguaService.registrarConsumo(consumoData);
  }

  @Get('historico')
  async consultarHistorico(@Query('inicio') inicio: string, @Query('fim') fim: string) {
    return this.consumoAguaService.consultarHistorico(new Date(inicio), new Date(fim));
  }

  @Get('alerta')
  async verificarAlerta(@Query('id_usuario') idUsuario: string) {
    return this.consumoAguaService.verificarAlerta(idUsuario);
  }
}
