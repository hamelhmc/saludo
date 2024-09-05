export interface Origen {
  productor: string;
  web: string;
  enlace: string;
  language: string;
  copyright: string;
  notaLegal: string;
}

export interface Precipitacion {
  value: number | string;
  periodo: string;
}

export interface CotaNieveProv {
  value: string;
  periodo: string;
}

export interface EstadoCielo {
  value: string;
  periodo: string;
  descripcion: string;
}

export interface Viento {
  direccion: string;
  velocidad: number;
  periodo: string;
}

export interface RachaMax {
  value: string;
  periodo: string;
}

export interface Dato {
  value: number;
  hora: number;
}

export interface Temperatura {
  maxima: number;
  minima: number;
  dato: Dato[];
}

export interface SensTermica {
  maxima: number;
  minima: number;
  dato: Dato[];
}

export interface HumedadRelativa {
  maxima: number;
  minima: number;
  dato: Dato[];
}

export interface Dia {
  probPrecipitacion: Precipitacion[];
  cotaNieveProv: CotaNieveProv[];
  estadoCielo: EstadoCielo[];
  viento: Viento[];
  rachaMax: RachaMax[];
  temperatura: Temperatura;
  sensTermica: SensTermica;
  humedadRelativa: HumedadRelativa;
  uvMax: number;
  fecha: string;
}

export interface Prediccion {
  dia: Dia[];
}

export interface WeatherData {
  origen: Origen;
  elaborado: string;
  nombre: string;
  provincia: string;
  prediccion: Prediccion;
  id: number;
  version: number;
}

export interface InitialApiResponse {
  estado: number;
  datos: string;
}