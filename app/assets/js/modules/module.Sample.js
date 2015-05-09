/*
 * Modules (aka. Classes)
 */

var Sample = (function(){

    return {

        greetingMsg: "Hello World!",
        
        init: function() {
            console.log(this.greetingMsg)
            console.log(this.timestamp())
        },

        timestamp: function() {
            return +(new Date());
        }

    }

})();

Sample.init();