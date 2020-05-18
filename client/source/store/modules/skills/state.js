import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  skills: [
    {
      id: '0', // номер
      icon: 1, // номер иконки
      changeTurn: false, // смена хода
      cooldown: 0, // время перезарядки
      description: 'description null', // описание
      author: 'null', // автор умения
      duration: 0, // длительность действия
      limitCopy: 0, // максимальное количество повторений в наборе умний
      minLevel: 0, // минимальный уровень необходимый для покупки
      priceInGold: 0, // цена в золоте
      points: 0, // очки (стоимость добавления в набор)
      title: 'stub skill', // заголовок
      triggeringEvent: 'null', // событие срабатывания
      resources: { // необходимые ресурсы для использования
        energy_1: 0, // энергия_1
        energy_2: 0, // энергия_2
        energy_3: 0, // энергия_3
      },
      modifiers: { // модификаторы
      },
    },
  ],
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
