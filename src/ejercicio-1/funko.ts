export enum Tipo {
  POP = "Pop!",
  POP_RIDES = "Pop! Rides",
  VYNIL_SODA = "Vynil Soda",
  VYNIL_GOLD = "Vynil Gold"
}

export enum Genero {
  ANIMACION = "Animación",
  PELICULAS_TV = "Peliculas y TV",
  VIDEOJUEGOS = "Videojuegos",
  DEPORTES = "Deportes",
  MUSICA = "Musica",
  ANIME = "Anime"
}

export class Funko {
  accessor id: number; 
  accessor nombre: string;
  accessor descripcion: string;
  accessor tipo: Tipo
  accessor genero: Genero
  accessor franquicia: string
  accessor numero: number
  accessor exclusivo: boolean
  accessor valor: number

  constructor(
    id: number,
    nombre: string,
    descripcion: string,
    tipo: Tipo,
    genero: Genero,
    franquicia: string,
    numero: number,
    exclusivo: boolean,
    valor: number
  ) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.tipo = tipo;
    this.genero = genero;
    this.franquicia = franquicia;
    this.numero = numero;
    this.exclusivo = exclusivo;
    this.valor = valor;
  }

  toJSON() {
    return {
      id: this.id,
      nombre: this.nombre,
      descripcion: this.descripcion,
      tipo: this.tipo,
      genero: this.genero,
      franquicia: this.franquicia,
      numero: this.numero,
      exclusivo: this.exclusivo,
      valor: this.valor
    };
  }
}
