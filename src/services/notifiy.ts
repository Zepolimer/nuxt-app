import {Notify} from "quasar";


/**
 * PositiveNotify() use Quasar Notify module to display positive notification
 * @param {String} message
 * @constructor
 */
export const PositiveNotify = (message: string) => {
    Notify.create({
        message: message,
        color: 'positive'
    })
}

/**
 * NegativeNotify() use Quasar Notify module to display negative notification
 * @param {String} message
 * @constructor
 */
export const NegativeNotify = (message: string) => {
    Notify.create({
        message: message,
        color: 'negative'
    })
}