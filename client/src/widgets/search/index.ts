// UI
export { default as Search } from './ui';
export { default as SearchBar } from './ui/search-bar';
export { default as UsedEngines } from './ui/used-engines'

// UI -> Settings
export { default as SearchSettings } from './ui/settings';
export { default as SameTab } from './ui/settings/same-tab';
export { default as SearchEngines } from './ui/settings/search-engines';

// Utils
export {
    globalFormatter,
    googleFormat,
    yandexFormat,
    bingFormat,
    duckduckgoFormat
} from './utils/formtatter';
export {
    openEngine,
    handleSearch,
    toggleSameTab
} from './utils/handlers'