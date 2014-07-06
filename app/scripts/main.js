/**
 *
 *  Down to Cipher
 *  Copyright 2014. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the 'License');
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an 'AS IS' BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
(function () {
    'use strict';

    var navdrawerContainer = document.querySelector('.navdrawer-container');
    var appbarElement = document.querySelector('.app-bar');
    var menuBtn = document.querySelector('.menu');
    var main = document.querySelector('main');

    function closeMenu() {
        appbarElement.classList.remove('open');
        navdrawerContainer.classList.remove('open');
    }

    function toggleMenu() {
        appbarElement.classList.toggle('open');
        navdrawerContainer.classList.toggle('open');
    }

    main.addEventListener('ontouchstart', closeMenu);
    main.addEventListener('click', closeMenu);
    menuBtn.addEventListener('click', toggleMenu);
    navdrawerContainer.addEventListener('click', function (event) {
        if (event.target.nodeName === 'A' || event.target.nodeName === 'LI') {
            closeMenu();
        }
    });
})();

// Angular JS related
/*global angular */
angular.module('CounterModule', [])
    .filter('filterOutHistoryItemColorClass', function () {
        'use strict';
        
        return function (input) {
            var out;
            switch (input) {
                case 'CIPHERED':
                    out = 'color--yellow';
                    break;
                case 'REDUCED':
                    out = 'color--green';
                    break;
                case 'RESET':
                    out = 'color--red';
                    break;
                default:
                    out = 'color--blue';
            }
            return out;
        };
    })
    .controller('CounterCtrl', ['$scope',
        function ($scope) {
            'use strict';

            $scope.counter = 10;
            $scope.title = 'Down to Cipher';
            $scope.history = [
                {
                    'type': 'START',
                    'value': '*Down to Cipher* is loaded. Counter set to 10.'
                },];
            
            
            $scope.appendToHistory = function (type, text) {
                var item = {
                    'type': type,
                    'value': text
                };
                $scope.history.unshift(item);
            };

            $scope.reduceTheCounter = function () {
                var reduceCounterVal = 0;
                try {
                    reduceCounterVal = parseInt($scope.reduceValue);
                    if (isNaN(reduceCounterVal)) {
                        reduceCounterVal = 0;
                    }
                } catch (err) {
                    console.log('Could not reduce value, input is not proper integer');
                    reduceCounterVal = 0;
                }
                $scope.reduceValue = reduceCounterVal;
                $scope.counter -= reduceCounterVal;
                
                //Make a history entry
                $scope.appendToHistory('REDUCED', 'Counter reduced by *' + reduceCounterVal + '* on ' + new Date() + '.');
                
                if ($scope.counter <= 0) {
                    $scope.counter = 0;
                    $scope.celebrate();
                }
            };

            $scope.celebrate = function () {
                //Make a history entry
                $scope.appendToHistory('CIPHERED', 'YAAAY! Counter successfully ciphered on ' + new Date() + '.');
            };

            $scope.changeTheTitle = function () {
                var TITLE_LENGTH_LIMIT = 36;
                if ($scope.titleValue.length > TITLE_LENGTH_LIMIT) {
                    $scope.titleValue = $scope.titleValue.substring(0, TITLE_LENGTH_LIMIT);
                }
                //Make a history entry
                $scope.appendToHistory('TITLE', 'Title changed to *' + $scope.titleValue + '* on ' + new Date() + '.');
                $scope.title = $scope.titleValue;
                document.title = $scope.titleValue +' : Down to Cipher';
            };

            $scope.resetTheCounter = function () {
                var COUNTER_SIZE_LIMIT = 1000000;
                var resetCounterVal = 0;
                try {
                    resetCounterVal = parseInt($scope.resetValue);
                    if (isNaN(resetCounterVal)) {
                        resetCounterVal = 0;
                    }
                    if (resetCounterVal > COUNTER_SIZE_LIMIT) {
                        resetCounterVal = COUNTER_SIZE_LIMIT;
                    }
                    if (resetCounterVal < 0) {
                        resetCounterVal = 0;
                    }
                } catch (err) {
                    console.log('Could not reset to input , input is not proper integer');
                    resetCounterVal = 0;
                }
                //Make a history entry
                $scope.appendToHistory('RESET', 'Counter reset to *' + resetCounterVal + '* on ' + new Date() + '.');
                $scope.resetValue = resetCounterVal;
                $scope.counter = resetCounterVal;
            };

  }]);
