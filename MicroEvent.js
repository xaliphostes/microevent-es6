/**
 * @author https://github.com/jeromeetienne/microevent.js
 * For implementation
 * @author fmaerten
 * (just For ES6 port)
 * @see MicroEventDecorator in ../decorators/MicroEventDecorator
 */

class MicroEvent {
    constructor() {
        this._events = {}
    }
    bind(event, fct) {
        this._events[event] = this._events[event] || []
        this._events[event].push(fct)
    }

    unbind(event, fct) {
        if (event in this._events === false) {
            return
        }
        this._events[event].splice(this._events[event].indexOf(fct), 1)
    }
    
    trigger(event) {
        if (event in this._events === false) {
            return
        }
        this._events.forEach( e => e.apply(this, Array.prototype.slice.call(arguments, 1)) )
    }

    /**
     * mixin will delegate all MicroEvent.js function in the destination object
     * - require('MicroEvent').mixin(Foobar) will make Foobar able to use MicroEvent
     * @param {Object} the object which will support MicroEvent
     * @see MicroEventDecorator in ../decorators/MicroEventDecorator
     */
    static mixin(destObject) {
        const props	= ['bind', 'unbind', 'trigger']
        props.forEach( prop => {
            if( typeof destObject === 'function' ) {
                destObject.prototype[prop]	= MicroEvent.prototype[prop]
            } else {
                destObject[prop] = MicroEvent.prototype[prop]
            }
        })
        return destObject
    }
}

export default MicroEvent
