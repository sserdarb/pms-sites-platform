import type { Locale } from '@pms/tenant-config';
import type { BookingI18n } from './types.js';

const dict: Record<Locale, BookingI18n> = {
  tr: {
    search: 'Müsaitlik Ara',
    checkIn: 'Giriş',
    checkOut: 'Çıkış',
    guests: 'Misafir',
    adults: 'Yetişkin',
    children: 'Çocuk',
    rooms: 'Oda',
    addRoom: 'Oda Ekle',
    removeRoom: 'Odayı Kaldır',
  },
  en: {
    search: 'Search',
    checkIn: 'Check-in',
    checkOut: 'Check-out',
    guests: 'Guests',
    adults: 'Adults',
    children: 'Children',
    rooms: 'Rooms',
    addRoom: 'Add room',
    removeRoom: 'Remove room',
  },
  de: {
    search: 'Suchen',
    checkIn: 'Anreise',
    checkOut: 'Abreise',
    guests: 'Gäste',
    adults: 'Erwachsene',
    children: 'Kinder',
    rooms: 'Zimmer',
    addRoom: 'Zimmer hinzufügen',
    removeRoom: 'Zimmer entfernen',
  },
  ru: {
    search: 'Поиск',
    checkIn: 'Заезд',
    checkOut: 'Выезд',
    guests: 'Гости',
    adults: 'Взрослые',
    children: 'Дети',
    rooms: 'Номера',
    addRoom: 'Добавить номер',
    removeRoom: 'Удалить номер',
  },
  ar: {
    search: 'بحث',
    checkIn: 'الوصول',
    checkOut: 'المغادرة',
    guests: 'الضيوف',
    adults: 'بالغون',
    children: 'أطفال',
    rooms: 'غرف',
    addRoom: 'إضافة غرفة',
    removeRoom: 'إزالة الغرفة',
  },
  fr: {
    search: 'Rechercher',
    checkIn: 'Arrivée',
    checkOut: 'Départ',
    guests: 'Invités',
    adults: 'Adultes',
    children: 'Enfants',
    rooms: 'Chambres',
    addRoom: 'Ajouter une chambre',
    removeRoom: 'Retirer la chambre',
  },
  el: {
    search: 'Αναζήτηση',
    checkIn: 'Άφιξη',
    checkOut: 'Αναχώρηση',
    guests: 'Επισκέπτες',
    adults: 'Ενήλικες',
    children: 'Παιδιά',
    rooms: 'Δωμάτια',
    addRoom: 'Προσθήκη δωματίου',
    removeRoom: 'Αφαίρεση δωματίου',
  },
};

const fallback: BookingI18n = dict.en;

export function getBookingI18n(locale: Locale): BookingI18n {
  return dict[locale] ?? fallback;
}
