export const REPOS = {
    TITLE: "Репозитории:",
    SEARCH_PLACEHOLDER: "Поиск Репозиториев",
    ITEMS_PER_PAGE: 20,
    SORT_BUTTON_DESK_TEXT: "Сначала новые",
    SORT_BUTTON_ASK_TEXT: "Сначала старые",
    NOT_DESCRIPTION_TEXT: "Нет описания",
    LINK_TEXT: "Перейти",
    EMPTY_TITLE: "У пользователя нет репозиториев.",
    EMPTY_TEXT: "Попробуйте изменить фильтр или создать новый репозиторий.",
    HISTORY_SUBTITLE: "История:",
} as const;

export const INFORM_MESSAGE = {
    START: "Введите не менее трёх символов для начала поиска",
    USER_FOUND: "Пользователь найден",
    USER_NOT_FOUND: "К сожалению , пользователь не найден",
    ERROR: "При загрузке возникла ошибка",
    INVALID_USERNAME: "Недопустимое имя пользователя",
} as const;

export const START_SEARCH_HISTORY = ["gaearon", "markerikson", "taras131"];
export const SORT = {ASK: "asc", DESC: "desc"};
export type TSort = (typeof SORT)[keyof typeof SORT];