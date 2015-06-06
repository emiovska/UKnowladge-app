myApp
.constant('SW_DELAY', 1000)
.factory('Stopwatch', function (SW_DELAY,$timeout) {
     var data = {
                value: 0
            },
            stopwatch = null;

        var start = function () {;
            stopwatch = $timeout(function() {
                data.value++;
                start();
            }, SW_DELAY);
        };

        var stop = function () {
            $timeout.cancel(stopwatch);
            stopwatch = null;
        };

        var reset = function () {
                stop()
                data.value = 0;
            };

        return {
                data: data,
                start: start,
                stop: stop,
                reset: reset
            };

});