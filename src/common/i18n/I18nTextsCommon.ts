import { WebExtensionMessage } from './WebExtensionMessage';

/**
 * A single interface containing keys for all translatable texts in the application.
 */
export default interface I18nTexts {
    app_title: WebExtensionMessage;
    loading: WebExtensionMessage;
    error_message_generic: WebExtensionMessage;
    error_message: WebExtensionMessage;
}
