import { SCREENS } from '../../constants/screens';

const removeAccents = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const includesAny = (value, terms) => terms.some((term) => value.includes(term));

export class VoiceCommandService {
  normalize(text = '') {
    return removeAccents(String(text).toLowerCase().trim());
  }

  parse(text = '') {
    const value = this.normalize(text);

    if (!value) return null;

    if (includesAny(value, ['inicio', 'home', 'principal', 'volver'])) {
      return { type: 'navigate', screen: SCREENS.HOME, announcement: 'Abriendo inicio' };
    }

    if (includesAny(value, ['escribir', 'pegar', 'texto manual'])) {
      return { type: 'navigate', screen: SCREENS.WRITE, announcement: 'Abriendo escritura de texto' };
    }

    if (includesAny(value, ['documento', 'archivo', 'cargar', 'informacion'])) {
      return { type: 'navigate', screen: SCREENS.UPLOAD, announcement: 'Abriendo carga de documentos' };
    }

    if (includesAny(value, ['imagen', 'foto', 'camara', 'ocr'])) {
      return { type: 'navigate', screen: SCREENS.IMAGE_READER, announcement: 'Abriendo lectura de imagen' };
    }

    if (includesAny(value, ['escuchar', 'leer', 'reproducir', 'hablar'])) {
      return { type: 'play' };
    }

    if (includesAny(value, ['detener', 'parar', 'silencio', 'cancelar lectura'])) {
      return { type: 'stop' };
    }

    if (includesAny(value, ['configuracion', 'ajustes'])) {
      return { type: 'navigate', screen: SCREENS.SETTINGS, announcement: 'Abriendo configuración' };
    }

    if (includesAny(value, ['ayuda', 'tecnica', 'solid', 'arquitectura'])) {
      return { type: 'navigate', screen: SCREENS.ABOUT, announcement: 'Abriendo información técnica' };
    }

    if (includesAny(value, ['simple', 'simplificado', 'modo simple'])) {
      return { type: 'toggleSimpleMode' };
    }

    if (includesAny(value, ['aumentar letra', 'letra grande', 'mas grande', 'agrandar'])) {
      return { type: 'increaseText' };
    }

    if (includesAny(value, ['disminuir letra', 'letra pequena', 'mas pequena', 'reducir letra'])) {
      return { type: 'decreaseText' };
    }

    if (includesAny(value, ['contraste', 'alto contraste'])) {
      return { type: 'contrast' };
    }

    return null;
  }
}
